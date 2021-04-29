const http = require("http"); // creating an API using http
const url = require("url"); // using url to extract the route (e.g. /, /api/user)
const querystring = require("querystring"); // this will contain the body of the POST request
const fs = require("fs"); // file handling to read the index.html served for / route
const port = 8000; // port the server with listen on
const mysql = require("mysql");
const { parse } = require("querystring");
const server = http.createServer(); // create the server
const express = require('express');
const app = express();

app.use("/static", express.static('./static/'));

const con = mysql.createConnection({
  host: "<hostURL>",
  user: "<username>",
  password: "<userPW>",
  database: "<dbName>"
});

con.connect((err) => {

  if (err) throw err;


  // listen for requests from clients
  server.on("request", function (request, response) {
    const currentRoute = url.format(request.url); // get the route (/ or /api/user)
    const currentMethod = request.method; // get the HTTP request type (POST - Create; GET - Retrieve)
    let requestBody = ""; // will contain the extracted POST data later

    // determine the route (/ or /api/user)
    switch (currentRoute) {
      //
      // If no API call made then the default route is / so
      // just return the default index.html file to the user.
      // This contains the forms, etc. for making the CRUD
      // requests (only Create and Retrieve implemented)
      //
      case "/":
        fs.readFile(__dirname + "/index.html", (err, data) => {
          // get the file and add to data
          const headers = {
            // set the appropriate headers
            "Content-Type": "text/html",
          };
          response.writeHead(200, headers);
          response.end(data); // return the data (index.html)
        }); // as part of the response

        break;

      //
      // Handle the requests from client made using the route /api/user
      // These come via AJAX embedded in the earlier served index.html
      // There will be a single route (/api/user) but two HTTP request methods
      // POST (for Create) and GET (for Retrieve)
      //
      case "/api/user":
        // Handle a POST request;  the user is sending user data via AJAX!
        // This is the CRUD (C)reate request. These data need to be
        // extracted from the POST request and saved to the database!

        if (currentMethod === "POST") {
          // read the body of the POST request
          request.on("data", chunk => {
            requestBody += chunk.toString();
          });

          // determine the POST request Content-type (and log to console)
          // Either: (i)  application/x-www-form-urlencoded or (ii) application/json
          const { headers } = request;
          let ctype = headers["content-type"];
          console.log("RECEIVED Content-Type: " + ctype + "\n");

          // finished reading the body of the request
          request.on("end", () => {
           
            //Initializes variables recieved from the FormData object
            let {
              Title,
              firstname,
              lastname,
              mobilenumber,
              email,
              homeadressline1,
              homeaddressline2,
              town,
              county,
              eircode,
              shippingaddressline1,
              shippingaddressline2,
              townShipAdd,
              countyShipAdd,
              eircodeShipAdd,
            } = querystring.parse(requestBody);
            
            let userId;
            let homeAddId;
            let shipAddId;

            // SQL statements for inserting user data into the three seperate tables
            let sql1 =
              `INSERT INTO Customer (Title, FirstName, LastName, MobileNumber, EmailAddress) VALUES ('${Title}', '${firstname}', '${lastname}', '${mobilenumber}', '${email}')`;
            let sql2 =
              `INSERT INTO HomeAddress (AddressLine1, AddressLine2, Town, CityorCounty, Eircode) VALUES ('${homeadressline1}', '${homeaddressline2}', '${town}', '${county}', '${eircode}')`;
            let sql3 =
              `INSERT INTO ShippingAddress (AddressLine1, AddressLine2, Town, CountyorCity, Eircode) VALUES ('${shippingaddressline1}', '${shippingaddressline2}', '${townShipAdd}', '${countyShipAdd}', '${eircodeShipAdd}')`;
            
            let addUser = con.query(sql1);
            let addHome = con.query(sql2);
            let addShip = con.query(sql3);

            // Nested statements in order to extract all three ids for insertion into the intermediary table
            addUser.on('error', (err) => {
              throw err;
            }).on('result', (row) => {
              userId = row.insertId;
            }).on('end', () => {
              addHome.on('error', (err) => {
                throw err;
              }).on('result', (row) => {
                homeAddId = row.insertId;
              }).on('end', () => {
                addShip.on('error', (err) => {
                  throw err;
                }).on('result', (row) => {
                  shipAddId = row.insertId;
                }).on('end', () => {
                      
                  // creates the query to add the user and address to the useraddress table
                  let join = `INSERT INTO Customer_Addresses(CustomerID, HomeAddressID, ShippingAddressID) VALUES (${userId}, ${homeAddId}, ${shipAddId})`;
                  let joinQuery = con.query(join);
                  joinQuery.on('error', (err) => {
                    throw err;
                  }).on('result', (row) => {
                    
                  }).on('end', () => {
                    response.writeHead(200, { 'Content-Type': 'text/plain' });
                    response.end('User Added');
                    console.log(`User ${firstname} ${lastname}'s information has been added to the database`)
                  });
                });
              });
            });
        
          });

        }
        
        // Handle a GET request
        // This is the CRUD (R)etrieve request. 
        // Specifically data from the Customer table
        else if (currentMethod === "GET") {
          const headers = {
            "Content-Type": "application/json",
          };
          
          con.query("SELECT * FROM Customer", (err, result) => {
            if (err) throw err;
            console.log(result);
            console.log("USER DATABASE REQUESTED: \n\n" + JSON.stringify(result, null, 2) + "\n");
            response.writeHead(200, headers);
            response.end(JSON.stringify(result));
          });
        
          
        }
        break;
        // Handle a GET request
        // This is the CRUD (R)etrieve request. 
      // Specifically data from the HomeAddress table
      case "/api/homeAddress":

        if (currentMethod === "GET") {
          const headers = {
            "Content-Type": "application/json",
          };
          
          con.query("SELECT * FROM HomeAddress", (err, result) => {
            if (err) throw err;
            //console.log(result);
            console.log("USER DATABASE REQUESTED: \n\n" + JSON.stringify(result, null, 2) + "\n");
            response.writeHead(200, headers);
            response.end(JSON.stringify(result));
          });
        }
        
        break;

      // Handle a GET request
      // This is the CRUD (R)etrieve request. 
      // Specifically data from the ShippingAddress table
      
      case "/api/shippingAddress":

        if (currentMethod === "GET") {
          const headers = {
            "Content-Type": "application/json",
          };
          
          con.query("SELECT * FROM ShippingAddress", (err, result) => {
            if (err) throw err;
            //console.log(result);
            console.log("USER DATABASE REQUESTED: \n\n" + JSON.stringify(result, null, 2) + "\n");
            response.writeHead(200, headers);
            response.end(JSON.stringify(result));
          });
        
          
        }
        
        break;
      
      // Handle a DELETE request
      // This is the CRUD (D)elete request. 
      // Specifically deletes data from a random Customer 
      case "/api/deleteRandUser":
        if (currentMethod === 'DELETE') {
          //D-Delete(Remove from database)
          const randID = Math.floor(Math.random() * 9);
          
          let sql = `DELETE FROM Customer_Addresses WHERE CustomerID = ${randID}`;
          con.query(sql, function (err, result) {
            if (err) throw err;
            console.log(`Customer ${randID}'s data deleted from Customer, HomeAddress and ShippingAddress tables`);
            response.writeHead(200, { 'Content-Type': 'application/json' });
            response.end();
          });
        }
        

        break;
      
      // Handle a DELETE request
      // This is the CRUD (D)elete request. 
      // Specifically deletes data from a Customer who's ID is supplied by the app user
      case "/api/deleteUser":
        if (currentMethod === 'DELETE') {

        
          request.on("data", function (chunk) {
            requestBody += chunk.toString();
          });

          // determine the POST request Content-type (and log to console)
          // Either: (i)  application/x-www-form-urlencoded or (ii) application/json
          const { headers } = request;
          let ctype = headers["content-type"];
          console.log("RECEIVED Content-Type: " + ctype + "\n");
        
          // finished reading the body of the request
          request.on("end", function () {
            var userData = "";
            // saving the user from the body to the database
            if (ctype.match(new RegExp("^application/x-www-form-urlencoded"))) {
              userData = querystring.parse(requestBody);
            } else {
              userData = JSON.parse(requestBody);
            }
            // log the user data to console
            console.log(
              "USER DATA RECEIVED: \n\n" +
              JSON.stringify(userData, null, 2) +
              "\n"
            );

            
            let query2 = `DELETE FROM Customer WHERE CustomerID = '${userData.id}'`;

           
           
              con.query(query2, (err, result) => {
                if (err) throw err;
                console.log(
                  `USER RECORD DELETED: ${userData.id}`)
              })
              
         
            // respond to the user with confirmation message
            var headers = {
              "Content-Type": "text/plain",
            };
            // handle the responses here after the database query completes!
            response.writeHead(200, headers);
            response.end(
              "User (" +
              userData.firstname +
              " " +
              userData.surname +
              ") data deleted from Database!"
            );
          });
          
          
        }

        break;

      
      // Handle a PUT request
      // This is the CRUD (U)pdate request. 
      // Specifically updates data for a random customer in teh following fields - Firstname, Lastname and Mobile Number
      case "/api/updateRandomUser":
        if (currentMethod === 'PUT') {
          
          const userID = (Math.floor(Math.random() * 9)+1);
          const sql1 =
            "UPDATE Customer SET FirstName = 'John', LastName = 'Murphy', MobileNumber = '0838622454' WHERE CustomerID = ?";
          con.query(sql1, userID, function (err, result) {
            if (err) throw err;
            console.log(`Customer ${userID}'s first name, last name and mobile number has been updated`);
            response.writeHead(200, { 'Content-Type': 'application/json' });
            response.end();
          });
        }

        break;
      
      // Handle a PUT request
      // This is the CRUD (U)pdate request. 
      // Specifically updates data for a rcustomer (specified by name) in the following fields - number, title and email
      case "/api/updateUser":

        if (currentMethod === 'PUT') {
          request.on("data", function (chunk) {
            requestBody += chunk.toString();
          });

          // determine the POST request Content-type (and log to console)
          // Either: (i)  application/x-www-form-urlencoded or (ii) application/json
          const { headers } = request;
          let ctype = headers["content-type"];
          console.log("RECEIVED Content-Type: " + ctype + "\n");
        
          // finished reading the body of the request
          request.on("end", function () {
            var userData = "";
            // saving the user from the body to the database
            if (ctype.match(new RegExp("^application/x-www-form-urlencoded"))) {
              userData = querystring.parse(requestBody);
            } else {
              userData = JSON.parse(requestBody);
            }
            // log the user data to console
            console.log(
              "USER DATA RECEIVED: \n\n" +
              JSON.stringify(userData, null, 2) +
              "\n"
            );


            const sql2 = `Update Customer SET MobileNumber = '${userData.mobile}', Title = '${userData.title}', EmailAddress = '${userData.email}'  WHERE FirstName = '${userData.firstname}'`;
            con.query(sql2, (err, result) => {
              if (err) throw err;
              console.log(`User ${userData.firstname} has been updated`);
              response.writeHead(200, { 'Content-Type': 'application/json' });
              response.end();
            });
            
          })
        }
        break;
      
        deafult:
        break;
    };
  });

});


// Set up the HTTP server and listen on port 8000
server.listen(port, () => {
  console.log("\nAJAX - API - Database Demo");
  //console.log("CS230 Demo Program - John G. Keating\n(c) 2021\n");
  console.log("AJAX (HTTP) API server running on port: " + port + "\n");
});
