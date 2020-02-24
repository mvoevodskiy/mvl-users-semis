module.exports = (Sequelize) => {
    return {
        userId: {
            type: Sequelize.INTEGER,
            references: {
                model: 'mvlUsers',
                key: 'id',
            }
        },
        groupId: {
            type: Sequelize.INTEGER,
            references: {
                model: 'mvlUserGroups',
                key: 'id',
            }
        },

    };
};