module.exports = (sequelize, Sequelize) => {
	const EdigaUser = sequelize.define("EdigaUser", {
		edigaUserId: {
			primaryKey: true,
			type: Sequelize.UUID,
			defaultValue: Sequelize.UUIDV4,
			allowNull: false,
		},
		email: {
			type: Sequelize.STRING,
		},
		password: {
			type: Sequelize.STRING,
		},
		name: {
			type: Sequelize.STRING,
		},
		first_log_in: {
			type: Sequelize.BOOLEAN,
			defaultValue: true,
		}
	},
		{
			freezeTableName: true,
		});

	return EdigaUser;
};