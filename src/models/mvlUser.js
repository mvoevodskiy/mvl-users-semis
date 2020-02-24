module.exports = (Sequelize) => {
    let user = [{
        username: {
            type: Sequelize.STRING,
            default: 0,
            allowNull: false,
        },
        botUserId: {
            type: Sequelize.INTEGER,
            default: 0,
        },
        password: {
            type: Sequelize.STRING,
            default: '',
        },
        salt: {
            type: Sequelize.STRING(64),
            default: '',
        },
        remoteKey: {
            type: Sequelize.STRING,
        },
        remoteData: {
            type: Sequelize.TEXT,
        },
    },
        {
        classMethods: {
            associate: function (models) {
                console.log(this);
                user.hasMany(models.mvlUserProfile);
            }
        }
    }];
    return user;

};