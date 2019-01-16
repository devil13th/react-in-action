import React from 'react';
import {Table,Dropdown,Menu,Icon,List,Spin,Tooltip} from 'antd';
const {SubMenu} = Menu;
import NoteContentViewRouter from '../NoteContentViewRouter';
import CFG from '../../../../constants';
class NoteList extends React.PureComponent{ 
    constructor(props){
        super(props);
    }
    componentDidMount(){

    }
    
    onExpand = (expanded, record) => {
      if(expanded){
        this.props.onExpand(expanded, record);
      }
    }
    //排序,分页,筛选改变时触发
    tableOnChange = (pagination, filters, sorter) => {
      this.props.tableOnChange(pagination, filters, sorter);
    }

    render(){
        const listData = [
          'Racing car sprays burning fuel into crowd.',
          'Japanese princess to wed commoner.',
          'Australian walks 100km after outback crash.',
          'Man charged over missing wedding girl.',
          'Los Angeles battles huge wildfires.',
        ];
        
        const listUI = <List
          header={<div>Header</div>}
          footer={<div>Footer</div>}
          bordered
          dataSource={listData}
          renderItem={item => (<List.Item>{item}</List.Item>)}
        />
        const tableData = this.props.data.map(data => {

          var desc = "";
          if(data && data.NOTE_DESC){
            if(data.NOTE_DESC.length > 30){
              desc = data.NOTE_DESC.substring(0,30) + "...";
            }else{
              desc = data.NOTE_DESC
            }

            desc = <Tooltip placement="leftTop" title={data.NOTE_DESC}>
              <span>{desc}</span>
            </Tooltip>;

          }

         

          //return {...data,NOTE_DESC : desc,description:listUI}
          //console.log(data.description + "xxx")
          return {...data,NOTE_DESC : desc}
        });

        //console.log("-----------");
        //console.log(tableData);
        const menu = (
          <Menu >
          <Menu.Item key="1">1st menu item</Menu.Item>
          <Menu.Item key="2">2nd menu item</Menu.Item>
          <Menu.Item key="3">3rd menu item</Menu.Item>
          <SubMenu title="disabled sub menu" >
            <Menu.Item>5d menu item</Menu.Item>
            <Menu.Item>6th menu item</Menu.Item>
            </SubMenu>
        </Menu>
        );
        
        //排序信息
        const {sortColumn,sortOrder} = this.props

        //console.log("xxxxxxxxxxxxx");
        //console.log(sortColumn,sortOrder)
        const columns = [/*{
            title: 'NOTE_ID',
            dataIndex: 'NOTE_ID',
          },*/{
            title: '标题',
            dataIndex: 'NOTE_TITLE',
            sorter:true,
            sortOrder: sortColumn == 'NOTE_TITLE' ?  sortOrder : false
          },{
            title: '分类',
            dataIndex: 'CLASSIFY_NAME',
            sorter:true,
            sortOrder: sortColumn == 'CLASSIFY_NAME' ?  sortOrder : false,
            width:100,
          },{
            title: '概要',
            dataIndex: 'NOTE_DESC',
            width:500
          },
          ,{
            title: '创建时间',
            dataIndex: 'CRE_TIME',
            sorter:true,
            sortOrder: sortColumn == 'CRE_TIME' ?  sortOrder : false,
            width:200
          },
          {
            title: 'Render',
            dataIndex: 'render',
            width:100,
            render : function(text, record, index){
              return (
                <Dropdown overlay={menu}>
                <a className="ant-dropdown-link" href="#">
                  Hover me <Icon type="down" />
                </a>
                </Dropdown>
              )
            }
          }];

          
          
        return (
            <div style={{marginTop:8}}>
                <Table 
                  pagination={{...this.props.pagination,showSizeChanger:true,pageSizeOptions:CFG.PAGESIZEOPTIONS}}
                  columns={columns} 
                  loading={this.props.loading}
                  dataSource={tableData} 
                  size="small" 
                  onExpand={this.onExpand}
                  onChange={this.tableOnChange}
                  rowKey={record => {return record.NOTE_ID}}
                  onRow={(record) => {
                    return {
                      onClick: (event)=>{},       // 点击行
                      onDoubleClick: (event) => {},
                      onContextMenu: (event) => {},
                      onMouseEnter: (event) => {},  // 鼠标移入行
                      onMouseLeave: (event) => {}
                    };
                  }}
                  
                  expandedRowRender={record => { //渲染展开的内容
                      // loading ...
                      if(record.loading){
                        return <div style={{textAlign:"center"}}><Spin tip="正在加载,请稍后..."></Spin></div>;
                      }else{
                        return (
                          <NoteContentViewRouter 
                            data={record.description}
                            noteId={record.NOTE_ID}
                          >
                          </NoteContentViewRouter>
                        )
                      }                      
                    }
                  }
                />

                <Dropdown overlay={menu} trigger={['contextMenu']}>
                  <span style={{ userSelect: 'none' }}>Right Click on Me</span>
                </Dropdown>

            </div>
        )
    }
}
export {NoteList as NoteList}