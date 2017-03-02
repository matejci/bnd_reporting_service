
'use strict';

const CONFIG = {

  NODE_ENV: {
    LOCAL: 'local',
    DEV: 'development',
    STG: 'staging',
    PROD: 'production'
  },

  ENV: {
    LOCAL: {
      CRATE_HOST: 'localhost',
      CRATE_PORT: '4200',
      MOVE_FILE_DESTINATION: '/home/matejci/'
    },
    DEV: {

    },
    STG: {

    },
    PROD: {

    }
  }

};

module.exports = CONFIG;
