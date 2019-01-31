//配置整个应用的路由
import React from 'react';

import index from './routes/Index';

import { routerRedux, Route } from 'dva/router';

const { ConnectedRouter } = routerRedux;



function RouterConfig({ history }) {

  return (
    <ConnectedRouter history={history}>
      <div>
        <Route path="/" component={index} />
      </div>
    </ConnectedRouter>
  );

}





export default RouterConfig;