const express = require('express');
const router = express.Router();
const dbConn = require('../../dbconnection.js');

// GET Product Details
router.get('/:Product_ID', async (req, res, next) => {
    try {
        let Product_ID = req.params.Product_ID;
        if (!isNaN(Product_ID)) {
            id = parseInt(Product_ID);
            dbConn.query('SELECT * FROM Product WHERE Product_ID=?', id, (err, result) => {
                if (err) {
                    console.log('Error while fetching Product by id: ', err);
                    res.status(500);
                    res.json({ "error": { "message": "Internal Server Error", "code": "500" } });
                }
                else {
                    console.log(JSON.stringify(result));
                    res.json(result);
                }
            });
        }
        else {
            throw ('Error while fetching Product id: ID is NaN');
        }
    }
    catch (err) {
        console.log(err);
        res.status(500);
        res.json({ "error": { "message": "Internal Server Error", "code": "500" } });
    }
});

//GET all products 
router.get('/', async (req, res, next) => {
    let categories = req.query.categories;
    let subcategories = req.query.subcategories;
    let brands = req.query.brands;
    
    let query = "SELECT * FROM Product";

    let filters = [];
    if(categories != null) {
        
        if(!Array.isArray(categories)){
            categories = [categories];
        }

        if(categories.length > 0) {
            filter = "Category IN (";
            categories.forEach(category => {
                filter = filter + "'" + category + "',"; 
            });
            filter = filter.slice(0,-1);
            filter = filter + ")"
            filters.push(filter);
        }

    }

    if(subcategories != null) {

        if(!Array.isArray(subcategories)){
            subcategories = [subcategories];
        }

        if(subcategories.length > 0) {
            filter = "SubCategory IN (";
            subcategories.forEach(subcategory => {
                filter = filter + "'" + subcategory + "',"; 
            });
            filter = filter.slice(0,-1);
            filter = filter + ")"
            filters.push(filter);
        }
    }

    if(brands != null) {

        if(!Array.isArray(brands)){
            brands = [brands];
        }

        if(brands.length > 0) {
            filter = "Brand IN (";
            brands.forEach(brand => {
                filter = filter + "'" + brand + "',"; 
            });
            filter = filter.slice(0,-1);
            filter = filter + ")"
            filters.push(filter);
        }
    }

    if(filters.length > 0) {
        query = query + " WHERE ";
        filters.forEach(filter => {
            query = query + filter + " AND ";
        })
        query = query.slice(0,-5);
    }

    dbConn.query(query, (err, result) => {
        if (err) {
            console.log('Error while fetching products', err);
            res.status(500);
            res.json({ "error": { "message": "Internal Server Error", "code": "500" } });
        } else {
            console.log(JSON.stringify(result));
            res.json(result);
        }
    });
}
);

// get products by category 
// input categorry as a string
router.get('/category/:Category', async (req, res, next) => {
    let Category = req.params.Category;
    dbConn.query('SELECT * FROM Product WHERE Category=?', Category, (err, result) => {
        if (err) {
            console.log('Error while fetching products', err);
            res.status(500);
            res.json({ "error": { "message": "Internal Server Error", "code": "500" } });
        } else {
            console.log(JSON.stringify(result));
            res.json(result);
        }
    });
}
);

// get products by name
// input name as a string
router.get('/name/:Name', async (req, res, next) => {
    let Name = req.params.Name;
    dbConn.query('SELECT * FROM Product WHERE Product_Name=?', Name, (err, result) => {
        if (err) {
            console.log('Error while fetching Products by name', err);
            res.status(500);
            res.json({ "error": { "message": "Internal Server Error", "code": "500" } });
        } else {
            console.log(JSON.stringify(result));
            res.json(result);
        }
    });
}
);

//post products get by range of price
//input min and max price as a string
router.get('/price/:Min_Price/:Max_Price', async (req, res, next) => {
    let Min_Price = req.params.Min_Price;
    let Max_Price = req.params.Max_Price;
    dbConn.query('SELECT * FROM Product WHERE Price BETWEEN ? AND ?', [Min_Price, Max_Price], (err, result) => {
        if (err) {
            console.log('Error while fetching Products by price range', err);
            res.status(500);
            res.json({ "error": { "message": "Internal Server Error", "code": "500" } });
        } else {
            console.log(JSON.stringify(result));
            res.json(result);
        }
    });
}
);


// get products by brand
// input brand as a string
router.get('/brand/:Brand', async (req, res, next) => {
    let Brand = req.params.Brand;
    dbConn.query('SELECT * FROM Product WHERE Brand=?', Brand, (err, result) => {
        if (err) {
            console.log('Error while fetching Products by brand', err);
            res.status(500);
            res.json({ "error": { "message": "Internal Server Error", "code": "500" } });
        } else {
            console.log(JSON.stringify(result));
            res.json(result);
        }
    });
}
);

// get products by Availability
// input Availability as a string
router.get('/availability/:Availability', async (req, res, next) => {
    let Availability = req.params.Availability;
    dbConn.query('SELECT * FROM Product WHERE Availability=?', Availability, (err, result) => {
        if (err) {
            console.log('Error while fetching Products by Availability', err);
            res.status(500);
            res.json({ "error": { "message": "Internal Server Error", "code": "500" } });
        } else {
            console.log(JSON.stringify(result));
            res.json(result);
        }
    });
}
);

// get products with min  Quantity
router.get('/quantity/:Min_Quantity', async (req, res, next) => {
    let Min_Quantity = req.params.Min_Quantity;
    dbConn.query('SELECT * FROM Product WHERE Quantity >= ?', Min_Quantity, (err, result) => {
        if (err) {
            console.log('Error while fetching Products by Quantity', err);
            res.status(500);
            res.json({ "error": { "message": "Internal Server Error", "code": "500" } });
        } else {
            console.log(JSON.stringify(result));
            res.json(result);
        }
    });
}
);


