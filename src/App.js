import React, { Component } from 'react';
import { v4 as uuidv4 } from 'uuid';
import { ToastContainer, toast } from 'react-toastify';
import 'react-toastify/dist/ReactToastify.css';
import './App.css';

class TodoApp extends Component {
  constructor(props) {
    super(props);
    this.state = {
      tasks: [],
      newTask: '',
    };
  }

  handleChange = (event) => {
    this.setState({
      newTask: event.target.value,
    });
  }

  handleSubmit = (event) => {
    event.preventDefault();
    if (this.state.newTask.trim() !== '') {
      const newTask = {
        id: uuidv4(), // Generate a unique ID using uuid
        text: this.state.newTask,
        completed: false,
      };
      this.setState({
        tasks: [...this.state.tasks, newTask],
        newTask: '',
      });
      toast.success(`Task added: ${newTask.text}`);
    }
  }

  handleDelete = (taskId) => {
    const deletedTask = this.state.tasks.find((task) => task.id === taskId);
    const updatedTasks = this.state.tasks.filter((task) => task.id !== taskId);
    this.setState({
      tasks: updatedTasks,
    });
    toast.error(`Task deleted: ${deletedTask.text}`);
  }

  handleToggleComplete = (taskId) => {
    const updatedTasks = this.state.tasks.map((task) =>
      task.id === taskId ? { ...task, completed: !task.completed } : task
    );
    this.setState({
      tasks: updatedTasks,
    });

    const action = updatedTasks.find((task) => task.id === taskId).completed
      ? 'completed'
      : 'incompleted';
    const taskName = this.state.tasks.find((task) => task.id === taskId).text;
    toast.info(`Task marked as ${action}: ${taskName}`);
  }

  render() {
    return (
      <div>
        <h1>Todo List</h1>
        <form onSubmit={this.handleSubmit}>
          <input
            type="text"
            value={this.state.newTask}
            onChange={this.handleChange}
            placeholder="Add a task"
          />
          <button type="submit">Add Task</button>
        </form>
        <ul>
          {this.state.tasks.map((task) => (
            <li key={task.id} className={`task ${task.completed ? 'completed' : ''}`}>
              {task.text}
              <div>
                <button onClick={() => this.handleToggleComplete(task.id)}>
                  {task.completed ? 'Mark as Incomplete' : 'Mark as Complete'}
                </button>
                <button onClick={() => this.handleDelete(task.id)}>Delete</button>
              </div>
            </li>
          ))}
        </ul>
        <ToastContainer />
      </div>
    );
  }
}

export default TodoApp;
