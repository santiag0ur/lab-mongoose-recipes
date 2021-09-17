const mongoose = require('mongoose');

// Import of the model Recipe from './models/Recipe.model.js'
const Recipe = require('./models/Recipe.model');
// Import of the data from './data.json'
const data = require('./data');

const MONGODB_URI = 'mongodb://localhost:27017/recipe-app';

// Connection to the database "recipe-app"
mongoose
  .connect(MONGODB_URI, {
    useCreateIndex: true,
    useNewUrlParser: true,
    useUnifiedTopology: true
  })
  .then((self) => {
    console.log(`Connected to the database: "${self.connection.name}"`);
    // Before adding any recipes to the database, let's remove all existing ones
    return Recipe.deleteMany();
  })
  // Run your code here, after you have insured that the connection was made
  .then(() => {
    console.log('Previous content of the database deleted');
    return Recipe.create({
      title: 'Cream Chip Cookies',
      level: 'Amateur Chef',
      ingredients: [
        '1/2 cup light brown sugar',
        '1 large egg',
        '2 tablespoons milk',
        '1 1/4 teaspoons vanilla extract',
        '2 cups semisweet cream chips'
      ],
      cuisine: 'French',
      dishType: 'dessert',
      image:
        'https://imagesvc.meredithcorp.io/v3/mm/image?url=https%3A%2F%2Fimages.media-allrecipes.com%2Fuserphotos%2F4398987.jpg&w=596&h=399.32000000000005&c=sc&poi=face&q=85',
      duration: 30,
      creator: 'Chef Jennifer'
    });
  })
  .then((recipe) => {
    console.log('A new recipe has been added to the database');
    console.log(recipe);
    return Recipe.insertMany(data);
  })
  .then((recipes) => {
    console.log('New recipes have been added to the database');
    console.log(recipes);
    return Recipe.findOneAndUpdate(
      { title: { $regex: 'Rigatoni' } },
      { duration: 100 },
      { new: true }
    );
  })
  .then((recipe) => {
    console.log('A recipe has been updated');
    console.log(recipe);
    return Recipe.deleteOne({ title: { $regex: 'Cake' } });
  })
  .then((recipe) => {
    console.log('success!');
    console.log(recipe);
    mongoose.connection.close();
  })
  .catch((error) => {
    console.error('Error connecting to the database', error);
  });
