if (process.env.NODE_ENV !== 'production') {
  require('dotenv').config()
}

const express = require('express')
const app = express()
const bcrypt = require('bcrypt')
const passport = require('passport')
const exphbs = require('express-handlebars');
const flash = require('express-flash')
const session = require('express-session')
const methodOverride = require('method-override')
const db = require("./models")
const PORT = process.env.PORT || 8080;
const initializePassport = require('./public/js/passport-config')
initializePassport(
  passport,
  email => db.User.findAll({
    where: {
      email: email
    }
  }),

  id => db.User.findAll({
    where: {
      id: id
    }
  })
);


app.engine(
  'handlebars',
  exphbs({
    defaultLayout: 'main'
  })
);
app.set('view engine', 'handlebars');

app.use(express.static('public'));
app.use(express.urlencoded({
  extended: true
}));
app.use(express.json());

// Routes
// =============================================================


require("./routes/act-api-routes.js")(app);

app.use(require('express-session')({
  secret: 'keyboard cat',
  resave: true,
  saveUninitialized: true
}));

app.use(flash());
app.use(session({
  secret: process.env.SESSION_SECRET,
  resave: false,
  saveUninitialized: false
}));
app.use(passport.initialize());
app.use(passport.session());
app.use(methodOverride('_method'));

app.get('/', checkAuthenticated, (req, res) => {

  res.render('index');
});

app.get('/login', (req, res) => {
  res.render('login');
});

app.get('/guest', (req, res) => {
  res.render('index');
})

app.post('/login', passport.authenticate('local', {
  successRedirect: '/',
   failureRedirect: '/login',
  failureFlash: true
}))




app.get('/register', (req, res) => {
  res.render('register')
})

app.post('/register', async (req, res) => {

  try {
    const hashedPassword = await bcrypt.hash(req.body.password, 10)

    db.User.create({
      first_name: req.body.first_name,
      last_name: req.body.last_name,
      email: req.body.email,
      password: hashedPassword
    }).then(function (result) {

      // console.log(result)
      res.redirect('/login');

    })



  } catch (err) {
    // console.log(err);
    res.redirect('/register');
  }
})

app.delete('/logout', (req, res) => {
  req.logOut()
  res.redirect('/login')
})

function checkAuthenticated(req, res, next) {

  if (req.isAuthenticated()) {
    return next()
  }

  res.redirect('/login')
}


db.sequelize.sync({

}).then(function () {
  app.listen(PORT, function () {
    console.log("App listening on PORT " + PORT);
  });
});