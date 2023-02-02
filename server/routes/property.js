var express = require('express');
var router = express.Router();
const multer = require('../middleware/multer')
var propertyController = require('../Controllers/propertyController');

// localhost:4000/property

//Ver todos los TIPOS de Inmueble
//localhost:4000/property/allTypes
router.get("/allTypes", propertyController.showAllTypes);


//Ver todos los SUBTIPOS de Inmueble
//localhost:4000/property/allSubTypes/:type_id
router.get("/allSubTypes/:type_id", propertyController.showAllSubTypes);

//Crear Propiedad

//localhost:4000/property/createProperty/:property_user_id/:property_subtype_id
router.post("/createProperty/:property_user_id/:property_subtype_id", propertyController.createProperty);

//Ver todos los TIPOS de cocina
//localhost:4000/property/allKitchens
router.get("/allKitchens", propertyController.allKitchens);

//Añadir un tipo de cocina a una propiedad
//localhost:4000/property/addBasicFeaturesToProperty/:property_kitchen_id
router.put("/addBasicFeaturesToProperty/:property_id/:property_kitchen_id", propertyController.addBasicFeaturesToProperty);


////property_is_for_sale
//localhost:4000/property/checkSale/:property_id/:user_id
router.put("/checkSale/:property_id/:user_id", propertyController.checkSale);

//quitar una propiedad de venta
//localhost:4000/property/uncheckSale/:property_id/:user_id
router.put("/uncheckSale/:property_id/:user_id", propertyController.uncheckSale);

//Admin en venta
//localhost:4000/property/checkSaleAdmin/:property_id
router.put("/checkSaleAdmin/:property_id", propertyController.checkSaleAdmin);

//Admin quitar una propiedad de venta
//localhost:4000/property/unCheckSaleAamin/:property_id
router.put("/unCheckSaleAdmin/:property_id", propertyController.uncheckSaleAdmin);


//muestra todas la propiedades de descubre
//localhost:4000/property/descubre
router.get("/descubre", propertyController.showAllDescubre);

//Trae todas las fotos de una propiedad
//localhost:4000/property/getImagesProperty/:property_id
router.get("/getImagesProperty/:property_id", propertyController.getImagesProperty);

//Mostrar TODAS las PROVINCIAS
//localhost:4000/property/allProvinces
router.get("/allProvinces", propertyController.allProvinces);

//Mostrar TODAS las CIUDADES según PROVINCIA
//localhost:4000/property/allCities/:province_id
router.get("/allCities/:province_id", propertyController.allCities );


//Actualizar DIRECCIÓN PROPIEDAD
//localhost:4000/property/addPropertyAddress/:property_id/:province_id/:city_id
router.put("/addPropertyAddress/:property_id/:province_id/:city_id", propertyController.addAddress);

//Editar DIRECCIÓN
//localhost:4000/property/editPropertyAddress/:property_id/:province_id/:city_id
router.put("/editPropertyAddress/:property_id/:province_id/:city_id", propertyController.editPropertyAddress)

//Mostrar CARACTERÍSTICAS del Inmueble
//localhost:4000/property/allFeatures
router.get("/allFeatures", propertyController.allFeatures);

//Guardar Características
//localhost:4000/property/addFeaturesToProperty/:property_id
router.post("/addFeaturesToProperty/:property_id", propertyController.addFeaturesToProperty);

//Actualizar Características
//localhost:4000/property/editFeaturesProperty/:property_id
router.post('/editFeaturesProperty/:property_id', propertyController.editFeaturesProperty);

//Mostrar Características
//localhost:4000/property/getPropertyFeatures/:property_id
router.get("/getPropertyFeatures/:property_id", propertyController.getPropertyFeatures);

//Añade Imágenes a una Propiedad
//localhost:4000/property/addImgsProperty/:property_id
router.put("/addImgsProperty/:property_id", multer("property"), propertyController.addImgsProperty);

//Actualizar Fotos Propiedad
//localhost:4000/property/updateImagesProperty/:property_id
router.post('/updateImagesProperty/:property_id', multer("property"), propertyController.updateImagesProperty)


