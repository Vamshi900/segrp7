const express = require('express');
const router = express.Router();
const dbConn = require('../../dbconnection.js');

//[cart] Routes
// User_ID. INT
// Product_ID. INT
// Quantity. INT
// DATE_ADDED. DATETIME


// Path: server/src/api/cart/cart.routes.js

// add to cart
// post request
// input: user_id, product_id, quantity
router.post('/addtocart', async(req, res, next) =>{
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
    if(!req.body.quantity){
        return res.status(400).send({
            message: "quantity can not be empty"
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
            // add to cart
            dbConn.query('INSERT INTO Cart SET ?', req.body, (err, result)=>{
                if(err){
                    return res.status(400).send({
                        message: "product already in cart"
                    });
                }
                return res.status(200).send({
                    message: "product added to cart"
                });
            });
        });
    });
}
);




// delete from cart
// delete request
// input: user_id, product_id
router.delete('/deletefromcart', async(req, res, next) =>{
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
            // delete from cart
            dbConn.query('DELETE FROM Cart WHERE User_ID=? AND Product_ID=?', [req.body.user_id, req.body.product_id], (err, result)=>{
                if(err){
                    return res.status(400).send({
                        message: "product not in cart"
                    });
                }
                return res.status(200).send({
                    message: "product deleted from cart"
                });
            });
        });
    });
}
);



// update quantity
// put request
// input: user_id, product_id, quantity
router.put('/updatequantity', async(req, res, next) =>{
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
    if(!req.body.quantity){
        return res.status(400).send({
            message: "quantity can not be empty"
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
            // update quantity
            dbConn.query('UPDATE Cart SET Quantity=? WHERE User_ID=? AND Product_ID=?', [req.body.quantity, req.body.user_id, req.body.product_id], (err, result)=>{
                if(err){
                    return res.status(400).send({
                        message: "product not in cart"
                    });
                }
                return res.status(200).send({
                    message: "quantity updated"
                });
            });
        });
    });
}
);

// get cart
// get request
// input: user_id
router.get('/:user_id', async(req, res, next) =>{
    let user_id = req.params.user_id;

    // safe guard against sql injection
    // validate input
    // check if user exists
    if(!user_id){
        return res.status(400).send({
            message: "user_id can not be empty"
        });
    }
    // check if user exists
    dbConn.query('SELECT * FROM User WHERE User_ID=?', user_id, (err, result)=>{
        if(err){
            return res.status(400).send({
                message: "user does not exist"
            });
        }
        // get cart
        dbConn.query('SELECT * FROM Cart WHERE User_ID=?', req.body.user_id, (err, result)=>{
            if(err){
                return res.status(400).send({
                    message: "cart is empty"
                });
            }
            return res.status(200).send({
                message: "cart retrieved"
            });
        });
    });
}
);

module.exports = router;
