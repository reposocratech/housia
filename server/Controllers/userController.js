const connection = require("../config/db.js");

class userController {

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



}
module.exports = new userController();