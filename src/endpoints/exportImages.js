var { imageToBase64, base64ToImage } = require("base64-2-img");
const db = require("../db.js");
const Photo = db.Photo;

async function exportImages(req, res) {
  const photos = await Photo.findAll({});
  // For each photo save the base64 string to a file with the photoId as the filename
  photos.forEach(item => {
    const { photoId, photo } = item;
    base64ToImage(photo, { filePath: "/Users/martinafont/Dev/Fing/EdigaDatos", fileName: photoId }); // success and create a file at temp/img.png or temp/img.jpg.
  }
  );
  res.status(200).json({
    message: "Images exported"
  });
}

module.exports = exportImages;