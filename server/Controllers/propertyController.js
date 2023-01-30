const connection = require("../config/db.js");


class propertyController {
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
              res.status(400).json(error);
          }
          res.status(200).json(result);
          console.log(result);
      });
  }
  
// CREAR UN ACTIVO
  createProperty = (req, res) => {
    let {property_user_id, property_subtype_id} = req.params;
    let {property_name} = req.body;

    /* console.log(property_subtype_id, 'SUBTYPEEEEEE'); */
    

    let sql = `INSERT INTO property (property_name, property_user_id, property_subtype_id) VALUES ('${property_name}', ${property_user_id}, ${property_subtype_id})`;

    console.log('SQLLLL', sql);
    

    connection.query(sql, (error, result) => {
      if (error){res.status(400).json(error)}

      console.log(result, "RESULT DEL INSERTTTTTTTTTTTTT");
      
        let property_id = result.insertId;

        let sqlProperty = `SELECT * FROM property WHERE property_id = ${property_id}`;
        
        let sqlInsertPurchase = ` INSERT INTO purchase (purchase_property_id) VALUES (${property_id})`;
        let sqlInsertRent = ` INSERT INTO rent (rent_property_id) VALUES (${property_id})`;
        let sqlInsertLoan = ` INSERT INTO loan (loan_property_id) VALUES (${property_id})`;
        
        connection.query(sqlInsertRent, (errRent, resultRent) => {
          errRent && res.status(400).json({errRent});
          connection.query(sqlInsertLoan, (errLoan, resultLoan) => {
            errLoan && res.status(400).json({errLoan});
            connection.query(sqlInsertPurchase, (errPurchase, resultPurchase) => {
              errPurchase && res.status(400).json({errPurchase});
              connection.query(sqlProperty, (err, resultProperty) => {
                err ? res.status(400).json({err}) : res.status(200).json({resultProperty, resultRent,resultLoan, resultPurchase });
              })
              });
            })
          })
        })
        
  }

//TRAE INFO DE TODAS LA COCINAS
  allKitchens = (req, res) => {
    let sql = 'SELECT * FROM kitchen';
    connection.query(sql, (error, result)=>{
        error ? res.status(400).json({error}) : res.status(200).json(result);
    });
  }

// MODIFICAR LAS CARACTERISTICAS DE UNA PROPIEDAD
  addBasicFeaturesToProperty = (req, res) => {

    let {property_kitchen_id, property_id} = req.params;
    let { property_total_meters, property_built_meters, property_built_year, property_rooms, property_bathrooms, property_garage} = req.body;

    let sql = `UPDATE property SET property_total_meters = ${property_total_meters},
     property_built_meters = ${property_built_meters}, property_built_year = ${property_built_year},
      property_rooms = ${property_rooms}, property_bathrooms = ${property_bathrooms},
       property_garage = ${property_garage}, property_kitchen_id = ${property_kitchen_id}
        WHERE property_id = ${property_id}`;


    let sqlProperty = `SELECT * FROM property WHERE property_id = ${property_id}`;


    connection.query(sql, (error, result)=>{
      if (error) {res.status(400).json({error})}

      connection.query(sqlProperty, (err, resultProperty) => {

        if (err){res.status(400).json(err)}
          res.status(200).json(resultProperty);
      })
  });
  }


    ///Marca una propiedad como en venta
    checkSale = (req, res) => {
        let {property_id, user_id} = req.params;

        let sql = `UPDATE property SET property_is_for_sale = 1 WHERE property_id = '${property_id}'`;
        let sql2 = `SELECT property.*, address.*, purchase.purchase_buy_price FROM property LEFT JOIN address ON property.property_id = address.address_property_id LEFT JOIN purchase ON property.property_id = purchase.purchase_property_id  WHERE property.property_user_id = ${user_id} AND property_is_user_deleted = false ORDER BY property_built_year DESC `;

        connection.query(sql, (error, result) => {

          if (error){
            res.status(400).json(error)}
            console.log(error);
          });
           connection.query(sql2, (error, resultUsers) => {
             error ? res.status(400).json({ error }) : res.status(200).json(resultUsers);
          });
    };

    ///Deshabilita el marcado en venta
    uncheckSale = (req, res) => {
        let {property_id, user_id} = req.params;

        let sql = `UPDATE property SET property_is_for_sale = 0 WHERE property_id = '${property_id}' `;
        let sql2 = `SELECT property.*, address.*, purchase.purchase_buy_price FROM property LEFT JOIN address ON property.property_id = address.address_property_id LEFT JOIN purchase ON property.property_id = purchase.purchase_property_id  WHERE property.property_user_id = ${user_id} AND property_is_user_deleted = false ORDER BY property_built_year DESC `;

        connection.query(sql, (error, result) => {
          if (error){
            res.status(400).json(error)}
            console.log(error);
          });
           connection.query(sql2, (error, resultUsers) => {
             error ? res.status(400).json({ error }) : res.status(200).json(resultUsers);
          });
    };

  
  //Método get descubre (ES TEMPORAL POR FALTA DE ARQUITECTURA)
    showAllDescubre = (req, res) =>{

        // let sql = 'SELECT * from property WHERE property_is_for_sale = true AND property_is_user_deleted = false AND property_is_admin_deleted = false ORDER BY property_built_year DESC';

       let sql = `SELECT property.*, purchase.purchase_buy_price, address.address_city_id, city.city_name, province.province_id, province.province_name, type.type_id, type.type_name, subtype.subtype_name, subtype.subtype_id, kitchen.*
       from property, purchase, address, city, province, type, subtype, kitchen
       where property.property_id = address.address_property_id
       AND address.address_city_id = city.city_id
       AND subtype.subtype_id = type.type_id
       AND city.city_id = province.province_id
       AND property.property_id = purchase.purchase_property_id
       AND property.property_kitchen_id = kitchen.kitchen_id
       AND  property.property_is_for_sale = true
       AND property.property_is_admin_deleted = false
       AND property.property_is_user_deleted = false
       group by property.property_id;`

        connection.query(sql, (error, result)=>{
            error ? res.status(400).json({error}) : res.status(200).json(result);
            
        })
    }

