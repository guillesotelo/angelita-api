const nodemailer = require('nodemailer');
const { purchaseEmail, bookingUpdateEmail } = require('./emailTemplates');
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


module.exports = {
  transporter,
  sendPurchaseEmail,
  sendBookingUpdateEmail
};