const employee = require('../../model/employee');

class EmployeeController {

    // POST API 
    async create(req, res) {
        try {
            const employeedata = new employee(req.body);
            const data = await employeedata.save();
            res.status(200).json({ message: "Employee added successfully", data });
        } catch (error) {
            const statusCode = error.name === 'ValidationError' ? 400 : 500;
            const message = error.name === 'ValidationError'
                ? { message: "Validation error", errors: Object.values(error.errors).map(err => err.message) }
                : { message: "An unexpected error occurred" };

            console.error(error);
            res.status(statusCode).json(message);
        }
    }

    // GET API 
    async getall(req, res) {
        try {
            const data = await employee.find();
            res.status(200).json({
                message: "Employee list fetched successfully",
                total: data.length,
                employees: data
            });
        } catch (error) {
            console.log(error);
            res.status(500).json({ message: "Error retrieving employee data" });
        }
    }

    // GET Single 
    async getsingle(req, res) {
        try {
            const id = req.params.id;
            const data = await employee.findById(id);
            if (data) {
                res.status(200).json(data);
            } else {
                res.status(404).json({ message: "Employee not found" });
            }
        } catch (error) {
            console.log(error);
            res.status(500).json({ message: "Error retrieving employee data" });
        }
    }

    // PUT OR PATCH Api for Update
    async employeeupdate(req, res) {
        try {
            const updatedemployee = await employee.findByIdAndUpdate(
                req.params.id,
                req.body,
                { new: true, runValidators: true }
            );

            if (!updatedemployee) {
                return res.status(404).json({ message: "Employee not found" });
            }

            res.status(200).json({ message: "Employee updated successfully", data: updatedemployee });
        } catch (error) {
            const statusCode = error.name === 'ValidationError' ? 400 : 500;
            const message = error.name === 'ValidationError'
                ? { message: "Validation error", errors: Object.values(error.errors).map(err => err.message) }
                : { message: "Error updating employee data" };

            console.error(error);
            res.status(statusCode).json(message);
        }
    }

    // DELETE Api
    async employeedelete(req, res) {
        try {
            const deletedemployee = await employee.findByIdAndDelete(req.params.id);
            res.status(deletedemployee ? 200 : 404).json(
                deletedemployee ? { message: "Employee deleted successfully" } : { message: "Employee not found" }
            );
        } catch (error) {
            console.error(error);
            res.status(500).json({ message: "Error deleting employee" });
        }
    }
}

module.exports = new EmployeeController();
