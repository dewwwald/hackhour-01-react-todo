import React, { Component } from 'react';
import TodoList from './TodoModule/TodoList.Component';
import './App.css';

class App extends Component {
  render() {
    return (
      <div className="App">
        <header className="App-header">
          <h1 className="App-title"> Your Todo List</h1>
        </header>
        <TodoList></TodoList>
      </div>
    );
  }
}

export default App;
