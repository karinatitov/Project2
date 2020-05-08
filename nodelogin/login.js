var mysql = require("mysql");
var express = require("express");
var session = require("express-session");
var bodyParser = require("body-parser");
var path = require("path");

// Making connection to nodelogin DB
var connection = mysql.createConnection({
  host: "localhost",
  user: "root",
  password: "43Aruzap*",
  database: "nodelogin"
});

var app = express();

// Letting express know that we will be using some of its packages
app.use(
  session({
    secret: "secret",
    resave: true,
    saveUninitialized: true
  })
);
app.use(
  bodyParser.urlencoded({
    extended: true
  })
);
app.use(bodyParser.json());

// Displaying our Auth page
app.get("/", function(request, response) {
  response.sendFile(path.join(__dirname + "/login.html"));
});

// We need to now handle the POST request,
// basically what happens here is when the client enters their details
// in the login form and clicks the submit button,
// the form data will be sent to the server,
// and with that data our login script will check in our MySQL accounts table
// to see if the details are correct.

app.post("/auth", function(request, response) {
  var username = request.body.username;
  var password = request.body.password;
  if (username && password) {
    connection.query(
      "SELECT * FROM accounts WHERE username = ? AND password = ?",
      [username, password],
      function(error, results, fields) {
        if (results.length > 0) {
          request.session.loggedin = true;
          request.session.username = username;
          response.redirect("/home");
        } else {
          response.send("Incorrect Username and/or Password!");
        }
        response.end();
      }
    );
  } else {
    response.send("Please enter Username and Password!");
    response.end();
  }
});

// if logged in then we are redirecting to the home page

app.get("/home", function(request, response) {
  if (request.session.loggedin) {
    response.send("Welcome back, " + request.session.username + "!");
  } else {
    response.send("Please login to view this page!");
  }
  response.end();
});


// listening on port 3000

app.listen(3000);