import React from 'react';
import { Router, Route } from 'dva/router';
import IndexPage from './routes/IndexPage';

import List from './routes/List';
import Test from './routes/Test';

function RouterConfig({ history }) {
  return (
    <Router history={history}>
      <Route path="/" component={IndexPage} />
      <Route path="/list" component={List} />
      <Route path="/test" component={Test} />
    </Router>
  );
}

export default RouterConfig;
