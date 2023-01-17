const connection = require("../config/db.js");


class adminController {
    // CRUD Property
    //Trae los tipos de propiedades
    getPropertyTypes = (req, res) =>{
        let sql ="SELECT * FROM type "
        connection.query(sql, (error, result)=>{
            if (error){
                res.status(400).json({error});
                
            }
            res.status(200).json(result);
            console.log(result);
        });
    };

    //crear un tipo de propiedad
    createPropertyType = (req, res) => {
        let {type_name} = req.body;

        let sql =`INSERT INTO type (type_name) VALUES (${type_name})`;

        connection.query(sql, (error, result)=>{
            if (error){
                res.status(400).json({error});
                
            }
            res.status(200).json(result);
            console.log(result);
        });
    }

    //edita una propiedad
    editPropertyType = (req, res) => {
        let {type_id} = req.params;
        let {type_name} = req.body;

        let sql =`UPDATE type SET type_name = ${type_name} where type_id = ${type_id}`;

        connection.query(sql, (error, result)=>{
            if (error){
                res.status(400).json({error});
                
            }
            res.status(200).json(result);
            console.log(result);
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
            console.log(result);
        });
    }
    
    //crea un subtipo
     createPropertySubType = (req, res) => {

        let {subtype_type_id} = req.params;

        let {subtype_name} = req.body;

        let sql = `INSERT INTO subtype (subtype_type_id,subtype_name ) VALUES (${subtype_type_id}, ${subtype_name})`;


        connection.query(sql, (error, result)=>{
            if (error){
                res.status(400).json({error});
                
            }
            res.status(200).json(result);
            console.log(result);
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
            console.log(result);
        });
    }
        
       //editar un  subtipo
       editPropertySubType = (req, res) => {
        let {subtype_id} = req.params;
        let {subtype_name} = req.body;

        let sql =`UPDATE subtype SET subtype_name = ${subtype_name} WHERE subtype_id = ${subtype_id}`;
        connection.query(sql, (error, result)=>{
            if (error){
                res.status(400).json({error});
                
            }
            res.status(200).json(result);
            console.log(result);
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
            console.log(result);
        });
    }
        


 // CRUD Kitchen

    //trae la info de todos los tipos de cocina
    getKitchenTypes = (req, res) =>{
        let sql ="SELECT * FROM kitchen "
        connection.query(sql, (error, result)=>{
            if (error){
                res.status(400).json({error});
                
            }
            res.status(200).json(result);
            console.log(result);
        });
    };


  //crea un tipo de cocina
    createKitchenType = (req, res) => {
        let {kitchen_name} = req.body;

        let sql =`INSERT INTO kitchen (kitchen_name) VALUES (${kitchen_name})`;
        console.log(sql);
        connection.query(sql, (error, result)=>{
            if (error){
                res.status(400).json({error});
                
            }
            res.status(200).json(result);

            
        });
    }

 //edita un tipo de cocina
    editKitchenType = (req, res) => {
        let {kitchen_id} = req.params;
        let {kitchen_name} = req.body;

        let sql =`UPDATE kitchen SET kitchen_name = ${kitchen_name} where kitchen_id = ${kitchen_id}`;

        connection.query(sql, (error, result)=>{
            if (error){
                res.status(400).json({error});    
            }
            res.status(200).json(result);
            console.log(result);
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
            console.log(result);
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
            console.log(result);
        });
        }



//CREAR UN NUEVO FEATURE NO EXISTENTE

    createPropertyFeatures = (req, res) => {
        let {feature_name} = req.body;

        let sql =`INSERT INTO type (type_name) VALUES (${feature_name})`;

        connection.query(sql, (error, result)=>{
            if (error){
                res.status(400).json({error});    
            }
            res.status(200).json(result);
            console.log(result);
        });
  }

    //EDITAR UN FEATURE YA EXISTENTE

    editPropertyFeature = (req, res) =>{
        let {feature_id} = req.params;
        let {feature_name} = req.body;

        let sql =`UPDATE type SET type_name = ${feature_name} where type_id = ${feature_id}`;
          connection.query(sql, (error, result)=>{
            if (error){
                res.status(400).json({error});    
            }
            res.status(200).json(result);
            console.log(result);
        });
    }

   


// BORRAR UN FEATURE YA EXISTENTE.

    deletePropertyFeature = (req, res) =>{
        let {feature_id} = req.params
        console.log(req.params.feature_id);

        let sql =`DELETE FROM feature where feature_id = ${feature_id}`;
        console.log(sql);
          connection.query(sql, (error, result)=>{
            if (error){
                res.status(400).json({error});    
            }
            res.status(200).json(result);
            console.log(result);
        });
    };

}
     





module.exports = new adminController();