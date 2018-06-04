import React from 'react'
import {NormalComponent} from './NormalComponent';

class AdvanceComponent extends NormalComponent{
    constructor(props){
        super(props);
        this.state = {
            value : this.props.value
        }
        this.onChange = this.onChange.bind(this);
    }
    onChange(ipt){
        alert(ipt.value)
        this.setState({
            value : ipt.value
        })
    }

    render(){
        const allProps={
            ...this.state,
            ...this.props,
            onChange:this.onChange,
            name:this.props.name || "姓名"
        }
        return (
            <div>
                <NormalComponent {...allProps}></NormalComponent>
                <div>{this.state.value}</div>
            </div>
        )
    }
}

export {AdvanceComponent}