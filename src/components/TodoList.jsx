import React, { useState } from "react";

const TodoList = () => {
  const [tasks, setTasks] = useState([]);
  const [taskInput, setTaskInput] = useState("");
  const [category, setCategory] = useState("Work");
  const [priority, setPriority] = useState("Medium");
  const [editingIndex, setEditingIndex] = useState(null);
  const [editingText, setEditingText] = useState("");
  const [filter, setFilter] = useState("All");

  const handleAddTask = () => {
    if (taskInput.trim() === "") return;

    const newTask = {
      text: taskInput,
      category,
      priority,
      completed: false,
    };

    setTasks([...tasks, newTask]);
    setTaskInput("");
  };

  const handleDeleteTask = (index) => {
    setTasks(tasks.filter((_, i) => i !== index));
  };

  const handleToggleCompletion = (index) => {
    const updatedTasks = [...tasks];
    updatedTasks[index].completed = !updatedTasks[index].completed;
    setTasks(updatedTasks);
  };

  const handleEditTask = (index) => {
    setEditingIndex(index);
    setEditingText(tasks[index].text);
  };

  const handleSaveEdit = (index) => {
    const updatedTasks = [...tasks];
    updatedTasks[index].text = editingText;
    setTasks(updatedTasks);
    setEditingIndex(null);
    setEditingText("");
  };

  const handleClearAll = () => {
    setTasks([]);
  };

  const filteredTasks = tasks.filter((task) => {
    if (filter === "All") return true;
    if (filter === "Completed") return task.completed;
    if (filter === "Pending") return !task.completed;
    return true;
  });

  return (
    <div className="bg-gray-50 text-gray-800">
      <div className="max-w-3xl mx-auto p-8">
        <div className="flex justify-between mb-4">
          <h1 className="text-4xl font-bold text-center mb-6">Advanced Todo List</h1>
        </div>

        <div className="flex flex-col md:flex-row mb-6 space-y-4 md:space-y-0 md:space-x-4">
          <input
            type="text"
            value={taskInput}
            onChange={(e) => setTaskInput(e.target.value)}
            className="w-full md:w-3/5 p-3 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-blue-500"
            placeholder="Enter your task"
          />
          <select
            value={category}
            onChange={(e) => setCategory(e.target.value)}
            className="w-full md:w-1/5 p-3 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-blue-500"
          >
            <option value="Work">Work</option>
            <option value="Personal">Personal</option>
            <option value="Shopping">Shopping</option>
            <option value="Others">Others</option>
          </select>
          <select
            value={priority}
            onChange={(e) => setPriority(e.target.value)}
            className="w-full md:w-1/5 p-3 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-blue-500"
          >
            <option value="Low">Low</option>
            <option value="Medium">Medium</option>
            <option value="High">High</option>
          </select>
          <button
            onClick={handleAddTask}
            className="w-full md:w-auto px-6 py-3 bg-blue-500 text-white rounded-md hover:bg-blue-600"
          >
            Add Task
          </button>
        </div>

        <div className="flex flex-col md:flex-row justify-between mb-4 space-y-4 md:space-y-0 md:space-x-4">
          <select
            value={filter}
            onChange={(e) => setFilter(e.target.value)}
            className="w-full md:w-auto p-2 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-blue-500"
          >
            <option value="All">All Tasks</option>
            <option value="Completed">Completed</option>
            <option value="Pending">Pending</option>
          </select>
          <button
            onClick={handleClearAll}
            className="w-full md:w-auto p-3 bg-red-500 text-white rounded-md hover:bg-red-600"
          >
            Clear All
          </button>
        </div>

        <ul className="space-y-4">
          {filteredTasks.length === 0 ? (
            <li className="text-center text-gray-400">No tasks available!</li>
          ) : (
            filteredTasks.map((task, index) => (
              <li
                key={index}
                className={`transition-transform transform duration-300 ease-in-out ${
                  task.completed ? "bg-green-100" : "bg-gray-100"
                } rounded-lg p-4 shadow-sm flex items-center justify-between`}
              >
                <div className="flex items-center">
                  <input
                    type="checkbox"
                    checked={task.completed}
                    onChange={() => handleToggleCompletion(index)}
                    className="mr-4 w-5 h-5 text-blue-500"
                  />
                  <span
                    className={`${
                      task.completed ? "line-through text-gray-400" : "text-gray-800"
                    } text-lg flex-1`}
                  >
                    {editingIndex === index ? (
                      <input
                        type="text"
                        value={editingText}
                        onChange={(e) => setEditingText(e.target.value)}
                        className="w-full p-2 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-blue-500"
                      />
                    ) : (
                      task.text
                    )}
                  </span>
                </div>
                <div className="flex space-x-2">
                  {editingIndex === index ? (
                    <button
                      onClick={() => handleSaveEdit(index)}
                      className="px-4 py-2 bg-green-500 text-white rounded-md hover:bg-green-600"
                    >
                      Save
                    </button>
                  ) : (
                    <button
                      onClick={() => handleEditTask(index)}
                      className="px-4 py-2 bg-yellow-500 text-white rounded-md hover:bg-yellow-600"
                    >
                      Edit
                    </button>
                  )}
                  <button
                    onClick={() => handleDeleteTask(index)}
                    className="px-4 py-2 bg-red-500 text-white rounded-md hover:bg-red-600"
                  >
                    Delete
                  </button>
                </div>
              </li>
            ))
          )}
        </ul>
      </div>
    </div>
  );
};

export default TodoList;
