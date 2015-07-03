"use strict";

var express = require("express"),
  methodOverride = require("method-override"),
  bodyParser = require("body-parser"),
  app     = express(),
  port    = parseInt(process.env.PORT, 10) || 8080;

// Enables CORS
var enableCORS = function(req, res, next) {
    res.header('Access-Control-Allow-Origin', '*');
    res.header('Access-Control-Allow-Methods', 'GET,PUT,POST,DELETE,OPTIONS');
    res.header('Access-Control-Allow-Headers', 'Content-Type, Authorization, Content-Length, X-Requested-With');

    // intercept OPTIONS method
    if ('OPTIONS' == req.method) {
      res.send(200);
    }
    else {
      next();
    }
};

app.use(enableCORS);
app.use(methodOverride());
app.use(bodyParser.json());
app.use(express.static(__dirname + '/app'));

var recipesMap = {
  1: {
    content: 'bbb',
    isCompleted: true
  },
  2: {
    content: 'aaa',
    isCompleted: false
  }
};
var next_id = 3;

app.get('/todos', function(req, res) {
  var recipes = [];

  for (var key in recipesMap) {
    recipes.push(recipesMap[key]);
  }

  // simulate delay in server
  setTimeout(function() {
    res.json(recipes);
  }, 500);
});

app.get('/recipes', function(req, res) {
  var recipes = [];

  res.header("Access-Control-Allow-Origin", "*");
  res.header("Access-Control-Allow-Headers", "X-Requested-With");

  for (var key in recipes_map) {
    recipes.push(recipes_map[key]);
  }

  // Simulate delay in server
  setTimeout(function() {
    res.send(recipes);
  }, 500);
});

app.get('/recipes/:id', function(req, res) {
  res.header("Access-Control-Allow-Origin", "*");
  res.header("Access-Control-Allow-Headers", "X-Requested-With");

  console.log('Requesting recipe with id', req.params.id);
  res.send(recipes_map[req.params.id]);
});

app.post('/recipes', function(req, res) {
  var recipe = {};

  recipe.id = next_id++;
  recipe.title = req.body.title;
  recipe.description = req.body.description;
  recipe.ingredients = req.body.ingredients;
  recipe.instructions = req.body.instructions;

  recipes_map[recipe.id] = recipe;

  res.send(recipe);
});

app.post('/recipes/:id', function(req, res) {
  var recipe = {};

  recipe.id = req.params.id;
  recipe.title = req.body.title;
  recipe.description = req.body.description;
  recipe.ingredients = req.body.ingredients;
  recipe.instructions = req.body.instructions;

  recipes_map[recipe.id] = recipe;

  res.send(recipe);
});

app.listen(port);
console.log('Now serving the app at http://localhost:' + port + '/');
