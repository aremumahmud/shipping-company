var nodemailer = require('nodemailer');

var transporter = nodemailer.createTransport({
  service: 'gmail',
  auth: {
    user: 'aremumahmud2003@gmail.com',
    pass: 'aremu2003'
  }
});

var mailOptions = {
  from: 'aremumahmud2003@gmail.com',
  to: 'aremumahmud2003@gmail.com',
  subject: 'Sending Email using Node.js',
  text: 'That was easy!'
};

transporter.sendMail(mailOptions, function(error, info){
  if (error) {
    console.log(error);
  } else {
    console.log('Email sent: ' + info.response);
  }
});