

# ant design

## 安装ant design
安装命令
> npm install antd --save

## 例子

```
import React,{ Component } from 'react';
import ReactDOM from 'react-dom';
import 'antd/dist/antd.css'; 
import { DatePicker } from 'antd';
class App extends Component {
    render(){
        return (
            <DatePicker />
        );
    }
}



ReactDOM.render(
    <App></App>, 
    document.getElementById('app')
);

```


