const zipFolder = require('zip-a-folder');
var path = require('path');

function zipsrs()
{
var photos = path.join(process.cwd(), 'resources/app/photos');
var fi = path.join(process.cwd(), 'resources/app/photosZip/photos.zip');
class ZipAFolder {
    static main(excut) {
        zipFolder.zipFolder(photos,fi, function(err) {
            if(err) {
                console.log('Something went wrong!', err);
            }
            console.log(excut);
        });
    }
}

ZipAFolder.main("excut");
  return "zip complete";

}
