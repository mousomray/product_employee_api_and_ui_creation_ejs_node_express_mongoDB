const Employee = require('../../model/employee'); // Adjust the path based on your project structure

class employeeuicontroller {

    // Handle POST
    async addemployee(req, res) {
        if (req.method === 'POST') {
            try {
                const { name, email, phone, city, pin, position, image } = req.body;
                if (!name || !email || !phone || !city || !pin || !position) {
                    return res.status(400).send('All fields are required.');
                }
                const employeeData = {
                    name: name.trim(),
                    email: email.trim(),
                    phone: Number(phone), // Use Number() for a cleaner conversion
                    city: city.trim(),
                    pin: Number(pin),
                    position: position.trim(),
                    image: image || "https://t3.ftcdn.net/jpg/05/25/55/06/360_F_525550698_pcSOrKvA81oMHeEgI1e6MJHn1NIzWREd.jpg",
                };
                await Employee.create(employeeData);
                return res.redirect('/employee');
            } catch (error) {
                console.error('Error saving employee:', error);
                return res.status(500).send('Error saving employee');
            }
        }
        res.render('employeeview/addemployee');
    }

    // Handle GET
    async employeelist(req, res) {
        try {
            const employees = await Employee.find(); // Fetch all employee from the database
            res.render('employeeview/employee', { employees }); // Render the employee page with employee data
        } catch (error) {
            console.error(error);
            res.status(500).json({ message: "Error retrieving employee" });
        }
    }

    // Handle GET Single employee 
    async singleemployee(req, res) {
        const { id } = req.params;
        try {
            const employee = await Employee.findById(id);
            if (!employee) {
                return res.status(404).send('Employee not found');
            }
            res.render('employeeview/editemployee', { employee });
        } catch (error) {
            console.error('Error fetching employee:', error);
            return res.status(500).send('Error fetching employee');
        }
    }

    // Handle PUT or PATCH for update employee
    async updateemployee(req, res) {
        const { id } = req.params;
        const { name, email, phone, city, pin, position, image } = req.body;
        try {
            const employeeData = {
                name: name.trim(),
                email: email.trim(),
                phone: Number(phone), // Use Number() for a cleaner conversion
                city: city.trim(),
                pin: Number(pin),
                position: position.trim(),
                image: image || "https://t3.ftcdn.net/jpg/05/25/55/06/360_F_525550698_pcSOrKvA81oMHeEgI1e6MJHn1NIzWREd.jpg",
            };
            await Employee.findByIdAndUpdate(id, employeeData);
            console.log(`Employee with ID ${id} updated`);
            return res.redirect('/employee'); // Redirect after updating
        } catch (error) {
            console.error('Error updating employee:', error);
            return res.status(500).send('Error updating employee');
        }
    }


    // Handle DELETE for delete employee
    async deleteemployee(req, res) {
        const { id } = req.params;
        try {
            await Employee.findByIdAndDelete(id);
            console.log(`Employee with ID ${id} deleted`);
            return res.redirect('/employee'); // Redirect product after deleting data
        } catch (error) {
            console.error('Error deleting employee:', error);
            return res.status(500).send('Error deleting employee');
        }
    }
}

module.exports = new employeeuicontroller();