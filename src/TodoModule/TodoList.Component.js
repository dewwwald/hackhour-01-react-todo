import React, { Component } from 'react';
import Todo from './Todo.Component';
import stateContainer from './State.Container';
import './TodoList.Component.scss';

export default class TodoList extends Component {
  state = {
    todoList: [],
    newTodo: { description: '' }
  };
  subscriptions = [];
  descriptionInput;

  componentDidMount() {
    this.todoListUpdated();
    this.subscriptions.push(
      stateContainer.addTodoChangeListener(this.todoListUpdated.bind(this))
    );
  }

  componentWillUnmount() {
    this.subscriptions.forEach(sub => {
      sub.unsubscribe();
    });
  }

  render() {
    return (<div>
        {this.state.todoList.map((todo, i) => <Todo
            key={todo.description + i}
            todo={todo}
            actions={this.renderTodoItemActions.bind(this, todo, i)}
        ></Todo>)}
        <div>
          <h3>New Todo</h3>
          <input value={this.state.newTodo.description}
            ref={ref => this.descriptionInput = ref}
            onChange={this.updateStateNewTag.bind(this)}
            type="text" name="description" />
          <button onClick={this.addNewTodo.bind(this)}>add todo</button>
        </div>
    </div>);
  }

  renderTodoItemActions(todo, index) {
    console.log(todo.completedStatus);
    return (<input value={todo.completedStatus}
      onClick={this.onStatusToggle.bind(this, index)}
      name="completedStatus"
      type="checkbox" />);
  }

  todoListUpdated() {
    stateContainer.getTodoList(todoList => {
      this.setState({ todoList });
    });
  }

  updateStateNewTag(event) {
    this.setState(prevState => Object.assign({}, prevState, {
      newTodo: Object.assign({}, prevState.newTodo, {
        description: this.descriptionInput.value
      })
    }));
  }

  onStatusToggle(index) {
    stateContainer.completeTodo(index);
  }

  /**
   * Triggers state update
   */
  addNewTodo() {
    stateContainer.addTodo(this.state.newTodo.description);
    this.cleanNewTodoState();
  }

  /**
   * Cleans local new todo state
   */
  cleanNewTodoState() {
    this.setState({
      newTodo: { description: '' }
    });
  }
}
