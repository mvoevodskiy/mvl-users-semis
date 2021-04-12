module.exports = (Sequelize) => {
  return [
    {
      firstName: {
        type: Sequelize.STRING,
        defaultValue: ''
      },
      secondName: {
        type: Sequelize.STRING,
        defaultValue: ''
      },
      lastName: {
        type: Sequelize.STRING,
        defaultValue: ''
      },
      dob: {
        type: Sequelize.BIGINT,
        defaultValue: 0
      },
      gender: {
        type: Sequelize.STRING(10),
        defaultValue: ''
      },
      email: {
        type: Sequelize.STRING,
        validate: {
          isEmail: true
        }
      },
      phone: {
        type: Sequelize.STRING,
        defaultValue: ''
      },
      mobilePhone: {
        type: Sequelize.STRING,
        defaultValue: ''
      },
      country: {
        type: Sequelize.STRING,
        defaultValue: ''
      },
      city: {
        type: Sequelize.STRING,
        defaultValue: ''
      },
      address: {
        type: Sequelize.STRING,
        defaultValue: ''
      },
      photo: {
        type: Sequelize.STRING,
        defaultValue: ''
      },
      language: Sequelize.STRING(3),
      extended: {
        type: Sequelize.TEXT,
        defaultValue: '{}',
        allowNull: false,
        get () {
          try {
            return JSON.parse(this.getDataValue('extended'))
          } catch (e) {
            console.error('GETTER OF extended FIELD OF MODEL mvlUserProfile. RETURN EMPTY OBJECT. ERROR', e)
            return {}
          }
        },
        set (val) {
          try {
            val = typeof val === 'string' ? val : JSON.stringify(val)
          } catch (e) {
            console.error('SETTER OF extended FIELD OF MODEL mvlUserProfile. SETTING EMPTY OBJECT. ERROR', e)
            return '{}'
          }
          this.setDataValue('extended', val)
        }
      }
    },
    {
      getterMethods: {
        fullName () {
          return [this.firstName, this.secondName, this.lastName].join(' ').replace('  ', ' ').trim()
        }
      }
    },
    {
      belongsTo: [
        {
          model: 'mvlUser',
          as: 'User'
        }]
    }
  ]
}
