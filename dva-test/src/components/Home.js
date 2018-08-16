
import React from 'react';
import styles from './IndexPage.css';
import { Link } from 'dva/router'
class Home extends React.Component{
    constructor(props){
        super(props);
    }
    render (){
        return (
            <div className={styles.normal}>
                <h1 className={styles.title}>Yay! Welcome to dva!</h1>
                <div className={styles.welcome} />
                <ul className={styles.list}>
            
                    <li><Link to='/list'>[ TODO LIST EXAMPLE ]</Link></li>
                    <li><Link to='/test'>[ Test ]</Link></li>
                    <li><Link to='/sysUser'>[ 用户管理 CRUD 例子 ]</Link></li>
                </ul>
            </div>
        )
    }
}

export {Home as Home};

