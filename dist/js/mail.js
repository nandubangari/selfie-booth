require ('custom-env').env('staging')
const crypto = require('crypto');
var fs= require("fs");
var photo=process.cwd();
const nodemailer = require('nodemailer');
var toMail ='';
var mailOptions ='';
var stat = ''; 
let fromMail = process.env.email;
let subject  = 'Photo Booth Bot';
let text = "attachments are added" 
function decrypt(encryptedPass,ivr,keyr) {
 let encryptedText = Buffer.from(encryptedPass,'hex');
 let iv = Buffer.from(ivr,'hex');
 let decipher = crypto.createDecipheriv('aes-256-cbc', Buffer.from(keyr, 'hex'), iv);
 let decrypted = decipher.update(encryptedText);
 decrypted = Buffer.concat([decrypted, decipher.final()]);
 return decrypted.toString();
}

const transporter = nodemailer.createTransport({
    service: 'gmail',
    auth: {
        user: process.env.email,
        pass: decrypt(process.env.pass,process.env.iv,process.env.key)
    }
});

// email optins
function sendMail()
{

toMail = document.getElementById('data').value;
mailOptions = {
    from: fromMail,
    to: toMail,
    subject: subject,
    text: text,

    attachments: [
                {   // file on disk as an attachment
            filename: 'photo.zip',
            path: photo+'resources/app/photoZip/photo.zip' // stream this file
        }
        ]
};
sendMailr();
}


function sendMailr(){
// send email

console.log(process.env.email)
console.log(decrypt(process.env.pass,process.env.iv,process.env.key))
stat = document.getElementById('myImage');
stat.src = "../img/Curve-Loading.gif";
stat.width = "50";
stat.height = "50";
transporter.sendMail(mailOptions, (error, response) => {
    if (error) {
          stat = document.getElementById('myImage');
    stat.src = "../img/wro.gif";
        stat.width = "50";
        stat.height = "50";
       
        console.log(error);

    }
    else{
    console.log(response);
    stat = document.getElementById('myImage');
    stat.src = "../img/tik.gif";
        stat.width = "50";
        stat.height = "50";
     }  
});


}
