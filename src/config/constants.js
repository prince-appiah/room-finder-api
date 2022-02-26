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
};
