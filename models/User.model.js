module.exports = (sequelize, Sequelize) => {
    const User = sequelize.define("User", {
        Id: {
			primaryKey: true,
			type: Sequelize.UUID,
			defaultValue: Sequelize.UUIDV4,
			allowNull: false,
		},
        country: {
            type: Sequelize.STRING,
        },
    }, 
    {
        freezeTableName: true,
    });
    
    return User;
};