//METODO GET DESCUBRE QUE USAREMOS DE FORMA FINAL
    discover = (req, res) => {
  
      let sql = `SELECT property.property_id, property.property_bathrooms, property.property_is_for_sale, property.property_rooms, property.property_built_meters, property.property_subtype_id, property.property_total_meters, property.property_built_year, 
      property.property_garage, property.property_kitchen_id, address.*, purchase.purchase_buy_price, purchase.purchase_is_new, image.image_title, city.city_name, province.province_name
      FROM property, address, city, province, purchase, image
      where property.property_id = purchase.purchase_property_id 
      and property.property_id = address.address_property_id 
      and address.address_city_id = city.city_id	and  address.address_province_id  = city.city_province_id     
      and city.city_province_id = province.province_id
      and property.property_id = image.image_property_id 
      AND  property.property_is_for_sale = true
      AND property.property_is_admin_deleted = false
      AND property.property_is_user_deleted = false
            AND image.image_is_main = 1;`;

      connection.query(sql, (error, result) => {
        error ? res.status(400).json({error}) : res.status(200).json(result);
        console.log(result, "esto es el result de descubre")
      })
    }




//MUESTRA TODAS LAS PROVINCIAS
    allProvinces = (req, res) => {

      let sql = 'SELECT * FROM province'
    
      connection.query(sql, (error, result)=>{
        error ? res.status(400).json({error}) : res.status(200).json(result);
      })
    }
    
  //MUESTRA TODAS LA CIUDADES
    allCities = (req, res) => {
      let {province_id} = req.params;
      
      let sql = `SELECT * FROM city WHERE city_province_id = ${province_id} `;
    
      connection.query(sql, (error, result) => {
        error ? res.status(400).json({error}) : res.status(200).json(result);
      })
    
    }
    


    //Trae todas las fotos de una propiedad
    //localhost:4000/property/getImagesProperty/:property_id
    getImagesProperty = (req, res) => {
        let {property_id} = req.params;
  
        let sql = `SELECT * FROM image WHERE image_property_id = ${property_id} AND image_is_deleted = 0`;
  
        connection.query(sql, (error, result) => {
          error ? res.status(400).json({ error }) : res.status(200).json(result);
        });
      }
      
