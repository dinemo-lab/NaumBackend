export const validateRegister = (req, res, next) => {
    const { name, email, password } = req.body;
    
    if (!name || !email || !password) {
      return res.status(400).json({ message: 'Please enter all fields' });
    }
    
    if (password.length < 6) {
      return res.status(400).json({ message: 'Password must be at least 6 characters' });
    }
    
   
    const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
    if (!emailRegex.test(email)) {
      return res.status(400).json({ message: 'Please enter a valid email' });
    }
    
    next();
  };
  
  export const validateLogin = (req, res, next) => {
    const { email, password } = req.body;
    
    if (!email || !password) {
      return res.status(400).json({ message: 'Please enter all fields' });
    }
    
    next();
  };
  
  export const validateTask = (req, res, next) => {
    const { title } = req.body;
    
    if (!title || title.trim() === '') {
      return res.status(400).json({ message: 'Task title is required' });
    }
    
    
    const { priority } = req.body;
    if (priority && !['Low', 'Medium', 'High'].includes(priority)) {
      return res.status(400).json({ message: 'Priority must be Low, Medium, or High' });
    }
    
    next();
  };