var express = require('express');
var router = express.Router();
const multer = require('../middleware/multer')
var propertyController = require('../Controllers/propertyController')



 
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


////property_is_for_sale
//localhost:4000/property/checkSale/:property_id/:user_id
router.put("/checkSale/:property_id/:user_id", propertyController.checkSale);

//localhost:4000/property/uncheckSale/:property_id/:user_id
router.put("/uncheckSale/:property_id/:user_id", propertyController.uncheckSale);

//muestra todas la propiedades de descubre
router.get("/descubre", propertyController.showAllDescubre);

//Trae todas las fotos de una propiedad
//localhost:4000/property/getImagesProperty/:property_id
router.get("/getImagesProperty/:property_id", propertyController.getImagesProperty);

//Mostrar TODAS las PROVINCIAS
//localhost:4000/property/allProvinces
router.get("/allProvinces", propertyController.allProvinces);

//Mostrar TODAS las CIUDADES según PROVINCIA
//localhost:4000/property/allCities/:province_id
router.get("/allCities/:province_id", propertyController.allCities )

//muestra todas la propiedades de descubre
router.get("/descubre", propertyController.showAllDescubre);

//Actualizar DIRECCIÓN PROPIEDAD
//localhost:4000/property/addPropertyAddress/:property_id/:province_id/:city_id
router.put("/addPropertyAddress/:property_id/:province_id/:city_id", propertyController.addAddress);

//Mostrar CARACTERÍSTICAS del Inmueble
//localhost:4000/property/allFeatures
router.get("/allFeatures", propertyController.allFeatures);

//Guardar Características
//localhost:4000/property/addFeaturesToProperty/:property_id
router.post("/addFeaturesToProperty/:property_id", propertyController.addFeaturesToProperty)

//Mostrar Características
//localhost:4000/property/getPropertyFeatures/:property_id
router.get("/getPropertyFeatures/:property_id", propertyController.getPropertyFeatures)

//Añade Imágenes a una Propiedad
//localhost:4000/property/addImgsProperty/:property_id
router.put("/addImgsProperty/:property_id", multer("property"), propertyController.addImgsProperty)


module.exports = router;