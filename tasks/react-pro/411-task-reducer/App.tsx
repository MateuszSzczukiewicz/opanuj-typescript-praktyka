/* Dodaj brakujące typy do reducera (encja Task, stan i akcje) oraz komponentu TaskList. Wywnioskuj typy z zastanego kodu. */

import { useReducer, useState } from 'react';

const taskReducer = (state, action) => {
  switch (action.type) {
    case 'add':
      const newTask = { id: Date.now(), text: action.payload, completed: false };
      return { tasks: [...state.tasks, newTask] };
    case 'remove':
      return { tasks: state.tasks.filter((task) => task.id !== action.payload) };
    case 'toggle':
      return {
        tasks: state.tasks.map((task) =>
          task.id === action.payload ? { ...task, completed: !task.completed } : task,
        ),
      };
    default:
      throw new Error(`Unhandled action type: ${action.type}`);
  }
};

const TaskList = () => {
  const [state, dispatch] = useReducer(taskReducer, { tasks: [] });
  const [newTask, setNewTask] = useState('');

  const handleAdd = () => {
    if (newTask.trim() !== '') {
      dispatch({ type: 'add', payload: newTask });
      setNewTask('');
    }
  };

  return (
    <div className="max-w-2xl p-6 mx-auto bg-gray-800 rounded-lg shadow-xl">
      <h2 className="mb-6 text-2xl font-bold text-blue-400">Task List</h2>
      <div className="flex gap-2 mb-6">
        <input
          value={newTask}
          onChange={(e) => setNewTask(e.target.value)}
          placeholder="Enter new task"
          className="flex-1 px-4 py-2 text-gray-200 placeholder-gray-400 bg-gray-700 border border-gray-600 rounded-lg focus:border-blue-500 focus:ring-2 focus:ring-blue-500 focus:outline-none"
          onKeyDown={(e) => e.key === 'Enter' && handleAdd()}
        />
        <button
          onClick={handleAdd}
          className="px-6 py-2 font-medium text-white transition-colors duration-200 bg-blue-500 rounded-lg hover:bg-blue-600"
        >
          Add Task
        </button>
      </div>
      <ul className="space-y-3">
        {state.tasks.map((task) => (
          <li
            key={task.id}
            className="flex items-center justify-between p-4 transition-colors duration-200 bg-gray-700 rounded-lg group hover:bg-gray-600"
          >
            <span
              onClick={() => dispatch({ type: 'toggle', payload: task.id })}
              className={`flex-1 cursor-pointer ${
                task.completed ? 'line-through text-gray-400' : 'text-gray-200'
              }`}
            >
              {task.text}
            </span>
            <button
              onClick={() => dispatch({ type: 'remove', payload: task.id })}
              className="px-3 py-1 text-sm text-white transition-all duration-200 bg-red-500 rounded-lg opacity-0 group-hover:opacity-100 hover:bg-red-600"
            >
              Remove
            </button>
          </li>
        ))}
      </ul>
      {state.tasks.length === 0 && (
        <p className="mt-4 text-center text-gray-400">No tasks yet. Add some!</p>
      )}
    </div>
  );
};

export default TaskList;
