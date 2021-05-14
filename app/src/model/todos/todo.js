//Import config model
const config = require("../../config/config");

//Create storage array
let todostore = [];

// Populate fake data if usefake is true
if (config.usefake) {
  todostore.push(
    {
      id: 1011,
      title: "Work item",
      date: Date.now(),
      type: "Work",
      description: "To complete work assignment",
    },
    {
      id: 2011,
      title: "Home item",
      date: Date.now(),
      type: "Home",
      description: "To complete home assignment",
    },
    {
      id: 3011,
      title: "Park item",
      date: Date.now(),
      type: "Park",
      description: "To complete park assignment",
    },
    {
      id: 4011,
      title: "Church item",
      date: Date.now(),
      type: "Church",
      description: "To complete church assignment",
    }
  );
}

module.exports = {

  // adds new todo to the storage
  addTodo: function (todo) {
    const id = Date.now();

    // assign the new todo anid
    todo.id = id;

    // push into storage array
    todostore.push(todo);

    // return the effective todo, which contains the id
    return todo;
  },

  // deletes todo from data storage
  deleteTodo: function (id) {
    
    // create a temporal store
    const tempStore = [];

    // for each todo in todostore
    for (const todo of todostore) {
      
      // if not todo to be deleted then push, else skip
      if (todo.id != id) {
        
        // put in temporal store
        tempStore.push(todo);
      }
    }

    // assign todos that were not skipped as current storage items
    todostore = tempStore;
  },
  
  // edits a todo provided its id. Also accepts the new todo that should replace the current in storage
  editTodo: function (id, todo) {
    
    // create a temporal store
    const tempStore = [];

    // optional. but makes sure id property is present
    todo.id = id;

    // for each todo in todostore
    for (const todoitem of todostore) {
      
      // if id that should be updated
      if (todoitem.id == id) {
        
        // push the new todo
        tempStore.push(todo);
      } 
      
      // push the current todo
      else tempStore.push(todoitem);
    }

    // update our storage
    todostore = tempStore;

    // return what was saved
    return todo;
  },

  // gets a particular todo, given its id
  getTodo: function (id) {
    
    // for each todo in todostore
    for (const todo of todostore) {
      
      // if its the todo we are looking for the return it
      if (todo.id == id) {
        return todo;
      }
    }
    
    // return empty if not found
    return null;
  },

  // get all todos
  getTodos: function (todo) {
    
    // we clone to return a copy of the storage,to avoid direct manipulation
    return todostore.slice(0);
  },
};
