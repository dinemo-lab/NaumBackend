import express from 'express';
import Task from '../Models/Task.js';
import { auth } from '../Middleware/AuthMiddleware.js';
import { validateTask } from '../Middleware/ValidateMiddleware.js';

const router = express.Router();

 
router.use(auth);
 
router.get('/', async (req, res) => {
  try {
    const { status } = req.query;
    let query = { userId: req.user._id };
    
    
    if (status === 'completed') {
      query.status = true;
    } else if (status === 'active') {
      query.status = false;
    }
    
    const tasks = await Task.find(query).sort({ createdAt: -1 });
    res.json(tasks);
  } catch (error) {
    console.error(error);
    res.status(500).json({ message: 'Server error' });
  }
});

 
router.post('/',validateTask, async (req, res) => {
  try {
    const { title, description, priority } = req.body;
    
    const newTask = new Task({
      title,
      description,
      priority,
      userId: req.user._id
    });
    
    const savedTask = await newTask.save();
    res.status(201).json(savedTask);
  } catch (error) {
    console.error(error);
    res.status(500).json({ message: 'Server error' });
  }
});

 
router.put('/:id',validateTask, async (req, res) => {
  try {
    const { title, description, status, priority } = req.body;
    
    let task = await Task.findOne({ 
      _id: req.params.id,
      userId: req.user._id
    });
    
    if (!task) {
      return res.status(404).json({ message: 'Task not found' });
    }
    
   
    task.title = title || task.title;
    task.description = description !== undefined ? description : task.description;
    task.status = status !== undefined ? status : task.status;
    task.priority = priority || task.priority;
    
    const updatedTask = await task.save();
    res.json(updatedTask);
  } catch (error) {
    console.error(error);
    res.status(500).json({ message: 'Server error' });
  }
});

 
router.delete('/:id', async (req, res) => {
  try {
    const task = await Task.findOneAndDelete({
      _id: req.params.id,
      userId: req.user._id
    });
    
    if (!task) {
      return res.status(404).json({ message: 'Task not found' });
    }
    
    res.json({ message: 'Task removed' });
  } catch (error) {
    console.error(error);
    res.status(500).json({ message: 'Server error' });
  }
});

export default router;