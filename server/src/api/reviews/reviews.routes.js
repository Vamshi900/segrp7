
const express = require('express');
const router = express.Router();
const dbConn = require('../../dbconnection.js');
//[Reviews]
// User_ID
// Product_ID
//Rating
//Review_or_Reply
//ID
//Is_Reply
//replytoReviewID


// // get all reviews
// // get request
// // input: none
router.get('/getallreviews', async(req, res, next) =>{
    dbConn.query('SELECT * FROM Reviews', (err, result)=>{
        if(err){
            return res.status(400).send({
                message: "Error"
            });
        }
        return res.status(200).send({
            message: "Success",
            data: result
        });
    });
}
);


// // get all reviews for a product
// // input: Product_ID
router.get('/allreviews/:Product_ID', async(req, res, next) =>{
    // safe guard against sql injection
    // validate input
    // check if product exists
    // get all reviews for product
    if(!req.params.Product_ID){
        return res.status(400).send({
            message: "Product_ID can not be empty"
        });
    }
    // check if product exists
    dbConn.query('SELECT * FROM Product WHERE Product_ID=?', req.params.Product_ID, (err, result)=>{
        if(err){
            return res.status(400).send({
                message: "product does not exist"
            });
        }
        // get all reviews for product
        dbConn.query('SELECT * FROM Reviews WHERE Product_ID=?', req.params.Product_ID, (err, result)=>{
            if(err){
                return res.status(400).send({
                    message: "no reviews for product"
                });
            }
            return res.status(200).send({
                message: "reviews found",
                data: result
            });
        });
    });
}
);

// delete review
// delete request
// input: ID
router.delete('/deletereview', async(req, res, next) =>{
    // safe guard against sql injection
    // validate input
    // check if review exists
    if(!req.body.ID){
        return res.status(400).send({
            message: "ID can not be empty"
        });
    }
    // check if review exists
    dbConn.query('SELECT * FROM Reviews WHERE ID=?', req.body.ID, (err, result)=>{
        if(err){
            return res.status(400).send({
                message: "review does not exist"
            });
        }
        // delete review
        dbConn.query('DELETE FROM Reviews WHERE ID=?', req.body.ID, (err, result)=>{
            if(err){
                return res.status(400).send({
                    message: "review not deleted"
                });
            }
            return res.status(200).send({
                message: "review deleted"
            });
        });
    });
}
);

// update review
// put request
// input: ID, Review_or_Reply, Rating, Is_Reply, replytoReviewID
router.put('/updatereview', async(req, res, next) =>{
    // safe guard against sql injection
    // validate input
    // check if review exists
    if(!req.body.ID){
        return res.status(400).send({
            message: "ID can not be empty"
        });
    }
    // check if review exists
    dbConn.query('SELECT * FROM Reviews WHERE ID=?', req.body.ID, (err, result)=>{
        if(err){
            return res.status(400).send({
                message: "review does not exist"
            });
        }
        // update review
        dbConn.query('UPDATE Reviews SET Review_or_Reply=?, Rating=?, Is_Reply=?, replytoReviewID=? WHERE ID=?', [req.body.Review_or_Reply, req.body.Rating, req.body.Is_Reply, req.body.replytoReviewID, req.body.ID], (err, result)=>{
            if(err){
                return res.status(400).send({
                    message: "review not updated"
                });
            }
            return res.status(200).send({
                message: "review updated"
            });
        });
    });
}
);




    


module.exports = router;
