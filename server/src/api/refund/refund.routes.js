const express = require('express');
const router = express.Router();
const dbConn = require('../../dbconnection.js');

// request refund api
// input: user_id, order_id, product_id (array), reason for refund
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

    // add to the refund table or notify to seller
}
);

module.exports = router;