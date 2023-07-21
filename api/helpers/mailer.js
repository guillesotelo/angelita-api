const nodemailer = require('nodemailer');
const { welcomeEmail, purchaseEmail, bookingUpdateEmail, userUpdateEmail, passwordUpdateEmail, resetPasswordEmail } = require('./emailTemplates');
require('dotenv').config();

const transporter = nodemailer.createTransport({
  host: "smtp.gmail.com",
  port: 465,
  secure: true,
  auth: {
    user: process.env.EMAIL,
    pass: process.env.EMAIL_PASS,
  },
});

transporter.verify().then(() => {
  console.log("* Mailing ready *")
})

const sendWelcomeEmail = async (username, password, to) => {
  await transporter.sendMail({
    from: `"ANGELITA" <${process.env.EMAIL}>`,
    to,
    subject: `Gracias por ser parte`,
    html: welcomeEmail(username, to, password)
  }).catch((err) => {
    console.error('Something went wrong!', err)
  })
}

const sendPurchaseEmail = async (username, data, to) => {
  await transporter.sendMail({
    from: `"ANGELITA" <${process.env.EMAIL}>`,
    to,
    subject: `Gracias por tu compra`,
    html: purchaseEmail(data, username)
  }).catch((err) => {
    console.error('Something went wrong!', err)
  })
}

const sendBookingUpdateEmail = async (username, data, to) => {
  await transporter.sendMail({
    from: `"ANGELITA" <${process.env.EMAIL}>`,
    to,
    subject: `Cambios en tu reserva`,
    html: bookingUpdateEmail(data, username)
  }).catch((err) => {
    console.error('Something went wrong!', err)
  })
}

const sendDataUpdateEmail = async (username, password, to) => {
  await transporter.sendMail({
    from: `"ANGELITA" <${process.env.EMAIL}>`,
    to,
    subject: `Tus datos fueron actualizados`,
    html: userUpdateEmail(username, to, password)
  }).catch((err) => {
    console.error('Something went wrong!', err)
  })
}

const sendPasswordUpdateEmail = async (username, encryptedEmail, to) => {
  await transporter.sendMail({
    from: `"ANGELITA" <${process.env.EMAIL}>`,
    to,
    subject: `Tu contraseña fué actualizada`,
    html: passwordUpdateEmail(username, encryptedEmail)
  }).catch((err) => {
    console.error('Something went wrong!', err)
  })
}

const sendPasswordResetEmail = async (username, encryptedEmail, to) => {
  await transporter.sendMail({
    from: `"ANGELITA" <${process.env.EMAIL}>`,
    to,
    subject: `Actualización de contraseña`,
    html: resetPasswordEmail(username, encryptedEmail)
  }).catch((err) => {
    console.error('Something went wrong!', err)
  })
}

module.exports = {
  transporter,
  sendWelcomeEmail,
  sendPurchaseEmail,
  sendDataUpdateEmail,
  sendPasswordUpdateEmail,
  sendPasswordResetEmail,
  sendBookingUpdateEmail
};