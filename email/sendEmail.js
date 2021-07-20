
const nodemailer = require("nodemailer");

sendEmail = async (input) => {
  console.log('email sending')
  var transporter = nodemailer.createTransport({
    host: process.env.HOST,
    port: 465,
    secure: true, // true for 465, false for other ports
    auth: {
      user: process.env.EMAIL_USER, 
      pass: process.env.EMAIL_PASS,
    },
  });
  
  var mailOptions = {
    from: `New Email From Website ${process.env.EMAIL_FROM}`, // sender address
    to: `${input.to}, ${process.env.OHTECHMAIL}`, // list of receivers
    subject:`${input.fullname}`, // Subject line
    html: `
      <div>
          <h3>New Email From Website Contact Form</h3>
          <br/>
          <div><b>Name:</b> ${input.fullname}<br/></div>
          <div><b>Phone:</b> ${input.phone}<br/></div>
          <div><b>Email:</b> ${input.email}<br/></div>
          ${input.service.length > 3 ? `<div><b>Service:</b> ${input.service}<br/><br/></div>` : "<br/>"}
          <div><b>Message</b><br/>
            ${input.comment}
          </div>
      </div>
      `,
  };

  transporter.sendMail(mailOptions, function(error, info){
    if (error) {
      console.log(error);
    } else {
      console.log('Email sent: ' + info.response);
    }
  });
};


module.exports = { sendEmail }