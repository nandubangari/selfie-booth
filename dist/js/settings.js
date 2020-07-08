require ('custom-env').env('staging')
const crypto = require('crypto');
const nodemailer = require('nodemailer');
var fs= require("fs");
function decrypt(encryptedPass,ivr,keyr) {
 let encryptedText = Buffer.from(encryptedPass,'hex');
 let iv = Buffer.from(ivr,'hex');
 let decipher = crypto.createDecipheriv('aes-256-cbc', Buffer.from(keyr, 'hex'), iv);
 let decrypted = decipher.update(encryptedText);
 decrypted = Buffer.concat([decrypted, decipher.final()]);
 return decrypted.toString();
}

function encrypt(text,iv,key) {
 	let cipher = crypto.createCipheriv('aes-256-cbc', Buffer.from(key), iv);
 	let encrypted = cipher.update(text);
 	encrypted = Buffer.concat([encrypted, cipher.final()]);
 	return encrypted.toString('hex');
}

function config()
{
	if(process.env.email!=undefined)
	{
		document.getElementById('pemail').innerHTML=process.env.email;
		document.getElementById('ppass').innerHTML=decrypt(process.env.pass,process.env.iv,process.env.key);
	}
}

async function saveEmail()
{
	var mail= document.getElementById('Email').value;
	var pass= document.getElementById('EmailPass').value;
	var loading= document.getElementById('loading');
	document.getElementById('warn').innerHTML="";
	loading.src="..\\img\\Curve-Loading.gif"
	loading.style.width="50px"
	loading.style.height="50px"
	let promise = new Promise((resolve, reject) => {
	console.log("Sendinngggg")
	var toMail = mail
    var fromMail = mail
  	var transporter = nodemailer.createTransport({
    	service: 'gmail',
   		auth: {
        user: mail,
        pass: pass
    	}
	});

	var mailOptions = {
    	from: fromMail,
    	to: toMail,
    	subject: "photobooth account added",
    	text: "photobooth"
	};

	transporter.sendMail(mailOptions, (error, response) => {
    	if (error) {
        	console.log(error)
        	resolve(false);	
    	}
    	else
    	{
    		console.log("sent")
        	resolve(true)
     	}  
	});
	});
	var check= await promise;
	if(check==true)
	{
		var hash=encrypt(pass,Buffer.from(process.env.iv,'hex'),Buffer.from(process.env.key,'hex'))
 		fs.appendFile('.env',"\r\nemail="+mail,function(err){});
		fs.appendFile('.env',"\r\npass="+hash,function(err){});
 		document.getElementById("flip-card").className += "click";
  		var el=document.getElementById("flip-card-inner")
		el.style.transform="";  
 		document.getElementById('pemail').innerHTML=mail
		document.getElementById('ppass').innerHTML=pass
	}
	if(check==false)
	{
		document.getElementById('warn').innerHTML="Pasword or mail maybe incorrect or please enable less secure apps in gmail";
	}
	loading.src=""
		loading.style.width=""
		loading.style.height=""
}


