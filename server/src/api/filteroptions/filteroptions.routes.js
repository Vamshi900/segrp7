const express = require('express');
const router = express.Router();
const dbConn = require('../../dbconnection.js');

//s3 for filter api, we need the available categories for selection on the ui

router.get('/categories', async (req, res, next) => {
    let Category = req.params.Category;
    dbConn.query('SELECT DISTINCT Category FROM Product', Category, (err, result) => {
        if (err) {
            console.log('Error while fetching Category', err);
            res.status(500);
            res.json({ "error": { "message": "Internal Server Error", "code": "500" } });
        } else {
            console.log(JSON.stringify(result));
            res.json(result);
        }
    });
}
);

//s3 for filter api, we need the available subcategories for selection on the ui

router.get('/subcategories', async (req, res, next) => {
    let Category = req.params.Category;
    dbConn.query('SELECT DISTINCT SubCategory FROM Product', Category, (err, result) => {
        if (err) {
            console.log('Error while fetching SubCategory', err);
            res.status(500);
            res.json({ "error": { "message": "Internal Server Error", "code": "500" } });
        } else {
            console.log(JSON.stringify(result));
            res.json(result);
        }
    });
}
);

//s3 for filter api, we need the available brands for selection on the ui

router.get('/brands', async (req, res, next) => {
    let Category = req.params.Category;
    dbConn.query('SELECT DISTINCT Brand FROM Product', Category, (err, result) => {
        if (err) {
            console.log('Error while fetching Brand', err);
            res.status(500);
            res.json({ "error": { "message": "Internal Server Error", "code": "500" } });
        } else {
            console.log(JSON.stringify(result));
            res.json(result);
        }
    });
}
);


module.exports = router;