//CREAR LA DIRECCION DE UNA PROPIEDAD
      addAddress = (req, res) => {
        let {property_id, province_id, city_id} = req.params;
  
        let {address_street_name, address_street_number, address_floor, address_gate, address_block, address_stair, address_door, address_postal_code} = req.body;

        
  
        let sql = `INSERT INTO address VALUES (${property_id}, "${address_street_name}", "${address_street_number}", "${address_floor}", "${address_gate}", "${address_block}", "${address_stair}", "${address_door}", "${address_postal_code}", ${province_id}, ${city_id})`;
  
        let sqlAddress = `select * from property, address where property.property_id = address.address_property_id and property.property_id = ${property_id} `;
  
        connection.query(sql, (error, result) => {
          if (error){
            res.status(400).json(error)}
          console.log(result);
  
          connection.query(sqlAddress, (errorAddress, resultAddress) => {

            if (errorAddress){
              res.status(400).json(errorAddress)}
            res.status(200).json(resultAddress);
          })
        })
      }
  
      //TRAE INFO DE TODAS LAS CARACTERISTICAS DE  LOS ACTIVOS
      allFeatures = (req, res) => {
        let sql = 'SELECT * FROM feature';
        connection.query(sql, (error, result) => {
          error ? res.status(400).json({error}) : res.status(200).json(result);
        })
      }
  
      // AÑADE CARACTERISTICAS A UN ACTIVO
      addFeaturesToProperty = (req, res) => {
        let {property_id} = req.params;
       
        let features = req.body;

        /* let features = [2,3,1] */
  
        features?.map((feature, index) => {
          let sql = `INSERT INTO feature_property (feature_id, property_id) VALUES ("${feature}", ${property_id})`;
  
          connection.query(sql, (error, result) => {
            if (error){
              res.status(400).json(error)}
          })
        })
  
        res.status(200).send('features save successfully')
      }
  


      //TRAE LA INFO DE LAS CARACTERISTICAS DE UN ACTIVO CONCRETO

      getPropertyFeatures = (req, res) => {
        let {property_id} = req.params;
  
        let sql = `SELECT feature_property.feature_id, feature.feature_name FROM feature_property, feature WHERE feature_property.feature_id = feature.feature_id AND feature_property.property_id = ${property_id}`
  
        connection.query(sql, (error, result) => {
          error ? res.status(400).json({error}) : res.status(200).json(result);
        })
      }

      //Añade Imágenes a una Propiedad
      //localhost:4000/property/addImgsProperty/:property_id
      addImgsProperty = (req, res) => {
        let {property_id} = req.params;

        let img = [''];

        if(req.files != undefined){
          img = req.files;
        }

        console.log(img, 'imagenes q recibo');
        
        let mainImage = img[0].filename

        img.forEach((img) => {

          let sql = '';

          if(mainImage == img.filename){
            sql = `INSERT INTO image (image_title, image_property_id, image_is_main) VALUES('${img.filename}', ${property_id}, true)`
          }
          else {
            sql = `INSERT INTO image (image_title, image_property_id) VALUES('${img.filename}', ${property_id})`;
          }

          connection.query(sql, (error, result) => {

            if (error){
              res.status(400).json(error)}
            })
          })
          
        let sqlImagesProperty = `SELECT * FROM image WHERE image_property_id = ${property_id} AND image_is_deleted = 0`;

        connection.query(sqlImagesProperty, (errorImgs, resultImgs) => {
          errorImgs
            ? res.status(400).json({error})
            : res.status(200).json(resultImgs)
        });
      };

//CREAR ALQUILER

// createRent = (req, res) => {
//   let {property_id} = req.params;

//   let {rent_renting_date, rent_renting_price, rent_expenses} = req.body;
//   console.log(req.body, 'este es el body de create rent');
//   // let sql = `INSERT INTO rent (rent_property_id, rent_renting_date, rent_renting_price, rent_expenses) VALUES (${property_id}, '${rent_renting_date}', ${rent_renting_price}, ${rent_expenses})`;

//   let sqlHead = "INSERT INTO rent (rent_property_id";
//   let sqlTail = `VALUES (${property_id} `;

//   if(rent_renting_date !== undefined){
//     sqlHead += `, rent_renting_date`;
//     sqlTail += `, '${rent_renting_date}'`
//    };
//    if(rent_renting_price !== undefined){
//     sqlHead += `, rent_renting_price`;
//     sqlTail += `, ${rent_renting_price}`
//    };
//    if(rent_expenses !== undefined){
//     sqlHead += `, rent_expenses`;
//     sqlTail += `, ${rent_expenses}`
//    };
//    sqlTail += ')';
//    sqlHead += ')';
//    let sql = sqlHead + " " + sqlTail;


