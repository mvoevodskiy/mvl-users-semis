module.exports = (Sequelize) => {
    return {
        userId: {
            type: Sequelize.INTEGER,
            references: {
                model: 'mvlUsers',
                key: 'id',
            }
        },
        botcmsUserId: {
            type: Sequelize.INTEGER,
            // references: {
            //     model: 'BotCMSUsers',
            //     key: 'id',
            // }
        },

    };
};