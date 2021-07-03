const { MVLoaderBase } = require('mvloader')
const mt = require('mvtools')

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

    this.registerUnregisteredVld = async (ctx, vld, params = {}) => {
      return await mt.extract('mvlUser.id', ctx.state, -1) === -1
        ? this.registerVld(ctx, vld, params)
        : true
    }

    this.registerVld = async (ctx, vld, params = {}) => {
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
                [this.DB.S.Op.in]: mt.makeArray(groups)
              }
            }
          }
        ],
        logging: console.log
      }
      finder.where = typeof user === 'string' ? { username: user } : { id: user }
      return (await this.DB.models.mvlUser.count(finder)) > 0
    }

    this.inGroupAdministratorsTrg = async (ctx, user) => {
      if (ctx instanceof this.DB.models.mvlUser) {
        user = ctx
      } else if (ctx !== undefined && (mt.empty(user) || mt.empty(user.id))) {
        user = ctx.state.mvlUser
      }
      // console.log(ctx, user);
      if (user) {
        return this.userInGroups(user.id, 'Administrators')
      }
      return false
    }

    this.inGroupsVld = async (ctx, validator, params) => {
      let user = params.user
      if (ctx instanceof this.DB.models.mvlUser) {
        user = ctx
      } else if (ctx !== undefined && (mt.empty(user) || mt.empty(user.id))) {
        user = ctx.state.mvlUser
      }
      // console.log(ctx, user);
      if (user) {
        return this.userInGroups(user.id, params.groups || [])
      }
      return false
    }

    this.isRegisteredTrg = async (ctx) => mt.extract('mvlUser.id', ctx.state, -1) !== -1
    this.inGroupsTrg = async (ctx, params) => this.inGroupsVld(ctx, {}, params)
    this.notRegisteredTrg = async (ctx) => !(await this.isRegisteredTrg(ctx))
    this.notInGroupsTrg = async (ctx, params) => !(await this.inGroupsTrg(ctx, params))
    this.notInGroupsVld = async (ctx, validator, params) => !(await this.inGroupsVld(ctx, validator, params))
    // this.inGroupAdministratorsTrg = async (ctx, user) => this.inGroupAdministratorsTrg(ctx, user)
    this.notInGroupAdministratorsTrg = async (ctx, validator, params) => !(await this.inGroupAdministratorsTrg(ctx, params))

    this.registerUnregistered_vld = async (ctx, vld, params = {}) => this.registerUnregisteredVld(ctx, vld, params)
    this.register_vld = async (ctx, vld, params = {}) => this.registerVld(ctx, vld, params)
    this.isRegistered_trg = async (ctx) => this.isRegisteredTrg(ctx)
    this.inGroups_vld = async (ctx, validator, params) => this.inGroupsVld(ctx, validator, params)
    this.inGroups_trg = async (ctx, params) => this.inGroupsTrg(ctx, params)
    this.notRegistered_trg = async (ctx) => this.notRegisteredTrg(ctx)
    this.notInGroups_trg = async (ctx, params) => this.notInGroupsTrg(ctx, params)
    this.notInGroups_vld = async (ctx, validator, params) => this.notInGroupsVld(ctx, validator, params)
    this.inGroupAdministrators_trg = async (ctx, user) => this.inGroupAdministratorsTrg(ctx, user)
    this.notInGroupAdministrators_trg = async (ctx, validator, params) => this.notInGroupAdministratorsTrg(ctx, validator, params)
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
