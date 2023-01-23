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
              res.status(400).json({error});
          }
          res.status(200).json(result);
          console.log(result);
      });
  }
  
// CREAR UN ACTIVO
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

    connection.query(sql, (error, result)=>{
      if (error) throw error;

      let sqlProperty = `SELECT * FROM property WHERE property_id = ${property_id}`;

      connection.query(sqlProperty, (err, resultProperty) => {
          if(err) throw err;
          res.status(200).json(resultProperty);
      })
  });
  }


    ///Marca una propiedad como en venta
    checkSale = (req, res) => {
        let {property_id, property_user_id} = req.params;

        let sql = `UPDATE property SET property_is_for_sale = 1 WHERE property_id = '${property_id}' AND property_user_id = '${property_user_id}'`;
        let sql2 = `SELECT * from property WHERE property_user_id = '${property_user_id}'`;

        connection.query(sql, (error, result) => {
            if (error) throw error;
            console.log(error);
          });
           connection.query(sql2, (error, resultUsers) => {
             error ? res.status(400).json({ error }) : res.status(200).json(resultUsers);
          });
    };

    ///Deshabilita el marcado en venta
    uncheckSale = (req, res) => {
        let {property_id, property_user_id} = req.params;

        let sql = `UPDATE property SET property_is_for_sale = 0 WHERE property_id = '${property_id}' AND property_user_id = '${property_user_id}'`;
        let sql2 = `SELECT * from property WHERE property_user_id = '${property_user_id}'`;

        connection.query(sql, (error, result) => {
            if (error) throw error;
            console.log(error);
          });
           connection.query(sql2, (error, resultUsers) => {
             error ? res.status(400).json({ error }) : res.status(200).json(resultUsers);
          });
    };

  
  //Método get descubre
    showAllDescubre = (req, res) =>{

        let sql = 'SELECT * from property WHERE property_is_for_sale = true AND property_is_user_deleted = false AND property_is_admin_deleted = false ORDER BY property_built_year DESC';

        connection.query(sql, (error, result)=>{
            error ? res.status(400).json({error}) : res.status(200).json(result);
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
          if(error) throw error;
          console.log(result);
  
          connection.query(sqlAddress, (errorAddress, resultAddress) => {
            if(errorAddress) throw errorAddress;
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
            if(error) throw error;
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

        img.forEach((img) => {
          let sql = `INSERT INTO image (image_title, image_property_id) VALUES('${img.filename}', ${property_id})`;

          connection.query(sql, (error, result) => {
            if(error) throw error;
            console.log(result);
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

createRent = (req, res) => {
  let {property_id} = req.params;

  let {rent_renting_date, rent_renting_price, rent_expenses} = req.body;
  console.log(req.body, 'este es el body de create rent');
  
  // let sql = `INSERT INTO rent (rent_property_id, rent_renting_date, rent_renting_price, rent_expenses) VALUES (${property_id}, '${rent_renting_date}', ${rent_renting_price}, ${rent_expenses})`;

  let sqlHead = "INSERT INTO rent (rent_property_id";
  let sqlTail = `VALUES (${property_id} `;

  if(rent_renting_date !== undefined){
    sqlHead += `, rent_renting_date`;
    sqlTail += `, '${rent_renting_date}'`
   };
   if(rent_renting_price !== undefined){
    sqlHead += `, rent_renting_price`;
    sqlTail += `, ${rent_renting_price}`
   };
   if(rent_expenses !== undefined){
    sqlHead += `, rent_expenses`;
    sqlTail += `, ${rent_expenses}`
   };
   sqlTail += ')';
   sqlHead += ')';
   let sql = sqlHead + " " + sqlTail;


  connection.query(sql, (error, result)=>{
      if (error){
          res.status(400).json({error});
          
      }
      res.status(200).json(result);
      console.log(result, 'este es el resultado de create rent');
  });
};

//EDITAR ALQUILER

editRent = (req, res) => {
  let {rent_id} = req.params;

  let {rent_renting_date, rent_renting_price, rent_expenses} = req.body;

  let sql = `UPDATE rent SET rent_renting_date = '${rent_renting_date}', rent_renting_price = ${rent_renting_price}, rent_expenses = ${rent_expenses}WHERE rent_id = ${rent_id}`;
  
  connection.query(sql, (error, result)=>{
      if (error){
          res.status(400).json({error});    
      }
      res.status(200).json(result);
      console.log(result);
  });
};

//crear loan
createLoan = (req,res) => {
  let {property_id} = req.params;

  let {loan_years, loan_interest_rate,loan_type,loan_value } = req.body;

  console.log('este es el req.body de create loan', req.body);
  // let sql = `INSERT INTO loan (loan_property_id, loan_years, loan_interest_rate, loan_type, loan_value) VALUES (${property_id}, ${loan_years}, ${loan_interest_rate}, ${loan_type}, ${loan_value})`;

  let sqlHead = "INSERT INTO loan (loan_property_id";
  let sqlTail = `VALUES (${property_id} `;

  if(loan_years !== undefined){
    sqlHead += `, loan_years`;
    sqlTail += `, ${loan_years}`
   };
   if(loan_interest_rate !== undefined ){
    sqlHead += `, loan_interest_rate`;
    sqlTail += `, ${loan_interest_rate}`
   };
   if(loan_type !== undefined){
    sqlHead += `, loan_type`;
    sqlTail += `, ${loan_type}`
   };
   if(loan_value !== undefined){
    sqlHead += `, loan_value`;
    sqlTail += `, ${loan_value}`
   };

   sqlHead += ')';
   sqlTail += ')';
   
   let sql = sqlHead + " " + sqlTail;

      connection.query(sql, (error, resultLoan)=>{
      if (error){
          res.status(400).json({error});
          console.log(error, 'este es el error de loan');
      }
      res.status(200).json(resultLoan);
      console.log('este es el resultado de loan',resultLoan);
 })
}



//crear purchase
createPurchase = (req,res) =>{
  let {property_id} = req.params;
  

  let {purchase_buy_price, purchase_buy_date, purchase_is_new, purchase_furniture_expenses, purchase_reform_expenses,purchase_ownership_percentage, purchase_is_usual, purchase_entry_expenses ,purchase_trading_expenses } = req.body;

 purchase_is_new === 'true' ? true : false;

 console.log('este es el req.body de create purchase', req.body);
    
  // let sql = `INSERT INTO purchase (purchase_property_id, purchase_buy_price, purchase_buy_date, purchase_is_new, purchase_furniture_expenses, purchase_reform_expenses,purchase_ownership_percentage, purchase_is_usual, purchase_entry_expenses ,purchase_trading_expenses) VALUES (${property_id}, ${purchase_buy_price}, '${purchase_buy_date}', ${purchase_is_new}, ${purchase_furniture_expenses}, ${purchase_reform_expenses},${purchase_ownership_percentage},${purchase_is_usual},${purchase_entry_expenses}, ${purchase_trading_expenses})`;


 let sqlHead = "INSERT INTO purchase (purchase_property_id";
 let sqlTail = `VALUES (${property_id} ` ;


if(purchase_buy_date !== undefined){
 sqlHead += `, purchase_buy_date`;
 sqlTail += `, '${purchase_buy_date}'`
};

if(purchase_buy_price !== undefined){
  sqlHead += `, purchase_buy_price` 
  sqlTail += `, ${purchase_buy_price}`
}

if(purchase_is_new !== undefined){
  sqlHead += `, purchase_is_new`
  sqlTail += `, ${purchase_is_new}`
}

if(purchase_furniture_expenses !== undefined){
  sqlHead += `, purchase_furniture_expenses`
  sqlTail += `, ${purchase_furniture_expenses}`
}

if(purchase_reform_expenses !== undefined){
  sqlHead += `, purchase_reform_expenses`
  sqlTail += `, (${purchase_reform_expenses})`
}

if(purchase_ownership_percentage !== undefined){
  sqlHead += `, purchase_ownership_percentage`
  sqlTail += `, ${purchase_ownership_percentage}`
}

if(purchase_is_usual !== undefined){
  sqlHead += `, purchase_is_usual`
  sqlTail += `, ${purchase_is_usual}`
}
if(purchase_entry_expenses !== undefined){
  sqlHead += `, purchase_entry_expenses`
  sqlTail += `, ${purchase_entry_expenses}`
}
if(purchase_trading_expenses !== undefined){
  sqlHead += `, purchase_trading_expenses`
  sqlTail += `, ${purchase_trading_expenses}`
}
sqlTail += ')';
sqlHead += ')';
let sql = sqlHead + " " + sqlTail;

      connection.query(sql, (error, resultPurchase)=>{
      if (error){
          // res.status(400).json({error});
          throw(error);
          console.log(error, 'este es el error de purchase');
      }
      res.status(200).json(resultPurchase);
      console.log(resultPurchase);
      })
}
//trae todos los datos de purchase, rent y loan
getAllPurchaseData = (req, res) => {
  let {property_id} = req.params;
  
  let sql = `select * from purchase, rent, loan 
            where ${property_id} = rent_property_id
            and ${property_id} = loan_property_id`;
  
            connection.query(sql, (error, result)=>{
              if (error){
                  res.status(400).json({error});
                  console.log(error, 'este es el error de getallpurchase');
              }
              res.status(200).json(result);
              console.log(result);
          })
}
}









module.exports = new propertyController();