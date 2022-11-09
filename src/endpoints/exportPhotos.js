var { imageToBase64, base64ToImage } = require("base64-2-img");
const db = require("../db.js");
const Photo = db.Photo;

// Exports all photos stored in database to local folder in system. 
// Note: PATH to local folder is hardcoded in the function.

async function exportImages(req, res) {
  const photos = await Photo.findAll({});
  // For each photo save the base64 string to a file with the photoId as the filename
  photos.forEach(item => {
    const { photoId, photo } = item;
    base64ToImage(photo, { filePath: "/Users/sofiaalberti/Desktop/TEST", fileName: photoId }); // success and create a file at temp/img.png or temp/img.jpg.
  });
  res.status(200).json({
    message: "Images exported"
  });
}

module.exports = exportImages;
