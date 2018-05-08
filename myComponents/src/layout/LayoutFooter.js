import React,{Component} from 'react';
import css from './Layout.css';
import less from './Layout.less';
class LayoutFooter extends React.Component {
    constructor(props){
        super(props);
        //bind this
        //alert(props)
        //console.log(this.props)
        //state init
       this.state = {tit:this.props.tit};
    }

    render(){
      
        
        return (
            <div className="layoutFooter" id="layoutFooter">{this.state.tit}
                <div>
                    
                </div>
            </div>
        );
    }
}

export {LayoutFooter};