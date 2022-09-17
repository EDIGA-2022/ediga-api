module.exports = (sequelize, Sequelize) => {
    const UserRegisterInfo = sequelize.define("UserRegisterInfo", {
        userId: {
            primaryKey: true,
            type: Sequelize.UUID,
            field: 'UserId', 
            allowNull: false,       
        },
        completed_at: {
            type: Sequelize.DATE,
            field: 'Date_of_completion',
            allowNull: false,
            defaultValue: Sequelize.fn('NOW')
        },
        answer1: {
            type: Sequelize.INTEGER,
            field: 'Answer_1'   
        },
        answer1Field: {
            type: Sequelize.STRING,
            field: 'Answer_1_open_field'   
        },
        answer2: {
            type: Sequelize.INTEGER,
            field: 'Answer_2'   
        },
        answer3: {
            type: Sequelize.STRING,
            field: 'Answer_3'   
        },
        answer3Field: {
            type: Sequelize.STRING,
            field: 'Answer_3_open_field'   
        },
        alias: {
            type: Sequelize.STRING,
            field: 'Alias'   
        }
    },
    {
        freezeTableName: true,
    });
    
    return UserRegisterInfo;
};