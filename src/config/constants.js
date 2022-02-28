module.exports = {
  roles: {
    HOST: "host",
    ADMIN: "admin",
    USER: "user",
  },
  mailGun: {
    API_KEY: process.env.MAILGUN_API_KEY,
    DOMAIN: process.env.MAILGUN_DOMAIN,
  },
  db: {
    USER: process.env.DB_USER,
    PASS: process.env.DB_PASSWORD,
    NAME: process.env.DB_NAME,
    URL: `mongodb+srv://${USER}:${PASS}@sheltercluser.khpt7.mongodb.net/${NAME}?retryWrites=true&w=majority`,
  },
};
