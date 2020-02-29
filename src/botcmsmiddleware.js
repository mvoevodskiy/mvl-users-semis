
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
            let user;
            let botcmsUser = ctx.singleSession.botcmsUser;
            let finder = {
                where: {},
                include: ['Profile']
            };

            if (!target.MT.empty(botcmsUser)) {
                user = await botcmsUser.getMvlUser(finder);
            } else {
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
            ctx.singleSession.mvlUser = user;
            return next(ctx);
        }
    };
}

module.exports = BotCMSMiddleware;