// [products table]
// Product_ID
// Product_Name
//Brand
//Availability
//Quantity
//Category
//SubCategory
//Price
//User_ID
//Product_Image
//Tags

// add a new product
router.post('/', async (req, res, next) => {
    if (!req.body) {
        res.status(400);
        res.json({ "error": { "message": "Bad Request", "code": "400" } });
        return;
    }
    if (!req.body.Product_Name) {
        res.status(400).send({
            message: "Product Name can not be empty"
        });
    }
    if (!req.body.Brand) {
        res.status(400).send({
            message: "Brand can not be empty"
        });
    }
    if (!req.body.Availability) {
        res.status(400).send({
            message: "Availability can not be empty"
        });
    }
    if (!req.body.Quantity) {
        res.status(400).send({
            message: "Quantity can not be empty"
        });
    }
    if (!req.body.Category) {
        res.status(400).send({
            message: "Category can not be empty"
        });
    }
    if (!req.body.SubCategory) {
        res.status(400).send({
            message: "SubCategory can not be empty"
        });
    }
    if (!req.body.Price) {
        res.status(400).send({
            message: "Price can not be empty"
        });
    }
    if (!req.body.User_ID) {
        res.status(400).send({
            message: "User_ID can not be empty"
        });
    }
    if (!req.body.Product_Image) {
        res.status(400).send({
            message: "Product_Image can not be empty"
        });
    }
    if (!req.body.Tags) {
        res.status(400).send({
            message: "Tags can not be empty"
        });
    }


    let Product_Name = req.body.Product_Name;
    let Brand = req.body.Brand;
    let Availability = req.body.Availability;
    let Quantity = req.body.Quantity;
    let Category = req.body.Category;
    let SubCategory = req.body.SubCategory;
    let Price = req.body.Price;
    let User_ID = req.body.User_ID;
    let Product_Image = req.body.Product_Image;
    let Tags = req.body.Tags;
    let Product = { Product_Name: Product_Name, Brand: Brand, Availability: Availability, Quantity: Quantity, Category: Category, SubCategory: SubCategory, Price: Price, User_ID: User_ID, Product_Image: Product_Image, Tags: Tags };
    dbConn.query('INSERT INTO Product SET ?', Product, (err, result) => {
        if (err) {
            console.log('Error while inserting data', err);
        } else {
            console.log(JSON.stringify(result));
            res.json(result);
        }
    });
}
);


// update product
router.put('/:Product_ID', async (req, res, next) => {
    // validarte the input
    if (!req.body) {
        res.status(400);
        res.json({ "error": { "message": "Bad Request", "code": "400" } });
        return;
    }
    if (!req.body.Product_Name) {
        res.status(400).send({
            message: "Product Name can not be empty"
        });
    }
    if (!req.body.Brand) {
        res.status(400).send({
            message: "Brand can not be empty"
        });
    }
    if (!req.body.Availability) {
        res.status(400).send({
            message: "Availability can not be empty"
        });
    }
    if (!req.body.Quantity) {
        res.status(400).send({
            message: "Quantity can not be empty"
        });
    }
    if (!req.body.Category) {
        res.status(400).send({
            message: "Category can not be empty"
        });
    }
    if (!req.body.SubCategory) {
        res.status(400).send({
            message: "SubCategory can not be empty"
        });
    }
    if (!req.body.Price) {
        res.status(400).send({
            message: "Price can not be empty"
        });
    }
    if (!req.body.User_ID) {
        res.status(400).send({
            message: "User_ID can not be empty"
        });
    }
    if (!req.body.Product_Image) {
        res.status(400).send({
            message: "Product_Image can not be empty"
        });
    }
    if (!req.body.Tags) {
        res.status(400).send({
            message: "Tags can not be empty"
        });
    }

    let Product_ID = req.params.Product_ID;
    let Product_Name = req.body.Product_Name;
    let Brand = req.body.Brand;
    let Availability = req.body.Availability;
    let Quantity = req.body.Quantity;
    let Category = req.body.Category;
    let SubCategory = req.body.SubCategory;
    let Price = req.body.Price;
    let User_ID = req.body.User_ID;
    let Product_Image = req.body.Product_Image;
    let Tags = req.body.Tags;
    let Product = { Product_Name: Product_Name, Brand: Brand, Availability: Availability, Quantity: Quantity, Category: Category, SubCategory: SubCategory, Price: Price, User_ID: User_ID, Product_Image: Product_Image, Tags: Tags };

    // check if the product exists
    dbConn.query('SELECT * FROM Product WHERE Product_ID=?', Product_ID, (err, result) => {
        if (err) {
            console.log('Error while fetching product by id', err);
            res.status(400).send({
                message: " Invalid Prouct can not be empty"
            });
        }
    });



    dbConn.query('UPDATE Product SET ? WHERE Product_ID=?', [Product, Product_ID], (err, result) => {
        if (err) {
            console.log('Error while updating data', err);
        } else {
            console.log(JSON.stringify(result));
            res.json(result);
        }
    });
}
);

// delete product
router.delete('/:Product_ID', async (req, res, next) => {
    let Product_ID = req.params.Product_ID;
    dbConn.query('DELETE FROM Product WHERE Product_ID=?', Product_ID, (err, result) => {
        if (err) {
            console.log('Error while deleting data', err);
        } else {
            console.log(JSON.stringify(result));
            res.json(result);
        }
    });
}
);

module.exports = router;