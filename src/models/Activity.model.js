module.exports = (sequelize, Sequelize) => {
    const Activity = sequelize.define("Activity", {
        activityId: {
            type: Sequelize.INTEGER,
            primaryKey: true,
            field: 'Id'
        },
        userId: {
            type: Sequelize.UUID,
            field: 'UserId'        
        },
        questionId: {
            type: Sequelize.INTEGER,
            field: 'Question_id',
        },
        answer: {
            type: Sequelize.TEXT('long'),
            field: 'Answer'   
        },
        originalQuestionDate: {
            type: Sequelize.DATE,
            field: 'Original_question_date'   
        },
        dateOfAnswer: {
            type: Sequelize.DATE,
            field: 'Date_of_answer'   
        },
        sharedPhoto: {
            type: Sequelize.TEXT('long'),
            field: 'Shared_photo'   
        }
    });
    
    return Activity;
};