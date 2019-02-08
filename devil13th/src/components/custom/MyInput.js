import React from 'react';
class MyInput extends React.Component{
    constructor(props){
        super(props);
        const value = props.value || {};
        this.state = {
            selfValue: value || ""
        };
    }

    onChange = (e) => {
        const v = e.target.value;
        this.triggerChange(v);
    }

    triggerChange = (changedValue) => {
        // Should provide an event to pass value to Form.
        const onChange = this.props.onChange;
        if (onChange) {
            onChange(changedValue);
        }
    }


    render(){
        return (
            <input type="text" onChange={this.onChange}/>
        )
    }
}

export default MyInput;