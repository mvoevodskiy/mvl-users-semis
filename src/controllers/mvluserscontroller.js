const { MVLoaderBase } = require('mvloader')

class MVLUsersController extends MVLoaderBase {
  constructor (App, ...config) {
    const localDefaults = {
      threads: {
        register: 'register'
      }
    }
    super(localDefaults, ...config)
    this.App = App
    this.App.services.Users = this
    this.caption = 'mvlUsers'

    this.registerUnregistered_vld = async (ctx, vld, params = {}) => {
      return await this.MT.extract('mvlUser.id', ctx.state, -1) === -1
        ? this.register_vld(ctx, vld, params)
        : true
    }

    this.register_vld = async (ctx, vld, params = {}) => {
      const data = ctx.getAnswers(params.thread || this.config.threads.register)
      const user = await this.register(data)
      if (user !== null) {
        if (params.saveState) ctx.state.mvlUser = user
        if (params.saveToBotUser) await ctx.state.mvlBotCMSUser.setMvlUser(user)
      }
      return user
    }

    this.userInGroups = async (user, groups) => {
      const finder = {
        include: [
          {
            model: this.DB.models.mvlUserGroup,
            as: 'Groups',
            where: {
              name: {
                [this.DB.S.Op.in]: this.MT.makeArray(groups)
              }
            }
          }
        ],
        logging: console.log
      }
      finder.where = this.MT.isString(user) ? { username: user } : { id: user }
      return (await this.DB.models.mvlUser.count(finder)) > 0
    }

    this.inGroupAdministrators_trg = async (ctx, user) => {
      if (ctx instanceof this.DB.models.mvlUser) {
        user = ctx
      } else if (ctx !== undefined && (this.MT.empty(user) || this.MT.empty(user.id))) {
        user = ctx.singleSession.mvlUser
      }
      // console.log(ctx, user);
      if (user) {
        return this.userInGroups(user.id, 'Administrators')
      }
      return false
    }

    this.inGroups_trg = async (ctx, params) => this.inGroups_vld(ctx, {}, params)

    this.inGroups_vld = async (ctx, validator, params) => {
      let user = params.user
      if (ctx instanceof this.DB.models.mvlUser) {
        user = ctx
      } else if (ctx !== undefined && (this.MT.empty(user) || this.MT.empty(user.id))) {
        user = ctx.singleSession.mvlUser
      }
      // console.log(ctx, user);
      if (user) {
        return this.userInGroups(user.id, params.groups || [])
      }
      return false
    }

    this.isRegistered_trg = async (ctx) => {
      return ctx.singleSession.mvlUser.id !== -1
    }

    this.notRegistered_trg = async (ctx) => {
      return !(await this.isRegistered_trg(ctx))
    }
  }

  async init () {
    return super.init()
  }

  async initFinish () {
    await super.initFinish()
    this.DB = this.App.services.DB
    // console.log('MVL USERS CONTROLLER INIT FINISHED.');
  }

  async register (data) {
    if (typeof data.Profile !== 'object') {
      data.Profile = data
    }
    return this.DB.models.mvlUser.create(data, { include: ['Profile'] })
  }
}

module.exports = MVLUsersController
