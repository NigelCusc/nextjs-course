const { PHASE_DEVELOPMENT_SERVER } = require('next/constants');

/** @type {import('next').NextConfig} */
module.exports = (phase) => {
  if (phase === PHASE_DEVELOPMENT_SERVER) {
    // Development
    return {
      reactStrictMode: true,
      env: {
        mongodb_host: 'localhost:27018',
        mongodb_cluster: '',
        mongodb_database: 'nextjsAuth',
        mongodb_username: 'nigelcuschieri',
        mongodb_password: 'examplePassword123!',
      },
    };
  }

  // PRODUCTION
  return {
    reactStrictMode: true,
    env: {
      mongodb_host: 'localhost:27018',
      mongodb_cluster: '',
      mongodb_database: 'nextjsAuth',
      mongodb_username: 'nigelcuschieri',
      mongodb_password: 'examplePassword123!',
    },
  };
};
