import React from 'react';
import {FormList} from '../components/FormList';

class FormManager extends React.Component{
    constructor(props){
        super(props);
    }
    render(){
        return  <FormList></FormList>
    }
}


export {FormManager as FormManager};