//   connection.query(sql, (error, result)=>{
//       if (error){
//           res.status(400).json({error});
          
//       }
//       res.status(200).json(result);
//       console.log(result, 'este es el resultado de create rent');
//   });
// };

//EDITAR ALQUILER

// editRent = (req, res) => {
//   let {property_id} = req.params;

//   let {rent_renting_date, rent_renting_price, rent_expenses} = req.body;
    
//       if(rent_renting_date != null){
//         if(rent_renting_date.length == 0){
//           rent_renting_date = null;
//         }
//         else if(rent_renting_date.length> 10){
//           rent_renting_date = rent_renting_date.slice(0, 10);
//         }
//       }
//       if(rent_expenses != null){
//           if(rent_expenses.length == 0){
//               rent_expenses = null;
//               }
//           }
//       if(rent_renting_price !=null){
//           if(rent_renting_price.length == 0){
//             rent_renting_price = null;
//               }
//           }

//  let sql = "";

//  if(rent_renting_date == null){
//   sql = `UPDATE rent SET rent_renting_date = ${rent_renting_date}, rent_renting_price = ${rent_renting_price}, rent_expenses = ${rent_expenses} WHERE rent_property_id =${property_id}`;
//  } else {
//   sql = `UPDATE rent SET rent_renting_date = '${rent_renting_date}', rent_renting_price = ${rent_renting_price}, rent_expenses = ${rent_expenses} WHERE rent_property_id =${property_id}`;
//  }
    
//   connection.query(sql, (error, result)=>{
//       if (error){
//           res.status(400).json({error});    
//       }
//       res.status(200).json(result);
//       console.log(result);
//   });
// };

//EDITAR Hipoteca

// editLoan = (req, res) => {
//   let {property_id} = req.params;

//   let {loan_years, loan_interest_rate, loan_type, loan_value} = req.body;

//   if(loan_value != null){
//     if(loan_value.length == 0){
//       loan_value = null;
//     }
//   }
//   if(loan_years != null){
//     if(loan_years.length == 0){
//       loan_years = null;
//     }
//   }
//   if(loan_interest_rate != null){
//     if(loan_interest_rate.length == 0){
//       loan_interest_rate = null;
//     }
//   }

//   let sql = `UPDATE loan SET loan_years = ${loan_years},loan_interest_rate = ${loan_interest_rate}, loan_type = ${loan_type}, loan_value = ${loan_value} WHERE loan_property_id = ${property_id}`;
    
//   connection.query(sql, (error, result)=>{
//       if (error){
//           res.status(400).json({error});    
//       }
//       res.status(200).json(result);
//       console.log(result);
//   });
// };

