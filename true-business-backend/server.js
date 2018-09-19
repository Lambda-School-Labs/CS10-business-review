const express = require("express");
const helmet = require("helmet");
const cors = require("cors");
const stripe = require("stripe")("sk_test_5RHmYt9hi15VdwLeAkvxGHUx");
const cookieSession = require("cookie-session");
const passport = require("passport");
const keys = require("./config/keys");


//Instantiate Server
const server = express();

//Bringin Mongoose Database
const mongoose = require("mongoose");

//Bringing the route
const routes = require("./routes");

//Database name
const db = "mongodb://metten:Lambdalabs1@ds251632.mlab.com:51632/truebusiness";

//Connect Database
mongoose
  .connect(db)
  .then(() => console.log("\n=== connected to mongo ===\n"))
  .catch(err => console.log("database is not connected"));

//Security
server.use(helmet());

//Permissions
server.use(cors());

//Enable to parse Json object
server.use(express.json());
//server.use(bodyParser.json()); //express.jason

server.use(express.json());
server.use(
  cookieSession({
    maxAge: 30 * 24 * 60 * 60 * 1000,
    keys: [keys.cookieKey]
  })
);
server.use(passport.initialize());
server.use(passport.session());

//Connect the route to the server
server.use("/", routes);

server.use(require("body-parser").text());

//Status server
const port = process.env.PORT || 3001;
server.listen(port, () => console.log(`\n=== API up on port: ${port} ===\n`));
