module.exports = (Sequelize) => {
    return [
        {
            name: {
                type: Sequelize.STRING,
                default: '',
            },
            description: {
                type: Sequelize.STRING,
                default: '',
            },
        },
        {},
        {
            'belongsToMany': [
                {
                    model: 'mvlUserPermission',
                    as: 'Permissions',
                    through: {
                        model: 'mvlUserPermissionSetMember',
                    }
                },
                {
                    model: 'mvlUserPolicy',
                    as: 'Policies',
                    through: {
                        model: 'mvlUserPermissionSetPolicyMember',
                    }
                },
            ]
        }
    ];
};