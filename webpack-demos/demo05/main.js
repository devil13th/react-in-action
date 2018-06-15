import React from 'react';
import ReactDOM  from 'react-dom';

import img1 from './images/big.png';
import img2 from './images/small.png';

ReactDOM.render(
  <div>
    <img src={img1}/>
    <img src={img2}/>
  </div>,
  document.getElementById('example')
);
