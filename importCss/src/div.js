import React,{ Component } from 'react';
import ReactDOM from 'react-dom';
import '../css/style.less';
console.log(React);

const pageI = ()=>{
    class HelloMessage extends Component {
        render() {
            const style = {
                background:"url('../img/mxd.jpg')",
                height : "100px",
                width : "100px"
            }
          return (
            <div > 
                <h1 style={{height:200}}> Hello {this.props.name} </h1> 
                <div className="g1">aa.png</div>
                <div style={style}>mxd.jpg</div>
                <img src="img/b.jpg" width="100" height="100"/>
            </div>
          );
        }
    }

    ReactDOM.render(
        <HelloMessage name="devil13th"></HelloMessage>,
        document.getElementById("example")
    )
}

export {pageI};
