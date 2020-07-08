
function deleteAllImg()
{
	var path = require('path');
	var fs = require('fs');
	var files;
	var photos = path.join(process.cwd(), 'photos');
	fs.readdir(photos, function (err, files) {
    	if (err) {
        	return console.log('Unable to scan dir ' + err);
          delay(10);
    	} 
    	files.forEach(function (file) {
      		files=path.join(photos,file);
       		fs.unlinkSync(files);
    	});
	}); 
return true; 
}