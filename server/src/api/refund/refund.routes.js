const express = require('express');
const router = express.Router();
const dbConn = require('../../dbconnection.js');

// request refund api
// input: user_id, order_id, products (array), reason for refund
router.post('/request', async(req, res, next) =>{
    // validate input
    if(!req.body.user_id){
        return res.status(400).send({
            message: "user_id is required"
        });
    }
    if(!req.body.order_id){
        return res.status(400).send({
            message: "order id is required"
        });
    }

    //check if user exists
    dbConn.query('SELECT * FROM User WHERE User_ID=?', req.body.user_id, (err, result)=>{
        if(err){
            console.log('Error while fetching user by id', err);
        }else{
            console.log(JSON.stringify(result));
            if(result.length == 0){
                return res.status(400).send({
                    message: "user does not exist"
                });
            }
        }
    });

    // check if order exists
    dbConn.query('SELECT * FROM Order_Products WHERE Order_ID=?', req.body.order_id, (err, result)=>{
        if(err){
            console.log('Error while fetching order by id', err);
        }else{
            console.log(JSON.stringify(result));
            if(result.length == 0){
                return res.status(400).send({
                    message: "order does not exist"
                });
            }
        }
    });

    var product_ids = new Array();
    for (i = 0; i < req.body.products.length; i++) {
        product_ids.push(Number(req.body.products[i]))
    }

    console.log(product_ids);

    //remove the returned products from order
    dbConn.query('DELETE FROM Order_Products WHERE Product_ID IN ('+ dbConn.escape(product_ids) + ')', req.body.order_id, (err, result)=>{
        if(err){
            console.log('Error while fetching order by id', err);
        }else{
            console.log(JSON.stringify(result));
            if(result.length == 0){
                return res.status(400).send({
                    message: "order does not exist"
                });
            }
        }
    });

    res.status(200).send({
        message: "refund requested, the amount will be refunded once the product(s) are returned."
    });
}
);

module.exports = router;