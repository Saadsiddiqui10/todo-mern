import React, { useEffect } from 'react';
import { useTodo } from '../context/TodoContext';
import TodoForm from '../components/TodoForm';
import TodoItem from '../components/TodoItem';
import TodoFilter from '../components/TodoFilter';

const Home = () => {
  const { filteredTodos, loading, error, fetchTodos } = useTodo();

  useEffect(() => {
    fetchTodos();
  }, [fetchTodos]);

  return (
    <div className="page">
      <header className="app-header">
        <h1>✅ My Tasks</h1>
        <p>Stay organized, stay productive</p>
      </header>

      <TodoForm />
      <TodoFilter />

      {error && <div className="error-banner">⚠️ {error}</div>}

      <div className="todo-list">
        {loading ? (
          <div className="loading">Loading tasks...</div>
        ) : filteredTodos.length === 0 ? (
          <div className="empty-state">
            <div className="empty-icon">📋</div>
            <p>No tasks found. Add one above!</p>
          </div>
        ) : (
          filteredTodos.map((todo) => <TodoItem key={todo._id} todo={todo} />)
        )}
      </div>
    </div>
  );
};

export default Home;
