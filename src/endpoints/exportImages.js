var { imageToBase64, base64ToImage } = require("base64-2-img");
const db = require("../db.js");
const Photo = db.Photo;

async function exportImages(req, res) {
  const photos = await Photo.findAll({});
  var first = true;
  // For each photo save the base64 string to a file with the photoId as the filename
  photos.forEach(photo => {
    console.log("entra")
    const { photoId, base64String } = photo;
    console.log("base 64 string", base64String)
    // Check if base64 is of type Buffer
    var buffer = Buffer.from(base64String, 'utf-8');
    console.log("buffer", buffer);
    base64ToImage(buffer, { filePath: "/Users/martinafont/Dev/Fing/EdigaDatos", fileName: photoId }); // success and create a file at temp/img.png or temp/img.jpg.
  }
  );
  res.status(200).json({
    message: "Images exported"
  });
}

module.exports = exportImages;