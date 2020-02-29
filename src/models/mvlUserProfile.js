module.exports = (Sequelize) => {
    return [
        {
            firstName: {
                type: Sequelize.STRING,
                default: '',
            },
            secondName: {
                type: Sequelize.STRING,
                default: '',
            },
            lastName: {
                type: Sequelize.STRING,
                default: '',
            },
            gender: {
                type: Sequelize.STRING(10),
                default: '',
            },
            email: {
                type: Sequelize.STRING,
                default: '',
                validate:{
                    // notEmpty:{
                    //     args:true,
                    //     msg:"Email-id required"
                    // },
                    isEmail:{
                        args: true,
                        msg: 'Valid email-id required'
                    }
                },
            },
            phone: {
                type: Sequelize.STRING,
                default: '',
            },
            mobilePhone: {
                type: Sequelize.STRING,
                default: '',
            },
            country: {
                type: Sequelize.STRING,
                default: '',
            },
            city: {
                type: Sequelize.STRING,
                default: '',
            },
            address: {
                type: Sequelize.STRING,
                default: '',
            },
            photo: {
                type: Sequelize.STRING,
                default: '',
            },
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