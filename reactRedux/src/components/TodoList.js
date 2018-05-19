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
    console.log("######### constructor [TodoList] #########");
    super(props);
  }

  componentWillMount(){
    console.log("######### componentWillMount [TodoList] #########");
  }

  componentDidMount(){
    console.log("######### componentDidMount [TodoList] #########");
  }

  shouldComponentUpdate(nextProps,nextState){
    console.log("######### shouldComponentUpdate [TodoList] #########");
    console.log(nextProps);
    console.log(nextState);
    return true;
  }

  componentWillReceiveProps(nextProps){
    console.log("######### componentWillReceiveProps [TodoList] #########");
    console.log(nextProps);
  }

  componentWillUpdate(nextProps,nextState){
    console.log("######### componentWillUpdate [TodoList] #########");
    console.log(nextProps);
    console.log(nextState);
  }
  
  componentDidUpdate(nextProps,nextState){
    console.log("######### componentDidUpdate [TodoList] #########");
    console.log(nextProps);
    console.log(nextState);
  }

  render(){
    console.log("######### render [TodoList] #########");
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