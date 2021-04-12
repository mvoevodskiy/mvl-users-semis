module.exports = (Sequelize) => {
  return [
    {
      name: {
        type: Sequelize.STRING,
        defaultValue: ''
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
          model: 'mvlUserPermission',
          as: 'Permissions',
          through: {
            model: 'mvlUserPermissionSetMember'
          }
        },
        {
          model: 'mvlUserPolicy',
          as: 'Policies',
          through: {
            model: 'mvlUserPermissionSetPolicyMember'
          }
        }
      ]
    }
  ]
}
