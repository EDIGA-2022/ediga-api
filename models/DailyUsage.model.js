module.exports = (sequelize, Sequelize) => {
  const DailyUsage = sequelize.define('DailyUsage', {
    dailyUsageId: {
      primaryKey: true,
      type: Sequelize.INTEGER,
      defaultValue: Sequelize.INTEGER,
      allowNull: false,
      field: 'Id'
    },
    userId: {
      type: Sequelize.UUID,
      allowNull: false,
      field: 'UserId'
    },
    date: {
      type: Sequelize.DATE(6),
      allowNull: false,
      field: 'Date'
    },
    usageTime: {
      type: Sequelize.TIME,
      allowNull: false,
      field: 'Usage_time'
    }
  },
  {
    freezeTableName: true
  })

  return DailyUsage
}
