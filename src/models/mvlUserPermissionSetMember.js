module.exports = (Sequelize) => {
    return {
        permissionId: {
            type: Sequelize.INTEGER,
            references: {
                model: 'mvlUserPermissions',
                key: 'id',
            },
        },
        permissionSetId: {
            type: Sequelize.INTEGER,
            references: {
                model: 'mvlUserPermissionSets',
                key: 'id',
            },
        },
    };
};