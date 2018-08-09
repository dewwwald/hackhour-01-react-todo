import React, { Component } from 'react';
import './Todo.Component.scss';

export default class Todo extends Component {
  render() {
    console.log(this.props.actions);
    return (<div className="grid">
        <div className="grid__item w--fill">
            <p>
            {this.props.todo.description}
            </p>
        </div>
        <div className="grid__item w--auto">
          {this.props.actions ? <this.props.actions></this.props.actions> : null}
        </div>
    </div>);
  }
}
