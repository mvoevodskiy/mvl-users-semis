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
                    model: 'mvlUserPermissionSet',
                    as: 'PermissionSets',
                    through: {
                        model: 'mvlUserPermissionSetPolicyMember'
                    }
                },
                {
                    model: 'mvlUserGroup',
                    as: 'Groups',
                    through: {
                        model: 'mvlUserPolicyGroupMember'
                    }
                },
            ]
        }
    ];
};