const nodemailer = require('nodemailer');

const sendEmail = async (options) => {
  return new Promise((resolve, reject) => {
    const transporter = nodemailer.createTransport({
      service: process.env.EMAIL_SERVICE,
      auth: {
        user: process.env.EMAIL_USERNAME,
        pass: process.env.EMAIL_PASSWORD,
      },
    });

    const mailOptions = {
      from: process.env.EMAIL_FROM,
      to: options.to,
      subject: options.subject,
      html: options.html,
    };

    transporter.sendMail(mailOptions, (error, info) => {
      if (error) {
        console.log(`email couldnt be send: `, error);
        resolve(false);
      } else {
        console.log(`email sent:`, info);
        resolve(true);
      }
    });
  });
};

module.exports = sendEmail;
