
class mvlUsersBotCMSMiddleware {

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
            console.error('MVL USERS. DB FAIL. FATAL');
            console.error(error);
            process.exit(-1);
        }
    };

    handleUpdate = (target) => {
        return next => async ctx => {
            let user;
            let mvlBotCMSUser = ctx.singleSession.mvlBotCMSUser;
            let finder = {
                where: {},
                include: ['Profile']
            };

            if (!target.MT.empty(mvlBotCMSUser) && !target.MT.empty(mvlBotCMSUser.mvlUserId)) {
                user = await mvlBotCMSUser.getMvlUser(finder);
            } else if (ctx.Message.sender.id) {
                finder.where.botUserId = ctx.Message.sender.id;
                user = await this.Model.findOne(finder);
            }

            if (target.MT.empty(user)) {
                user = this.Model.build({
                        id: -1,
                        username: '(anonymous)',
                        Profile: {firstName: '(anonymous)'}
                    },
                     finder
                );
            }
            if (!target.MT.empty(user.Profile.language)) {
                ctx.language = user.Profile.language
            }
            ctx.singleSession.mvlUser = user;
            return next(ctx);
        }
    };
}

module.exports = mvlUsersBotCMSMiddleware;