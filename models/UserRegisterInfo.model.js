module.exports = (sequelize, Sequelize) => {
    const UserRegisterInfo = sequelize.define("UserRegisterInfo", {
        userId: {
            type: Sequelize.UUID,
            field: 'UserId',
            primaryKey: true,
        },
        completedAt: {
            type: Sequelize.DATE,
            field: 'Date_of_completion',
        },
        answer1: {
            type: Sequelize.INTEGER,
            field: 'Answer_1'
        },
        answer1Field: {
            type: Sequelize.TEXT('long'),
            field: 'Answer_1_open_field'
        },
        answer2: {
            type: Sequelize.INTEGER,
            field: 'Answer_2'
        },
        answer3: {
            type: Sequelize.INTEGER,
            field: 'Answer_3'
        },
        answer3Field: {
            type: Sequelize.TEXT('long'),
            field: 'Answer_3_open_field'
        },
    },
        {
            freezeTableName: true,
        }
    );
    return UserRegisterInfo;
};
