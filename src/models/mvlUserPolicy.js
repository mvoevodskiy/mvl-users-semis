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
          model: 'mvlUserPermissionSet',
          as: 'PermissionSets',
          through: {
            model: 'mvlUserPermissionSetPolicyMember'
          }
        },
        {
          model: 'mvlUserGroup',
          as: 'Groups',
          through: {
            model: 'mvlUserPolicyGroupMember'
          }
        }
      ]
    }
  ]
}