//ELIMINA FOTO de una Propiedad cuando la creamos
//localhost:4000/property/deleteImageProperty/:image_id/:property_id
router.delete('/deleteInitialImageProperty/:image_id/:property_id', propertyController.deleteInitialImageProperty)

//ELIMINAR FOTO de Edit
//localhost:4000/property/delImg/:image_id
router.put('/delImg/:image_id', propertyController.delImg);

//Setear FOTO PRINCIPAL de una propiedad
//localhost:4000/property/setMainImage/:image_id/:property_id
router.put('/setMainImage/:image_id/:property_id', propertyController.setMainImage);

//Deshacer Foto Principal de una propiedad
//localhost:4000/property/unSetMainImage/:image_id/:property_id
router.put('/unSetMainImage/:image_id/:property_id', propertyController.unSetMainImage);

//Añadir una foto a la propiedad
//localhost:4000/property/addOneImage/:property_id
router.put('/addOneImage/:property_id', multer("property"), propertyController.addOneImage)



//localhost:4000/property/editPurchase/:property_id
router.put("/editPurchase/:property_id", propertyController.editPurchase);


//localhost:4000/property/getAllPurchaseData/:property_id
router.get("/getAllPurchaseData/:property_id", propertyController.getAllPurchaseData);


//Trae toda la informacion de UNA propiedad de UN usuario
//localhost:4000/property/propertyDetails/:user_id/:property_id
router.get("/propertyDetails/:user_id/:property_id", propertyController.propertyDetails);

//Trae todas la fotos de UNA propiedad de UN usuario
//localhost:4000/property/propertyDetailsImg/:property_id
router.get("/propertyDetailsImg/:property_id", propertyController.propertyDetailsImg);

//Trae todas la direccion de UNA propiedad de UN usuario
//localhost:4000/property/propertyDetailsAddress/:property_id
router.get("/propertyDetailsAddress/:property_id", propertyController.propertyDetailsAddress);

//Trae todos los datos de compra de UNA propiedad de UN usuario
//localhost:4000/property/propertyDetailsPurchase/:property_id
router.get("/propertyDetailsPurchase/:property_id", propertyController.propertyDetailsPurchase);

//Trae la provincia y ciudad de la propiedad de un usuario
//localhost:4000/property/propertyDetailsProvinceCity/:property_id
router.get("/propertyDetailsProvinceCity/:property_id", propertyController.propertyDetailsProvinceCity);

//Te muestra el tipo de la propiedad
//localhost:4000/property/propertyDetailsSubtype/:property_id
router.get("/propertyDetailsSubtype/:property_id", propertyController.propertyDetailsSubtype);


//Te muestra el alquiler de la propiedad
//localhost:4000/property/propertyDetailsRent/:property_id
router.get("/propertyDetailsRent/:property_id", propertyController.propertyDetailsRent);

//Te muestra la hipoteca de la propiedad
//localhost:4000/property/propertyDetailsLoan/:property_id
router.get("/propertyDetailsLoan/:property_id", propertyController.propertyDetailsLoan);


//Te muestra todas las propiedades que están a la venta
//localhost:4000/property/discover
router.get("/discover", propertyController.discover);

//Añadir una propiedad a favoritos
//localhost:4000/property/fav/:user_id/:property_id
router.post("/fav/:user_id/:property_id", propertyController.fav);

//Quitar una propiedad a favoritos
//localhost:4000/property/unfav/:user_id/:property_id
router.delete("/unfav/:user_id/:property_id", propertyController.unfav);

//Trae los favoritos de un usuario
//localhost:4000/property/favUser/:user_id
router.get("/favUser/:user_id", propertyController.favUser);

//saca todas la entradas de features_property para filtrar descubre
//localhost:4000/property/discover/allpropertywithfeature
router.get('/discover/allpropertywithfeature', propertyController.getAllFeature_Property);

router.get('/getType/:property_subtype_id', propertyController.getType);


module.exports = router;