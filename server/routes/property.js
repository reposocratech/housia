var express = require('express');
var router = express.Router();
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
//localhost:4000/property/checkSale/:property_user_id/:property_id
router.put("/checkSale/:property_user_id/:property_id", propertyController.checkSale);

//localhost:4000/property/uncheckSale/:property_user_id/:property_id
router.put("/uncheckSale/:property_user_id/:property_id", propertyController.uncheckSale);

//muestra todas la propiedades de descubre
router.get("/descubre", propertyController.showAllDescubre);


//Mostrar TODAS las PROVINCIAS
//localhost:4000/property/allProvinces
router.get("/allProvinces", propertyController.allProvinces);

//Mostrar TODAS las CIUDADES según PROVINCIA
//localhost:4000/property/allCities/:province_id
router.get("/allCities/:province_id", propertyController.allCities )



module.exports = router;