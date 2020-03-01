const MVLoaderBase = require('mvloader/src/mvloaderbase');

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
        let user = await this.DB.models.mvlUser.create(data);
        if (user !== null) {
            data.userId = user.id;
            profile = await this.DB.models.mvlUserProfile.create(data);
        }
        if (profile === null) {
            user.remove();
            return false;
        }
        return user;
    }

    isRegistered_trg = async (ctx) => {
        return ctx.singleSession.mvlUser.id !== -1;
    };

    notRegistered_trg = async (ctx) => {
        return !(await this.isRegistered_trg(ctx));
    };

}

module.exports = MVLUsersController;