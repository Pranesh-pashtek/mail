const express = require("express");
const bodyParser = require("body-parser");
const nodemailer = require("nodemailer");
const cors = require("cors");


const app = express();

app.use(cors());
app.use(bodyParser.json());
app.use(bodyParser.urlencoded({ extended: false }));

app.get('/', (req, res) => {
  res.send('Hey this is my API running 🥳')
})

app.post("/api/form", (req, res) => {
  console.log(req.body);
  //Formating content to be send
  var emailcontent = `<h3> Contact Details</h3>
                     <ul>
                      <li>name: ${req.body.name}</li>
                      <li>email : ${req.body.email}</li>
                     </ul>
                     <h2>Message</h2>
                      <p>message: ${req.body.subject}</p>
                          `;
  var transporter = nodemailer.createTransport({
    service: "gmail",
    auth: {
      user: "funnyboy14143@gmail.com",
      pass: "lggz rsxp blqb motd"
    },
    tls: {
      rejectUnauthorized: false
    }
  });
  //Preparing the mailOptions object
  var mailOptions = {
    from: "funnyboy14143@gmail.com",
    to: "funnyboy14143@gmail.com",
    subject: "New Message",
    text: req.body.subject,
    html: emailcontent
  };
  //Sending email using transporter function
  transporter.sendMail(mailOptions, function(error, info) {
    if (error) {
      console.log(error);
      return res.send({
        result: false,
        message: "Mail Not sent"
      });
    } else {
      console.log("Email sent: " + info.response);
      return res.send({
        result: true,
        message: "Mail sent"
      });
    }
  });
  // return res.send({
  //   result: true,
  //   message: "Mail sent"
  // });
});
const PORT = process.env.PORT || 3001;
app.listen(PORT, () => {
  console.log(`server listening on port ${PORT}`);
});
