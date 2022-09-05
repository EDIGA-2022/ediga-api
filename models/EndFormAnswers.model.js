module.exports = (sequelize, Sequelize) => {
    const EndFormAnswers = sequelize.define("EndFormAnswers", {
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
        answer2: {
            type: Sequelize.INTEGER,
            field: 'Answer_2'
        },
    },
        {
            freezeTableName: true,
        }
    );
    return EndFormAnswers;
};
