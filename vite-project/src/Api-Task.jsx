import React, { useState, useEffect } from "react";
import axios from "axios";
import toast from "react-hot-toast";

const ApiTodo = () => {
  const [tasks, setTasks] = useState([]);
  const [input, setInput] = useState("");
  const [filter, setFilter] = useState("All");
  const [filteredTasks, setFilteredTasks] = useState([]);

  const API_BASE = "http://localhost:3000/api/tasks";

  const fetchTasks = async () => {
    try {
      const res = await axios.get(API_BASE);
      setTasks(
        res.data.map((task) => ({
          ...task,
          completed: task.status === "completed",
        }))
      );
    } catch (err) {
      console.error("Failed to fetch tasks:", err);
    }
  };

  useEffect(() => {
    fetchTasks();
  }, []);

  useEffect(() => {
    if (filter === "All") {
      setFilteredTasks(tasks);
    } else if (filter === "Completed") {
      setFilteredTasks(tasks.filter((task) => task.completed));
    } else if (filter === "Pending") {
      setFilteredTasks(tasks.filter((task) => !task.completed));
    }
  }, [tasks, filter]);

  const addTask = async () => {
    if (input.trim() === "") return;
    try {
      const res = await axios.post(API_BASE, {
        title: input.trim(),
        status: "pending",
      });
      if (res?.status === 201) {
        setInput("");
        toast.success("Task added successfully!");
        fetchTasks();
      } else {
        toast.error("Failed to add task!");
      }
    } catch (err) {
      console.error("Failed to add task:", err);
    }
  };

  const updateStatus = async (id, status) => {
    try {
      const res = await axios.put(`${API_BASE}/${id}`, {
        status: status.toLowerCase(),
      });

      if (res?.status === 200) {
        fetchTasks();
        toast.success(res.data.message);
      } else {
        toast.error("Failed to update task status!");
      }
    } catch (err) {
      toast.error("Failed to update task:", err);
    }
  };

  const deleteTask = async (id) => {
    try {
      await axios.delete(`${API_BASE}/${id}`);
      setTasks(tasks.filter((task) => task.id !== id));
      toast.success("Task deleted successfully!");
    } catch (err) {
      console.error("Failed to delete task:", err);
    }
  };

  return (
    <div className="min-h-screen bg-gradient-to-br from-blue-50 to-blue-100 flex items-center justify-center p-6">
      <div className="bg-white shadow-xl rounded-2xl p-6 w-full max-w-3xl">
        <h2 className="text-2xl font-bold text-gray-800 mb-4 text-center">
          ✅ Todo List (Table View)
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

        <div className="overflow-x-auto">
          <table className="w-full border border-gray-300 rounded-lg overflow-hidden">
            <thead className="bg-gray-100">
              <tr>
                <th className="border px-4 py-2 text-left">ID</th>
                <th className="border px-4 py-2 text-left">Title</th>
                <th className="border px-4 py-2 text-left">Status</th>
                <th className="border px-4 py-2 text-center">Actions</th>
              </tr>
            </thead>
            <tbody>
              {filteredTasks.length > 0 ? (
                filteredTasks.map((task, index) => (
                  <tr key={task.id} className="hover:bg-gray-50 transition">
                    <td className="border px-4 py-2">{index + 1}</td>
                    <td className="border px-4 py-2">{task.title}</td>
                    <td className="border px-4 py-2 ">
                      <select
                        value={task.completed ? "Completed" : "Pending"}
                        onChange={(e) => updateStatus(task.id, e.target.value)}
                        className="border rounded-lg px-2 py-1 text-sm bg-gray-50 cursor-pointer"
                      >
                        <option value="Pending" className="cursor-pointer">
                          Pending
                        </option>
                        <option value="Completed" className="cursor-pointer">
                          Completed
                        </option>
                      </select>
                    </td>
                    <td className="border px-4 py-2 text-center">
                      <button
                        onClick={() => deleteTask(task.id)}
                        className="text-red-500 hover:text-red-700 font-bold"
                      >
                        ❌
                      </button>
                    </td>
                  </tr>
                ))
              ) : (
                <tr>
                  <td colSpan="4" className="text-center text-gray-500 py-4">
                    No tasks found. Add one above!
                  </td>
                </tr>
              )}
            </tbody>
          </table>
        </div>
      </div>
    </div>
  );
};

export default ApiTodo;
