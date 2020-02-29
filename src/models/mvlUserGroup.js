module.exports = (Sequelize) => {
    return [
        {
            name: {
                type: Sequelize.STRING,
                default: '',
            },
            description: {
                type: Sequelize.TEXT,
                default: '',
            },
        },
        {},
        {
            'belongsToMany': [
                {
                    model: 'mvlUser',
                    through: {
                        model: 'mvlUserGroupMember'
                    }
                },
                {
                    model: 'mvlUserPolicy',
                    through: {
                        model: 'mvlUserPolicyGroupMember'
                    }
                }
            ],
            'hasOne': [
                {
                    model: 'mvlUserGroupPermissionSummary',
                    as: 'PermissionSummary',
                },
            ]

        }
    ];
};