// pages/index/index.js
Page({
  data: {
    todos: [],
    inputValue: '',
    completedCount: 0
  },

  onLoad() {
    console.log('Index page loaded');
    this.loadTodos();
  },

  // Load todos from storage
  loadTodos() {
    try {
      const todos = wx.getStorageSync('todos');
      if (todos) {
        const completedCount = todos.filter(todo => todo.completed).length;
        this.setData({
          todos: todos,
          completedCount: completedCount
        });
      }
    } catch (error) {
      console.error('Failed to load todos:', error);
    }
  },

  // Handle input change
  onInputChange(event) {
    this.setData({
      inputValue: event.detail.value
    });
  },

  // Add new todo
  onAddTodo() {
    const inputValue = this.data.inputValue.trim();
    
    if (!inputValue) {
      wx.showToast({
        title: 'Please enter a todo',
        icon: 'none',
        duration: 2000
      });
      return;
    }

    const newTodo = {
      id: Date.now(),
      text: inputValue,
      completed: false,
      createdAt: new Date().toLocaleString()
    };

    const todos = [newTodo, ...this.data.todos];
    this.saveTodos(todos);
    
    this.setData({
      inputValue: '',
      todos: todos
    });

    wx.showToast({
      title: 'Todo added!',
      icon: 'success',
      duration: 1500
    });
  },

  // Toggle todo completion status
  onToggleTodo(event) {
    const id = event.currentTarget.dataset.id;
    const todos = this.data.todos.map(todo => {
      if (todo.id === id) {
        return {
          ...todo,
          completed: !todo.completed
        };
      }
      return todo;
    });

    const completedCount = todos.filter(todo => todo.completed).length;
    this.saveTodos(todos);
    
    this.setData({
      todos: todos,
      completedCount: completedCount
    });
  },

  // Delete todo
  onDeleteTodo(event) {
    const id = event.currentTarget.dataset.id;
    wx.showModal({
      title: 'Delete Todo',
      content: 'Are you sure you want to delete this todo?',
      success: (res) => {
        if (res.confirm) {
          const todos = this.data.todos.filter(todo => todo.id !== id);
          const completedCount = todos.filter(todo => todo.completed).length;
          this.saveTodos(todos);
          
          this.setData({
            todos: todos,
            completedCount: completedCount
          });

          wx.showToast({
            title: 'Todo deleted!',
            icon: 'success',
            duration: 1500
          });
        }
      }
    });
  },

  // Save todos to storage
  saveTodos(todos) {
    try {
      wx.setStorageSync('todos', todos);
    } catch (error) {
      console.error('Failed to save todos:', error);
      wx.showToast({
        title: 'Failed to save',
        icon: 'none',
        duration: 2000
      });
    }
  },

  onShow() {
    console.log('Index page shown');
  },

  onHide() {
    console.log('Index page hidden');
  },

  onUnload() {
    console.log('Index page unloaded');
  }
})
