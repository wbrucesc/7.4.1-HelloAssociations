const models = require('./models');


models.Dog.findOne({
  where: {name: "Tom"}
}).then(function(dog){
  models.User.findOne({
    where: {username: "joel"}
  }).then(function(user){
    dog.userId = user.id;
    dog.save(); 
  });
});
