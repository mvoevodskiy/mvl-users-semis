module.exports = (Sequelize) => {
    return [
        {
            firstName: {
                type: Sequelize.STRING,
                defaultValue: '',
            },
            secondName: {
                type: Sequelize.STRING,
                defaultValue: '',
            },
            lastName: {
                type: Sequelize.STRING,
                defaultValue: '',
            },
            dob: {
                type: Sequelize.BIGINT,
                defaultValue: 0,
            },
            gender: {
                type: Sequelize.STRING(10),
                defaultValue: '',
            },
            email: {
                type: Sequelize.STRING,
                validate:{
                    isEmail: true,
                },
            },
            phone: {
                type: Sequelize.STRING,
                defaultValue: '',
            },
            mobilePhone: {
                type: Sequelize.STRING,
                defaultValue: '',
            },
            country: {
                type: Sequelize.STRING,
                defaultValue: '',
            },
            city: {
                type: Sequelize.STRING,
                defaultValue: '',
            },
            address: {
                type: Sequelize.STRING,
                defaultValue: '',
            },
            photo: {
                type: Sequelize.STRING,
                defaultValue: '',
            },
            language: Sequelize.STRING(3)
        },
        {
            getterMethods: {
                fullName() {
                    return [this.firstName, this.secondName, this.lastName].join(' ').replace('  ', ' ').trim();
                }
            }
        },
        {
            'belongsTo': [
                {
                    model: 'mvlUser',
                    as: 'User',
                }],
        }
    ];
};