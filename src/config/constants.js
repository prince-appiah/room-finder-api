const USER = process.env.DB_USER;
const PASS = process.env.DB_PASSWORD;
const CLUSTER = process.env.DB_CLUSTER;
const NAME = process.env.DB_NAME;

module.exports = {
  roles: {
    HOST: "host",
    ADMIN: "admin",
    USER: "user",
  },
  mailGun: {
    API_KEY: process.env.MAILGUN_API_KEY,
    DOMAIN: process.env.MAILGUN_DOMAIN,
    URL: process.env.MAILGUN_URL,
  },
  db: {
    URL: `mongodb+srv://${USER}:${PASS}@${CLUSTER}/${NAME}?retryWrites=true&authSource=admin&w=majority`,
  },
  mail: {
    EMAIL: process.env.AUTH_EMAIL,
    PASSWORD: process.env.AUTH_PASSWORD,
  },
};
