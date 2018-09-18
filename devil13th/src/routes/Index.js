import React from 'react';
import { connect } from 'dva';
import { Layout} from 'antd';
import { routerRedux, Route,Switch } from 'dva/router';
import Header from '../components/index/Header';
import Content from '../components/index/Content';
import Footer from '../components/index/Footer';

import AntdRouter from '../routes/AntdRouter'


import AntdIndex from '../components/antd/AntdIndex'
//加载图片 //加载图片  使用方法 -> <img src={img_yay_src}/>
import img_yay_src from '../imgs/yay.jpg';


import AntdIndex2 from '../components/antd/AntdIndex2';
import AntdIndex3 from '../components/antd/AntdIndex3';

class Index extends React.Component {
    state = {
        collapsed: false
    };

    onCollapse = (collapsed) => {
        console.log(collapsed);
        this.setState({ collapsed });
    }

   
      

    render() {
        return (
            <Layout>
                <Header 
                    top={0}
                    current="Index"
                >
                </Header>
                {/*
                <Content
                    path={this.props.Index.path}
                >  
                </Content>
                */}

                <div>
                    <Switch>
                    <Route exact path="/" component={Content} />
                    <Route exact path="/antd" component={AntdIndex} />
                    <Route  path="/antd/x2" component={AntdIndex2} />
                    <Route  path="/antd/x3" component={AntdIndex3}/>
                    </Switch>
                </div>


                   
                <Footer style={{ textAlign: 'center' }}>
                    Ant Design ©2018 Created by Ant UED
                </Footer>
            </Layout>
        );
    }
}


Index.propTypes = {
};

export default connect(({Index,loading }) => ({
    Index,
    loading 
  }))(Index);
