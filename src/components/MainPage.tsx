import React, { Component } from 'react';

import { connect } from 'react-redux';
import { bindActionCreators } from 'redux';
import { ThunkDispatch } from 'redux-thunk';

import { AppState } from '../store/rootStore';
import { AppActions } from '../store/models/actions';

import { Todo } from '../store/todo/models/Todo';
import { boundRequestTodos } from '../store/todo/TodoAction';

interface Props {}

interface LinkStateProps {
  todos: Todo[];
}

interface LinkDispatchProps {
  boundRequestTodos: () => void;
}

type LinkProps = Props & LinkStateProps & LinkDispatchProps;

const mapStateToProps = (state: AppState): LinkStateProps => ({
  todos: state.todoReducer.todos,
});

const mapDispatchToProps = (
  dispatch: ThunkDispatch<AppState, {}, AppActions>
) => ({
  boundRequestTodos: bindActionCreators(boundRequestTodos, dispatch),
});

class MainPage extends Component<LinkProps> {
  componentDidMount() {
    this.props.boundRequestTodos();
  }

  render() {
    const { todos } = this.props;
    return (
      <div>
        <h1>Todo List</h1>
        <ul>
          {todos.map((todo: Todo) => (
            <li
              style={{
                textDecoration: todo.completed ? 'line-through' : 'none',
              }}
              key={todo.id}
            >
              {todo.title}
            </li>
          ))}
        </ul>
      </div>
    );
  }
}

export default connect(mapStateToProps, mapDispatchToProps)(MainPage);
