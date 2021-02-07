function GetBookings(database, server, user, today) {
	return new Promise(function(resolve, reject) {
		var sql = `SELECT slot FROM bookings WHERE server == ` + server + ' AND user == ' + user + ' AND timestamp == ' + today;

		database.query(sql, function (error, results, fields) {
			if (error) {
				return reject(error);
			}
			resolve(results);
		});
	});
}