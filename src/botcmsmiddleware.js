
class BotCMSMiddleware {

    DB = null;

    constructor (BotCMS) {
        this.BotCMS = BotCMS;
    }

    successDB = (target) => {
        return next => () => {
            this.DB = target.DB;
            this.Model = this.DB.models.mvlUser;
            return next();
        }
    };

    failDB = (target) => {
        return next => error => {
            console.error('BOTCMS USERS. DB FAIL. FATAL');
            console.error(error);
            process.exit(-1);
        }
    };

    handleUpdate = (target) => {
        return next => async ctx => {
            let localUser;
            let requestUserId = target.MT.empty(ctx.singleSession.botcmsUser) ? 0 : ctx.singleSession.botcmsUser.id;
            if (requestUserId === 0) {
                let selfUserInfo = await ctx.Bridge.fetchUserInfo();
                requestUserId = selfUserInfo.id;
            }
            localUser = await this.Model.findByPk(requestUserId);
            if (!target.MT.empty(localUser)) {
                ctx.singleSession.mvlUser = localUser;
                // console.log('USER ID: ', localUser.id);
                let profile = await this.DB.models.mvlUserProfile.findOne({where: {userId: requestUserId}});
                if (profile !== null) {
                    ctx.singleSession.mvlUserProfile = profile;
                    // console.log('PROFILE SUCCESS');
                }
            }
            return next(ctx);
        }
    };
}

module.exports = BotCMSMiddleware;