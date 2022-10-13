module.exports = (sequelize, Sequelize) => {
    const Observation = sequelize.define("Observation", {
        observationId: {
            type: Sequelize.UUID,
            primaryKey: true,
            field: 'observation_id'
        },
        userId: {
            type: Sequelize.UUID,
            field: 'user_id'
        },
        photoId: {
            type: Sequelize.INTEGER,
            field: 'photo_id'
        },
        text: Sequelize.TEXT('long'),
        createdAt: {
            type: Sequelize.DATE,
            field: 'created_at',
        },
        updatedAt: {
            type: Sequelize.DATE,
            field: 'updated_at',
        },
        deletedAt: {
            type: Sequelize.DATE,
            field: 'deleted_at',
        },
        title: Sequelize.TEXT('long'),
        type: Sequelize.CHAR,
        likes: Sequelize.INTEGER,
        comments: Sequelize.INTEGER,
        music: Sequelize.TEXT('long'),
        hasMusic: Sequelize.BOOLEAN,
        publicationDate: {
            type: Sequelize.DATE,
            field: 'publication_date',
        },
    },
        {
            freezeTableName: true,
        }
    );
    return Observation;
};
