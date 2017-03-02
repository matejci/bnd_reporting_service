'use strict';

module.exports = function(app) {

	const middleware = require('../middleware');
	const serviceController = require('../controllers/service_controller');

	//Service endpoint for importing jMeter results
	app.get('/service/import/jmeterresults', function(req, res, next) {

		console.log("Service Endpoint");
		console.log(req.query);

		if (!req.query.path) {
			res.status(404).json({message: "Wrong params."});
		}

		serviceController.parseFile(req.query.path).then( (parseFileResponse) => {
			serviceController.moveFile(req.query.path).then( (moveFileResponse) => {
				res.status(200).json({message: "OK"});
			}).catch( (moveFileErr) => {
				console.log("CATCH MOVE FILE", moveFileErr);
				res.status(500).json({ errors: moveFileErr });
			});

		}).catch( (parseFileErr) => {
			res.status(500).json({ errors: parseFileErr });
		});

	});


};