//editPurchase, rent y loan
editPurchase = (req,res) => {
  let {property_id} = req.params;

  // let {purchase_buy_price, purchase_buy_date, purchase_is_new, purchase_furniture_expenses, purchase_reform_expenses,purchase_ownership_percentage, purchase_is_usual, purchase_entry_expenses, purchase_trading_expenses } = req.body;

  console.log(req.body, 'req.bodyyyy');
  let sql = '';

  for(const [field, value] of Object.entries(req.body)){
    

    if(field == "purchase_buy_date" && value != null){

     sql = `UPDATE purchase SET ${field} = date_format('${value}', '%Y-%m-%d')  WHERE purchase_property_id = ${property_id}`;
     connection.query(sql, (error, result)=>{
      if (error){
        throw (error)  
      } 
    });
    } 
    if(field == "purchase_buy_price" || field == "purchase_is_new" || field == "purchase_furniture_expenses" || field == "purchase_reform_expenses" || field == "purchase_ownership_percentage" || field == "purchase_is_usual" || field == "purchase_entry_expenses" || field == "purchase_trading_expenses") {
      sql = `UPDATE purchase SET ${field} = ${value} WHERE purchase_property_id = ${property_id}`;
      connection.query(sql, (error, result)=>{
        if (error){
          throw (error)  
        } 
      });
    } 

   

    if(field == "rent_renting_date" && value != null){

      sql = `UPDATE rent SET ${field} = date_format('${value}', '%Y-%m-%d') WHERE rent_property_id = ${property_id}`;
      connection.query(sql, (error, result)=>{
       if (error){
         throw (error)  
       } 
     });
     } 
    if (field == "rent_renting_price" || field == "rent_expenses" ){
      sql = `UPDATE rent SET ${field} = ${value} WHERE rent_property_id = ${property_id}`
      connection.query(sql, (error, result)=>{
        if (error){
          throw (error)  
        } 
      });
    }
    if (field == "loan_years" || field == "loan_interest_rate" || field == "loan_type" || field == "loan_value"){
      sql = `UPDATE loan SET ${field} = ${value} WHERE loan_property_id = ${property_id}`
      connection.query(sql, (error, result)=>{
        if (error){
          throw (error)  
        } 
      });
    }
  
  }
  res.status(200).send('insert correctos');
  console.log('correctos');
  
  


//   if(purchase_buy_price && purchase_buy_price.length > 0 ||
//     purchase_buy_date && purchase_buy_date.length > 0 ||
//     purchase_entry_expenses && purchase_entry_expenses.length > 0 ||
//     purchase_trading_expenses && purchase_trading_expenses.length > 0 ||
//     purchase_reform_expenses && purchase_reform_expenses.length > 0 ||
//     purchase_furniture_expenses && purchase_furniture_expenses.length > 0 ||
//     purchase_ownership_percentage && purchase_ownership_percentage.length > 0
//   ){
//     sql = `UPDATE purchase SET purchase_buy_price = ${purchase_buy_price},purchase_buy_date = '${purchase_buy_date}', purchase_is_new = ${purchase_is_new}, purchase_furniture_expenses = ${purchase_furniture_expenses}, purchase_reform_expenses = ${purchase_reform_expenses},purchase_ownership_percentage = ${purchase_ownership_percentage}, purchase_is_usual = ${purchase_is_usual},  purchase_entry_expenses = ${purchase_entry_expenses}, purchase_trading_expenses = ${purchase_trading_expenses} WHERE purchase_property_id = ${property_id}`;
//   } 




  // if(!purchase_buy_date ){
  //   sql = `UPDATE purchase SET purchase_buy_price = ${purchase_buy_price},purchase_buy_date = ${purchase_buy_date}, purchase_is_new = ${purchase_is_new}, purchase_furniture_expenses = ${purchase_furniture_expenses}, purchase_reform_expenses = ${purchase_reform_expenses},purchase_ownership_percentage = ${purchase_ownership_percentage}, purchase_is_usual = ${purchase_is_usual},  purchase_entry_expenses = ${purchase_entry_expenses}, purchase_trading_expenses = ${purchase_trading_expenses} WHERE purchase_property_id = ${property_id}`;
  // }else {
  //   sql = `UPDATE purchase SET purchase_buy_price = ${purchase_buy_price},purchase_buy_date = '${purchase_buy_date}', purchase_is_new = ${purchase_is_new}, purchase_furniture_expenses = ${purchase_furniture_expenses}, purchase_reform_expenses = ${purchase_reform_expenses},purchase_ownership_percentage = ${purchase_ownership_percentage}, purchase_is_usual = ${purchase_is_usual},  purchase_entry_expenses = ${purchase_entry_expenses}, purchase_trading_expenses = ${purchase_trading_expenses} WHERE purchase_property_id = ${property_id}`;
  // }



}


 //ELIMINA FOTO de una Propiedad
//localhost:4000/property/deleteImageProperty/:image_id/:property_id
      deleteInitialImageProperty = (req, res) => {

        let {image_id, property_id} = req.params;

        let sql = `DELETE FROM image WHERE image_id = ${image_id}`;

        let sqlImagesProperty = `SELECT * FROM image WHERE image_property_id = ${property_id}`;

        connection.query(sql, (error, result) => {
          if (error) {res.status(400).json({error})}
          connection.query(sqlImagesProperty, (errorImgs, resultImgs) => {
            if (errorImgs) {res.status(400).json({errorImgs})}
            res.status(200).json(resultImgs);
          })
        })
      }

      //Setear FOTO PRINCIPAL de una propiedad
      //localhost:4000/property/setMainImage/:image_id/:property_id
      setMainImage = (req, res) => {
        let {image_id, property_id} = req.params;

        let unSetMainSql = 'UPDATE image SET image_is_main = false'

        let sql = `UPDATE image SET image_is_main = true WHERE image.image_id = ${image_id}`;

        let sqlImagesProperty = `SELECT * FROM image WHERE image_property_id = ${property_id}`;

        connection.query(unSetMainSql, (errorUnSet, resultUnSet) => {
          if (errorUnSet) {res.status(400).json({errorUnSet})}
          connection.query(sql, (error, result) => {
            if (error) {res.status(400).json({error})}
            connection.query(sqlImagesProperty, (errorImgs, resultImgs) => {
              if (errorImgs) {res.status(400).json({errorImgs})}
              res.status(200).json(resultImgs);
            })
          })
        })
      }

      //Deshacer FOTO PRINCIPAL de una propiedad
      //localhost:4000/property/unSetMainImage/:image_id/:property_id

      unSetMainImage = (req, res) => {
        let {image_id, property_id} = req.params;

        let sql = `UPDATE image SET image_is_main = false WHERE image.image_id = ${image_id}`;

        let sqlImagesProperty = `SELECT * FROM image WHERE image_property_id = ${property_id}`;

        connection.query(sql, (error, result) => {
          if (error) {res.status(400).json({error})}
          connection.query(sqlImagesProperty, (errorImgs, resultImgs) => {
            if (errorImgs) {res.status(400).json({errorImgs})}
            res.status(200).json(resultImgs);
          })
        })
      }




