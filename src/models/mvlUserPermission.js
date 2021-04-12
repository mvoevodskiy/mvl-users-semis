module.exports = (Sequelize) => {
  return [
    {
      name: {
        type: Sequelize.STRING,
        defaultValue: '',
        unique: {
          msg: 'Permission with same name already exists'
        }
      },
      description: {
        type: Sequelize.STRING,
        defaultValue: ''
      }
    },
    {},
    {
      belongsToMany: [
        {
          model: 'mvlUserPermissionSet',
          as: 'Sets',
          through: {
            model: 'mvlUserPermissionSetMember'
          }
        }
      ]
    }
  ]
}
