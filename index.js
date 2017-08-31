const models = require('./models');
const express = require('express');
const exphbs = require('express-handlebars');
const bodyParser = require('body-parser');
const session = require('express-session');

const passport = require('passport');
const LocalStrategy = require('passport-local').Strategy;

const app = express();

const checkPassword = function(user, password){
  return user.password === password;
};

passport.use(new LocalStrategy(function(username, password, done){
  models.User.findOne({
    where: {
      username: username
    }
  }).then(function(user){
    if(user === null) {
      done(null, false);       //false means no user
    } else if (user && checkPassword(user, password)) {
      done(null, user);
    } else {
      done(null, false);        //there is a user but their password is not correct
    }
  });
}));

passport.serializeUser(function(user, done){        //stores user.id onto the session
  done(null, user.id);
});

passport.deserializeUser(function(id, done){
  models.User.findById(id).then(function(user){
    done(null, user);
  });
});

app.use(session({
  secret: 'i am a cat',
  resave: false,
  saveUninitialized: true             //will create a session if one hasn't been initialized yet
}));


app.use(passport.initialize());
app.use(passport.session());

app.use(bodyParser.urlencoded({extended: false}));

app.engine('handlebars', exphbs({defaultLayout: 'main'}));
app.set('view engine', 'handlebars');

const requireLogin = function(req, res, next) {
  if (req.user !== null) {
    next();
  } else {
    res.redirect('login');
  }
};

app.get('/', function(req, res){
    res.render('index');
});

app.get('/secret', requireLogin, function(req, res){
  res.send('SECRET');
});

app.post('/login', passport.authenticate('local', {
    successRedirect: '/secret',
    failureRedirect: '/'
}));

app.listen(3000);
