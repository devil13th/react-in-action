import React,{Component} from 'react';

class TabHeader extends Component{
    constructor(props){
        super(props);
    }
    render(){
        const doms = [];
        this.props.tabs.map((item,index) => {
            let id = "tabHeader"+index;
            doms.push(<div tabContent={id}>{item.content}</div>);
        })
        return (
            <div>
                {doms}
            </div>
        )
    }
}

export {TabHeader};