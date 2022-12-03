const express = require("express");
const orders = require("./orders/orders.routes");
const products = require("./products/products.routes");
const users = require("./users/users.routes");
const saved_for_later = require("./save_for_later/saved.routes");
const cart = require("./cart/cart.routes");
const reviews = require("./reviews/reviews.routes");
const auth = require("./auth/auth.routes");



const router = express.Router();

// API overview:
router.get("/", (req, res) => {
  res.json({
    message: "Hello World (API Overview)",
  });
});


router.use('/orders', orders);
router.use('/products', products);
router.use('/users', users);
router.use('/saved_for_later', saved_for_later);
router.use('/cart', cart);
router.use('/reviews', reviews);
router.use('/auth', auth);



module.exports = router;