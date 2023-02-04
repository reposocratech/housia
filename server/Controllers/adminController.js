const connection = require("../config/db.js");


class adminController {

    showAdminAllProperties = (req, res) =>{

        let sql = 'SELECT property.*, address.address_street_name, province.province_name, purchase.purchase_buy_price, image.image_title FROM property LEFT JOIN purchase ON property.property_id = purchase.purchase_property_id LEFT JOIN address ON property.property_id = address.address_property_id JOIN province ON address.address_province_id = province.province_id JOIN image ON image.image_property_id = property.property_id WHERE property.property_is_admin_deleted = false AND image.image_is_main = true ORDER BY property.property_id DESC';

        connection.query(sql, (error, result)=>{
            if(error){
                res.status(400).json({error})
            }
            /* console.log(res.data) */
            res.status(200).json(result);
        })
    }

    // CRUD Property Type 
    //Trae los tipos de propiedades
    getPropertyTypes = (req, res) =>{
        let sql ="SELECT * FROM type "
        connection.query(sql, (error, result)=>{
            if (error){
                res.status(400).json({error});
            }
            res.status(200).json(result);
            /* console.log(result); */
        });
    };

    //crear un tipo de propiedad
    createPropertyType = (req, res) => {
        let {type_name} = req.body;

        let sql =`INSERT INTO type (type_name) VALUES ('${type_name}')`;

        connection.query(sql, (error, result)=>{
            if (error){
                res.status(400).json({error});
            }
            res.status(200).json(result);
            /* console.log(result); */
        });
    }

    //edita una propiedad
    editPropertyType = (req, res) => {
        let {type_id} = req.params;
        let {type_name} = req.body;

        let sql =`UPDATE type SET type_name = '${type_name}' where type_id = ${type_id}`;

        connection.query(sql, (error, result)=>{
            if (error){
                res.status(400).json({error});
            }
            res.status(200).json(result);
            /* console.log(result); */
        });
    }
    
    //borra una propiedad
    deletePropertyType = (req, res) => {
        let {type_id} = req.params;

        let sql =`DELETE FROM type where type_id = ${type_id}`;

        connection.query(sql, (error, result)=>{
            if (error){
                res.status(400).json({error});
            }
            res.status(200).json(result);
            /* console.log(result); */
        });
    }
    
    //crea un subtipo
     createPropertySubType = (req, res) => {

        let {subtype_type_id} = req.params;

        let {subtype_name} = req.body;

        let sql = `INSERT INTO subtype (subtype_type_id,subtype_name ) VALUES (${subtype_type_id}, '${subtype_name}')`;

        connection.query(sql, (error, result)=>{
            if (error){
                res.status(400).json({error});
            }
            res.status(200).json(result);
            /* console.log(result); */
        });
    }
      
      //mostrar todos los subtipos
      getPropertySubTypes = (req, res) =>{
        let {subtype_type_id} = req.params;
        let sql =`SELECT * FROM subtype WHERE subtype_type_id = ${subtype_type_id}`;
        connection.query(sql, (error, result)=>{
            if (error){
                res.status(400).json({error});
            }
            res.status(200).json(result);
            /* console.log(result); */
        });
    }
        
       //editar un  subtipo
       editPropertySubType = (req, res) => {
        let {subtype_id} = req.params;
        let {subtype_name} = req.body;

        let sql =`UPDATE subtype SET subtype_name = '${subtype_name}' WHERE subtype_id = ${subtype_id}`;
        connection.query(sql, (error, result)=>{
            if (error){
                res.status(400).json({error});
            }
            res.status(200).json(result);
            /* console.log(result); */
        });
       }
       
       //borra un  subtipo
       deletePropertySubType = (req, res) => {
        let {subtype_id} = req.params;

        let sql =`DELETE FROM subtype WHERE subtype_id = ${subtype_id}`;
        connection.query(sql, (error, result)=>{
            if (error){
                res.status(400).json({error});
            }
            res.status(200).json(result);
            /* console.log(result); */
        });
    }

 // CRUD Kitchen

    //trae la info de todos los tipos de cocina
    getKitchenTypes = (req, res) =>{
        let sql ="SELECT * FROM kitchen"
        connection.query(sql, (error, result)=>{
            if (error){
                res.status(400).json({error});
            }
            res.status(200).json(result);
            /* console.log(result); */
        });
    };

