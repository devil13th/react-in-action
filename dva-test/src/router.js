import React from 'react';
import { Router, Route } from 'dva/router';
import IndexPage from './routes/IndexPage';

import List from './routes/List';
import Test from './routes/Test';
import sysUser from './routes/SysUser';
function RouterConfig({ history }) {
  return (
    <Router history={history}>
      <Route path="/" component={IndexPage} />
      <Route path="/list" component={List} />
      <Route path="/test" component={Test} />
      <Route path="/sysUser" component={sysUser} />
    </Router>
  );
}

export default RouterConfig;
