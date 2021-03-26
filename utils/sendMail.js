const nodemailer = require('nodemailer');
const sendInBlue = require('nodemailer-sendinblue-transport');

exports.sendVerificationMail = async (email, url) => {
  const transporter = nodemailer.createTransport(
    sendInBlue({
      apiKey: process.env.V2_API_KEY,
    })
  );
  const res = await transporter.sendMail({
    to: email,
    fromName: 'ExpressTeams',
    from: 'noreply@expressTeams.in',
    subject: 'Welcome to ExpressTeams!',
    text: `Please click on this url to verify your account\n${url}`,
  });
  console.log(res);
};

exports.sendResetPasswordMail = async (email, url) => {
  const transporter = nodemailer.createTransport(
    sendInBlue({
      apiKey: process.env.V2_API_KEY,
    })
  );
  await transporter.sendMail({
    to: email,
    fromName: 'ExpressTeams',
    from: 'noreply@expressteams.in',
    subject: 'Reset your ExpressTeams password',
    text: `Please click on this url to reset your password.\n${url}\nIf you didn't request this, then you can ignore this email.`,
  });
};
