import React from 'react'
import Footer from './Footer'
import AddTodo from '../containers/AddTodo'
import MonitorView from '../containers/MonitorView'
import VisibleTodoList from '../containers/VisibleTodoList'
/*
const App = () => (
  <div>
    <AddTodo />
    <VisibleTodoList />
    <Footer />
  </div>
)
*/

class App extends React.Component{
  constructor(props){
    super(props);
  }
  componentWillReceiveProps(nextProps){
    console.log("----componentWillReceiveProps[App]---");
    console.log(nextProps);
  }

  componentWillUpdate(nextProps,nextState){
    console.log("----componentWillUpdate[App]---");
    console.log(nextProps);
    console.log(nextState);
  }
  render(){
    return (
      <div>
        <AddTodo />
        
        <Footer />
        <MonitorView />

        <VisibleTodoList />
      </div>
    );
  }

}

export default App