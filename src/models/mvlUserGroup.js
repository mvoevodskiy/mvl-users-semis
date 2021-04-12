module.exports = (Sequelize) => {
  return [
    {
      name: {
        type: Sequelize.STRING,
        defaultValue: ''
      },
      description: {
        type: Sequelize.TEXT,
        defaultValue: ''
      }
    },
    {},
    {
      belongsToMany: [
        {
          model: 'mvlUser',
          through: {
            model: 'mvlUserGroupMember'
          }
        },
        {
          model: 'mvlUserPolicy',
          through: {
            model: 'mvlUserPolicyGroupMember'
          }
        }
      ],
      hasOne: [
        {
          model: 'mvlUserGroupPermissionSummary',
          as: 'PermissionSummary'
        }
      ]

    }
  ]
}
