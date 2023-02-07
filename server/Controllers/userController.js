const connection = require("../config/db.js");
const bcrypt = require("bcrypt");
const jwt = require("jsonwebtoken");


class userController {


//--    CREAR USUARIO
//localhost:4000/user/createUser
createUser = (req, res) =>{
    const { name, lastname, email, password, promotional_code} = req.body;

    let rondasSeguridad = 8;
    bcrypt.genSalt(rondasSeguridad, function(errorBcryp, rondasSeguridad) {
        bcrypt.hash(password, rondasSeguridad, function (err, hash){

            let sqlBcrypt = "";

            if(promotional_code != ""){
                 sqlBcrypt = `INSERT INTO user (user_name, user_lastname, user_code, user_email, user_password) VALUES ('${name}','${lastname}','${promotional_code}', '${email}', '${hash}')`;
            } else {
                 sqlBcrypt = `INSERT INTO user (user_name, user_lastname, user_email, user_password) VALUES ('${name}','${lastname}', '${email}', '${hash}')`;
            }

            connection.query(sqlBcrypt, (error, result) =>{
                console.log(error);
            error
             ? res.status(500).json( "ha habido un error" )
             : res.status(200).json(result);
            });
        }); 
    });
}

//Login de usuario
loginUser =(req, res)=>{
   
    let {email, password} = req.body;

    let sql = `SELECT * FROM user WHERE user_email = '${email}' and user_is_deleted = 0`;

    connection.query(sql, (error, result) =>{

        if(error) return res.status(404).json(error);

        if(!result || !result.length){
            res.status(401).json("Usuario sin cuenta activa");
        } else {

            //METODO PARA BCRYPT CUANDO LO IMPLEMENTEMOS
            const [user] = result;
            const hash = user.user_password;
            const userId = user.user_id;

            bcrypt.compare(password, hash, (error, response) => {
                // console.log("respuesta", response);
                if (error) throw error;
                //si las contraseñas coinciden
                if (response === true) {
                // console.log("esta es la respuesta bcrypt", response);
                  const token = jwt.sign(
                    {
                      user: {
                        email: user.user_email,
                        name: user.user_name,
                        lastname: user.user_lastname,
                        id: userId,
                        type: user.user_type
                      },
                    },
                    process.env.SECRET,
                    { expiresIn: "7d" }
                  );
                  res.status(200).json({ token });
               
                } else {
                  res.status(401).json("Usuario y contraseña incorrectos");
                  
                }
              });
        }
    })
}

// GET DE UN SOLO USER (devuelve los datos de un usuario tras loguearse)
//localhost:4000/users/:user_id
selectOneUser = (req, res) => {

    const userId = req.params.user_id;
/* console.log(userId, "userId"); */
    let sqlUser = `SELECT user_id, user_name, user_lastname, user_email, user_password, user_creation_date, user_certify_ownership, user_img, user_type, user_is_deleted, user_phone, user_dni, user_acepted_policies, user_code,  date_format(user.user_birth_date, '%Y-%m-%d') as user_birth_date FROM user WHERE user_id = ${userId} and user_is_deleted = false`;

    let sqlProperty = `SELECT * from property WHERE property_user_id = ${userId} and property_is_user_deleted = false and property_is_admin_deleted = false`;

    connection.query(sqlUser, (errorUser, resultUser) =>{
        if(errorUser) {
            res.status(400).json({errorUser});
        }  
        connection.query(sqlProperty, (errorProperty, resultProperty) =>{
            if(errorProperty) {
                res.status(400).json({errorProperty});
            }
            res.status(200).json({ resultUser, resultProperty})
        });
    });
};

// FORMULARIO EDITAR USER
//localhost:4000/users/editUser/:userId
showOneUser = (req, res) =>{
     
    let userId = req.params.user_id
    let sqlGE = `SELECT * FROM user where user_id = ${userId}`

    connection.query(sqlGE, (errorGE, result)=>{
        if(errorGE) {
            res.status(400).json({errorGE});
        }
        res.status(200).json({result})
    } )
}

// EDITAR UN USUARIO (metodo put)
//localhost:4000/users/editUser/:userId
editOneUser =(req, res)=>{
    let userId = req.params.user_id;
    console.log(req.body.register);

    // ESTO es por si lo pasamos como JSON REGISTER
    let { user_name, user_lastname, user_phone, user_dni, user_code, user_birth_date } = JSON.parse(req.body.register)
   
    let img = "";
    if(!user_birth_date){
        user_birth_date = '2000/01/01';
    }

    let sql = `UPDATE user SET user_name = "${user_name}", user_lastname = "${user_lastname}", user_phone = "${user_phone}", user_dni = "${user_dni}", user_code = "${user_code}", user_birth_date = "${user_birth_date}" WHERE user_id = ${userId}`;

    if(req.file != undefined){
        img = req.file.filename;
        
        sql = `UPDATE user SET user_name = "${user_name}", user_lastname = "${user_lastname}", user_phone = "${user_phone}", user_dni = "${user_dni}", user_code = "${user_code}", user_birth_date = "${user_birth_date}", user_img = "${img}" WHERE user_id = ${userId}`
    }

    connection.query(sql, (errorEdit, resultEdit) =>{
        errorEdit ? res.status(400).json({errorEdit}) : res.status(200).json(resultEdit);
    })
};


///Trae seis propiedades para el portfolio de un usuario con su foto principal.
//localhost:4000/users/getAllProperty/:user_id
getAllProperty = (req, res) => {
    let {user_id} = req.params;

    let sql2 = `SELECT property.*, address.*, purchase.purchase_buy_price, image.image_title FROM property LEFT JOIN address ON property.property_id = address.address_property_id LEFT JOIN purchase ON property.property_id = purchase.purchase_property_id JOIN image ON image.image_property_id = property.property_id   WHERE property.property_user_id = ${user_id} AND property.property_is_user_deleted = 0 AND property.property_is_admin_deleted = 0 AND image.image_is_main = 1 ORDER BY property_id DESC LIMIT 6`;
    
        connection.query(sql2, (error2, resultProperty) => {
            if (error2) {
            res.status(400).json({ error2 });
            }
            res.status(200).json({ resultProperty});
            });
    };

