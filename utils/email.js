const nodemailer = require("nodemailer");
const { EMAIL_PASSWORD, EMAIL_USER } = process.env;

// const sendEmail = async (options) => {
const mail = nodemailer.createTransport({
  service: "gmail",
  auth: {
    user: EMAIL_USER,
    pass: EMAIL_PASSWORD,
  },
});

//   const mailOptions = {
//     from: "Natours Firm <natours@io.com>",
//     to: options.email,
//     subject: options.subject,
//     text: options.message,
//   };

//   await transport.sendMail(mailOptions);
// };

// module.exports = sendEmail;

var mailOptions = {
  from: EMAIL_USER,
  to: "oloruntobiolutola@gmail.com",
  subject: "Sending Email via Node.js",
  text: "That was easy!",
};

mail.sendMail(mailOptions, function (error, info) {
  if (error) {
    console.log(error);
  } else {
    console.log("Email sent: " + info.response);
  }
});
// const send = async () => await transport.sendMail(mailOptions);
// const response = send();
// console.log(response);
