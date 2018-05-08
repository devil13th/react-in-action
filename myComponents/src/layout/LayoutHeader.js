import React,{Component} from 'react'
import css from './Layout.css';
import less from './Layout.less';
class LayoutHeader extends React.Component {
    constructor(props){
        super(props);

        //method bind this
        this.setTit = this.setTit.bind(this);

        console.log(this.props)
        
      
        //注意 this.state要先初始化后在使用!!
        this.state = {tit:this.props.tit};
    }

    setTit(e){
        
        this.setState({tit:"1234"});
        //console.log(this)
        //console.log(this.props.children)
        //event.stopPropagation();
    }

    render(){
        return (
            <div className="layoutHeader" id="layoutHeader" onClick={this.setTit} >{this.state.tit}
                <div>
                    {this.props.children}
                </div>
            </div>
        );
    }
}

export {LayoutHeader};