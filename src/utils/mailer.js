require('dotenv').config();
const nodemailer = require('nodemailer');
const env = process.env;

let transport = nodemailer.createTransport({
  service: env.EMAIL_PROVIDER,
  auth: {
    user: env.EMAIL_USER,
    pass: env.EMAIL_PASS
  }
});

let mailOption = {
  from: 'wooky92@naver.com',
  to: 'yangwookee@gmail.com',
  subject: 'SUBJECT',
  html: '<div>To use HTML</div>',
  text: 'To use TEXT'
};

transport.sendMail(mailOption, (err, info) => {
  if (err) {
    console.log('nodemailer error: ' + err);
  } else {
    console.log('nodemailer info: ' + info);
  }
});
