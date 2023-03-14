module.exports = (sequelize, Sequelize) => {
  const EdigaUser = sequelize.define('EdigaUser', {
    edigaUserId: {
      primaryKey: true,
      type: Sequelize.UUID,
      defaultValue: Sequelize.UUIDV4,
      allowNull: false,
      field: 'ediga_user_id'

    },
    email: {
      type: Sequelize.STRING
    },
    country: {
      type: Sequelize.STRING
    },
    password: {
      type: Sequelize.STRING,
      get () {
        return () => this.getDataValue('password')
      }
    },
    name: {
      type: Sequelize.STRING
    },
    firstLogIn: {
      type: Sequelize.BOOLEAN,
      defaultValue: true,
      field: 'first_log_in'
    },
    isAdmin: {
      type: Sequelize.BOOLEAN,
      defaultValue: false,
      field: 'is_admin'
    }
  },
  {
    freezeTableName: true
  })

  return EdigaUser
}
