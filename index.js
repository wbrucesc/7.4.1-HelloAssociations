const models = require('./models');


models.User.findOne({
  where: {username: "joel"},
  include: [models.Dog]
}).then(function(user){
  console.log(user.Dogs);
});
