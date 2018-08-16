import React from 'react';

import IndexPage from './routes/IndexPage';

import { routerRedux, Route } from 'dva/router';

const { ConnectedRouter } = routerRedux;



import List from './routes/List';
import Test from './routes/Test';
import SysUserRouter from './routes/SysUserRouter';

function RouterConfig({ history }) {

  return (
    <ConnectedRouter history={history}>
      <div>
        <Route path="/" component={IndexPage} />
      </div>
    </ConnectedRouter>
  );

}





export default RouterConfig;
