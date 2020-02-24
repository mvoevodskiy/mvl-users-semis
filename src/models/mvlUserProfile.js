module.exports = (Sequelize) => {
    return [
        {
            userId: {
                type: Sequelize.INTEGER,
                // references: {
                //     model: 'mvlUsers',
                //     key: 'id',
                // }
            },
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
        }
    ];
};