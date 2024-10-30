const express = require('express')
const employeecontroller = require('../../controller/apicontroller/employeecontroller')
const router = express.Router()

router.post('/createemployee', employeecontroller.create) //  POST 
router.get('/employeelist', employeecontroller.getall) //  GET
router.get('/singleemployee/:id', employeecontroller.getsingle) // GET single
router.put('/editemployee/:id', employeecontroller.employeeupdate) // PUT or PATCH 
router.delete('/deleteemployee/:id', employeecontroller.employeedelete) // DELETE

module.exports = router