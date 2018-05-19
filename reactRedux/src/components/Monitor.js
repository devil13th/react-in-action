import React from 'react'
import PropTypes from 'prop-types'


class Monitor extends React.Component{

    constructor(props){
      super(props);
    }

   
  

    render(){
      
    
      return (
        <div onClick={this.props.onClick} style={{"cursor": "pointer"}}>
          I'm Monitor , click me !!!  [{this.props.monitor}]
        </div>
      );
    }
}





export default Monitor