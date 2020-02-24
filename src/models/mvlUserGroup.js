module.exports = (Sequelize) => {
    return {
        name: {
            type: Sequelize.STRING,
            default: '',
        },
        description: {
            type: Sequelize.TEXT,
            default: '',
        },
    };
};