/*global require, __dirname, setTimeout, console*/

'use strict';

var port = 9000;

// set up ========================
var express  = require('express');
var app      = express();                               // create our app w/ express
var morgan = require('morgan');             // log requests to the console (express4)
var bodyParser = require('body-parser');    // pull information from HTML POST (express4)
var methodOverride = require('method-override'); // simulate DELETE and PUT (express4)

// configuration =================

app.use(express.static(__dirname + '/src'));                 // set the static files location /public/img will be /img for users
app.use(morgan('dev'));                                         // log every request to the console
app.use(bodyParser.urlencoded({extended:'true'}));            // parse application/x-www-form-urlencoded
app.use(bodyParser.json());                                     // parse application/json
app.use(bodyParser.json({ type: 'application/vnd.api+json' })); // parse application/vnd.api+json as json
app.use(methodOverride());

var recipesMap = {
  1: {
    id: '1',
    title: 'Cookies',
    description: 'Delicious, crisp on the outside, chewy on the outside, oozing with chocolatey goodness cookies. The best kind',
    ingredients: [
      {
        amount: '1',
        amountUnits: 'packet',
        ingredientName: 'Chips Ahoy'
      }
    ],
    instructions: '1. Go buy a packet of Chips Ahoy\n2. Heat it up in an oven\n3. Enjoy warm cookies\n4. Learn how to bake cookies from somewhere else'
  },
  2: {
    id: 2,
    title: 'Recipe 2',
    description: 'Description 2',
    instructions: 'Instruction 2',
    ingredients: [
      {amount: 13, amountUnits: 'pounds', ingredientName: 'Awesomeness'}
    ]
  }
};

var nextId = 3;

app.get('/recipes', function(req, res) {
  var recipes = [];

  for (var key in recipesMap) {
    recipes.push(recipesMap[key]);
  }

  // simulate delay in server
  setTimeout(function() {
    res.send(recipes);
  }, 500);
});

app.get('/recipes/:id', function(req, res) {
  console.log('Requesting recipe with id', req.params.id);
  res.send(recipesMap[req.params.id]);
});

app.post('/recipes', function(req, res) {
  var recipe = {};
  recipe.id = nextId++;
  recipe.title = req.body.title;
  recipe.description = req.body.description;
  recipe.ingredients = req.body.ingredients;
  recipe.instructions = req.body.instructions;

  recipesMap[recipe.id] = recipe;

  res.send(recipe);
});

app.post('/recipes/:id', function(req, res) {
  var recipe = {};
  recipe.id = req.params.id;
  recipe.title = req.body.title;
  recipe.description = req.body.description;
  recipe.ingredients = req.body.ingredients;
  recipe.instructions = req.body.instructions;

  recipesMap[recipe.id] = recipe;

  res.send(recipe);
});

// application -------------------------------------------------------------
app.get('*', function(req, res) {
  res.sendfile('./src/index.html'); // load the single view file (angular will handle the page changes on the front-end)
});

app.listen(port);
console.log('Now serving the app at http://localhost:' + port + '/');
