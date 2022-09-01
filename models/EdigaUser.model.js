module.exports = (sequelize, Sequelize) => {
    const EdigaUser = sequelize.define("EdigaUser", {
        edigaUserId: {
            primaryKey: true,
            type: Sequelize.UUID,
            field: 'id',

        },
        email: {
            type: Sequelize.STRING,
            field: 'email',
        },
        password: {
            type: Sequelize.STRING,
            field: 'password'
        }
    }, 
    {
        freezeTableName: true,
    });
    
    return EdigaUser;
};