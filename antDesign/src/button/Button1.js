import React,{ Component } from 'react';
import ReactDOM from 'react-dom';

import { Modal, Button ,Input} from 'antd';

import 'antd/dist/antd.css';  // or 'antd/dist/antd.less'

class Button1 extends React.Component{
    constructor(props ){
        super(props);
        this.clickCB = this.clickCB.bind(this);

    }

    clickCB(){
      alert(1);
    }

  


    render() {
      return (
        <div>
        <Input placeholder="Basic usage" />
        <Button onClick={this.clickCB} type="primary">Primary</Button>
        </div>
      );
  }
}



export {Button1 as Button1};