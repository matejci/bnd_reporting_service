
'use strict';

module.exports = {

	loadModules: function() {
		// const config = require('../config/common');
		// const axios = require('axios');
		// const xmlParser = require('xml2js');
		// const db = require('node-crate');
		// const crypto = require('crypto');
		// const fs = require('fs');

		// return {
		// 	config: config,
		// 	axios: axios,
		// 	xmlParser: xmlParser,
		// 	db: db,
		// 	crypto: crypto,
		// 	fs: fs
		// };
	},

	importProjects: function(user, password) {

		let serviceController = this;
		let modules = this.loadModules();
		let crate = modules.db;
		crate.connect('localhost', '4200');

		return new Promise(function(resolve, reject) {

			crate.execute("SELECT site_id, site_content_url, site_name FROM sites").then(function(response) {

				response.rows.map( site => {

					serviceController.tableauLogin(user, password, site[1]).then( site_login => {

						let projectsReq = {
							method: 'GET',
							url: `${modules.config.TABLEAU.API_URL}/sites/${site[0]}/projects`,
							headers: {'X-Tableau-Auth': `${site_login.ttoken}`}
						}

						modules.axios.request(projectsReq).then( projectsResponse => {

							let JSONResult = null;

							modules.xmlParser.parseString(projectsResponse.data, {explicitArray: false}, function(err, result) {
								JSONResult = JSON.parse(JSON.stringify(result));
							});

							let JSONprojects = JSONResult.tsResponse.projects.project;

							if (!Array.isArray(JSONprojects)) {
								let tempJSONprojects = JSONprojects;
								JSONprojects = [];
								JSONprojects.push(tempJSONprojects);
							}

							JSONprojects.map( project => {

								let project_object = {};
								project_object.id = modules.crypto.randomBytes(4).toString("hex");
								project_object.site_id = site[0];
								project_object.site_content_url = site[1];
								project_object.site_name = site[2];
								project_object.created_by = user;
								project_object.created_at = new Date();
								project_object.updated_at = new Date();
								project_object.description = project.$.description;
								project_object.name = project.$.name;
								project_object.project_id = project.$.id;

								crate.insert('projects', project_object).success(function(res) {});

								return resolve(project_object);
							});


						}).catch( projectsError => {
							console.log("CATCH serviceController::importProjects -> Axios projectsReq catch", projectsError);
							return reject(projectsError);
						});

					}).catch( loginErr => {
						console.log("CATCH serviceController::importProjects -> tablau login catch");
						return reject(loginErr);
					});

				});

			}).error( dbErr => {
				return reject(dbErr);
			});

		});

	}

};
