module.exports = (sequelize, Sequelize) => {
    const User = sequelize.define("User", {
        userId: {
            type: Sequelize.UUID,
            field: 'Id'        
        },
        country: {
            type: Sequelize.STRING,
            field: 'Country',
        },
    }, 
    {
        freezeTableName: true,
    });
    
    return User;
};