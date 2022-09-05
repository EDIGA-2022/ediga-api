module.exports = (sequelize, Sequelize) => {
    const User = sequelize.define("User", {
        userId: {
            type: Sequelize.UUID,
            field: 'Id',
            primaryKey: true,
        },
        country: {
            type: Sequelize.STRING,
            field: 'Country',
        },
    },
        {
            freezeTableName: true,
        }
    );
    return User;
};
