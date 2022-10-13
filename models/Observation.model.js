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
    },
        {
            freezeTableName: true,
        }
    );
    return Observation;
};
