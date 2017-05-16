// model logs
module.exports = function(sequelize, DataTypes) {
    var logs = sequelize.define('logs', {
        id: {
            type: DataTypes.INTEGER,
            autoIncrement: true,
            primaryKey: true,
            field: 'id'
        },
        action: {
            type: DataTypes.STRING,
            field: 'subject',
            allowNull: true
        },
        content: {
            type: DataTypes.STRING,
            field: 'content',
            allowNull: true
        },
        isRead: {
            type: DataTypes.BOOLEAN,
            field: 'is_read',
            allowNull: true
        },
        channel: {
            type: DataTypes.INTEGER,
            field: 'channel',
            allowNull: true
        },
        CustName: {
            type: DataTypes.STRING,
            field: 'cust_name',
            allowNull: true
        },
        Time: {
            type: DataTypes.DATE,
            field: 'time',
            allowNull: true
        },
        Note: {
            type: DataTypes.STRING,
            field: 'note',
            allowNull: true
        },
    }, {
        timestamps: false,
        tableName: 'logs'
    });
    return logs;
}