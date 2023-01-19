const connection = require("../config/db.js");


class propertyController {
    

    createProperty = (req, res) => {
        let {property_kitchen_id, property_address_id, property_subtype_id, property_rent_id } = req.params;

        let {property_bathrooms, property_rooms, property_built_meters, property_total_meters, property_built_year, property_garage, property_name } = req.body;

        let sql = `INSERT INTO property (property_kitchen_id, property_address_id, property_subtype_id, property_rent_id, property_bathrooms, property_rooms, property_built_meters, property_total_meters, property_built_year, property_garage, property_name ) VALUES (${property_kitchen_id}, ${property_address_id}, ${property_subtype_id}, ${property_rent_id}, ${property_bathrooms}, ${property_rooms}, ${property_built_meters}, ${property_total_meters}, ${property_built_year}, ${property_garage}, ${property_name}) `;
        
        connection.query(sql, (error, result)=>{
            if (error){
                res.status(400).json({error});
                
            }
            res.status(200).json(result);
            console.log(result);
        });
    }
    



    imgOneProperty = (req, res) => {
        const {image_property_id} = req.params;
    
        let sql = `SELECT * FROM image WHERE image_property_id = ${image_property_id} and image_is_deleted = false`;
        let sql2 = `SELECT * FROM property WHERE property_id = ${image_property_id} and is_deleted = false`;
        connection.query(sql, (error, result) => {
          if (error) {
            res.status(400).json({ error });
          }
          connection.query(sql2, (error2, result2) => {
            if (error2) {
              res.status(400).json({ error2 });
            }
            res.status(200).json({ result, result2 });
          });
        });
      };




    //Elimina una imagen
    deletePhoto = (req, res) => {
        const {image_id} = req.params;
        let sql = `UPDATE image SET image_is_deleted = true WHERE image_id = ${image_id}`;
        connection.query(sql, (error, result)=>{
            if (error){
                res.status(400).json({error});
                
            }
            res.status(200).json(result);
            console.log(result);
        });
      };


   //Añade imágenes a una propiedad en concreto 
  addImgs = (req, res) => {
    
    let {image_property_id} = req.params;;
    let img = [""];

    if (req.files != undefined) {
      img = req.files;
    }

    img.forEach((img) => {
      let sql = `INSERT INTO image (image_title, mage_property_id) VALUES ('${img.filename}', ${image_property_id}) `;
      connection.query(sql, (error, result) => {
        if (error) throw error;
        console.log(result);
      });
    });

    let sql2 = `SELECT * FROM image WHERE image_property_id = ${image_property_id} AND image_is_deleted = 0`;

    connection.query(sql2, (error, resultado2) => {
      error
        ? res.status(400).json({ error })
        : res.status(200).json(resultado2);
    });
  };


   
    //marca una imagen como principal
    mainImage = (req, res) => {
        const {image_id} = req.params;
        let sql = `UPDATE image SET image_is_main = true WHERE image_id = ${image_id}`;
        connection.query(sql, (error, result)=>{
            if (error){
                res.status(400).json({error});
                
            }
            res.status(200).json(result);
            console.log(result);
        });
      };








      ////////////////////////////////////////////////////////////////////////////////////////////////////// 
    
    /* Mostrar Todos los TIPOS */
    showAllTypes = (req, res) => {
      let sql = 'SELECT * FROM type';

      connection.query(sql, (error, result) => {
          if(error){res.status(400).json({error})};
          res.status(200).json(result)
      })
  }

  /* Mostra Todos los SUBTIPOS de cada Tipo */
  showAllSubTypes = (req, res) => {
      let {type_id} = req.params;
      let sql = `select * from subtype where subtype_type_id = ${type_id}`

      connection.query(sql, (error, result)=>{
          if (error){
              res.status(400).json({error});
          }
          res.status(200).json(result);
          console.log(result);
      });
  }
  

  createProperty = (req, res) => {
    let {property_user_id, property_subtype_id} = req.params;
    let {property_name} = req.body;

    property_name.trim();

    let sql = `INSERT INTO property (property_name, property_user_id, property_subtype_id) VALUES ('${property_name}', ${property_user_id}, ${property_subtype_id})`;

    connection.query(sql, (error, result)=>{
        if (error) throw error;
        let property_id = result.insertId;

        let sqlProperty = `SELECT * FROM property WHERE property_id = ${property_id}`;

        connection.query(sqlProperty, (err, resultProperty) => {
            if(err) throw err;
            res.status(200).json(resultProperty);
        })
    });
}


  allKitchens = (req, res) => {
    let sql = 'SELECT * FROM kitchen';
    connection.query(sql, (error, result)=>{
        error ? res.status(400).json({error}) : res.status(200).json(result);
    });
  }












}

module.exports = new propertyController();