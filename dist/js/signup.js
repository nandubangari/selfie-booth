const crypto = require('crypto');
const algorithm = 'aes-256-cbc';
const key = crypto.randomBytes(32);
const iv = crypto.randomBytes(16);
var fs= require("fs");
require ('custom-env').env('staging')
function checkpassword()
{
	var pass= document.getElementById('password').value;
	var repass= document.getElementById('repassword').value;
	if(pass==repass)
	{
		document.getElementById('warning').style="color:green;"
		document.getElementById('warning').innerHTML="Password matched"
		return true
	}
	else
	{
		document.getElementById('warning').style="color:red;"
		document.getElementById('warning').innerHTML="password doesn't match"
		return false
	}
}

function encrypt(text,iv,key) {
 	let cipher = crypto.createCipheriv('aes-256-cbc', Buffer.from(key), iv);
 	let encrypted = cipher.update(text);
 	encrypted = Buffer.concat([encrypted, cipher.final()]);
 	return encrypted.toString('hex');
}


function signup()
{	
	var name= document.getElementById('name').value;
	var username= document.getElementById('username').value;
	var pass= document.getElementById('password').value;
	var check=checkpassword()
	var hash;
	if(check==true)
	{	
		document.getElementById('warning').style="color:green;"
		document.getElementById('warning').innerHTML="Signup sucess"
		var hash= encrypt(pass,iv,key)
		fs.appendFile('.env',"\r\nname="+name,function(err){});
		fs.appendFile('.env',"\r\nusernamer="+username,function(err){});
		fs.appendFile('.env',"\r\niv="+iv.toString('hex'),function(err){});
 		fs.appendFile('.env',"\r\nsetup=1",function(err){});
 		fs.appendFile('.env',"\r\nadpass="+hash,function(err){});
 		fs.appendFile('.env',"\r\nkey="+key.toString('hex'),function(err){ window.location.href = "login.html";});
	}
}
