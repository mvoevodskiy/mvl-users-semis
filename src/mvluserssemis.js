const {MVLoaderBase} = require('mvloader');

class MvlUsersSemis extends MVLoaderBase{
    static exportConfig = {
        ext: {
            classes: {
                semis: {},
                controllers: {
                    mvlUsers: require('./controllers/mvluserscontroller'),
                },
                handlers: {},
            },
            configs: {
                controllers: {},
                handlers: {
                    BotHandler: {
                        botcms: {
                            middlewares: [
                                require('./botcmsmiddleware'),
                            ],
                        },
                    },
                    DBHandler: {
                        sequelize: {},
                        models: {
                            mvlUser: require('./models/mvlUser'),
                            mvlUserGroup: require('./models/mvlUserGroup'),
                            mvlUserGroupMember: require('./models/mvlUserGroupMember'),
                            mvlUserGroupPermissionSummary: require('./models/mvlUserGroupPermissionSummary'),
                            mvlUserPermission: require('./models/mvlUserPermission'),
                            mvlUserPermissionSet: require('./models/mvlUserPermissionSet'),
                            mvlUserPermissionSetMember: require('./models/mvlUserPermissionSetMember'),
                            mvlUserPermissionSetPolicyMember: require('./models/mvlUserPermissionSetPolicyMember'),
                            mvlUserPolicy: require('./models/mvlUserPolicy'),
                            mvlUserPolicyGroupMember: require('./models/mvlUserPolicyGroupMember'),
                            mvlUserProfile: require('./models/mvlUserProfile'),
                        }
                    }
                },
                semis: {},
            }
        },
        db: {},
    };

    constructor (App, ...config) {
        let localDefaults = {

        };
        super(localDefaults, ...config);
        this.App = App;
    }

    async init() {
        return super.init();
    }

    async initFinish() {
        super.initFinish();
    }

}

module.exports = MvlUsersSemis;