module.exports = (Sequelize) => {
    return [
        {
            username: {
                type: Sequelize.STRING,
                defaultValue: '',
                allowNull: false,
                unique: true,
                set(val) {
                    console.log('mvlUser USERNAME VAL <', val, '> TYPE ', typeof val);
                    if (val === '' || typeof val !== 'string') {
                        val = this.getDataValue('username') !== '' ? this.getDataValue('username') : 'user_' + Date.now();
                    }
                    console.log('mvlUser USERNAME VAL <', val, '> TYPE ', typeof val);
                    this.setDataValue('username', val);
                }
            },
            botUserId: {
                type: Sequelize.INTEGER,
                defaultValue: 0,
            },
            password: {
                type: Sequelize.STRING,
                defaultValue: '',
            },
            salt: {
                type: Sequelize.STRING(64),
                defaultValue: '',
            },
            remoteKey: {
                type: Sequelize.STRING,
            },
            remoteData: {
                type: Sequelize.TEXT,
            },
        },
        {
            hooks: {
                beforeCreate: (user, options) => {
                    if (user.username === '') {
                        user.username = '';
                    }
                },
            },
        },
        {
            'belongsToMany': [
                {
                    model: 'mvlUserGroup',
                    as: 'Groups',
                    through: {
                        model: 'mvlUserGroupMember'
                    }

                },
            ],
            'hasMany': [
                {
                    model: 'BotCMSUser',
                },
            ],
            'hasOne': [
                {
                    model: 'mvlUserProfile',
                    as: 'Profile',
                    foreignKey: 'UserId',
                }
            ],
        }
    ];

};