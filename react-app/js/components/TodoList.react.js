const React = require('react');
import { connect } from 'react-redux';
const TodoTask = require('./TodoTask.react');
const TodoNewTask = require('./TodoNewTask.react');
const TaskService = require('../services/TaskService');

const TodoList = React.createClass({
  // getInitialState: function() {
  //   return {
  //     tasks: [],
  //     newTask: { id: 0, title: '', completed: false }
  //   };
  // },

  componentDidMount: function() {
    // let taskService = new TaskService();
    // taskService.getOutstanding().then((res) => {
    //   if (this.isMounted()) {
    //     this.setState({ tasks: res.body });
    //   }
    // }).catch(() => {
    //   // TODO: Display a message
    // });
  },

  handleNewTaskInput: function(taskTitle) {
    // TODO: callback to parent

    // let taskService = new TaskService();
    // taskService.create(taskTitle).then((res) => {
    //   let tasks = this.state.tasks;
    //   tasks.push(res.body);
    //   this.setState({ tasks: tasks });
    // }).catch(() => {
    //   // TODO: Display a message
    // });
  },

  handleCompleteTask: function(taskId) {
    // TODO: callback to parent

    // let taskService = new TaskService();
    // taskService.complete(taskId).then((res) => {
    //   this.updateTaskState(taskId, (task) => {
    //     task.completed = true;
    //   });
    // }).catch(() => {
    //   // TODO: Display a message
    // });
  },

  handleArchiveTask: function(taskId) {
    // TODO: callback to parent

    // let taskService = new TaskService();
    // taskService.archive(taskId).then((res) => {
    //   this.updateTaskState(taskId, (task) => {
    //     task.archived = true;
    //   });
    // }).catch(() => {
    //   // TODO: Display a message
    // });
  },

  updateTaskState: function(taskId, process) {
    // TODO: this is now in a reducer so not needed?

    // let index = this.state.tasks.findIndex(t => t.id === taskId);
    // if (index !== -1) {
    //   let tasks = this.state.tasks;
    //   let task = tasks.splice(index, 1)[0];
    //   process(task)
    //   tasks.splice(index, 0, task);
    //   this.setState({ tasks: tasks });
    // }
  },

  unarchivedTasks: function() {
    return props.data.tasks;
    // return this.state.tasks.filter((task) => !task.archived);
  },

  render: function() {
  	return (
      <div>
        <TodoNewTask task={this.props.newTask} onNewTaskInput={this.handleNewTaskInput} />
        <div><ul className='task-list'>{this.props.tasks.map((task) => {
          return (
            <TodoTask key={'task-' + task.id} task={task} onCompleteTask={this.handleCompleteTask} onArchiveTask={this.handleArchiveTask}/>
          );
        })}</ul>
        </div>
      </div>
  	);
  }
});

// Select state to inject given global state - just take it all for now
function select(state) {
  return state.data;
}

export default connect(state => state.data)(TodoList);