    ///Trae TODAS las propiedades de un usuario con su foto principal
    //localhost:4000/users/getProperties/:user_id
    getProperties = (req, res) => {
        let {user_id} = req.params;

        let sql = `SELECT property.*, address.*, purchase.purchase_buy_price, image.image_title FROM property LEFT JOIN address ON property.property_id = address.address_property_id LEFT JOIN purchase ON property.property_id = purchase.purchase_property_id JOIN image ON image.image_property_id = property.property_id   WHERE property.property_user_id = ${user_id} AND property.property_is_user_deleted = 0 AND property.property_is_admin_deleted = 0 AND image.image_is_main = 1 ORDER BY property_id DESC `;

    connection.query(sql, (error, result)=>{
        error ? res.status(400).json({error}) : res.status(200).json(result);
        /* console.log(result, "todas las propiedades"); */
    });
};

    //Borra de manera lógica una propiedad
      //localhost:4000/users/logicDeletedUserProperty/:property_id/:user_id
      logicDeletedUserProperty = (req, res) => {
        let {property_id, user_id} = req.params;
        console.log(property_id, user_id);
        let sql = `UPDATE property SET property_is_user_deleted = true, property_is_for_sale = false WHERE property_id = "${property_id}"`;

        let sql2 = `SELECT property.*, address.*, purchase.purchase_buy_price, image.image_title FROM property LEFT JOIN address ON property.property_id = address.address_property_id LEFT JOIN purchase ON property.property_id = purchase.purchase_property_id JOIN image ON image.image_property_id = property.property_id   WHERE property.property_user_id = ${user_id} AND property_is_user_deleted = false AND image.image_is_deleted = false AND image.image_is_main = true ORDER BY property_id DESC `;

        connection.query(sql, (error, resultDel) => {
            if (error){
                res.status(400).json({error});
                
            }
            connection.query(sql2, (err, resultProperty) => {
                if (err){
                    res.status(400).json({err});
                    
                }
                res.status(200).json({resultProperty});
            })
          });
      };

