// model Car
module.exports = function(sequelize, DataTypes) {
	var Car = sequelize.define('Car', {
		id: {
			type: DataTypes.STRING,
			primaryKey: true,
			field: 'id'
		},
		vehicleNumber: {
			type: DataTypes.STRING,
			field: 'vehicle_number',
			allowNull: false
		}
	}, {
		timestamps: false,
		tableName: 'Car'
	});
	return Car;
}