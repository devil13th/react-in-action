import React,{ Component } from 'react';
import ReactDOM from 'react-dom';

import { Modal, Button } from 'antd';

import 'antd/dist/antd.css';  // or 'antd/dist/antd.less'

class Modal1 extends React.Component{
    constructor(props ){
        super(props);
        this.state = { visible: false };
        this.showModal = this.showModal.bind(this);
        this.handleOk = this.handleOk.bind(this);
        this.handleCancel = this.handleCancel.bind(this);

    }

    showModal () {
      this.setState({
        visible: true,
      });
    }

    handleOk ()  {
      this.setState({
        visible: false,
      });
    }

    handleCancel() {
      this.setState({
        visible: false,
      });
    }


    render() {
      return (
        <div>
          <Button type="primary" onClick={this.showModal}>Open</Button>
          <Modal
            title="Basic Modal"
            visible={this.state.visible}
            onOk={this.handleOk}
            onCancel={this.handleCancel}
          >
            <p>Some contents...</p>
            <p>Some contents...</p>
            <p>Some contents...</p>
          </Modal>
        </div>
      );
  }
}



export {Modal1 as Modal1};