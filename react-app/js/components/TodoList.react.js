import React from 'react';
import { connect } from 'react-redux';
import TodoTask from './TodoTask.react';
import TodoNewTask from './TodoNewTask.react';
import TaskService from '../services/TaskService';
import { fetchTasks, addTask, completeTask, archiveTask } from '../actions/actionTypes';

export const TodoList = React.createClass({
  componentDidMount: function() {
    const { dispatch } = this.props;
    this.props.dispatch(fetchTasks());
  },

  handleNewTaskInput: function(title) {
    this.props.dispatch(addTask(title));
  },

  handleCompleteTask: function(taskId) {
    this.props.dispatch(completeTask(taskId));
  },

  handleArchiveTask: function(taskId) {
    this.props.dispatch(archiveTask(taskId));
  },

  unarchivedTasks: function() {
    return props.data.tasks;
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
