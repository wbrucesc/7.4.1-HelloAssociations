const models = require('./models');
const express = require('express');
const exphbs = require('express-handlebars');
const bodyParser = require('body-parser');

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



app.engine('handlebars', exphbs({defaultLayout: 'main'}));
app.set('view engine', 'handlebars');


app.get('/', function(req, res){
    res.render('index');
});



app.listen(3000);
