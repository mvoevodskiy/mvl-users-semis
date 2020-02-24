module.exports = (Sequelize) => {
    return {
        policyId: {
            type: Sequelize.INTEGER,
            references: {
                model: 'mvlUserPolicies',
                key: 'id',
            },
        },
        groupId: {
            type: Sequelize.INTEGER,
            references: {
                model: 'mvlUserGroups',
                key: 'id',
            },
        },
    };
};