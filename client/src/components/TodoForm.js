import React, { useState } from 'react';
import { useTodo } from '../context/TodoContext';

const TodoForm = () => {
  const { createTodo } = useTodo();
  const [form, setForm] = useState({ title: '', description: '', priority: 'medium', dueDate: '' });
  const [expanded, setExpanded] = useState(false);

  const handleSubmit = async (e) => {
    e.preventDefault();
    if (!form.title.trim()) return;
    await createTodo({ ...form, dueDate: form.dueDate || undefined });
    setForm({ title: '', description: '', priority: 'medium', dueDate: '' });
    setExpanded(false);
  };

  return (
    <form onSubmit={handleSubmit} className="todo-form">
      <div className="form-main">
        <input
          type="text"
          placeholder="Add a new task..."
          value={form.title}
          onChange={(e) => setForm({ ...form, title: e.target.value })}
          onFocus={() => setExpanded(true)}
          className="form-input"
          required
        />
        <button type="submit" className="btn btn-primary">Add</button>
      </div>

      {expanded && (
        <div className="form-expanded">
          <textarea
            placeholder="Description (optional)"
            value={form.description}
            onChange={(e) => setForm({ ...form, description: e.target.value })}
            className="form-textarea"
            rows={2}
          />
          <div className="form-row">
            <select
              value={form.priority}
              onChange={(e) => setForm({ ...form, priority: e.target.value })}
              className="form-select"
            >
              <option value="low">🟢 Low</option>
              <option value="medium">🟡 Medium</option>
              <option value="high">🔴 High</option>
            </select>
            <input
              type="date"
              value={form.dueDate}
              onChange={(e) => setForm({ ...form, dueDate: e.target.value })}
              className="form-input"
            />
          </div>
        </div>
      )}
    </form>
  );
};

export default TodoForm;
