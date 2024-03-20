import nodemailer from 'nodemailer'
import { mail } from '../../config'

const transporter = nodemailer.createTransport({
    service: "Gmail",
    host: "smtp.gmail.com",
    port: 465,
    secure: true,
    auth: mail,
});

export const sendMail = ({
  toEmail,
  subject,
  content
}) => new Promise((resolve, reject) => {
  transporter.sendMail({
    from: mail.user, // sender address
    to: toEmail, // list of receivers
    subject: subject, // Subject line
    html: content
  }, (err, info) => {
    if (err) {
      return reject(err)
    }
    return resolve(info)
  })
})