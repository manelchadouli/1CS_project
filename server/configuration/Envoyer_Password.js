//const { text } = require('body-parser');
const nodemailer = require('nodemailer');
require("dotenv").config({ path: "../../../.env" });

///**********************Send mail****************** */
var mail = {
    sendMail: function(email, password) {
        console.log(process.env.GMAIL)
        var transporter = nodemailer.createTransport({
            host: 'smtp.gmail.com',
            port: 465,
            secure: true,
            auth: {
                user: "Pm.ScrumDev@gmail.com",
                pass: "pfe1#2#3#4#5#@"
            }
        });
        var mailOptions = {
            from: "Pm.ScrumDev@gmail.com",
            to: email,
            subject: 'your PFE Password',
            text: password
        };
        transporter.sendMail(mailOptions, function(err, data) {
            if (err)
                throw err
        });
    }
}
module.exports = mail;
// mail.sendMail("s.beloufa@esi-sba.dz", "123456789///");