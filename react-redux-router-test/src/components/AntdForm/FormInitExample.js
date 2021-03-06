import React from 'react'
import { Form, Input } from 'antd';
const FormItem = Form.Item;

const CustomizedForm = Form.create({
  onFieldsChange(props, changedFields) {
    props.onChange(changedFields);
  },
  mapPropsToFields(props) {
    return {
      username: Form.createFormField({
        ...props.username,
        value: props.username.value,
      }),
    };
  },
  onValuesChange(_, values) {
    console.log(values);
  },
})(
  
    (props) => {
    const { getFieldDecorator } = props.form;
    return (
      <Form layout="inline">
        <FormItem label="Username">
          {getFieldDecorator('username', {
            rules: [{ required: true, message: 'Username is required!' },{max:5,message: '请输入5个字符以内!'}],
          })(<Input />)}
        </FormItem>
      </Form>
    );
  }

);



class FormInitExample extends React.Component {
  state = {
    fields: {
      username: {
        value: 'benjycui',
      },
    },
  };
  handleFormChange = (changedFields) => {
    console.log("-----------------changedFields");
    console.log(changedFields);
/*
    this.setState({
      fields: { ...changedFields },
    });
*/
    this.setState(({ fields }) => ({
      fields: { ...fields, ...changedFields },
    }));


  }
  render() {
    const fields = this.state.fields;
    return (
      <div>
        <CustomizedForm {...fields} onChange={this.handleFormChange} />
        <pre className="language-bash">
          {JSON.stringify(fields, null, 2)}
        </pre>
      </div>
    );
  }
}

export {FormInitExample as FormInitExample} 