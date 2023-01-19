var express = require('express');
var router = express.Router();
var userController = require('../Controllers/userController')
const multer = require("../middleware/multer");
const multerSingle = require("../middleware/multerSingle");


//localhost:4000/users

//-Trae la imagenes  de una propiedad
//localhost:4000/users/imgOneProperty/:image_property_id 
router.get("/imgOneProperty/:image_property_id", userController.imgOneProperty);

//localhost:4000/users/addImgs/:image_property_id
router.post("/addImgs/:image_property_id", multer("property") , userController.addImgs);

//localhost:4000/users/deletePhoto/:image_id
 router.delete("/deletePhoto/:image_id", userController.deletePhoto);


 //localhost:4000/users/mainImage/:image_id
router.put("/mainImage/:image_id", userController.mainImage);
 



module.exports = router;
