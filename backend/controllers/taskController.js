const { tasks } = require("../db");
const { v4: uuidv4 } = require("uuid");

const getAllTasks = (req, res) => {
  res.json(tasks);
};

const createTask = (req, res) => {
  const { title, status } = req.body;
  if (!title || !status) {
    return res.status(400).json({ message: "Title and status are required" });
  }

  const newTask = { id: uuidv4(), title, status };
  tasks.push(newTask);
  res.status(201).json({ newTask, message: "Task created successfully" });
};

const updateTask = (req, res) => {
  const taskId = req.params.id;
  const { status } = req.body;

  const task = tasks.find((t) => t.id === taskId);
  if (!task) {
    return res.status(404).json({ message: "Task not found" });
  }

  if (!status) {
    return res.status(400).json({ message: "Status is required" });
  }

  task.status = status;
  res.status(200).json({ task, message: "Task updated successfully" });
};

const deleteTask = (req, res) => {
  const taskId = req.params.id;
  const index = tasks.findIndex((t) => t.id === taskId);

  if (index === -1) {
    return res.status(404).json({ message: "Task not found" });
  }

  const deletedTask = tasks.splice(index, 1)[0];
  res.json(deletedTask);
};

module.exports = {
  getAllTasks,
  createTask,
  updateTask,
  deleteTask,
};
