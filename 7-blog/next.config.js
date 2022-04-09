const { PHASE_DEVELOPMENT_SERVER } = require('next/constants');

/** @type {import('next').NextConfig} */
module.exports = (phase) => {
  if (phase === PHASE_DEVELOPMENT_SERVER) {
    // Development
    return {
      reactStrictMode: true,
      env: {
        mongodb_host: '127.0.0.1:27018',
        mongodb_cluster: '',
        mongodb_database: 'blog',
        mongodb_username: 'nigelcuschieri',
        mongodb_password: 'examplePassword123!',
      },
    };
  }

  // PRODUCTION
  return {
    reactStrictMode: true,
    env: {
      mongodb_host: '127.0.0.1:27018',
      mongodb_cluster: '',
      mongodb_database: 'blog',
      mongodb_username: 'nigelcuschieri',
      mongodb_password: 'examplePassword123!',
    },
  };
};
