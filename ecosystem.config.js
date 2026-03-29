module.exports = {
  apps: [
    {
      name: 'dar-chang',
      script: '.next/standalone/server.js',
      instances: 1,
      autorestart: true,
      watch: false,
      env: {
        NODE_ENV: 'production',
        PORT: 3000,
      },
    },
  ],
};
