module.exports = (Sequelize) => {
    return {
        permissionSetId: {
            type: Sequelize.INTEGER,
            references: {
                model: 'mvlUserPermissionSets',
                key: 'id',
            },
        },
        policyId: {
            type: Sequelize.INTEGER,
            references: {
                model: 'mvlUserPolicies',
                key: 'id',
            },
        },
    };
};