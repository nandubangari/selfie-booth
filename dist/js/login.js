require('dotenv').config();
const crypto = require('crypto');
function decrypt(encryptedPass,ivr,key) {
 let encryptedText = Buffer.from(encryptedPass,'hex');
 let iv = Buffer.from(ivr,'hex');
 let decipher = crypto.createDecipheriv('aes-256-cbc', Buffer.from(key, 'hex'), iv);
 let decrypted = decipher.update(encryptedText);
 decrypted = Buffer.concat([decrypted, decipher.final()]);
 console.log(decrypted.toString())
 return decrypted.toString();
}
function checkDetials(username,password)
{
  if((username==process.env.usernamer)&&(password==decrypt(process.env.adpass,process.env.iv,process.env.key)))
  {
    return true
  } 
}
async function signin()
{
	var username= document.getElementById('username').value;
	var pass= document.getElementById('password').value;
  var check=checkDetials(username,pass)

  if(check==true)
    window.location.href = "Settings.html";
  else
  	{
  		document.getElementById('warning').style="color:red;"
		  document.getElementById('warning').innerHTML="password or username doesn't match"
  	}
}

