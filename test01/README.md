# 关于NavLink

## 例子A
```
class App extends Component {
    render() {
        return (
            <div>
                <h1>React Router Tutorial</h1>
                <ul role="nav">
                    <li><NavLink to="/" activeClassName="bold" >/</NavLink></li>
                    <li><NavLink to="/about"  activeClassName="bold" >/about</NavLink></li>
                    <li><NavLink to="/repos"  activeClassName="bold" >/repos</NavLink></li>
                    <li><NavLink to="/repos/repo"  activeClassName="bold" >/repos/repo</NavLink></li>
                </ul>
            </div>
        );
    }
}
```

关于NavLink 和 Link: 
如果仅仅需要匹配路由,使用Link就可以了,而NavLink的不同在于可以给当前选中的路由添加样式, 比如上面写到的activeStyle和activeClassName
