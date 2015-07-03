"use strict";

var express = require("express"),
  methodOverride = require("method-override"),
  bodyParser = require("body-parser"),
  app = express(),
  port = parseInt(process.env.PORT, 10) || 8080;

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

var todos_map = {
  '1': {
    id: 1,
    name: "task 1",
    finished: true,
  },
  '2': {
    id: 2,
    name: "task 2",
    finished: false,
  },
  '3': {
    id: 3,
    name: "task 3",
    finished: true,
  },
  '4': {
    id: 4,
    name: "task 4",
    finished: true,
  }
};

/* Get list todos */
app.get('/todos', function(req, res) {
  var todos = [];

  res.header("Access-Control-Allow-Origin", "*");
  res.header("Access-Control-Allow-Headers", "X-Requested-With");

  for (var key in todos_map) {
    todos.push(todos_map[key]);
  }

  // Simulate delay in server
  setTimeout(function() {
    res.send(todos);
  }, 500);
});

/* Get todo by id */
app.get('/todos/:id', function(req, res) {
  res.header("Access-Control-Allow-Origin", "*");
  res.header("Access-Control-Allow-Headers", "X-Requested-With");

  console.log('Requesting todo with id', req.params.id);
  res.send(todos_map[req.params.id]);
});

/* Add new todo */
app.post('/todos', function(req, res) {
  var next_id = parseInt(Object.keys(todos_map).pop()) + 1;
  var todo = getTodoByValues([next_id++, req.body.name, false]);

  todos_map[todo.id] = todo;

  res.send(todo);
});

/* Update todo */
app.post('/todos/:id', function(req, res) {
  var todo = getTodoByValues([req.params.id, req.body.name, req.body.finished]);;

  todos_map[todo.id] = todo;

  res.send(todo);
});

/* Delete todo */
app.delete('/todos/:id', function(req, res) {
  delete todos_map[req.params.id];

  res.send(todos_map[req.params.id]);
});

/* Delete finished todo */
app.delete('/todos', function(req, res) {
  try {
    for (var key in todos_map) {
      if(todos_map[key].finished) {
        delete todos_map[key];
      }
    }
  } catch(err) {
    res.status(500).send(err);
  }

  res.status(200).send();
});

/**/
app.listen(port);
console.log('Now serving the app at http://localhost:' + port + '/');

/**
 * [getTodoByValues description]
 * @param  {[type]} arr [description]
 * @return {[type]}     [description]
 */
function getTodoByValues(arr) {
  var todo = {};

  todo.id = arr[0];
  todo.name = arr[1];
  todo.finished = arr[2];

  return todo;
};
