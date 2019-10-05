import React from 'react';
import { Table, Icon, Popconfirm, Tooltip, Button, Menu, Divider } from 'antd';
const ButtonGroup = Button.Group;
import CFG from '../../../../constants';
class SysDicPubList extends React.Component {
    constructor(props) {
        super(props);
        this.state = {
            menuVisible: "none",
            t: 0,
            l: 0,
            rightClickId: ""
        }
    }

    componentDidMount = () => {
        const _this = this;
        window.addEventListener("click", _this.closeContextMenu, false);
        // window.addEventListener("click",function(){
        //     _this.closeContextMenu()
        // },false);
    }

    componentWillUnmount = () => {
        const _this = this;
        window.removeEventListener("click", _this.closeContextMenu);
    }

    closeContextMenu = () => {
        this.setState({
            menuVisible: "none"
        })
    }

    //分页,排序,筛选改变时触发
    changePageAndSort = (pagination, filters, sorter) => {
        this.props.changePageAndSort(pagination, filters, sorter);
    }

    //tr斑马条纹样式
    rowClassNameRender = (record, index) => {
        if (index % 2 == 0) {
            return "trEve";
        } else {
            return "trEve";
        }
    }

    //删除
    deleteSysDicPub = (id) => {
        this.props.deleteSysDicPub(id);
    }

    rowClassName = (record, index) => {
        if (index % 2 == 0) {
            return "trOdd";
        } else {
            return "trEve";
        }
    }

    //右键菜单-编辑
    rightClickEdit = () => {
        //alert(this.state.rightClickId)
        this.props.editSysDicPub(this.state.rightClickId);
    }

    //右键菜单-删除
    rightClickDelete = () => {
        this.props.deleteSysDicPub(this.state.rightClickId);
    }

    showTotal = (total, range) => {
        return `共 ${total} 条`;
    }
    render() {
        const _this = this;
        //排序及分页信息
        const queryExtraBean = this.props.queryExtraBean;
        //排序字段
        const sortColumn = queryExtraBean.sortColumn;
        //排序规则(正序还是倒序)
        const sortOrder = queryExtraBean.sortOrder;



        //表格显示的列信息
        const columns = [
            /*{
                title: 'id',
                dataIndex: 'DIC_ID',
                key: 'DIC_ID',
                fixed: 'left',//表格横向滚动,固定在左侧的列
                width:150,
                render: text => <a href="javascript:;">{text}</a>,
                sorter:true
            }, */

            {
                title: 'Dic Id',
                key: 'DIC_ID',
                dataIndex: 'DIC_ID',
                align: 'left',
                sorter: true,
                sortOrder: ("DIC_ID" === sortColumn) ? sortOrder : false,
                width: '20%'
            },
            {
                title: 'Dic Name',
                key: 'DIC_NAME',
                dataIndex: 'DIC_NAME',
                align: 'left',
                sorter: true,
                sortOrder: ("DIC_NAME" === sortColumn) ? sortOrder : false,
                width: '20%'
            },
            {
                title: 'Dic Classify',
                key: 'DIC_CLASSIFY',
                dataIndex: 'DIC_CLASSIFY',
                align: 'center',
                sorter: true,
                sortOrder: ("DIC_CLASSIFY" === sortColumn) ? sortOrder : false,
                width: '20%'
            },
            {
                title: 'Description',
                key: 'DIC_DESC',
                dataIndex: 'DIC_DESC',
                align: 'left',
                sorter: true,
                sortOrder: ("DIC_DESC" === sortColumn) ? sortOrder : false,
            },
            {
                title: 'Operator',
                key: 'OPERATOR',
                align: 'center',
                width: 150,
                render: (text, record, index) => {
                    return (

                        <ButtonGroup>
                            <Tooltip placement="left" title="Edit">
                                <Button icon="edit" size="small" onClick={() => { this.props.editSysDicPub(record.DIC_ID) }} ></Button>
                            </Tooltip>
                            <Tooltip placement="top" title="Delete">
                                <Popconfirm
                                    title="Are you sure delete this record ?"
                                    placement="left"
                                    okText="Yes"
                                    cancelText="No"
                                    onConfirm={() => { this.deleteSysDicPub(record.DIC_ID) }}
                                >
                                    <Button icon="delete" size="small"></Button>
                                </Popconfirm>
                            </Tooltip>




                        </ButtonGroup>
                    )
                }
            }
        ];


        //勾选事件处理
        const rowSelection = {
            //勾选的行
            selectedRowKeys: this.props.selectedEntityIds,
            //勾选改变时触发
            onChange: (selectedRowKeys, selectedRows) => {
                //console.log(`selectedRowKeys: ${selectedRowKeys}`, 'selectedRows: ', selectedRows);
                //console.log(selectedRowKeys);
                this.props.onChangeSelectedRow(selectedRowKeys);
            },
            //勾选时触发
            onSelect: (record, selected, selectedRows) => {
                //console.log("-------------");
                //console.log(record);
                //console.log(selected);
                //console.log(selectedRows);
                //this.props.onSelectedRow(record,selected,selectedRows)
            },
            //全选时触发
            onSelectAll: (selected, selectedRows, changeRows) => {
                //console.log(selected, selectedRows, changeRows);
            },
        };

        //分页信息
        const pagination = {
            ...this.props.pagination,
            showTotal: this.showTotal,
            showSizeChanger: true,
            pageSizeOptions: CFG.PAGESIZEOPTIONS
        }

        //表格行的各种事件
        const onRowFn = (record) => {
            return {
                // 点击行
                onClick: (event) => {
                },
                // 双击行
                onDoubleClick: (event) => { },
                // 右键点击行
                onContextMenu: (event) => {
                    //console.log(record);
                    //屏蔽浏览器右键默认事件
                    event.preventDefault();
                    _this.setState({
                        t: event.clientY + document.documentElement.scrollTop,
                        l: event.clientX,
                        menuVisible: "block",
                        rightClickId: record.DIC_ID
                    })

                },
                //鼠标移入行
                onMouseEnter: (event) => { },
                //鼠标移出行
                onMouseLeave: (event) => { }
            }
        }


        const menuStyle = {
            border: "1px solid #e8e8e8",
            borderRightWidth: 0,
            position: "absolute",
            display: _this.state.menuVisible,
            top: _this.state.t,
            left: _this.state.l
        }
        return (
            <div>
                <Table
                    expandedRowRender={record => <p style={{ margin: 0 }}>{record.description}</p>}
                    rowSelection={rowSelection}
                    type="checkbox"
                    rowKey="DIC_ID"
                    size="small"
                    columns={columns}
                    dataSource={this.props.listDataSource}
                    loading={this.props.loading}
                    rowClassName={this.rowClassNameRender}
                    pagination={pagination}
                    onChange={this.changePageAndSort}
                    bordered={false}
                    rowClassName={this.rowClassName}
                    onRow={onRowFn}
                />

                <div style={menuStyle}>
                    <Menu style={{ width: 200 }} mode="vertical">
                        <Menu.Item key="editMenuItem" onClick={this.rightClickEdit}><span><Icon type="edit" /><span>Edit</span></span></Menu.Item>
                        <Menu.Item key="deleteMenuItem" onClick={this.rightClickDelete}><span><Icon type="delete" /><span>Delete</span></span></Menu.Item>
                    </Menu>
                </div>
            </div>

        )
    }
}

export default SysDicPubList;