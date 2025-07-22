import React from 'react';
import TaskItem from './TaskItem';

const TaskList = ({ tasks, onToggleComplete, onEdit, onDelete }) => {
  if (tasks.length === 0) {
    return (
      <div className="task-list">
        <h2>Your Tasks</h2>
        <div className="tasks-empty">
          <p>No tasks yet. Create your first task to get started!</p>
        </div>
      </div>
    );
  }

  const pendingTasks = tasks.filter(task => !task.completed);
  const completedTasks = tasks.filter(task => task.completed);

  const sortTasksByPriority = (tasks) => {
    const priorityOrder = { high: 3, medium: 2, low: 1 };
    return tasks.sort((a, b) => {
      if (priorityOrder[a.priority] !== priorityOrder[b.priority]) {
        return priorityOrder[b.priority] - priorityOrder[a.priority];
      }
      return new Date(b.createdAt) - new Date(a.createdAt);
    });
  };

  const sortedPendingTasks = sortTasksByPriority([...pendingTasks]);
  const sortedCompletedTasks = sortTasksByPriority([...completedTasks]);

  return (
    <div className="task-list">
      <h2>Your Tasks ({tasks.length})</h2>
      
      {sortedPendingTasks.length > 0 && (
        <div className="task-section">
          <h3>Pending Tasks ({sortedPendingTasks.length})</h3>
          {sortedPendingTasks.map(task => (
            <TaskItem
              key={task._id}
              task={task}
              onToggleComplete={onToggleComplete}
              onEdit={onEdit}
              onDelete={onDelete}
            />
          ))}
        </div>
      )}
      
      {sortedCompletedTasks.length > 0 && (
        <div className="task-section">
          <h3>Completed Tasks ({sortedCompletedTasks.length})</h3>
          {sortedCompletedTasks.map(task => (
            <TaskItem
              key={task._id}
              task={task}
              onToggleComplete={onToggleComplete}
              onEdit={onEdit}
              onDelete={onDelete}
            />
          ))}
        </div>
      )}
    </div>
  );
};

export default TaskList;