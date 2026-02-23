import React from 'react';
import { BrowserRouter as Router, Routes, Route } from 'react-router-dom';
import { TodoProvider } from './context/TodoContext';
import Home from './pages/Home';
import './App.css';

function App() {
  return (
    <TodoProvider>
      <Router>
        <div className="app">
          <Routes>
            <Route path="/" element={<Home />} />
          </Routes>
        </div>
      </Router>
    </TodoProvider>
  );
}

export default App;
