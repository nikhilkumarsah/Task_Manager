import React, { useState, useEffect } from 'react';
import TaskList from './components/TaskList';
import TaskForm from './components/TaskForm';
import { taskAPI } from './services/api';
import Greeting from './components/Greeting';
import './App.css';

function App() {
  const [tasks, setTasks] = useState([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState('');
  const [editingTask, setEditingTask] = useState(null);

  useEffect(() => {
    fetchTasks();
  }, []);

  const fetchTasks = async () => {
    try {
      setLoading(true);
      const response = await taskAPI.getAllTasks();
      setTasks(response.data);
      setError('');
    } catch (error) {
      setError('Failed to fetch tasks. Please try again.');
      console.error('Error fetching tasks:', error);
    } finally {
      setLoading(false);
    }
  };

  const handleCreateTask = async (taskData) => {
    try {
      const response = await taskAPI.createTask(taskData);
      setTasks([response.data, ...tasks]);
      setError('');
    } catch (error) {
      setError('Failed to create task. Please try again.');
      console.error('Error creating task:', error);
    }
  };

  const handleUpdateTask = async (id, taskData) => {
    try {
      const response = await taskAPI.updateTask(id, taskData);
      setTasks(tasks.map(task => 
        task._id === id ? response.data : task
      ));
      setEditingTask(null);
      setError('');
    } catch (error) {
      setError('Failed to update task. Please try again.');
      console.error('Error updating task:', error);
    }
  };

  const handleDeleteTask = async (id) => {
    try {
      await taskAPI.deleteTask(id);
      setTasks(tasks.filter(task => task._id !== id));
      setError('');
    } catch (error) {
      setError('Failed to delete task. Please try again.');
      console.error('Error deleting task:', error);
    }
  };

  const handleToggleComplete = async (id) => {
    const task = tasks.find(t => t._id === id);
    if (task) {
      await handleUpdateTask(id, { ...task, completed: !task.completed });
    }
  };

  return (
    <div className="App">
      <div className="stars"></div>
      <div className="shooting-star"></div>
      <div className="shooting-star"></div>
      <div className="shooting-star"></div>

      <header className="App-header">
        <h1>Task Manager</h1>
        <p>Manage your tasks efficiently with Tooder App</p>
        <Greeting />

      </header>
      
      <main className="App-main">
        {error && (
          <div className="error-message">
            {error}
            <button onClick={() => setError('')} className="close-error">×</button>
          </div>
        )}
        
        <div className="app-container">
          <div className="form-section">
            <TaskForm 
              onSubmit={editingTask ? 
                (data) => handleUpdateTask(editingTask._id, data) : 
                handleCreateTask
              }
              initialData={editingTask}
              isEditing={!!editingTask}
              onCancel={() => setEditingTask(null)}
            />
          </div>
          
          <div className="tasks-section">
            {loading ? (
              <div className="loading">Loading tasks...</div>
            ) : (
              <TaskList 
                tasks={tasks}
                onToggleComplete={handleToggleComplete}
                onEdit={setEditingTask}
                onDelete={handleDeleteTask}
              />
            )}
          </div>
        </div>
      </main>
    </div>
  );
}

export default App;