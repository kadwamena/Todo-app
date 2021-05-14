const express = require("express");

const router = express.Router();

//Import method override
var methodOverride = require("method-override");

//Setup method override middleware to support PUT and DELETE methods in HTML forms
router.use(methodOverride("_method"));

//Import model
const Todos = require("../../model/todos/todo");

const formatUtils = require("../../utils/formatutils");

//Registering homepage
router.get("/", function (req, res) {
  
  //Get all todos from model
  const todos = Todos.getTodos();

  let htmlFrag = "";

  //For each todo found
  for (let todo of todos) {
    htmlFrag += `<tr>`

        //Print todo title
       +`<td>${todo.title}</td>`
       
       //Print todo date
       +`<td>${formatUtils.formatDate(new Date(todo.date))}</td>`
      
       //Print todo type
      +`<td>${todo.type}</td>`
      
      //Print todo description
      +`<td>${todo.description}</td>`
      
      //Display delete button
      +`<td><a href="/todos/update/${todo.id}">Update</a></td>`
        
      //Display edit hypertext
      +`<td><form method="POST" action="/todos/${todo.id}?_method=DELETE"><input type="submit" value="delete"/></form></td>
        </tr>`;
  }

  res.send(` 
    <html> 
        <body>
            <div>
                <a href="/todos/create">Add Item </a>
            </div>
            <table>
                <tr>
                    <th>Title</th>
                    <th>Date</th>
                    <th>Type</th>
                    <th>Description</th>
                    <th>Controls</th>
                <tr>
                ${htmlFrag}
            </table>
        </body>
    </html> `);
});

//Implementing the create page
router.get("/create", function (req, res) {
  res.send(` 
    <html> 
        <body>
            <div>
                <a href="/todos">Back</a>
            </div>
            <form action="/todos" method="POST">
                <div>
                    <label> Title </label>
                    <input type="text" name="title" />
                </div>
                <div>
                    <label> Date </label>
                    <input type="date" name="date"/>
                </div>
                <div>
                    <label> Type </label>
                    <select name="type">
                        <option value="cooking">Cooking</option>
                        <option value="travel">Travel</option>
                        <option value="study">Study</option>
                    </select>
                </div>
                <div>
                    <label> Description </label>
                    <input type="text" name="description"/>
                </div>
                <div>
                    <input type="submit"/>
                </div>
            </form>
        </body>
    </html> `);
});

//Implementing the update page
router.get("/update/:id", function (req, res) {
  const todo = Todos.getTodo(req.params.id);
  if (!todo) {
    return res.status(404).end();
  }
  res.send(` 
      <html> 
          <body>
              <div>
                  <a href="/todos">Back</a>
              </div>
              <form action="/todos/${todo.id}?_method=PUT" method="POST">
                  <div>
                      <label> Title </label>
                      <input type="text" name="title" value="${todo.title}"/>
                  </div>
                  <div>
                      <label> Date </label>
                      <input type="date" name="date" value="${formatUtils.formatDate(
                        new Date(todo.date)
                      )}"/>
                  </div>
                  <div>
                      <label> Type </label>
                      <select name="type">
                          <option ${
                            todo.type == "cooking" ? "selected" : ""
                          } value = "cooking">Cooking</option>
                          <option ${
                            todo.type == "travel" ? "selected" : ""
                          } value = "travel">Travel</option>
                          <option ${
                            todo.type == "study" ? "selected" : ""
                          } value = "study">Study</option>
                      </select>
                  </div>
                  <div>
                      <label> Description </label>
                      <input type="text" name="description" value="${
                        todo.description
                      }"/>
                  </div>
                  <div>
                      <input type="submit"/>
                   </div>
              </form>
          </body>
      </html> `);
});

//Implementing the POST route
router.post("/", function (req, res) {
  const newTodo = {
    title: req.body.title,
    date: Date.parse(req.body.date),
    type: req.body.type,
    description: req.body.description,
  };

  const savedTodo = Todos.addTodo(newTodo);

  if (req.accepts("text/html")) {
    return res.redirect("/todos");
  }

  return res.json({
    status: "sucess",
    result: savedTodo,
  });
});

//Implementing the update route/endpoint
router.put("/:id", function (req, res) {
  const newTodo = {
    title: req.body.title,
    date: Date.parse(req.body.date),
    type: req.body.type,
    description: req.body.description,
  };
  const savedTodo = Todos.editTodo(req.params.id, newTodo);

  if (req.accepts("text/html")) {
    return res.redirect("/todos");
  }

  return res.json({
    staus: "success",
    result: savedTodo,
  });
});

//Route for DELETING
router.delete("/:id", function (req, res) {
  let id = req.params.id;
  Todos.deleteTodo(id);

  return res.redirect("/todos");
});

module.exports = router;
