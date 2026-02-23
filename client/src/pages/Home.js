import React, { useEffect } from 'react';
import { useTodo } from '../context/TodoContext';
import TodoForm from '../components/TodoForm';
import TodoItem from '../components/TodoItem';
import TodoFilter from '../components/TodoFilter';

const TICKER_ITEMS = [
  { label: 'STATUS', value: 'ONLINE' },
  { label: 'MODE', value: 'DARK' },
  { label: 'ENGINE', value: 'MERN' },
  { label: 'DB', value: 'MONGODB' },
  { label: 'DEPLOY', value: 'VERCEL + RENDER' },
  { label: 'VERSION', value: '1.0.0' },
  { label: 'STATUS', value: 'ONLINE' },
  { label: 'MODE', value: 'DARK' },
  { label: 'ENGINE', value: 'MERN' },
  { label: 'DB', value: 'MONGODB' },
  { label: 'DEPLOY', value: 'VERCEL + RENDER' },
  { label: 'VERSION', value: '1.0.0' },
];

const Home = () => {
  const { filteredTodos, loading, error, fetchTodos } = useTodo();

  useEffect(() => {
    fetchTodos();
  }, [fetchTodos]);

  return (
    <div className="page">
      <header className="app-header">
        <h1>MY TASKS</h1>
        <p>Stay organized &mdash; stay productive &mdash; get it done</p>
      </header>

      <div className="header-ticker">
        <div className="ticker-inner">
          {TICKER_ITEMS.map((item, i) => (
            <span key={i} className="ticker-item">
              {item.label}<span>◆</span>{item.value}
            </span>
          ))}
        </div>
      </div>

      <TodoForm />
      <TodoFilter />

      {error && <div className="error-banner">{error}</div>}

      <div className="todo-list">
        {loading ? (
          <div className="loading">LOADING_TASKS . . .</div>
        ) : filteredTodos.length === 0 ? (
          <div className="empty-state">
            <div className="empty-icon">📋</div>
            <p>No tasks found. Add one above.</p>
          </div>
        ) : (
          filteredTodos.map((todo) => <TodoItem key={todo._id} todo={todo} />)
        )}
      </div>
    </div>
  );
};

export default Home;