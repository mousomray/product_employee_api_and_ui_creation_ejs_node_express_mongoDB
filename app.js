const express = require('express'); // Import express
const dotenv = require('dotenv'); // Import dotenv
const cors = require('cors'); //to allow our API to be accessed from other websites or domains.
const connectDB = require('./app/config/db.js'); // Connect with Database
const methodOverride = require('method-override');//method-override is used to allow form submissions in EJS to handle HTTP methods like DELETE or PUT by overriding them with POST.

dotenv.config();//config() specifically because it’s the method provided by the dotenv package to read the .env file and load its contents into process.env. This config() method initializes and makes environment variables accessible across the application.

const app = express();

connectDB();

// For to View ejs
app.set('view engine', 'ejs');
app.set('views', 'views');

// Make public file static
app.use(express.static(__dirname + '/public'));


app.use(express.urlencoded({ extended: true }));//The code `app.use(express.urlencoded({ extended: true }));` allows your Express app to parse URL-encoded data from form submissions, enabling access to form fields in `req.body`. extended:true allow nested object and false doesn't allow nested object


app.use(methodOverride('_method')); //Enable method override for DELETE and PUT or PATCH requests


app.use(express.json()); // Use express
app.use(cors()); // Use cors

// homeUI (Mother Routing)
const homeuirouter = require('./app/router/uirouter/homeuirouter');
app.use('/', homeuirouter);

// productUI (Mother Routing)
const productuirouter = require('./app/router/uirouter/productuirouter');
app.use('/', productuirouter);

// employeeUI (Mother Routing)
const employeeuirouter = require('./app/router/uirouter/employeeuirouter');
app.use('/', employeeuirouter);

// productAPI (Mother Routing)
const productrouter = require('./app/router/apirouter/productrouter');
app.use('/api', productrouter);

// employeeAPI (Mother Routing) 
const employeerouter = require('./app/router/apirouter/employeerouter');
app.use('/api', employeerouter);

const port = 3004
app.listen(port, () => {
    console.log(`Server is running on port ${port}`);
});