import React from 'react';
import { connect } from 'dva';
import { Icon } from 'antd';
//加载图片  使用方法 -> <img src={img_yay_src}/>
import img_yay_src from '../imgs/yay.jpg';





class AppRouter extends React.Component {
    state = {
        collapsed: false,
      };
    
      onCollapse = (collapsed) => {
        console.log(collapsed);
        this.setState({ collapsed });
      }
    
      render() {
        return (
            <div>
                <Icon type="user" /> User
                <img src={img_yay_src}/>
            </div>
            
        );
      }
}


AppRouter.propTypes = {
};

export default connect()(AppRouter);
