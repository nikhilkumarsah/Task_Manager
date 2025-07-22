import React, { useState, useEffect } from 'react';

const TaskForm = ({ onSubmit, initialData, isEditing, onCancel }) => {
  const [formData, setFormData] = useState({
    title: '',
    description: '',
    priority: 'medium'
  });
  const [errors, setErrors] = useState({});

  useEffect(() => {
    if (initialData) {
      setFormData({
        title: initialData.title || '',
        description: initialData.description || '',
        priority: initialData.priority || 'medium'
      });
    } else {
      setFormData({
        title: '',
        description: '',
        priority: 'medium'
      });
    }
  }, [initialData]);

  const validateForm = () => {
    const newErrors = {};
    
    if (!formData.title.trim()) {
      newErrors.title = 'Title is required';
    } else if (formData.title.length > 100) {
      newErrors.title = 'Title must be less than 100 characters';
    }
    
    if (formData.description.length > 500) {
      newErrors.description = 'Description must be less than 500 characters';
    }
    
    setErrors(newErrors);
    return Object.keys(newErrors).length === 0;
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    
    if (!validateForm()) {
      return;
    }
    
    try {
      await onSubmit(formData);
      if (!isEditing) {
        setFormData({
          title: '',
          description: '',
          priority: 'medium'
        });
      }
      setErrors({});
    } catch (error) {
      console.error('Form submission error:', error);
    }
  };

  const handleChange = (e) => {
    const { name, value } = e.target;
    setFormData(prev => ({
      ...prev,
      [name]: value
    }));
    
    // Clear specific error when user starts typing
    if (errors[name]) {
      setErrors(prev => ({
        ...prev,
        [name]: ''
      }));
    }
  };

  const handleCancel = () => {
    setFormData({
      title: '',
      description: '',
      priority: 'medium'
    });
    setErrors({});
    if (onCancel) onCancel();
  };

  return (
    <form onSubmit={handleSubmit} className="task-form">
      <h2>{isEditing ? 'Edit Task' : 'Create New Task'}</h2>
      
      <div className="form-group">
        <label htmlFor="title">Title *</label>
        <input
          type="text"
          id="title"
          name="title"
          value={formData.title}
          onChange={handleChange}
          placeholder="Enter task title..."
          className={errors.title ? 'error' : ''}
        />
        {errors.title && <span className="error-text">{errors.title}</span>}
      </div>

      <div className="form-group">
        <label htmlFor="description">Description</label>
        <textarea
          id="description"
          name="description"
          value={formData.description}
          onChange={handleChange}
          placeholder="Enter task description..."
          rows="4"
          className={errors.description ? 'error' : ''}
        />
        {errors.description && <span className="error-text">{errors.description}</span>}
      </div>

      <div className="form-group">
        <label htmlFor="priority">Priority</label>
        <select
          id="priority"
          name="priority"
          value={formData.priority}
          onChange={handleChange}
        >
          <option value="low">Low</option>
          <option value="medium">Medium</option>
          <option value="high">High</option>
        </select>
      </div>

      <div className="form-actions">
        <button type="submit" className="btn btn-primary">
          {isEditing ? 'Update Task' : 'Create Task'}
        </button>
        {isEditing && (
          <button type="button" onClick={handleCancel} className="btn btn-secondary">
            Cancel
          </button>
        )}
      </div>
    </form>
  );
};

export default TaskForm;
