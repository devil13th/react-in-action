import React,{ Component } from 'react';

class Param extends Component {
    render() {
      return (
        <div>
           <h2>Param  match的用法 </h2>
           match的用法<br/>
           this.props.match.url: {this.props.match.url} <br/>
           this.props.match.path: {this.props.match.path} <br/>
           this.props.match.params.userId: {this.props.match.params.userId}
        </div>
      ); 
    }
}

export default Param;