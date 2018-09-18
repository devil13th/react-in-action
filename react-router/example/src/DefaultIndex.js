import React,{ Component } from 'react';
import {Link,Route} from 'react-router-dom'
import {Home} from './Home.js';
import {About} from './About.js';
class DefaultIndex extends Component {
    render() {
      return (
        <div>
           <h1>default page </h1>   
           <table  >
							<tbody>
								<tr>
									<th  >
										<span>知识点</span>
									</th>
									<th  >
										<span>文件位置</span>
									</th>
								</tr>
							</tbody>
							<tbody >
								<tr >
									<td >
										嵌套路由
									</td>
									<td >
										index.js | Home.js | About.js
									</td>
								</tr>
								<tr >
									<td >
									exact属性
									</td>
									<td >
										Home.js
									</td>
								</tr>
								<tr >
									<td >
									Switch组件
									</td>
									<td >
										Home菜单(Home.js).js
									</td>
								</tr>
								<tr>
									<td >
								Redirect属性
									</td>
									<td >
										Home菜单(Home.js)
									</td>
								</tr>
								<tr>
									<td >
									props.match属性
									</td>
									<td >
										param菜单 (Param.js)
									</td>
								</tr>
								<tr>
									<td >
									Link NavLink组件
									</td>
									<td >
										home菜单(Home.js)
									</td>
								</tr>
								<tr >
									<td >
									Link NavLink组件
									</td>
									<td >
										NotFount菜单
									</td>
								</tr>
							</tbody>
						</table>
        </div>
      ); 
    }
}

export default DefaultIndex;