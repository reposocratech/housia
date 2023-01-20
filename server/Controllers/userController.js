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
               
                  //si las contraseñas coinciden
                  
                } else {
                  res.status(401).json("Usuario y contraseña incorrectos");
                  
                }
              });
        }

    })

}

// GET DE UN SOLO USER (devuelve los datos de un usuario tras loguearse)
//localhost:4000/users/:user_id
selectOneUser =(req, res)=>{

    const userId = req.params.user_id;

    let sqlUser = `SELECT * FROM user WHERE user_id = ${userId} and user_is_deleted = false`;

    let sqlProperty = `SELECT * from property WHERE property_user_id = ${userId} and property_is_user_deleted = false and property_is_admin_deleted = false`;

    connection.query(sqlUser, (errorUser, resultUser) =>{
        if(errorUser){
            res.status(400).json({ errorUser});
            }
        connection.query(sqlProperty, (errorProperty, resultProperty) =>{
            if(errorProperty) {
                res.status(400).json({ errorProperty });
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

    // ESTO es por si lo pasamos como JSON REGISTER
    // const { name, lastname, phone, dni, promotional_code, birth_date } = JSON.parse(req.body.register)


    let { name, lastname, phone, dni, promotional_code, birth_date } = req.body;

    // eliminamos espacios en blanco previos o posteriores al dato a rescatar
    name = name.trim()
    lastname = lastname.trim();
    phone = phone.trim();
    dni = dni.trim();
    promotional_code = promotional_code.trim();
    birth_date = birth_date.trim()


    let img = "";

    let sql = `UPDATE user SET user_name = "${name}", user_lastname = "${lastname}", user_phone = "${phone}", user_dni = "${dni}", user_code = "${promotional_code}", user_birth_date = "${birth_date}" WHERE user_id = ${userId}`;

    if(req.file != undefined){
        img = req.file.filename;
        
        sql = `UPDATE user SET user_name = "${name}", user_lastname = "${lastname}", user_phone = "${phone}", user_dni = "${dni}", user_code = "${promotional_code}", user_birth_date = "${birth_date}", user_img = ${img} WHERE user_id = ${userId}`
    }

    connection.query(sql, (errorEdit, resultEdit) =>{
        if (errorEdit) throw errorEdit;
        errorEdit ? res.status(400).json({errorEdit}) : res.status(200).json(resultEdit);
    })

};

//CREAR ALQUILER

createRent = (req, res) => {
    let {property_id} = req.params;

    let {rent_renting_date, rent_renting_price, rent_expenses} = req.body;

    let sql = `INSERT INTO rent (rent_property_id, rent_renting_date, rent_renting_price, rent_expenses) VALUES (${property_id}, ${rent_renting_date}, ${rent_renting_price}, ${rent_expenses})`;

    connection.query(sql, (error, result)=>{
        if (error){
            res.status(400).json({error});
            
        }
        res.status(200).json(result);
        console.log(result);
    });
};

//EDITAR ALQUILER

editRent = (req, res) => {
    let {rent_id} = req.params;

    let {rent_renting_date, rent_renting_price, rent_expenses} = req.body;

    let sql = `UPDATE rent SET rent_renting_date = '${rent_renting_date}', rent_renting_price = '${rent_renting_price}', rent_expenses = '${rent_expenses}' WHERE rent_id = '${rent_id}'`;
    
    connection.query(sql, (error, result)=>{
        if (error){
            res.status(400).json({error});    
        }
        res.status(200).json(result);
        console.log(result);
    });
};

//Trae todas las propiedades de un usuario con su foto principal.
getAllProperty = (req, res) => {
    let {user_id} = req.params;

    // let sql = `UPDATE image SET image_is_main = 1 WHERE image_title = "imagen_propiedad.jpg"`;
    
    let sql2 = `SELECT property.*, image.* FROM user, image, property WHERE user.user_id = property.property_user_id AND property.property_id = image.image_property_id AND user.user_is_deleted = 0 AND user.user_id = ${user_id} AND image.image_is_main = 1 ORDER BY property.property_built_year DESC LIMIT 6`;

    
    // connection.query(sql, (error, resultImage) => {
    //     if (error) {
    //     res.status(400).json({ error });
    //     }
    //     connection.query(sql2, (error2, resultProperty) => {
    //         if (error) {
    //         res.status(400).json({ error2 });
    //         }
    //         res.status(200).json({ resultProperty});
    //         });
    //     });
        connection.query(sql2, (error2, resultProperty) => {
            if (error2) {
            res.status(400).json({ error2 });
            } else{
            res.status(200).json({ resultProperty});
            }
            
            });
      
    };




}

module.exports = new userController();