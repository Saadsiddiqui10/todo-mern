import React, { useState } from 'react';
import { useTodo } from '../context/TodoContext';

const priorityColors = { low: '#22c55e', medium: '#f59e0b', high: '#ef4444' };
const priorityLabels = { low: '🟢 Low', medium: '🟡 Medium', high: '🔴 High' };

const TodoItem = ({ todo }) => {
  const { toggleTodo, deleteTodo, updateTodo } = useTodo();
  const [editing, setEditing] = useState(false);
  const [editTitle, setEditTitle] = useState(todo.title);

  const handleEdit = async () => {
    if (editTitle.trim() && editTitle !== todo.title) {
      await updateTodo(todo._id, { title: editTitle });
    }
    setEditing(false);
  };

  const formattedDate = todo.dueDate
    ? new Date(todo.dueDate).toLocaleDateString()
    : null;

  const isOverdue = todo.dueDate && !todo.completed && new Date(todo.dueDate) < new Date();

  return (
    <div className={`todo-item ${todo.completed ? 'completed' : ''}`}>
      <div className="todo-left">
        <button
          className={`checkbox ${todo.completed ? 'checked' : ''}`}
          onClick={() => toggleTodo(todo._id)}
          aria-label="Toggle todo"
        >
          {todo.completed && '✓'}
        </button>
        <div className="todo-content">
          {editing ? (
            <input
              className="edit-input"
              value={editTitle}
              onChange={(e) => setEditTitle(e.target.value)}
              onBlur={handleEdit}
              onKeyDown={(e) => e.key === 'Enter' && handleEdit()}
              autoFocus
            />
          ) : (
            <span className="todo-title" onDoubleClick={() => setEditing(true)}>
              {todo.title}
            </span>
          )}
          <div className="todo-meta">
            <span
              className="priority-badge"
              style={{ color: priorityColors[todo.priority] }}
            >
              {priorityLabels[todo.priority]}
            </span>
            {formattedDate && (
              <span className={`due-date ${isOverdue ? 'overdue' : ''}`}>
                📅 {isOverdue ? 'Overdue: ' : ''}{formattedDate}
              </span>
            )}
          </div>
        </div>
      </div>
      <div className="todo-actions">
        <button onClick={() => setEditing(true)} className="btn-icon" title="Edit">✏️</button>
        <button onClick={() => deleteTodo(todo._id)} className="btn-icon" title="Delete">🗑️</button>
      </div>
    </div>
  );
};

export default TodoItem;
