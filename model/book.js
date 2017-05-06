// model Book
module.exports = function(sequelize, DataTypes) {
    var Book = sequelize.define('Book', {
        id: {
            type: DataTypes.INTEGER,
            autoIncrement: true,
            primaryKey: true,
            field: 'id'
        },
        requester: {
            type: DataTypes.STRING,
            field: 'requester',
            allowNull: true
        },
        subject: {
            type: DataTypes.STRING,
            field: 'subject',
            allowNull: true
        },
        book_type: {
            type: DataTypes.STRING,
            field: 'book_type',
            allowNull: true
        },
        product_booking: {
            type: DataTypes.STRING,
            field: 'product_booking',
            allowNull: true
        },
        address_booking: {
            type: DataTypes.STRING,
            field: 'address_booking',
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
        status: {
            type: DataTypes.INTEGER,
            field: 'status',
            allowNull: true,
            defaultValue: 0
        },
        channel: {
            type: DataTypes.INTEGER,
            field: 'channel',
            allowNull: true
        },
        SenderId: {
            type: DataTypes.STRING,
            field: 'sender_id',
            allowNull: true
        },
        Latitude: {
            type: DataTypes.REAL,
            field: 'latitude',
            allowNull: true
        },
        Longitude: {
            type: DataTypes.REAL,
            field: 'longitude',
            allowNull: true
        },
        Addr: {
            type: DataTypes.STRING,
            field: 'addr',
            allowNull: true
        },
        Phone: {
            type: DataTypes.STRING,
            field: 'phone',
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
        VehType: {
            type: DataTypes.STRING,
            field: 'veh_type',
            allowNull: true
        },
        Qty: {
            type: DataTypes.INTEGER,
            field: 'qty',
            allowNull: true
        },
        GhiChu: {
            type: DataTypes.STRING,
            field: 'ghi_chu',
            allowNull: true
        },
        Brand: {
            type: DataTypes.STRING,
            field: 'brand',
            allowNull: true
        },
        Src: {
            type: DataTypes.STRING,
            field: 'src',
            allowNull: true
        },
        Dmn: {
            type: DataTypes.STRING,
            field: 'dmn',
            allowNull: true
        }
    }, {
        timestamps: false,
        tableName: 'Book'
    });
    return Book;
}