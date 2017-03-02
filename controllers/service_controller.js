
'use strict';

module.exports = {

	loadModules: function() {

		const fs = require('fs');
		const csv = require('fast-csv');
		const crypto = require('crypto');
		const db = require('../db/crate');
		const config = require('../config/common');

		return {
			fs: fs,
			csv: csv,
			db: db,
			crypto: crypto,
			config: config
		};
	},

	parseFile: function(file_path) {

		const modules = this.loadModules();
		const self = this;

		let records = [];
		let errors = [];

		return new Promise( (resolve, reject) => {

			file_path = '/home/matejci/bookanddrive/apache-jmeter-3.1/bin/results/user_roles_test.csv';
			let stream = modules.fs.createReadStream(file_path);

			stream.on('error', () => {
				let error = `File ${file_path} doesn't exists!`;
				errors.push(error);
				reject(errors);
			});

			modules.csv.fromStream(stream, { headers: true })
			.on('data-invalid', (invData) => {
				console.log("Invalid data: ", invData);
			})
			.on('data', (data) => {
				records.push(data);
			})
			.on('end', () => {
				console.log("Done");
				resolve(self.parseRecords(records));
			});

		});

	},

	parseRecords: function(records) {

		const crypto = this.loadModules().crypto;
		const crate = this.loadModules().db;
		let parsed_records = [];

		return new Promise( (resolve, reject) => {

			records.map( (rec) => {
				let parsed_rec = {};
				parsed_rec.uuid = crypto.randomBytes(8).toString("hex");
				parsed_rec.test_name = rec.label;
				parsed_rec.test_run_at = rec.timeStamp;
				parsed_rec.elapsed = rec.elapsed;
				parsed_rec.response_code = rec.responseCode;
				parsed_rec.response_message = rec.responseMessage;
				parsed_rec.thread_name = rec.threadName;
				parsed_rec.data_type = rec.dataType;
				parsed_rec.success = rec.success;
				parsed_rec.failure_message = rec.failureMessage;
				parsed_rec.bytes = rec.bytes;
				parsed_rec.sent_bytes = rec.sentBytes;
				parsed_rec.grp_threads = rec.grpThreads;
				parsed_rec.all_threads = rec.allThreads;
				parsed_rec.latency = rec.Latency;
				parsed_rec.idle_time = rec.IdleTime;
				parsed_rec.connect = rec.Connect;
				parsed_rec.created_at = new Date();
				parsed_rec.updated_at = new Date();

				crate.insert('reporting.jmeter_results', parsed_rec).then(function(data) {
					resolve(data);
				}).catch(function(catchErr) {
					console.log("catch", catchErr);
					reject(catchErr);
				});

			});

		});
	},

	moveFile: function(source) {
		let destination = this.loadModules().config.ENV.LOCAL.MOVE_FILE_DESTINATION;

		let source_arr = source.split('/');
		destination += source_arr[source_arr.length-1];

		console.log("destination", destination);


		let fs = this.loadModules().fs;

		return new Promise( (resolve, reject) => {
			fs.rename(source, destination, (err) => {
				if (err) {
					console.log("Error while moving file: ", err);
					reject(err);
				}
				resolve("File moved.");
			})
		});
	}

};