//crear loan
// createLoan = (req,res) => {
//   let {property_id} = req.params;

//   let {loan_years, loan_interest_rate,loan_type,loan_value } = req.body;

//   console.log('este es el req.body de create loan', req.body);
//   // let sql = `INSERT INTO loan (loan_property_id, loan_years, loan_interest_rate, loan_type, loan_value) VALUES (${property_id}, ${loan_years}, ${loan_interest_rate}, ${loan_type}, ${loan_value})`;

//   let sqlHead = "INSERT INTO loan (loan_property_id";
//   let sqlTail = `VALUES (${property_id} `;

//   if(loan_years !== undefined){
//     sqlHead += `, loan_years`;
//     sqlTail += `, ${loan_years}`
//    };
//    if(loan_interest_rate !== undefined ){
//     sqlHead += `, loan_interest_rate`;
//     sqlTail += `, ${loan_interest_rate}`
//    };
//    if(loan_type !== undefined){
//     sqlHead += `, loan_type`;
//     sqlTail += `, ${loan_type}`
//    };
//    if(loan_value !== undefined){
//     sqlHead += `, loan_value`;
//     sqlTail += `, ${loan_value}`
//    };

//    sqlHead += ')';
//    sqlTail += ')';
   
//    let sql = sqlHead + " " + sqlTail;

//       connection.query(sql, (error, resultLoan)=>{
//       if (error){
//           res.status(400).json({error});
//           console.log(error, 'este es el error de loan');
//       }
//       res.status(200).json(resultLoan);
//       console.log('este es el resultado de loan',resultLoan);
//  })
// }



//crear purchase
// createPurchase = (req,res) =>{
//   let {property_id} = req.params;
  

//   let {purchase_buy_price, purchase_buy_date, purchase_is_new, purchase_furniture_expenses, purchase_reform_expenses,purchase_ownership_percentage, purchase_is_usual, purchase_entry_expenses ,purchase_trading_expenses } = req.body;

//  purchase_is_new === 'true' ? true : false;

//  console.log('este es el req.body de create purchase', req.body);
    
  // let sql = `INSERT INTO purchase (purchase_property_id, purchase_buy_price, purchase_buy_date, purchase_is_new, purchase_furniture_expenses, purchase_reform_expenses,purchase_ownership_percentage, purchase_is_usual, purchase_entry_expenses ,purchase_trading_expenses) VALUES (${property_id}, ${purchase_buy_price}, '${purchase_buy_date}', ${purchase_is_new}, ${purchase_furniture_expenses}, ${purchase_reform_expenses},${purchase_ownership_percentage},${purchase_is_usual},${purchase_entry_expenses}, ${purchase_trading_expenses})`;


//  let sqlHead = "INSERT INTO purchase (purchase_property_id";
//  let sqlTail = `VALUES (${property_id} ` ;


// if(purchase_buy_date !== undefined){
//  sqlHead += `, purchase_buy_date`;
//  sqlTail += `, '${purchase_buy_date}'`
// };

// if(purchase_buy_price !== undefined){
//   sqlHead += `, purchase_buy_price` 
//   sqlTail += `, ${purchase_buy_price}`
// }

// if(purchase_is_new !== undefined){
//   sqlHead += `, purchase_is_new`
//   sqlTail += `, ${purchase_is_new}`
// }

