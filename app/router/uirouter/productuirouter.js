const express = require('express');
const productcontroller = require('../../controller/uicontroller/productuicontroller');
const router = express.Router();

router.get('/addproduct', productcontroller.addproduct) // For to Show Form
router.post('/addproduct', productcontroller.addproduct) // For to add data in Database
router.get('/product', productcontroller.showproduct) // For to Show Product List
router.get('/product/:id/edit', productcontroller.singleproduct) // It is Single Product
router.put('/product/:id', productcontroller.updateproduct) // It is actual Update Product
router.delete('/product/:id', productcontroller.deleteproduct); // This is For Handling Delete

module.exports = router;
