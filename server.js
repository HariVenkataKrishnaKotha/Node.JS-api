var express = require('express');
var app = express();
var bodyParser = require('body-parser');
app.use(bodyParser.json())

const cors = require('cors')
const corsOptions = {
  origin: 'http://localhost:4200',
  optionsSuccessStatus: 200
}

app.use(cors(corsOptions))

const db = require('./app/config/db.config.js');
  
// force: true will drop the table if it already exists
db.sequelize.sync({force: true}).then(() => {
  console.log('Drop and Resync with { force: true }');
  initial();
});

require('./app/route/customer.route.js')(app);
 
// Create a Server
var server = app.listen(8080, function () {
 
  let host = server.address().address
  let port = server.address().port

  console.log("App listening at http://%s:%s", host, port);
})

function initial(){

  let customers =[
	{
      id: 1,
      firstname: "fname",
      lastname: "lname",
      age: 21
    },
 	{
      id: 2,
      firstname: "first",
      lastname: "last",
      age: 21
    },
	{
      id: 3,
      firstname: "firname",
      lastname: "lasname",
      age: 21
    },
	{
      id: 4,
      firstname: "firna",
      lastname: "lasna",
      age: 21
    },
	{
      id: 5,
      firstname: "finame",
      lastname: "laname",
      age: 21
    },
	{
      id: 6,
      firstname: "iname",
      lastname: "bname",
      age: 21
    },

]

  // Init data -> save to MySQL
  const Customer = db.customers;
  for (let i = 0; i < customers.length; i++) { 
    Customer.create(customers[i]);  
  }
}