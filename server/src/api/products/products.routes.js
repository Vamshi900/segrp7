const express = require('express');
const router = express.Router();
const dbConn = require('../../dbconnection.js');

// GET Products
router.get('/:Product_ID', async(req, res, next) =>{
    let Product_ID = req.params.Product_ID;
    if (!isNaN(Product_ID)){
        id = parseInt(Product_ID);
        dbConn.query('SELECT * FROM Products WHERE Product_ID=?', id, (err, result)=>{
            if(err){
                console.log('Error while fetching employee by id', err);
            }else{
                console.log(JSON.stringify(result));
                res.json(result);
            }
        });
    }
});

module.exports = router;