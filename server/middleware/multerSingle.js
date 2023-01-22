const multer = require("multer");
function uploadImage(folder) {
  const storage = multer.diskStorage({
    
    destination: `../client/./public/images/${folder}`,
    //destination: `./public/images/${folder}`,

    filename: function (req, file, callback) {
      console.log(file);
      callback(null, "Id-" + Date.now() + "-" + file.originalname);
    },
  });

  const upload = multer({ storage: storage }).single("file");
  

  return upload;
}

module.exports = uploadImage;