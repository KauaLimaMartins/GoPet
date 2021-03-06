module.exports = {
  host: process.env.MAIL_HOST,
  port: process.end.MAIL_PORT,
  secure: false,
  auth: {
    user: process.env.MAIL_USER,
    pass: process.env.MAIL_PASS,
  },
  default: {
    from: 'Equipe Gobarber <noreply@gobarber.com>',
  },
};
