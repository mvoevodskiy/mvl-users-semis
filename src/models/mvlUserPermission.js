module.exports = (Sequelize) => {
    return [
        {
            name: {
                type: Sequelize.STRING,
                default: '',
                unique: {
                    msg: 'Permission with same name already exists',
                }
            },
            description: {
                type: Sequelize.STRING,
                default: '',
            }
        },
        {},
        {
            'belongsToMany': [
                {
                    model: 'mvlUserPermissionSet',
                    as: 'Sets',
                    through: {
                        model: 'mvlUserPermissionSetMember',
                    }
                }
            ]
        }
    ];
};