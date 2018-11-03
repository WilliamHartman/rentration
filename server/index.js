const http = require('http');
const path = require('path');
const express = require('express');
const axios = require('axios');
const Auth0Strategy = require('passport-auth0');
const passport = require('passport');
const massive = require('massive');
const session = require("express-session");
const process = require("process");
const bodyParser = require('body-parser');
const cors = require('cors')
const moment = require('moment');
const ctrl = require('./controllers/controller')
require('dotenv').config();


const app = express();
app.use(bodyParser.json());
app.use(cors());
// app.use(express.static(__dirname + './../build'));

const SESSION_SECRET = process.env.SESSION_SECRET;

// Use the session middleware
app.use(session({
     secret: SESSION_SECRET, 
     cookie: { maxAge: 60000 },
     resave: false,
     saveUninitialized: true
    }));

app.use(passport.initialize());
app.use(passport.session()); 

massive(process.env.CONNECTION_STRING)
.then( (db) => {
    console.log('Connected to Heroku')
    app.set('db', db);
}).catch(err=>console.log(err))

const strategy = new Auth0Strategy({
    domain: process.env.AUTH_DOMAIN,
    clientID: process.env.AUTH_CLIENT_ID,
    clientSecret: process.env.AUTH_CLIENT_SECRET,
    callbackURL: process.env.AUTH_CALLBACK
}, (accessToken, refreshToken, extraParams, profile, done) => {
    const db = app.get("db");
    const userData = profile._json;
    
    db.find_user([userData.sub]).then(user => {
        if (user[0]) {
          return done(null, user[0].user_id);
        } else {
          db.create_user([
              userData.given_name,
              userData.family_name,
              userData.email,
              userData.picture,
              userData.sub
            ])
            .then(user => {
              return done(null, user[0].user_id);
            });
        }
        return done(null, user[0].user_id)
      });
    }
  )

passport.use(strategy)

passport.serializeUser( (id, done) => {
    done(null, id);
}) 
 
passport.deserializeUser( (id, done) => {
    app.get("db").find_session_user(id)
        .then(user => {
        console.log(user.auth_id, ` is deserialized.`);
        done(null, user[0]);
        });
})

// Endpoints
app.get("/auth", passport.authenticate("auth0"));
app.get("/auth/callback", passport.authenticate("auth0", {successRedirect: process.env.SUCCESS_REDIRECT}));

app.get("/auth/me", (req, res) => {
    if (req.user) {
      return res.status(200).send(req.user);
    } else {
      return res.status(200).send(false);
    }
  });

app.get("/auth/logout", (req, res) => {
    req.logOut();
    res.redirect(process.env.SUCCESS_REDIRECT)
})

// app.get("/logout", function(req, res) {
//     req.session.authorized = false;
//     req.session.access_token = null;
//     req.session.save();
//     res.redirect(process.env.FRONTEND_URL);  
// })

//Data Endpoints
app.get('/getuserbills/:user', ctrl.getUserBills)

//launch the server
const PORT = 8086;
app.listen(PORT, () => console.log(`Listening on port: ${PORT}`));