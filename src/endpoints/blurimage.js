const cv = require('opencv4nodejs');

function blurimage(req, res) {
    // const image = cv.imread('/Users/sofiaalberti/tesis/ediga-api/src/endpoints/0.jpeg');
    const image = cv.imread('/Users/sofiaalberti/tesis/ediga-api/src/endpoints/young.jpeg');
    const classifier = new cv.CascadeClassifier(cv.HAAR_FRONTALFACE_ALT2);
    const { objects, numDetections } = classifier.detectMultiScale(image.bgrToGray());
    // image.drawRectangle('rect', new cv.Vec(0, 0, 255), 'thickness', cv.LINE_8);

    for (const object of objects) {
        image.drawRectangle(object, new cv.Vec(0, 255, 0), 2, cv.LINE_8);
    }
    cv.imshowWait('face detection', image);
    // cv.imwrite('/0.jpeg');

    res.status(200).json();
}

module.exports = blurimage;
