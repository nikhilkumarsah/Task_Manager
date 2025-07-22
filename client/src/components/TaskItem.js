import React from 'react';

const TaskItem = ({ task, onToggleComplete, onEdit, onDelete }) => {
  const formatDate = (dateString) => {
    const date = new Date(dateString);
    return date.toLocaleDateString('en-US', {
      year: 'numeric',
      month: 'short',
      day: 'numeric',
      hour: '2-digit',
      minute: '2-digit'
    });
  };

  const handleDelete = () => {
    if (window.confirm('Are you sure you want to delete this task?')) {
      onDelete(task._id);
    }
  };

  return (
    <div className={`task-item ${task.completed ? 'completed' : ''}`}>
      <div className="task-header">
        <h3 className="task-title">{task.title}</h3>
        <span className={`priority-badge priority-${task.priority}`}>
          {task.priority}
        </span>
      </div>
      
      {task.description && (
        <p className="task-description">{task.description}</p>
      )}
      
      <div className="task-meta">
        <div className="task-date">
          <div>Created: {formatDate(task.createdAt)}</div>
          {task.updatedAt !== task.createdAt && (
            <div>Updated: {formatDate(task.updatedAt)}</div>
          )}
        </div>
        
        <div className="task-actions">
          <button
            onClick={() => onToggleComplete(task._id)}
            className={`btn btn-sm ${task.completed ? 'btn-warning' : 'btn-success'}`}
            title={task.completed ? 'Mark as pending' : 'Mark as complete'}
          >
            {task.completed ? 'Undo' : 'Complete'}
          </button>
          
          {!task.completed && (
            <button
              onClick={() => onEdit(task)}
              className="btn btn-sm btn-warning"
              title="Edit task"
            >
              Edit
            </button>
          )}
          
          <button
            onClick={handleDelete}
            className="btn btn-sm btn-danger"
            title="Delete task"
          >
            Delete
          </button>
        </div>
      </div>
    </div>
  );
};

export default TaskItem;