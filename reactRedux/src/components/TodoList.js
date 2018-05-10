import React from 'react'
import PropTypes from 'prop-types'
import Todo from './Todo.js'
/*
const TodoList = ({ todos, onTodoClick }) => (
  <ul>
    {todos.map((todo, index) => (
      <Todo key={index} text={ index + "|" + todo.text + "|" + todo.completed} onClick={() => onTodoClick(index)} />
    ))}
  </ul>
)
*/

class TodoList extends React.Component{
  constructor(props){
    super(props);
  }
  render(){
    return (
      <ul> 
        {this.props.todos.map((todo, index) => (
          <Todo key={index} text={ index + "|" + todo.text + "|" + todo.completed} onClick={() => this.props.onTodoClick(index)} />
        ))}
      </ul>
    )
  }
}




TodoList.propTypes = {
  todos: PropTypes.arrayOf(
    PropTypes.shape({
      id: PropTypes.number.isRequired,
      completed: PropTypes.bool.isRequired,
      text: PropTypes.string.isRequired
    }).isRequired
  ).isRequired,
  onTodoClick: PropTypes.func.isRequired
}

export default TodoList