// if(purchase_furniture_expenses !== undefined){
//   sqlHead += `, purchase_furniture_expenses`
//   sqlTail += `, ${purchase_furniture_expenses}`
// }

// if(purchase_reform_expenses !== undefined){
//   sqlHead += `, purchase_reform_expenses`
//   sqlTail += `, (${purchase_reform_expenses})`
// }    
// if(purchase_ownership_percentage !== undefined){
//   sqlHead += `, purchase_ownership_percentage`
//   sqlTail += `, ${purchase_ownership_percentage}`
// }

// if(purchase_is_usual !== undefined){
//   sqlHead += `, purchase_is_usual`
//   sqlTail += `, ${purchase_is_usual}`
// }
// if(purchase_entry_expenses !== undefined){
//   sqlHead += `, purchase_entry_expenses`
//   sqlTail += `, ${purchase_entry_expenses}`
// }
// if(purchase_trading_expenses !== undefined){
//   sqlHead += `, purchase_trading_expenses`
//   sqlTail += `, ${purchase_trading_expenses}`
// }
// sqlTail += ')';
// sqlHead += ')';
// let sql = sqlHead + " " + sqlTail;


//       connection.query(sql, (error, resultPurchase)=>{
//       if (error){
//           // res.status(400).json({error});
//           if (error){
//             res.status(400).json(error)}
//           console.log(error, 'este es el error de purchase');
//       }
//       res.status(200).json(resultPurchase);
//       console.log(resultPurchase);
//       })
// }
  
