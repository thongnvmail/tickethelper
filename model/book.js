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
			allowNull: false
		},
		subject: {
			type: DataTypes.STRING,
			field: 'subject',
			allowNull: false
		},
		book_type: {
			type: DataTypes.STRING,
			field: 'book_type',
			allowNull: false
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
		}
	}, {
		timestamps: false,
		tableName: 'Book'
	});
	return Book;
}