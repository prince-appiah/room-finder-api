const Mailgun = require("mailgun.js");
const formData = require("form-data");
const { mailGun } = require("./constants");
const { captureException } = require("@sentry/node");

const mg = new Mailgun(formData);
const mailgunClient = mg.client({
  username: "api",
  key: mailGun.API_KEY,
});
const domain = mailGun.DOMAIN;

class MailConfig {
  constructor() {}

  static async sendMail(data) {
    try {
      return await mailgunClient.messages.create(domain, data);
    } catch (error) {
      captureException(error);
      console.log("error sending mail: ", error);
    }
  }

  // TODO replace "to" with real user email
  static async sendOtpToUser(otp, user) {
    let msg = {
      from: "Shelter Notifications <adming@shelter.com>",
      to: "pappiah00@gmail.com",
      // to: `${user.email}`,
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

  static async sendWelcomeMessageToUser(user) {
    let msg = {
      from: "Shelter Notifications <adming@shelter.com>",
      to: "pappiah00@gmail.com",
      // to: `${user.email}`,
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
