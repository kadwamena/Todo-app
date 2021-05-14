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

  //Add todo function
  addTodo: function (todo) {
    const id = Date.now();

    // 
    todo.id = id;

    //
    todostore.push(todo);

    return todo;
  },

  //
  deleteTodo: function (id) {
    const tempStore = [];

    //
    for (const todo of todostore) {
      if (todo.id != id) {
        tempStore.push(todo);
      }
    }

    todostore = tempStore;
  },
  editTodo: function (id, todo) {
    const tempStore = [];

    todo.id = id;

    for (const todoitem of todostore) {
      if (todoitem.id == id) {
        tempStore.push(todo);
      } else tempStore.push(todoitem);
    }

    todostore = tempStore;

    return todo;
  },

  getTodo: function (id) {
    for (const todo of todostore) {
      if (todo.id == id) {
        return todo;
      }
    }
    return null;
  },

  getTodos: function (todo) {
    return todostore.slice(0);
  },
};
