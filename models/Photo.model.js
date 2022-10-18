module.exports = (sequelize, Sequelize) => {
    const Photo = sequelize.define("Photo", {
        photoId: {
            type: Sequelize.INTEGER,
            primaryKey: true,
            field: 'Id'
        },
        userId: {
            type: Sequelize.UUID,
            field: 'UserId'
        },
        createdAt: {
            type: Sequelize.INTEGER,
            field: 'Date_of_answer',
        },
        photo: {
            type: Sequelize.TEXT('long'),
            field: 'Shared_photo'
        },
        answer1: {
            type: Sequelize.INTEGER,
            field: 'Answer_1'
        },
        answer2: {
            type: Sequelize.INTEGER,
            field: 'Answer_2'
        },
        answer3: {
            type: Sequelize.INTEGER,
            field: 'Answer_3'
        },
    },
        {
            freezeTableName: true,
        }
    );
    return Photo;
};
