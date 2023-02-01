module.exports = (sequelize, Sequelize) => {
    const User = sequelize.define("User", {
        userId: {
            type: Sequelize.UUID,
            field: 'Id',
            primaryKey: true,
			defaultValue: Sequelize.UUIDV4,
			allowNull: false,
        },
        country: {
            type: Sequelize.STRING,
        },
        createdAt: {
            type: Sequelize.DATE,
            field: 'created_at',
        },
        updatedAt: {
            type: Sequelize.DATE,
            field: 'edited_at',
        },
        deletedAt: {
            type: Sequelize.DATE,
            field: 'deleted_at',
        }
    },
        {
            freezeTableName: true,
            paranoid: true,
            timestamps: true,
        }
    );
    return User;
};
