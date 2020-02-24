module.exports = (Sequelize) => {
    return {
        groupId: {
            type: Sequelize.INTEGER,
            references: {
                model: 'mvlUserGroups',
                key: 'id',
            }
        },
        permissions: {
            type: Sequelize.TEXT,
            default: '{}',
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
    };
};