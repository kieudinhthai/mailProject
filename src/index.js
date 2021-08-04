const express = require("express")
const path = require("path")
const session = require('express-session');
const router = require('./routers/routers')
const data = require('./connect/connect_db')
const methordOverride = require("method-override");
const port = process.env.PORT || 3000;
const app = express()

app.use(express.json());
app.use(methordOverride("_method"));
app.use(express.static(path.join(__dirname, "public")));
app.use(
    express.urlencoded({
      extended: true,
    })
  );

  app.use(session({
    resave: true, 
    saveUninitialized: true, 
    secret: 'somesecret', 
    cookie: { maxAge: 1000*60*60 }}));

  app.set('view engine', 'ejs')
  app.set('views',path.join(__dirname,'views'))
  app.use('/',router)



data.connect()


app.listen(port,() => console.log(`the app listening at http://localhosst: ${port}`))
