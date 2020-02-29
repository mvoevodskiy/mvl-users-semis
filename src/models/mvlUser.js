module.exports = (Sequelize) => {
    return [
        {
            username: {
                type: Sequelize.STRING,
                default: 0,
                allowNull: false,
            },
            botUserId: {
                type: Sequelize.INTEGER,
                default: 0,
            },
            password: {
                type: Sequelize.STRING,
                default: '',
            },
            salt: {
                type: Sequelize.STRING(64),
                default: '',
            },
            remoteKey: {
                type: Sequelize.STRING,
            },
            remoteData: {
                type: Sequelize.TEXT,
            },
        },
        {},
        {
            'belongsToMany': [
                {
                    model: 'mvlUserGroup',
                    through: {
                        model: 'mvlUserGroupMember'
                    }

                },
                {
                    model: 'BotCMSUser',
                    through: {
                        model: 'mvlUserBotCMSUserLink'
                    }

                }
            ],
            'hasOne': [
                {
                    name: 'mvlUserProfile',
                    alias: 'Profile',
                }
            ],
        }
    ];

};