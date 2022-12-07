const Mailgun = require("mailgun.js");
const nodemailer = require("nodemailer");
const formData = require("form-data");
const { mailGun, mail } = require("./constants");
const { captureException } = require("@sentry/node");

const mg = new Mailgun(formData);
const mailgunClient = mg.client({
  username: "api",
  key: mailGun.API_KEY,
});
const domain = mailGun.DOMAIN;

let transporter = nodemailer.createTransport({
  host: "smtp.gmail.com",
  service: "gmail",
  port: 465,
  secure: false,
  auth: {
    // TODO replace user with company email
    user: mail.EMAIL,
    pass: mail.PASSWORD,
  },
});

class MailConfig {
  constructor() {}

  static async sendMail(mailOptions) {
    try {
      const response = await transporter.sendMail(mailOptions);

      return response;
    } catch (error) {
      console.log("error sending mail: ", error);
      captureException(error);
    }
  }

  // TODO replace "to" with real user email
  static async sendOtpToUser(otp, user) {
    let msg = {
      from: "Shelter Notifications <admin@shelter-three.vercel.app>",
      to: `${user.email}`,
      subject: "Shelter Login Code",
      html: `
            <html>
                <body>
                    <div style="text-align: center;">
                        <p>Hello ${user.firstname},</p>
                        </br>
                        <p>To complete the sign in, enter the login code below</p>
                        </br>
                        <p>Your OTP Code is: <strong>${otp}</strong></p>
                        </br>
                    </div>    
                </body>
            </html>
            `,
    };

    return this.sendMail(msg);
  }

  static async sendOtpToUserAfterSignup(otp, user) {
    let msg = {
      from: "Shelter Notifications <admin@shelter-three.vercel.app>",
      to: `${user.email}`,
      subject: "Shelter Login Code",
      html: `
            <html>
                <body>
                    <div style="text-align: center;">
                        <p>Hello ${user.firstname},</p>
                        </br>
                        <p>We received your details and your account has been created successfully.</p>
                        <p>Click on the link below to access your dashboard</p>
                        </br>
                        
                        <p>Your OTP Code is: <strong>${otp}</strong></p>
                        </br>
                    </div>    
                </body>
            </html>
            `,
    };

    return this.sendMail(msg);
  }

  static async sendWelcomeMessageToUser(user) {
    let msg = {
      from: "Shelter Notifications <admin@shelter-three.vercel.app>",
      to: `${user.email}`,
      subject: "Yayy! Welcome to Shelter 🎉",
      html: `
            <html>
                <body>
                    <div>
                        <p>Hi ${user.firstname},</p> 
                        <p>I really appreciate you choosing to use Shelter</p>
                        <p>By the way, over the next couple of days, we'll be sending you a few more
                        emails to help you get maximum value from Shelter. We'll be sharing some tips,
                        checking in with you and showing you the best you can get from using our platform. </p>
                        </br>
                        <p>Thanks,</p>
                        <p>Prince</p>
                        <p>CEO, Shelter</p>
                        </br>
                    </div>    
                </body>
            </html>
            `,
    };

    return this.sendMail(msg);
  }
}

module.exports = MailConfig;
