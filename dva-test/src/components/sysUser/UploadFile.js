import React from 'react';
import {Modal,Upload, Icon, message} from 'antd';


const Dragger = Upload.Dragger;


const props = {
    name: 'fileName',
    multiple: true,
    data:{
        userName:"devil13th",
        orgId:"2"
    },
    action: 'http://127.0.0.1:8000/ajaxserver/fileUploadSubmit',
    onChange(info) {
        console.log(info);
        const status = info.file.status;
        if (status !== 'uploading') {
            console.log(info.file, info.fileList);
        }
        if (status === 'done') {
            message.success(`${info.file.name} file uploaded successfully.`);
        } else if (status === 'error') {
            message.error(`${info.file.name} file upload failed.`);
        }
    },
};



class UploadFile extends React.Component {
    constructor(props) {
        super(props);
      
    }

    render() {
        return (
            <Modal
                title="上传文件"
                visible={this.props.visible}
                onOk={this.handleOk}
                onCancel={this.props.onCloseModal}
                defaultActiveFirstOption={false}
                width={800}
                destroyOnClose={true}
                confirmLoading={this.props.saveLoading}
                maskClosable={false}
            >
                <Dragger {...props}>
                    <p className="ant-upload-drag-icon">
                        <Icon type="inbox" />
                    </p>
                    <p className="ant-upload-text">Click or drag file to this area to upload</p>
                    <p className="ant-upload-hint">Support for a single or bulk upload. Strictly prohibit from uploading company data or other band files</p>
                </Dragger>
            </Modal>
        )
    }
}


export { UploadFile as UploadFile }

