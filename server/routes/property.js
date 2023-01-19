var express = require('express');
var router = express.Router();
var propertyController = require('../Controllers/propertyController')
const multer = require("../middleware/multer");
const multerSingle = require("../middleware/multerSingle");


// localhost:4000/property






 
////////////////////////////////////////////////////////////////////////////////////////////////
// localhost:4000/property

//Ver todos los TIPOS de Inmueble
//localhost:4000/property/allTypes
router.get("/allTypes", propertyController.showAllTypes)

//Ver todos los SUBTIPOS de Inmueble
//localhost:4000/property/allSubTypes/:type_id
router.get("/allSubTypes/:type_id", propertyController.showAllSubTypes);

//Crear Propiedad
//localhost:4000/property/createProperty/:property_user_id/:property_subtype_id
router.post("/createProperty/:property_user_id/:property_subtype_id", propertyController.createProperty);

//Ver todos los TIPOS de cocina
//localhost:4000/property/allKitchens
router.get("/allKitchens", propertyController.allKitchens)

//localhost:4000/property/addBasicFeaturesToProperty/:property_kitchen_id
router.put("/addBasicFeaturesToProperty/:property_id/:property_kitchen_id", propertyController.addBasicFeaturesToProperty);

































//localhost:4000/property/createProperty
router.post("/createProperty/:property_address_id/:property_subtype_id/:property_kitchen_id/:property_rent_id", propertyController.createProperty);

//-Trae la imagenes  de una propiedad
//localhost:4000/property/imgOneProperty/:image_property_id 
router.get("/imgOneProperty/:image_property_id", propertyController.imgOneProperty);

//localhost:4000/property/addImgs/:image_property_id
router.post("/addImgs/:image_property_id", multer("property") , propertyController.addImgs);

//localhost:4000/property/deletePhoto/:image_id
 router.delete("/deletePhoto/:image_id", propertyController.deletePhoto);


 //localhost:4000/property/mainImage/:image_id
router.put("/mainImage/:image_id", propertyController.mainImage);


module.exports = router;