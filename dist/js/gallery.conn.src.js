function addimges(callback) {
var path = require('path');
var fs = require('fs');
var photos = path.join(process.cwd(), 'resources/app/photos');
fs.readdir(photos, function (err, files) {
    if (err) {
        return console.log('Unable to scan dir ' + err);
    } 
    files.forEach(function (file) {
        addimg(file);
    });
   callback();
});
function addimg(file)
	{
    var ima = path.join(photos,file);
        console.log(ima);
		var img = document.createElement("img");
        img.src=ima;
        img.height=200;
        img.width= 348;
        var li =document.createElement('li');
        li.class="col-xs-6 col-sm-4 col-md-3";
        var a = document.createElement('a');
        var ul = document.getElementById('lightgallery');
        li.setAttribute("data-responsive",ima+' 375, '+ima+' 800');
        li.setAttribute("data-src",ima);
        a.appendChild(img);
        li.appendChild(a);
        ul.appendChild(li);
	}

}
function editor(){}
