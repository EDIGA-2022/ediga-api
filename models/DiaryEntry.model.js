module.exports = (sequelize, Sequelize) => {
  const DiaryEntry = sequelize.define('DiaryEntry', {
    diaryEntryId: {
      type: Sequelize.UUID,
      primaryKey: true,
      field: 'diary_entry_id',
      allowNull: false,
      defaultValue: Sequelize.UUIDV4
    },
    userId: {
      type: Sequelize.UUID,
      field: 'user_id'
    },
    text: Sequelize.TEXT('long'),
    createdBy: {
      type: Sequelize.UUID,
      field: 'created_by'
    },
    createdAt: {
      type: Sequelize.DATE,
      field: 'created_at'
    },
    updatedAt: {
      type: Sequelize.DATE,
      field: 'updated_at'
    },
    deletedAt: {
      type: Sequelize.DATE,
      field: 'deleted_at'
    }
  },
  {
    freezeTableName: true
  }
  )
  return DiaryEntry
}
