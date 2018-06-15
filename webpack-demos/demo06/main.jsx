
import React from 'react';
import ReactDOM  from 'react-dom';

import style from './css/app.css';
import less from './less/style.less';

import img1 from './images/big.png';
import img2 from './images/small.png';


ReactDOM.render(
  <div>
    <h1 className={style.h1}>局部css引入 .h1  Hello World !</h1>
    <h2 className={style.h3}>局部css引入 :local(.h3) Hello Webpack !</h2>
    <h2 className="h2">全局css引入 :global(.h2)Hello Webpack !</h2>


    <div className={style.bg1}>xxx11</div>
    <div className={style.bg2}>xxx22</div>

    <div className={less.lessStyle}> less.lessStyle </div>

    <img src={img1}/>
    <img src={img2}/>
  </div>,
  document.getElementById('example')
);
