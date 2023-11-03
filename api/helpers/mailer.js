const nodemailer = require('nodemailer');
const { purchaseEmail, purchaseCoachingEmail, purchaseEntrenamientoEmail, bookingUpdateEmail, contactEmail } = require('./emailTemplates');
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

const sendPurchaseCoachingEmail = async (username, data, to) => {
  await transporter.sendMail({
    from: `"ANGELITA" <${process.env.EMAIL}>`,
    to,
    subject: `Gracias por tu compra`,
    html: purchaseCoachingEmail(data, username)
  }).catch((err) => {
    console.error('Something went wrong!', err)
  })
}

const sendPurchaseEntrenamientoEmail = async (username, data, to) => {
  await transporter.sendMail({
    from: `"ANGELITA" <${process.env.EMAIL}>`,
    to,
    subject: `Gracias por tu compra`,
    html: purchaseEntrenamientoEmail(data, username)
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

const sendContactEmail = async (username, data, to) => {
  await transporter.sendMail({
    from: `"ANGELITA" <${process.env.EMAIL}>`,
    to,
    subject: `Tienes un nuevo mensaje`,
    html: contactEmail(data, username)
  }).catch((err) => {
    console.error('Something went wrong!', err)
  })
}


module.exports = {
  transporter,
  sendPurchaseEmail,
  sendPurchaseCoachingEmail,
  sendPurchaseEntrenamientoEmail,
  sendBookingUpdateEmail,
  sendContactEmail,
};