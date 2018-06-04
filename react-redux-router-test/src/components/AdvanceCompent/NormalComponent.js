import React from 'react';
class NormalComponent extends React.Component{
    constructor(props){
        super(props);
        this.state={
            value : this.props.value
        }
        this.onChange = this.onChange.bind(this);
    }

    onChange(){
        this.props.onChange(this.refs.ipt);
    }

    render(){
        return(
            <div>
                {this.props.name}:<input type="text" ref="ipt"  value={this.state.value} onChange={this.onChange}/>
            </div>
        )
    }
}

export{NormalComponent as NormalComponent}