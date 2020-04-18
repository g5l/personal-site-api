'use strict';
const express = require('express');
const fileUpload = require('express-fileupload');
const bodyParser = require("body-parser");
const cors = require('cors');
const passport = require('passport');
const passportJWT = require('passport-jwt');
const db = require("./models");
require('dotenv').config();

const apiUser = require("./api/user");
const apiBlog = require("./api/blog");

let ExtractJwt = passportJWT.ExtractJwt;
let JwtStrategy = passportJWT.Strategy;
let jwtOptions = {};

jwtOptions.jwtFromRequest = ExtractJwt.fromAuthHeaderAsBearerToken();
jwtOptions.secretOrKey = 'wuwwuvw';

let strategy = new JwtStrategy(jwtOptions, function(jwt_payload, next) {
  console.log('payload received', jwt_payload);
  let user = getUser({ id: jwt_payload.id });
  if (user) {
    next(null, user);
  } else {
    next(null, false);
  }
});

passport.use(strategy);

const app = express();

app.use(passport.initialize());
app.use(fileUpload({
  createParentPath: true
}));
app.use(cors());
app.use(bodyParser.json());
app.use(bodyParser.urlencoded({extended: true}));
app.use(express.static(__dirname + '/public'));


app.use((req, res, next) => {
  res.setHeader('Access-Control-Allow-Origin', '*');
  res.setHeader('Access-Control-Allow-Methods', 'GET, POST, OPTIONS, PUT, PATCH, DELETE');
  res.setHeader('Access-Control-Allow-Headers', 'X-Requested-With,content-type');
  res.setHeader('Access-Control-Allow-Credentials', true);
  next();
});

apiUser(app, db);
apiBlog(app, db);

const port = process.env.PORT || 3030;
app.listen(port);

console.log('API server started on: ' + port);