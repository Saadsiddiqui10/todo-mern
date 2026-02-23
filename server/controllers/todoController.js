const Todo = require('../models/Todo');

// GET /api/todos - Get all todos with optional filtering
exports.getTodos = async (req, res, next) => {
  try {
    const { completed, priority, search } = req.query;
    const filter = {};

    if (completed !== undefined) filter.completed = completed === 'true';
    if (priority) filter.priority = priority;
    if (search) filter.title = { $regex: search, $options: 'i' };

    const todos = await Todo.find(filter).sort({ createdAt: -1 });
    res.json({ success: true, count: todos.length, data: todos });
  } catch (error) {
    next(error);
  }
};

// GET /api/todos/:id - Get single todo
exports.getTodoById = async (req, res, next) => {
  try {
    const todo = await Todo.findById(req.params.id);
    if (!todo) return res.status(404).json({ success: false, message: 'Todo not found' });
    res.json({ success: true, data: todo });
  } catch (error) {
    next(error);
  }
};

// POST /api/todos - Create todo
exports.createTodo = async (req, res, next) => {
  try {
    const todo = await Todo.create(req.body);
    res.status(201).json({ success: true, data: todo });
  } catch (error) {
    next(error);
  }
};

// PUT /api/todos/:id - Update todo
exports.updateTodo = async (req, res, next) => {
  try {
    const todo = await Todo.findByIdAndUpdate(req.params.id, req.body, {
      new: true,
      runValidators: true,
    });
    if (!todo) return res.status(404).json({ success: false, message: 'Todo not found' });
    res.json({ success: true, data: todo });
  } catch (error) {
    next(error);
  }
};

// PATCH /api/todos/:id/toggle - Toggle completed
exports.toggleTodo = async (req, res, next) => {
  try {
    const todo = await Todo.findById(req.params.id);
    if (!todo) return res.status(404).json({ success: false, message: 'Todo not found' });
    todo.completed = !todo.completed;
    await todo.save();
    res.json({ success: true, data: todo });
  } catch (error) {
    next(error);
  }
};

// DELETE /api/todos/:id - Delete todo
exports.deleteTodo = async (req, res, next) => {
  try {
    const todo = await Todo.findByIdAndDelete(req.params.id);
    if (!todo) return res.status(404).json({ success: false, message: 'Todo not found' });
    res.json({ success: true, message: 'Todo deleted successfully' });
  } catch (error) {
    next(error);
  }
};

// DELETE /api/todos/completed/clear - Delete all completed
exports.clearCompleted = async (req, res, next) => {
  try {
    const result = await Todo.deleteMany({ completed: true });
    res.json({ success: true, message: `Deleted ${result.deletedCount} completed todos` });
  } catch (error) {
    next(error);
  }
};
