import React, { useState, useEffect } from "react";
import toast from "react-hot-toast";

const TodoList = () => {
  const [tasks, setTasks] = useState([]);
  const [input, setInput] = useState("");
  const [filter, setFilter] = useState("All");
  const [filteredTasks, setFilteredTasks] = useState([]);
  console.log(tasks);

  useEffect(() => {
    if (filter === "All") {
      setFilteredTasks(tasks);
    } else if (filter === "Completed") {
      setFilteredTasks(tasks.filter((task) => task.completed));
    } else if (filter === "Pending") {
      setFilteredTasks(tasks.filter((task) => !task.completed));
    }
  }, [tasks, filter]);

  const addTask = () => {
    if (input.trim() === "") return;
    const newTask = {
      id: Date.now(),
      title: input.trim(),
      completed: false,
    };
    setTasks([...tasks, newTask]);
    toast.success("Task added successfully!");
    setInput("");
  };

  const updateStatus = (id, status) => {
    setTasks(
      tasks.map((task) =>
        task.id === id ? { ...task, completed: status === "Completed" } : task
      )
    );
    toast.success("Status updated successfully!");
  };

  const deleteTask = (id) => {
    setTasks(tasks.filter((task) => task.id !== id));
    toast.success("Task deleted successfully!");
  };

  return (
    <div className="min-h-screen bg-gradient-to-br from-blue-50 to-blue-100 flex items-center justify-center p-6">
      <div className="bg-white shadow-xl rounded-2xl p-6 w-full max-w-md">
        <h2 className="text-2xl font-bold text-gray-800 mb-4 text-center">
          ✅ Todo List
        </h2>

        <div className="flex mb-4">
          <input
            type="text"
            value={input}
            onChange={(e) => setInput(e.target.value)}
            placeholder="Enter a task..."
            className="border border-gray-300 rounded-l-xl p-2 flex-grow focus:outline-none"
          />
          <button
            onClick={addTask}
            className="bg-blue-500 hover:bg-blue-600 text-white px-4 rounded-r-xl transition"
          >
            Add
          </button>
        </div>

        <div className="flex justify-center gap-2 mb-4">
          {["All", "Completed", "Pending"].map((f) => (
            <button
              key={f}
              onClick={() => setFilter(f)}
              className={`px-3 py-1 rounded-lg text-sm font-medium transition ${
                filter === f
                  ? "bg-blue-500 text-white shadow"
                  : "bg-gray-200 text-gray-700 hover:bg-gray-300"
              }`}
            >
              {f}
            </button>
          ))}
        </div>

        <ul className="space-y-2">
          {filteredTasks.length > 0 ? (
            filteredTasks.map((task) => (
              <li
                key={task.id}
                className="p-3 border rounded-xl flex items-center justify-between transition hover:shadow-md"
              >
                <span className="flex-grow">{task.title}</span>

                <select
                  value={task.completed ? "Completed" : "Pending"}
                  onChange={(e) => updateStatus(task.id, e.target.value)}
                  className="ml-2 border rounded-lg px-2 py-1 text-sm bg-gray-50 focus:outline-none"
                >
                  <option value="Pending">Pending</option>
                  <option value="Completed">Completed</option>
                </select>

                <button
                  onClick={() => deleteTask(task.id)}
                  className="ml-2 text-red-500 hover:text-red-700 font-bold"
                >
                  ❌
                </button>
              </li>
            ))
          ) : (
            <p className="text-center text-gray-500 text-sm">
              No tasks found. Add one above!
            </p>
          )}
        </ul>
      </div>
    </div>
  );
};

export default TodoList;
