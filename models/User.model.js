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
    },
        {
            freezeTableName: true,
            paranoid: true,
            timestamps: true,
        }
    );
    return User;
};
