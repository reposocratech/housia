var express = require('express');
var router = express.Router();
var userController = require('../Controllers/userController')
const multerSingle = require('../middleware/multerSingle')


/* GET users listing. */

//-- CREATE USER
//localhost:4000/users/createUser
router.post("/createUser", userController.createUser);

//-- LOGIN USER
//localhost:4000/users/login
router.post("/login", userController.loginUser)

//-- ONE USER 
//localhost:4000/users/:user_id
router.get("/:user_id", userController.selectOneUser)

//-- TRAE LA INFO DE UN USER (EDITAR U OTROS)
////localhost:4000/users/editUser/:user_id
router.get("/editUser/:user_id", userController.showOneUser)

//-- EDIT USER (meter info nueva)
//localhost:4000/users/editUser/:user_id
// router.put("/editUser/:user_id", userController.editOneUser)
//----------------------LINEA PARA AÑADIR MULTER A LA RUTA
router.put("/editUser/:user_id", multerSingle("user"), userController.editOneUser)


//Trae seis propiedades para el portfolio de un usuario con su foto principal.
//localhost:4000/users/getAllProperty/:user_id
router.get("/getAllProperty/:user_id", userController.getAllProperty);

//Trae TODAS las propiedades de un usuario
//localhost:4000/users/getProperties/:user_id
router.get("/getProperties/:user_id", userController.getProperties);


//Borra de manera lógica una propiedad
//localhost:4000/users/logicDeletedUserProperty/:property_id/:user_id
router.put("/logicDeletedUserProperty/:property_id/:user_id",userController.logicDeletedUserProperty);

///Obtener propiedades ALQUILADAS de un usuario
//localhost:4000/users/getRentedProperties/:user_id
router.get("/getRentedProperties/:user_id", userController.getRentedProperties);

///Obtener propiedades VENDIDAS de un usuario
//localhost:4000/users/getSoldProperties/:user_id
router.get("/getSoldProperties/:user_id", userController.getSoldProperties);

///Cuenta todas las propiedades de un usuario
//localhost:4000/users/getCountProperties/:user_id
router.get("/getCountProperties/:user_id", userController.getCountProperties);

///Trae la suma total del precio de compra de las propiedades de un usuario
//localhost:4000/users/getTotalInv/:user_id
router.get("/getTotalInv/:user_id", userController.getTotalInv);

///Trae la suma total de los alquileres de las propiedades de un usuario
//localhost:4000/users/getMonthlyIncome/:user_id
router.get("/getMonthlyIncome/:user_id", userController.getMonthlyIncome);

//TRAE TODOS LOS FAVORITOS DE UN USUARIO QUE NO ESTEN BORRADOS
//localhost:4000/users/getFavs/:user_id
router.get('/getFavs/:user_id',userController.getFavsFromAUser);

 //CREA UNA NUEVA ENTRADA EN LOS FAVORITOS DE UN USUARIO
//localhost:4000/users/postFav/:user_id/:property_id
router.post('/postFav/:user_id/:property_id', userController.addFavToYourList)

module.exports = router;