      ///Obtener propiedades ALQUILADAS de un usuario
      //localhost:4000/users/getRentedProperties/:user_id
      getRentedProperties = (req, res) =>{
        let {user_id} = req.params;

        let sql = `SELECT * FROM property WHERE property_is_rented = 1 AND property_is_user_deleted = 0 AND property_user_id = ${user_id} AND property_is_admin_deleted = false`;

        connection.query(sql, (error, result) => {
            if (error){
                res.status(400).json({error});
                
            }
            res.status(200).json({result})
          })
      }

      ///Obtener propiedades VENDIDAS de un usuario
      //localhost:4000/users/getSoldProperties/:user_id
      getSoldProperties = (req, res) =>{
        let {user_id} = req.params;
        /* console.log(user_id, "aaaaaaaaa") */
        let sql = `SELECT * FROM property WHERE property_is_sold = 1 AND property_is_user_deleted = 0 AND property_user_id = ${user_id} AND property_is_user_deleted = 0`;

        connection.query(sql, (error, result) => {
            if (error){
                res.status(400).json({error});
                
            }
            res.status(200).json({result})
            console.log(result, "reSULT")
          })
      }

      ///Cuenta todas las propiedades de un usuario
      //localhost:4000/users/getCountProperties/:user_id
      getCountProperties = (req, res) => {
        let {user_id} = req.params;
        /* console.log('ID DEL USUARIO', user_id); */
        

        let sql = `SELECT COUNT(property.property_id) AS active_properties FROM property, image WHERE property.property_user_id = ${user_id} AND property.property_id = image.image_property_id AND property.property_is_admin_deleted = 0 AND property.property_is_user_deleted = 0 AND image.image_is_main = 1`;

        connection.query(sql, (error, result) => {
            if (error){
                res.status(400).json({error});
                
            }
            res.status(200).json({result})        
        })
      }

      ///Trae la suma total del precio de compra de las propiedades de un usuario
      //localhost:4000/users/getTotalInv/:user_id
      getTotalInv = (req, res) => {
        let {user_id} = req.params;

        let sql = `SELECT purchase.purchase_buy_price FROM purchase, property, image WHERE purchase.purchase_property_id = property.property_id AND property.property_id = image.image_property_id AND property.property_user_id = ${user_id} AND property.property_is_user_deleted = 0 AND property.property_is_admin_deleted = 0 AND image.image_is_main = 1`

        connection.query(sql, (error, result) => {
            if (error){
                res.status(400).json({error});
                
            }
            res.status(200).json({result})
        })
      }

      ///Trae la suma total de los alquileres de las propiedades de un usuario
      //localhost:4000/users/getMonthlyIncome/:user_id
      getMonthlyIncome = (req, res) => {
        let {user_id} = req.params;

        let sql = `SELECT rent.rent_renting_price FROM rent JOIN property ON rent.rent_property_id = property.property_id WHERE property.property_user_id = ${user_id} AND property.property_is_rented = 1 AND property.property_is_user_deleted = false`;

        connection.query(sql, (error, result) => {
            if (error){
                res.status(400).json({error});
                
            }
            res.status(200).json({result})
        })
      }

      //TRAE TODOS LOS FAVORITOS DE UN USUARIO QUE NO ESTEN BORRADOS
      //localhost:4000/users/getFavs/:user_id
      getFavsFromAUser = (req, res)=>{
        let {user_id} = req.params;

        let sql = `SELECT property.property_id FROM property, user, favourite WHERE property.property_id = favourite.favourite_property_id
        AND user.user_id = favourite.favourite_user_id AND property.property_is_user_deleted = false AND property_is_admin_deleted = false AND user.user_id = ${user_id}`

        connection.query(sql, (error, result)=>{
            if(error){
                res.status(400).json({error});
            }
            res.status(200).json(result)
        })
      }

      //CREA UNA NUEVA ENTRADA EN LOS FAVORITOS DE UN USUARIO
      //localhost:4000/users/postFav/:user_id/:property_id
      addFavToYourList = (req, res) =>{
        let {user_id, property_id} = req.params

        let sql = `INSERT INTO favourite (favourite_user_id, favourite_property_id) VALUES (${user_id}, ${property_id})`

        connection.query(sql, (error, result)=>{
            if(error){
                res.status(400).json({error});
            }
            res.status(200).json({result})
        })
      }
}

module.exports = new userController();