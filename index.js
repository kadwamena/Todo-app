const express = require("express");

const router = express.Router();

const app = express();

app.use(express.urlencoded({ extended: true }));

app.use(express.json());

const todosRoute = require("./app/src/controllers/todos/todos");

app.use("/todos", todosRoute);

app.listen(3000, function () {
  console.log("Todo App Server is up and running on port 3000...");
});
