const models = require('./models');


models.User.findOne({
  where: {username: "aslfjaljsf"}
}).then(function(user){

  let newDog = models.Dog.build({
    name: "Tom",
    isWearingHat: true,
    isAggressive: false,
  });

  //if user is found, create dog with user
  //if user not found, create dog without user
  if (user !== null) {
    newDog.userId = user.id;
  }
  newDog.save();
});
