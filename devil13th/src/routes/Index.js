import React from 'react';
import { connect } from 'dva';
import { Layout} from 'antd';
import Header from '../components/index/Header';
import Content from '../components/index/Content';
import Footer from '../components/index/Footer';
//加载图片 //加载图片  使用方法 -> <img src={img_yay_src}/>
import img_yay_src from '../imgs/yay.jpg';





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
                    current="mail"
                >
                </Header>
                
                <Content
                    path={this.props.Index.path}
                >  
                </Content>     
                   
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
