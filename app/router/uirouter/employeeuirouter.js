const express = require('express');
const employeecontroller = require('../../controller/uicontroller/employeeuicontroller');
const router = express.Router();

router.get('/addemployee', employeecontroller.addemployee) // Show Form
router.post('/addemployee', employeecontroller.addemployee) // For add data
router.get('/employee', employeecontroller.employeelist) // Show data
router.get('/employee/:id/edit', employeecontroller.singleemployee) // Show single data
router.put('/employee/:id', employeecontroller.updateemployee) // Update data
router.delete('/employee/:id', employeecontroller.deleteemployee); // Delete data

module.exports = router;
