import React from 'react';
import { useTodo } from '../context/TodoContext';

const TodoFilter = () => {
  const { todos, filter, search, setFilter, setSearch, clearCompleted } = useTodo();

  const activeCount = todos.filter((t) => !t.completed).length;
  const completedCount = todos.filter((t) => t.completed).length;

  return (
    <div className="filter-container">
      <input
        type="text"
        placeholder="🔍 Search tasks..."
        value={search}
        onChange={(e) => setSearch(e.target.value)}
        className="search-input"
      />
      <div className="filter-row">
        <div className="filter-tabs">
          {['all', 'active', 'completed'].map((f) => (
            <button
              key={f}
              onClick={() => setFilter(f)}
              className={`filter-tab ${filter === f ? 'active' : ''}`}
            >
              {f.charAt(0).toUpperCase() + f.slice(1)}
              {f === 'active' && activeCount > 0 && <span className="badge">{activeCount}</span>}
              {f === 'completed' && completedCount > 0 && <span className="badge">{completedCount}</span>}
            </button>
          ))}
        </div>
        {completedCount > 0 && (
          <button onClick={clearCompleted} className="btn btn-danger-ghost">
            Clear Completed
          </button>
        )}
      </div>
    </div>
  );
};

export default TodoFilter;
