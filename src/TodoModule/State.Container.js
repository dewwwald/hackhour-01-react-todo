import initialState from './initialState';
import deepFreeze from 'deep-freeze';

class StateContainer {
  _todoList;
  todoList$ = new Event('update:todo');

  get todoList() {
    return this._todoList;
  }

  set todoList(value) {
    this._todoList = deepFreeze(value);
  }

  constructor() {
    this.todoList = initialState.todoList;
  }

  addTodo(description) {
    this.todoList = [...this.todoList, { description: description, completedStatus: false }];
    window.dispatchEvent(this.todoList$);
  }

  completeTodo(index) {
    this.todoList = [...this.todoList].map((todo, _index) => {
      return Object.assign({}, todo, {
        completedStatus: index === _index ? true : todo.completedStatus
      })
    });
    window.dispatchEvent(this.todoList$);
  }

  addTodoChangeListener(callback) {
    window.addEventListener('update:todo', callback);
    return {
      unsubscribe: () => {
        window.removeEventListener('update:todo', callback)
      }
    };
  }

  getTodoList(callback) {
    // mock browser comms
    const t = setTimeout(() => {
      callback(this.todoList);
      clearTimeout(t);
    }, 54);
  }
}

const stateContainer = new StateContainer();

export default stateContainer;
