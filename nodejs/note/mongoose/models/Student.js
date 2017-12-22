const mongoose = require('mongoose');
const db = mongoose.createConnection('mongodb://localhost/test');

db.on('open',() => {
	console.log('success');
})

let animalSchema = new mongoose.Schema({ name: String, type: String });

animalSchema.methods.findSimilarTypes = function(cb) {
  return this.model('Animal').find({ type: this.type }, cb);
};

let Animal = db.model('Animal', animalSchema);

let dog = new Animal({ type: 'dog' });

// Animal.create({name: 'lin1',type: 'dog'});
// Animal.create({name: 'lin2',type: 'cat'});
// Animal.create({name: 'lin3',type: 'cat'});
// Animal.create({name: 'lin4',type: 'dog'});

dog.findSimilarTypes(function(err, dogs) {
  console.log(dogs); // woof
});
