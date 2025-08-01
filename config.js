const dotenv = require('dotenv');
const env = process.env.NODE_ENV || 'dev';
dotenv.config({ path: `./config/.env.${env}` });  // path relative to project root

module.exports = {
  port: process.env.PORT || 3000,
  db: {
    host: process.env.DB_HOST,
    user: process.env.DB_USER,
    password: process.env.DB_PASS,
    name: process.env.DB_NAME,
  },
};
