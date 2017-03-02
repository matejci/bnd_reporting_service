'use strict';

module.exports = function(app) {

	const fs = require('fs');
	const csv = require('fast-csv');
	const middleware = require('../middleware');
	const serviceController = require('../controllers/service_controller');


	//Service endpoint for importing jMeter results
	app.get('/service/import/jmeterresults', function(req, res, next) {

		console.log("Service Endpoint");
		console.log(req.query);

		if (!req.query.path) {
			res.status(404).json({message: "Wrong path."});
		}

		let records = [];

		// let stream = fs.createReadStream('./project_data/results/book_n_drive_api.csv');
		let stream = fs.createReadStream(req.query.path);

		csv.fromStream(stream, {headers: true})
			.on('data-invalid', invData => {
				console.log("Invalid data: ", invData);
			})
			.on('data', data => {
				// console.log("Data", data);
				records.push(data);
			})
			.on('end', () => {
				// console.log("Done");

				//parse records, save into crate, return response!


				console.log("records", JSON.stringify(records));
				res.status(200).json({message: "ok"});
			});

	});


};
