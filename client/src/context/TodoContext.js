import React, { createContext, useContext, useReducer, useCallback } from 'react';
import { todoService } from '../services/api';

const TodoContext = createContext();

const initialState = {
  todos: [],
  loading: false,
  error: null,
  filter: 'all', // all | active | completed
  search: '',
};

const todoReducer = (state, action) => {
  switch (action.type) {
    case 'SET_LOADING':
      return { ...state, loading: action.payload, error: null };
    case 'SET_ERROR':
      return { ...state, error: action.payload, loading: false };
    case 'SET_TODOS':
      return { ...state, todos: action.payload, loading: false };
    case 'ADD_TODO':
      return { ...state, todos: [action.payload, ...state.todos], loading: false };
    case 'UPDATE_TODO':
      return {
        ...state,
        todos: state.todos.map((t) => (t._id === action.payload._id ? action.payload : t)),
        loading: false,
      };
    case 'DELETE_TODO':
      return { ...state, todos: state.todos.filter((t) => t._id !== action.payload) };
    case 'SET_FILTER':
      return { ...state, filter: action.payload };
    case 'SET_SEARCH':
      return { ...state, search: action.payload };
    default:
      return state;
  }
};

export const TodoProvider = ({ children }) => {
  const [state, dispatch] = useReducer(todoReducer, initialState);

  const fetchTodos = useCallback(async (params = {}) => {
    dispatch({ type: 'SET_LOADING', payload: true });
    try {
      const res = await todoService.getAll(params);
      dispatch({ type: 'SET_TODOS', payload: res.data });
    } catch (err) {
      dispatch({ type: 'SET_ERROR', payload: err.message });
    }
  }, []);

  const createTodo = async (data) => {
    dispatch({ type: 'SET_LOADING', payload: true });
    try {
      const res = await todoService.create(data);
      dispatch({ type: 'ADD_TODO', payload: res.data });
    } catch (err) {
      dispatch({ type: 'SET_ERROR', payload: err.message });
    }
  };

  const updateTodo = async (id, data) => {
    try {
      const res = await todoService.update(id, data);
      dispatch({ type: 'UPDATE_TODO', payload: res.data });
    } catch (err) {
      dispatch({ type: 'SET_ERROR', payload: err.message });
    }
  };

  const toggleTodo = async (id) => {
    try {
      const res = await todoService.toggle(id);
      dispatch({ type: 'UPDATE_TODO', payload: res.data });
    } catch (err) {
      dispatch({ type: 'SET_ERROR', payload: err.message });
    }
  };

  const deleteTodo = async (id) => {
    try {
      await todoService.delete(id);
      dispatch({ type: 'DELETE_TODO', payload: id });
    } catch (err) {
      dispatch({ type: 'SET_ERROR', payload: err.message });
    }
  };

  const clearCompleted = async () => {
    try {
      await todoService.clearCompleted();
      dispatch({ type: 'SET_TODOS', payload: state.todos.filter((t) => !t.completed) });
    } catch (err) {
      dispatch({ type: 'SET_ERROR', payload: err.message });
    }
  };

  const setFilter = (filter) => dispatch({ type: 'SET_FILTER', payload: filter });
  const setSearch = (search) => dispatch({ type: 'SET_SEARCH', payload: search });

  const filteredTodos = state.todos
    .filter((t) => {
      if (state.filter === 'active') return !t.completed;
      if (state.filter === 'completed') return t.completed;
      return true;
    })
    .filter((t) => t.title.toLowerCase().includes(state.search.toLowerCase()));

  return (
    <TodoContext.Provider
      value={{
        ...state,
        filteredTodos,
        fetchTodos,
        createTodo,
        updateTodo,
        toggleTodo,
        deleteTodo,
        clearCompleted,
        setFilter,
        setSearch,
      }}
    >
      {children}
    </TodoContext.Provider>
  );
};

export const useTodo = () => {
  const context = useContext(TodoContext);
  if (!context) throw new Error('useTodo must be used within TodoProvider');
  return context;
};
