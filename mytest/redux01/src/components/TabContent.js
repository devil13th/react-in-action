import React,{Component} from 'react';

class TabContent extends Component{
    constructor(props){
        super(props);
    }

    

    render(){
        const doms = [];
        this.props.tabs.map((item,index) => {
            let id = "tabHeader"+index;
            doms.push(<div id={id} key={index}>{item.title}_{index}</div>);
        })
        return (
            <div>
                {doms}
            </div>
        )
    }
}

export {TabContent};