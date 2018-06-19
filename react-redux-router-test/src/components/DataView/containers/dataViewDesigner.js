import React, {Component} from 'react';
import {DataViewLayout} from '../components/DataViewLayout';
class dataViewDesigner extends Component {
    constructor(props) {
        super(props);
        this.state = {}
    };


    render() {
        const styleDesigner = {
            backgroundColor:'#ffffff',
            width:'100%',
            height:'100%',
        }

        return (
            <div id='designer' style={styleDesigner} 
            >
                <DataViewLayout></DataViewLayout>
            </div>
        );
    }
}



export default dataViewDesigner;