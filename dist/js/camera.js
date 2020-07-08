var fs = require('fs');
var path = require('path');
var constraints = { video: { facingMode: "user" }, audio: false };
const cameraView = document.querySelector("#camera--view"),
    cameraOutput = document.querySelector("#camera--output"),
    cameraSensor = document.querySelector("#camera--sensor")

function cameraStart() {
    navigator.mediaDevices
        .getUserMedia(constraints)
        .then(function(stream) {
        track = stream.getTracks()[0];
        cameraView.srcObject = stream;
    })
    .catch(function(error) {
        console.error("Oops. Something is broken.", error);
    });
}

function cameraTrigger() {
    cameraSensor.width = cameraView.videoWidth;
    cameraSensor.height = cameraView.videoHeight;
    cameraSensor.getContext("2d").drawImage(cameraView, 0, 0);
    cameraOutput.src = cameraSensor.toDataURL("image/webp");
    console.log(cameraOutput.src);
    var img = cameraOutput.src;
    let base64String = img;
    let base64Image = base64String.split(';base64,').pop();
    var newDate = new Date();
    var day = 'resources/app/photos/'+newDate.getTime()+'.jpg';
    fs.writeFile(day, base64Image, {encoding: 'base64'}, function(err) {
    console.log('File created');
});
    cameraOutput.classList.add("taken");
};
window.addEventListener("load", cameraStart, false);

function sendto(){
        var files;
        var dirPath = path.join(process.cwd(), 'resources/app/photos');
        fs.readdir(dirPath, function (err, files) {
        if (err) {
            return console.log('Unable to scan dir ' + err);
        } 
        if(files.length)
            window.location.href = "gallery.html";
        else
            alert("At least single pic");
        });
}

window.addEventListener('keydown', function (e) {
       cameraTrigger();
});