//trae todos los datos de purchase, rent y loan
getAllPurchaseData = (req, res) => {
  let {property_id} = req.params;
  
  let sql = `select loan.*, purchase.purchase_property_id, purchase.purchase_buy_price, date_format(purchase.purchase_buy_date, '%Y-%m-%d') as purchase_buy_date, purchase.purchase_is_new, purchase.purchase_furniture_expenses, purchase.purchase_reform_expenses, purchase.purchase_ownership_percentage,purchase.purchase_is_usual, purchase.purchase_entry_expenses, purchase.purchase_trading_expenses, date_format(rent.rent_renting_date, '%Y-%m-%d') as rent_renting_date, rent.rent_property_id, rent.rent_renting_price, rent.rent_expenses from loan , purchase, rent
            where loan.loan_property_id = ${property_id}
            and rent.rent_property_id = ${property_id}
            and purchase.purchase_property_id = ${property_id}`;
  
            connection.query(sql, (error, result)=>{
              if (error){
                  res.status(400).json({error});
                  console.log(error, 'este es el error de getallpurchase');
              }
              res.status(200).json(result);
              console.log(result);
          })
}
  
  
    propertyDetails = (req, res) => {
        let {property_id, user_id} = req.params;
  
        let sql = `SELECT * FROM property WHERE property_user_id = ${user_id} AND property_id = ${property_id} `;
  
        connection.query(sql, (error, result) => {
          error ? res.status(400).json({error}) : res.status(200).json(result);
        })
      }


      

      propertyDetailsImg = (req, res) => {
        let {property_id} = req.params;
  
        let sql = `SELECT  * FROM image WHERE image_property_id = ${property_id} AND image_is_deleted = 0 `;
  
        connection.query(sql, (error, result) => {
          error ? res.status(400).json({error}) : res.status(200).json(result);
        })
      }


      

      propertyDetailsAddress = (req, res) => {
        let {property_id} = req.params;
  
        let sql = `SELECT  * FROM address WHERE address_property_id = ${property_id} `;
  
        connection.query(sql, (error, result) => {
          error ? res.status(400).json({error}) : res.status(200).json(result);
        })
      }


      propertyDetailsPurchase = (req, res) => {
        let {property_id} = req.params;
  
        let sql = `SELECT  * FROM purchase WHERE purchase_property_id = ${property_id} `;
  
        connection.query(sql, (error, result) => {
          error ? res.status(400).json({error}) : res.status(200).json(result);
        })
      }


      propertyDetailsProvinceCity = (req, res) => {
        let {property_id} = req.params;
  
        let sql = `SELECT property.*, address.*, city.city_name, province.province_name, type.type_id
        FROM property, address, city, province , type, subtype
        WHERE  property.property_id = address.address_property_id
        AND address.address_city_id = city.city_id
        AND city.city_province_id = province.province_id
        AND property.property_subtype_id = subtype.subtype_id
        AND subtype.subtype_type_id = type.type_id
        AND property.property_id = ${property_id}
        GROUP BY province.province_id
        HAVING province.province_id = address.address_province_id;`;
  
        connection.query(sql, (error, result) => {
          error ? res.status(400).json({error}) : res.status(200).json(result);
        })
      }


      propertyDetailsSubtype = (req, res) => {
        let {property_id} = req.params;
  
        let sql = `SELECT subtype.subtype_name FROM property, subtype WHERE property.property_subtype_id = subtype.subtype_id AND property_id = ${property_id} `;
  
        connection.query(sql, (error, result) => {
          error ? res.status(400).json({error}) : res.status(200).json(result);
        })
      }

      propertyDetailsRent = (req, res) => {
        let {property_id} = req.params;
  
        let sql = `SELECT * FROM rent WHERE rent_property_id = ${property_id} `;
  
        connection.query(sql, (error, result) => {
          error ? res.status(400).json({error}) : res.status(200).json(result);
        })
      }
      

      propertyDetailsLoan = (req, res) => {
        let {property_id} = req.params;
  
        let sql = `SELECT * FROM loan WHERE loan_property_id = ${property_id} `;
  
        connection.query(sql, (error, result) => {
          error ? res.status(400).json({error}) : res.status(200).json(result);
        })
      }


      
      

      discover = (req, res) => {
  
        let sql = `SELECT property.property_id, property.property_bathrooms, property.property_rooms, property.property_built_meters, property.property_total_meters, 
        property.property_garage, property.property_kitchen_id, address.*,property.property_is_for_sale, purchase.purchase_buy_price, purchase.purchase_is_new, 
        image.image_title, province.province_id,city.city_name, province.province_name, type.*, subtype.subtype_id, subtype.subtype_name, kitchen.*
        FROM property, address, city, province, purchase, image, type, subtype, kitchen
        where property.property_id = purchase.purchase_property_id 
        AND property.property_subtype_id = subtype.subtype_id
        AND subtype.subtype_type_id = type.type_id
        AND property.property_kitchen_id = kitchen.kitchen_id
        and property.property_id = address.address_property_id 
        and address.address_city_id = city.city_id	and  address.address_province_id  = city.city_province_id      
        and city.city_province_id = province.province_id
        and property.property_id = image.image_property_id 
        AND  property.property_is_for_sale = true
        AND property.property_is_admin_deleted = false
        AND property.property_is_user_deleted = false
              AND image.image_is_main = 1;`;
  
        connection.query(sql, (error, result) => {
          error ? res.status(400).json({error}) : res.status(200).json(result);
        })
      }
  
      
      fav = (req, res) => {
    let {user_id, property_id} = req.params;
        console.log(user_id, property_id, "SOMOS LOS ID")
    let sql = `INSERT INTO favourite(favourite_user_id, favourite_property_id) VALUES (${user_id}, ${property_id})`;
  
        connection.query(sql, (error, result) => {
          error ? res.status(400).json({error}) : res.status(200).json(result);
        })
      }

      
      unfav = (req, res) => {
        let {user_id, property_id} = req.params;
        
        let sql = `DELETE FROM favourite WHERE favourite_user_id = ${user_id} AND  favourite_property_id = ${property_id}`;
      
            connection.query(sql, (error, result) => {
              error ? res.status(400).json({error}) : res.status(200).json(result);
            })
          }



        favUser = (req, res) => {
        let {user_id} = req.params;
        console.log("Hola")
        let sql = `SELECT property.*, image.image_title 
        FROM property, favourite, image 
        WHERE favourite.favourite_property_id = property.property_id
         AND image.image_property_id = property.property_id 
         AND image.image_is_main = 1 
         AND favourite.favourite_user_id = ${user_id}`;
          
         connection.query(sql, (error, result) => {
          error ? res.status(400).json({error}) : res.status(200).json(result);
           })
        }      

  

        //SACA TODAS LA ENTRADAS DE FEATURES_PROPERTY PARA FILTRAR EN DESCUBRE.
        //localhost:4000/property/discover/allpropertywithfeature
        getAllFeature_Property = (req, res) =>{
          let sql = 'select * from feature_property ORDER BY property_id;'

          connection.query(sql, (error, result)=>{
            error ? res.status(400).json({error}) : res.status(200).json(result);
          })
        }



}













module.exports = new propertyController();