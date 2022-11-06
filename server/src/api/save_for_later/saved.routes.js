const express = require('express');
const router = express.Router();
const dbConn = require('../../dbconnection.js');


// [Saved_For_Later] Routes
// User_ID. INT
// Product_ID. INT
// DATE_ADDED. DATETIME

// Path: server/src/api/save_to_later/saved.routes.js

// add to saved for later
// post request
// input: user_id, product_id
router.post('/addsavedforlater', async(req, res, next) =>{
    // safe guard against sql injection
    // validate input
    // check if user exists
    if(!req.body.user_id){
        return res.status(400).send({
            message: "user_id can not be empty"
        });
    }
    if(!req.body.product_id){
        return res.status(400).send({
            message: "product_id can not be empty"
        });
    }
    // check if user exists
    dbConn.query('SELECT * FROM User WHERE User_ID=?', req.body.user_id, (err, result)=>{
        if(err){
            return res.status(400).send({
                message: "user does not exist"
            });
        }
        // check if product exists
        dbConn.query('SELECT * FROM Product WHERE Product_ID=?', req.body.product_id, (err, result)=>{
            if(err){
                return res.status(400).send({
                    message: "product does not exist"
                });
            }
            // add to saved for later
            dbConn.query('INSERT INTO Saved_For_Later SET ?', req.body, (err, result)=>{
                if(err){
                    return res.status(400).send({
                        message: "product already saved for later"
                    });
                }
                return res.status(200).send({
                    message: "product saved for later"
                });
            });
        });
    });
}
);

// remove from saved for later
// delete request
// input: user_id, product_id
router.delete('/removesavedforlater', async(req, res, next) =>{
    // safe guard against sql injection
    // validate input
    // check if user exists
    if(!req.body.user_id){
        return res.status(400).send({
            message: "user_id can not be empty"
        });
    }
    if(!req.body.product_id){
        return res.status(400).send({
            message: "product_id can not be empty"
        });
    }
    // check if user exists
    dbConn.query('SELECT * FROM User WHERE User_ID=?', req.body.user_id, (err, result)=>{
        if(err){
            return res.status(400).send({
                message: "user does not exist"
            });
        }
        // check if product exists
        dbConn.query('SELECT * FROM Product WHERE Product_ID=?', req.body.product_id, (err, result)=>{
            if(err){
                return res.status(400).send({
                    message: "product does not exist"
                });
            }
            // remove from saved for later
            dbConn.query('DELETE FROM Saved_For_Later WHERE User_ID=? AND Product_ID=?', [req.body.user_id, req.body.product_id], (err, result)=>{
                if(err){
                    return res.status(400).send({
                        message: "product not saved for later"
                    });
                }
                return res.status(200).send({
                    message: "product removed from saved for later"
                });
            });
        });
    });
}
);

// get saved for later
// get request
// input: user_id
router.get('/getsavedforlater', async(req, res, next) =>{
    // safe guard against sql injection
    // validate input
    // check if user exists
    if(!req.body.user_id){
        return res.status(400).send({
            message: "user_id can not be empty"
        });
    }
    // check if user exists
    dbConn.query('SELECT * FROM User WHERE User_ID=?', req.body.user_id, (err, result)=>{
        if(err){
            return res.status(400).send({
                message: "user does not exist"
            });
        }
        // get saved for later
        dbConn.query('SELECT * FROM Saved_For_Later WHERE User_ID=?', req.body.user_id, (err, result)=>{
            if(err){
                return res.status(400).send({
                    message: "no products saved for later"
                });
            }
            return res.status(200).send({
                message: "products saved for later",
                data: result
            });
        });
    });
}
);

module.exports = router;
