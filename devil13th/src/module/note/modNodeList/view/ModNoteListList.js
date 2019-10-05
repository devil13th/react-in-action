
import React from 'react';
import { Table,Spin, Icon, Popconfirm, Tooltip, Button, Menu, Divider } from 'antd';
import NoteContentViewRouter from '../NoteContentViewRouter';
const ButtonGroup = Button.Group;
import CFG from '../../../../constants';
class ModNoteListList extends React.Component {
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
    deleteModNoteList = (id) => {
        this.props.deleteModNoteList(id);
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
        this.props.editModNoteList(this.state.rightClickId);
    }

    //右键菜单-删除
    rightClickDelete = () => {
        this.props.deleteModNoteList(this.state.rightClickId);
    }

    showTotal = (total, range) => {
        return `共 ${total} 条`;
    }


    //展开事件
    onExpand = (expanded,record) => {
        if (expanded) {
            this.props.onExpand(expanded, record);
        }
    }

    //展示内容
    showExpandContent = record => { //渲染展开的内容
        // loading ...
        if (record.loading) {
            return <div style={{ textAlign: "center" }}><Spin tip="正在加载,请稍后..."></Spin></div>;
        } else {
            return (
                <NoteContentViewRouter
                    text={record.description}
                    noteId={record.NOTE_ID}
                >
                </NoteContentViewRouter>
            )
        }
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
                title: '主键',
                dataIndex: 'NOTE_ID',
                key: 'NOTE_ID',
                //fixed: 'left',//表格横向滚动,固定在左侧的列
                render: text => <a href="javascript:;">{text}</a>,
                sorter:true,
                sortOrder: ("NOTE_ID" === sortColumn) ? sortOrder : false,
                width:'10%'
            }, */
			{
                title: '分类',
                key: 'NOTE_CLASSIFY',
                dataIndex: 'NOTE_CLASSIFY',
                align: 'left',
                sorter: true,
                sortOrder: ("NOTE_CLASSIFY" === sortColumn) ? sortOrder : false,
                width: 70
            },
			{
                title: '标题',
                key: 'NOTE_TITLE',
                dataIndex: 'NOTE_TITLE',
                align: 'left',
                sorter: true,
                sortOrder: ("NOTE_TITLE" === sortColumn) ? sortOrder : false,
                width: 350
            }
        ]

        if(this.props.layout == "list"){
            columns.push(
                {
                    title: '概述',
                    key: 'NOTE_DESC',
                    dataIndex: 'NOTE_DESC',
                    align: 'left',
                    sorter: true,
                    sortOrder: ("NOTE_DESC" === sortColumn) ? sortOrder : false,
                    render:function(text, record, index) {
                        var rText = "";
                        if(text){
                            if (text.length > 30) {
                                rText = text.substring(0, 30) + "...";
                            } else {
                                rText = text
                            }
                        }
    
                        return(
                        <Tooltip placement="leftTop" title={text}>
                            <span>{rText}</span>
                        </Tooltip>
                        )
    
                    }
                }
            );

            columns.push(
                {
                    title: '创建时间',
                    key: 'CRE_TIME',
                    dataIndex: 'CRE_TIME',
                    align: 'left',
                    sorter: true,
                    sortOrder: ("CRE_TIME" === sortColumn) ? sortOrder : false,
                    width: 150
                },
            )
        }
			
			/*
			{
                title: '是否删除',
                key: 'IS_DELETE',
                dataIndex: 'IS_DELETE',
                align: 'left',
                sorter: true,
                sortOrder: ("IS_DELETE" === sortColumn) ? sortOrder : false,
                width: '10%'
            },
			{
                title: '到期日期',
                key: 'EXPIRE_DATE',
                dataIndex: 'EXPIRE_DATE',
                align: 'left',
                sorter: true,
                sortOrder: ("EXPIRE_DATE" === sortColumn) ? sortOrder : false,
                width: '10%'
            },
			{
                title: '预警天数',
                key: 'ALARM_DAYS',
                dataIndex: 'ALARM_DAYS',
                align: 'left',
                sorter: true,
                sortOrder: ("ALARM_DAYS" === sortColumn) ? sortOrder : false,
                width: '10%'
            },
            {
                title: '创建人',
                key: 'CRE_USER',
                dataIndex: 'CRE_USER',
                align: 'left',
                sorter: true,
                sortOrder: ("CRE_USER" === sortColumn) ? sortOrder : false,
                width: '10%'
            },
			{
                title: '修改时间',
                key: 'MOD_TIME',
                dataIndex: 'MOD_TIME',
                align: 'left',
                sorter: true,
                sortOrder: ("MOD_TIME" === sortColumn) ? sortOrder : false,
                width: '10%'
            },
			{
                title: '修改人',
                key: 'MOD_USER',
                dataIndex: 'MOD_USER',
                align: 'left',
                sorter: true,
                sortOrder: ("MOD_USER" === sortColumn) ? sortOrder : false,
                width: '10%'
            },
            */
			
			
        columns.push(
            {
                title: 'Operator',
                key: 'OPERATOR',
                align: 'center',
                width: 150,
                render: (text, record, index) => {
                    return (
                        <ButtonGroup>
                            <Tooltip placement="left" title="Edit">
                                <Button icon="edit" size="small" onClick={() => { this.props.editModNoteList(record.NOTE_ID) }} ></Button>
                            </Tooltip>
                            <Tooltip placement="top" title="Delete">
                                <Popconfirm
                                    title="Are you sure delete this record ?"
                                    placement="left"
                                    okText="Yes"
                                    cancelText="No"
                                    onConfirm={() => { this.deleteModNoteList(record.NOTE_ID) }}
                                >
                                    <Button icon="delete" size="small"></Button>
                                </Popconfirm>
                            </Tooltip>
                        </ButtonGroup>
                    )
                }
            }
        )
        


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
                    this.props.rowClick(record);
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
                        rightClickId: record.NOTE_ID
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

        let expandedRowRender = null;
        if(this.props.layout == "list"){
            expandedRowRender = this.showExpandContent
        }

        return ( 
            <div>
                <Table
                    expandedRowRender={expandedRowRender}
                    rowSelection={rowSelection}
                    type="checkbox"
                    rowKey="NOTE_ID"
                    size="small"
                    columns={columns}
                    dataSource={this.props.listDataSource}
                    loading={this.props.queryListLoading}
                    rowClassName={this.rowClassNameRender}
                    pagination={pagination}
                    onChange={this.changePageAndSort}
                    bordered={false}
                    rowClassName={this.rowClassName}
                    onRow={onRowFn}
                    onExpand={this.onExpand}
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

export default ModNoteListList;