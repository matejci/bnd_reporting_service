#Book-n-Drive reporting service documentation

###Description
BnD Reporting Service is a service used for parsing .csv report files and importing its data to Crate database, which is used by Grafana for various reports and analytics.

###Prerequisites
- Linux OS
- Crate.IO ver 1.0.3 (will probably work with earlier versions - not tested)
- NodeJS   ver 7.5.0 (will probably work from version 6+ - not tested)
- inotify-tools (https://github.com/rvoicilas/inotify-tools/wiki)

###BnD service components
- jMeter tests results - files generated when running jMeter tests in non-GUI mode
-	watcher - inotify interface script which 'listens' for changes in specified folder
-	NodeJS app - used for parsing .csv files (jMeter test results) and importing content to Crate DB.

###How to set it up & running?
- Install all prerequisites
- Clone repo: `git clone https://github.com/toxipat/bnd_reporting_service.git`
- cd into root folder of the app
- Run `npm install`
- Make sure Crate service is started.
- Create new table `reporting.jmeter_results` (find sql script in `../db/sql_scripts/create_table.sql`)
- Adjust directory paths*
- Run `watcher.sh` shell script (find it in `../scripts/watcher.sh`)
- Run node app `npm start`
- You've set up `bnd_reporting_service`, now you can run your jMeter scripts.

###*Adjusting directory paths
- in `../config/common.js` file adjust `'ENV.LOCAL.MOVE_FILE_DESTINATION'` attribute. This value sets the path where generated .csv file is moved once it is processed.
- in `../scripts/watcher.sh` file adjust 'results_path'. This path is used by `watcher.sh` script to 'listen' for changes in directory and acts accordingly...
  'results_path' represents directory in which jMeter test results files are generated, when invoking tests in non-GUI mode.
