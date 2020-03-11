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

    async userInGroup (user, group) {
        let result = false;
        let finder = {
            include: [
                {
                    model: 'mvlUser',
                }
            ]
        };
        finder.where = this.MT.isString(group) ? {name: group} : {id: group};
        finder.include[0].where = this.MT.isString(user) ? {username: user} : {id: user};
        return (await this.DB.models.mvlUserGroup.count(finder)) > 0;
    }

    isRegistered_trg = async (ctx) => {
        return ctx.singleSession.mvlUser.id !== -1;
    };

    notRegistered_trg = async (ctx) => {
        return !(await this.isRegistered_trg(ctx));
    };

}

module.exports = MVLUsersController;