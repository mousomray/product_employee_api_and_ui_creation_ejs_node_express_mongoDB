const express = require('express')
const productcontroller = require('../../controller/apicontroller/productcontroller')
const router = express.Router()

router.post('/createproduct', productcontroller.create) // POST
router.get('/productlist', productcontroller.getall) // GET
router.get('/singleproduct/:id', productcontroller.getsingle) // GET single
router.put('/editproduct/:id', productcontroller.productupdate) // PUT or PATCH
router.delete('/delete/:id', productcontroller.productdelete) // DELETE 

module.exports = router