  //crea un tipo de cocina
    createKitchenType = (req, res) => {
        let {kitchen_name} = req.body;
        console.log(req.body);
        let sql =`INSERT INTO kitchen (kitchen_name) VALUES ('${kitchen_name}')`;

        connection.query(sql, (error, result)=>{
            if (error){
                res.status(400).json({error});
                /* console.log(error, 'error de la consulta'); */
            }
            res.status(200).json(result,);
        });
    }

 //edita un tipo de cocina
    editKitchenType = (req, res) => {
        let {kitchen_id} = req.params;
        let {kitchen_name} = req.body;

        let sql =`UPDATE kitchen SET kitchen_name = '${kitchen_name}' where kitchen_id = ${kitchen_id}`;

        connection.query(sql, (error, result)=>{
            if (error){
                res.status(400).json({error});    
            }
            res.status(200).json(result);
            /* console.log(result); */
        });
    }
    
    //borra un tipo de cocina
    deleteKitchenType = (req, res) => {
        let {kitchen_id} = req.params;

        let sql =`DELETE FROM kitchen where kitchen_id = ${kitchen_id}`;

        connection.query(sql, (error, result)=>{
            if (error){
                res.status(400).json({error});
            }
            res.status(200).json(result);
            /* console.log(result); */
        });
    }

// CONSEGUIR LA INFO DE TODOS LOS FEATURES EXISTENTES

    getPropertyFeatures = (req, res) =>{
        let sql ="SELECT * FROM feature";

     connection.query(sql, (error, result)=>{
            if (error){
                res.status(400).json({error});    
            }
            res.status(200).json(result);
            /* console.log(result); */
        });
        }


//CREAR UN NUEVO FEATURE NO EXISTENTE

    createPropertyFeatures = (req, res) => {
        let {feature_name} = req.body;

        let sql =`INSERT INTO feature (feature_name) VALUES ('${feature_name}')`;

        connection.query(sql, (error, result)=>{
            if (error){
                res.status(400).json({error});    
            }
            res.status(200).json(result);
            /* console.log(result); */
        });
  }

    //EDITAR UN FEATURE YA EXISTENTE

    editPropertyFeature = (req, res) =>{
        let {feature_id} = req.params;
        let {feature_name} = req.body;

        let sql =`UPDATE feature SET feature_name = '${feature_name}' where feature_id = ${feature_id}`;
          connection.query(sql, (error, result)=>{
            if (error){
                res.status(400).json({error});    
            }
            res.status(200).json(result);
            /* console.log(result); */
        });
    }

   
// BORRAR UN FEATURE YA EXISTENTE.

    deletePropertyFeature = (req, res) =>{
        let {feature_id} = req.params
        /* console.log(req.params.feature_id); */

        let sql =`DELETE FROM feature where feature_id = ${feature_id}`;
       /*  console.log(sql); */
          connection.query(sql, (error, result)=>{
            if (error){
                res.status(400).json({error});    
            }
            res.status(200).json(result);
            /* console.log(result); */
        });
    };

    //Borra de manera logica un ACTIVO (inmueble)
    //localhost:4000/admin/logicDeletedAdminProperty/:property_id
    logicDeletedAdminProperty = (req, res) =>{

        let {property_id} = req.params;

        let sql = `UPDATE property SET property_is_admin_deleted = true WHERE property_id = ${property_id}`

        connection.query(sql, (errorAD, result) =>{
            if(errorAD){
                res.status(400).json({errorAD})
                }
            res.status(200).json(result);
        })

    }

    //Bloquea para el usuario un Activo (admin lo bloquea)
    //////localhost:4000/admin/blockProperty/:property_id
    blockProperty =(req, res)=>{
        let {property_id} = req.params;

        let sql = `UPDATE property SET property_is_user_deleted = true WHERE property_id = ${property_id} AND property_is_admin_deleted = 0`;

        connection.query(sql, (errorBLOCK, result)=>{
            if(errorBLOCK){
                res.status(400).json({errorAD})
            }
            res.status(200).json(result);
        })
    }

    //DESbloquea para el usuario un Activo (admin lo libera)
    ////localhost:4000/admin/unBlockProperty/:property_id
    unblockProperty = (req, res) =>{
        let {property_id} = req.params;

        let sql = `UPDATE property SET property_is_user_deleted = false WHERE property_id = ${property_id}`;

        connection.query(sql, (error, result)=>{
            error? res.status(400).json({error}): res.status(200).json(result);
        })
    }
}
     
module.exports = new adminController();