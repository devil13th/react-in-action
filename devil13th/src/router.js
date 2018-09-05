//配置整个应用的路由
import React from 'react';

import AppRouter from './routes/appRouter';

import { routerRedux, Route } from 'dva/router';

const { ConnectedRouter } = routerRedux;



function RouterConfig({ history }) {

  return (
    <ConnectedRouter history={history}>
      <div>
        <Route path="/" component={AppRouter} />
      </div>
    </ConnectedRouter>
  );

}





export default RouterConfig;