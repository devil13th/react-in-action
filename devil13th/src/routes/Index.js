import React from 'react';
import { connect } from 'dva';
import { Layout,Breadcrumb } from 'antd';
import { routerRedux, Route, Switch, HashRouter } from 'dva/router';
import Header from '../components/index/Header';
import Content from '../components/index/Content';

import ContentIndex from '../components/index/ContentIndex';
import Footer from '../components/index/Footer';

import AntdRouter from '../routes/AntdRouter'
import SysUserRouter from '../module/infrastructure/sysUser/SysUserRouter'
import AntdIndex from '../components/antd/AntdIndex'
//加载图片 //加载图片  使用方法 -> <img src={img_yay_src}/>
import img_yay_src from '../imgs/yay.jpg';


import AntdIndex2 from '../components/antd/AntdIndex2';
import AntdIndex3 from '../components/antd/AntdIndex3';

const { Content: AntdContent } = Layout;

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
            <HashRouter>
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
                    <AntdContent style={{ padding: "0 0px" }}>
                {/*<Breadcrumb style={{ margin: '16px 0' }}>
                            <Breadcrumb.Item>Home</Breadcrumb.Item>
                            <Breadcrumb.Item>{this.props.path}</Breadcrumb.Item>
                        </Breadcrumb>*/}
                        <div>
                            <Switch>
                                <Route exact path="/" component={ContentIndex} />
                                <Route exact path="/antd" component={AntdIndex} />
                                <Route exact path="/SysUserRouter" component={SysUserRouter} />
                                
                                <Route path="/antd/x2" component={AntdIndex2} />
                                <Route path="/antd/x3" component={AntdIndex3} />
                            </Switch>
                        </div>
                    </AntdContent>



{/*
                    <Footer style={{ textAlign: 'center' }}>
                        Ant Design ©2018 Created by Ant UED
                    </Footer>*/}
                </Layout>
            </HashRouter>
        );
    }
}


Index.propTypes = {
};

export default connect(({ Index, loading }) => ({
    Index,
    loading
}))(Index);
