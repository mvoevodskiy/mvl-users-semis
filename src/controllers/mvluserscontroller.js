const {MVLoaderBase} = require('mvloader');

class MVLUsersController extends MVLoaderBase {

    caption = 'mvlUsers';

    constructor (App, ...config) {
        let localDefaults = {

        };
        super(localDefaults, ...config);
        this.App = App;
        this.App.services.Users = this;
    }

    async init() {
        return super.init();
    }

    async initFinish() {
        super.initFinish();
        this.DB = this.App.services.DB;
        // console.log('MVL USERS CONTROLLER INIT FINISHED.');
    }

    async register(data) {
        let profile;
        if (typeof data.Profile !== 'object') {
            data.Profile = data;
        }
        return this.DB.models.mvlUser.create(data, {include: ['Profile']});
    }

    userInGroups = async (user, groups) => {
        let finder = {
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
            // logging: console.log
        };
        finder.where = this.MT.isString(user) ? {username: user} : {id: user};
        return (await this.DB.models.mvlUser.count(finder)) > 0;
    }

    inGroupAdministrators_trg = async (ctx, user) => {
        if (ctx instanceof this.DB.models.mvlUser) {
            user = ctx;
        } else if (ctx !== undefined && this.MT.empty(user)) {
            user = ctx.singleSession.mvlUser;
        }
        // console.log(ctx, user);
        if (user) {
            return this.userInGroups(user.id, 'Administrators');
        }
        return false;
    }

    isRegistered_trg = async (ctx) => {
        return ctx.singleSession.mvlUser.id !== -1;
    };

    notRegistered_trg = async (ctx) => {
        return !(await this.isRegistered_trg(ctx));
    };

}

module.exports = MVLUsersController;