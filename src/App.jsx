import { useState, useEffect } from 'react';
import axios from 'axios';
import './App.css';
import { DndProvider } from 'react-dnd';
import { HTML5Backend } from 'react-dnd-html5-backend';
import Todo from './Components/Todo';
import Progress from './Components/Progress';
import Done from './Components/Done';
import Task from './Components/Task';
function App() {
  const [todos, setTodos] = useState([]);
  const [showForm, setShowForm] = useState(false);
  const [newTask, setNewTask] = useState({
    title: '',
    description: '',
    status: 'To Do',
  });

  useEffect(() => {
    axios
      .get('https://jsonplaceholder.typicode.com/todos?_limit=10')
      .then((response) => {
        const data = response.data.map((item) => ({
          id: String(item.id),
          title: item.title,
          description: '',
          status: item.completed ? 'Done' : 'To Do',
        }));
        setTodos(data);
      })
      .catch((error) => {
        console.error('Error fetching data:', error);
      });
  }, []);
  const handleInputChange = (e) => {
    const { name, value } = e.target;
    setNewTask({ ...newTask, [name]: value });
  };

  const handleAddTask = () => {
    if (!newTask.title.trim()) {
      alert('Title is required');
      return;
    }

    const task = {
      id: String(Math.random()),
      title: newTask.title,
      description: newTask.description,
      status: newTask.status,
    };

    setTodos((prev) => [...prev, task]);
    setNewTask({ title: '', description: '', status: 'To Do' });
    setShowForm(false);
  };

  // Handle the move task functionality
  const moveTask = (id, newStatus) => {
    setTodos((prevTodos) =>
      prevTodos.map((task) =>
        task.id === id ? { ...task, status: newStatus } : task
      )
    );
  };

  return (
    <DndProvider backend={HTML5Backend}>
      <div style={{ display: 'flex', justifyContent: 'center', marginBottom: '20px' }}>
        <button onClick={() => setShowForm(!showForm)}>
          {showForm ? 'Cancel' : 'Add New Task'}
        </button>
      </div>

      {showForm && (
        <div className="task-form">
          <input
            type="text"
            name="title"
            placeholder="Title"
            value={newTask.title}
            onChange={handleInputChange}
          />
          <input
            type="text"
            name="description"
            placeholder="Description (optional)"
            value={newTask.description}
            onChange={handleInputChange}
          />
          <select name="status" value={newTask.status} onChange={handleInputChange}>
            <option>To Do</option>
            <option>In Progress</option>
            <option>Done</option>
          </select>
          <button onClick={handleAddTask}>Save Task</button>
        </div>
      )}

<div className="kanban-container" style={{ display: 'flex', gap: '20px' }}>
        <Todo tasks={todos.filter((task) => task.status === 'To Do')} moveTask={moveTask} />
        <Progress tasks={todos.filter((task) => task.status === 'In Progress')} moveTask={moveTask} />
        <Done tasks={todos.filter((task) => task.status === 'Done')} moveTask={moveTask} />
      </div>
    </DndProvider>
  );
}

export default App;