import React from 'react'
import PropTypes from 'prop-types'
/*
const Todo = ({ onClick, completed, text }) => (
  <li
    onClick={onClick}
    style={{
      textDecoration: completed ? 'line-through' : 'none'
    }}
  >
    {text}
  </li>
)
*/
class Todo extends React.Component{

  constructor(props){
    super(props);
  }

  


  render(){
    return (
      <li onClick={this.props.onClick} style={{textDecoration: this.props.completed ? 'line-through' : 'none'}}>
        {this.props.text}
      </li>
    );
  }
}




Todo.propTypes = {
  onClick: PropTypes.func.isRequired,
  completed: PropTypes.bool.isRequired,
  text: PropTypes.string.isRequired
}

export default Todo