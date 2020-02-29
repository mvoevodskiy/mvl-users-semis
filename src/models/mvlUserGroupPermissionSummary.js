module.exports = (Sequelize) => {
    return [
        {
            permissions: {
                type: Sequelize.TEXT,
                defaultValue: '{}',
                get() {
                    let perm = this.getDataValue('permissions');
                    try {
                        perm = JSON.parse(perm);
                    } catch (e) {
                        perm = {};
                    }
                    return perm;
                }
            }
        },
        {},
        {
            'belongsTo': [
                {
                    model: 'mvlUserGroup',
                    as: 'Group',
                },
            ]
        }
    ];
};