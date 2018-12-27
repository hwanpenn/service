import React from "react";
import withStyles from "@material-ui/core/styles/withStyles";
import Grid from '@material-ui/core/Grid';
import Assignment from "@material-ui/icons/Assignment";
import GridContainer from "components/Grid/GridContainer.jsx";
import GridItem from "components/Grid/GridItem.jsx";
import Card from "components/Card/Card.jsx";
import CardBody from "components/Card/CardBody.jsx";
import CardIcon from "components/Card/CardIcon.jsx";
import CardHeader from "components/Card/CardHeader.jsx";
import extendedTablesStyle from "assets/jss/material-dashboard-pro-react/views/extendedTablesStyle.jsx";
import {getOtherML,getDataML,updateDataML,deleteDataML,createDataML,importDataML } from "actions/tablesML";
import {getDataKnowladgeMng} from "actions/tablesKnowladgeMng";
import {connect} from "react-redux";
import {Table, Divider,Button } from 'antd';
import {Input,Modal } from 'antd';
import {Form,Pagination,Popconfirm } from 'antd';
import {Upload, message, Icon,Select,Popover } from 'antd';
import { TreeSelect } from 'antd';
import { chatTestUrl } from '../../cfg/cfg.js';

const FormItem = Form.Item;
const Search = Input.Search;
const Option = Select.Option;
const TreeNode = TreeSelect.TreeNode;

class tablesML extends React.Component {
    constructor(props) {
        super(props);
        this.state = {
            checked: [],
            tableData: [],
            visible: false,
            visibleModify: false,
            recordAction:{},
            recordSelect:{},
            defaultSelectValue:'',
            robotId:'',
            defaultPageSize:20,
            selectedRows:'',
            learnIds:[],
            defaultRobotId:'',
            value: undefined
        };
    }
    componentWillMount(){
        // this.getTableData('',1,10);
        this.getOtherData('',1,999);
        this.getTableDataKnowladgeMng('',1,999);
    }
    componentDidMount(){
        this.setState({robotId:this.props.tablesML.defaultRobotId})
    }
    
    onChangeSelectTree = (value) => {
    // console.log('onChange ', value);
    this.setState({ value });
    }
    getTableDataKnowladgeMng = (categoryName,start,size) => {
        const params = {
            categoryName:categoryName,
            pageNo:start,
            pageSize:size,
        };
        this.props.getDataKnowladgeMng(params,this);
    }
    getTableData = (standardQuesiton,start,size,robotId) => {
        const params = {
            // robotId:robotId,
            pageNo:start,
            pageSize:size,
            robotId:robotId,
            standardQuesiton:standardQuesiton,
        };
        this.props.getDataML(params,this);
    }
    getOtherData = (username,start,size) => {
        const params = {
            search:username,
            isPaging:true,
            currentPage:start,
            pageSize:size,
        };
        this.props.getOtherML(params,this);
    }
    onRowSelect = (record) => {
        this.setState({ recordSelect:record });
    }
    showModifyModal = (record) => {
        this.setState({ visibleModify: true,recordAction:record });
    }
    handleChange = (value) => {
        // console.log('value')
        // console.log(value)
        this.setState({ robotId: value });
        this.getTableData('',1,20,value);
    }
    handleML = () => {
        if(this.state.selectedRows.length!==0){
            const params = {
                robotId:this.state.robotId,
                learnIds:this.state.learnIds
            }
            this.props.updateDataML(params,this);
        }else{
            message.info('请先选择学习的内容');
        }
    }
    handleTest = () => {
        let urlValue
        const urlTemp = window.location.host
        if(urlTemp.indexOf("www.gjj12329.cn") != -1 ){
            urlValue = chatTestUrl.release
        }else if(urlTemp.indexOf("12329.pub") != -1){
            urlValue = chatTestUrl.beta
        }else if(urlTemp.indexOf("192.168.21") != -1){
            urlValue = chatTestUrl.local
        }
        window.open(urlValue+"/client?type=robotChatTest&tenantId="+window.sessionStorage.getItem('tenantId')+"&userId=12345&userName=uer01")
    }
    handleImport = () => {
        if(this.state.value===undefined){

        }else{
            if(this.state.value.length!==0){
                const params = {
                    robotId:this.state.robotId,
                    categoryIds:this.state.value
                }
                this.props.importDataML(params,this);
            }else{
                message.info('请先选择要导入的知识库');
            }
        }
        
    }
    showModalCreate = () => {
        this.setState({ visible: true });
    }
    handleCancelModify = () => {
        this.setState({ visibleModify: false });
    }
    handleCancelCreate = () => {
        this.setState({ visible: false });
    }
    handleModify = () => {
        const form = this.formRefModifyData.props.form;
        form.validateFields((err, values) => {
            if (err) {
                return;
            }
            values.windowId=this.state.recordAction.windowId
            this.props.updateDataML(values,this);
            form.resetFields();
            this.setState({ visibleModify: false });
        });
    }
    handleCreate = () => {
        const form = this.formRefDataCreate.props.form;
        form.validateFields((err, values) => {
            if (err) {
                return;
            }
            this.props.createDataML(values,this)
            form.resetFields();
            this.setState({ visible: false });
        });
    }
    saveFormRefModify = (formRef) => {
        this.formRefModifyData = formRef;
    }
    saveFormRefCreate = (formRef) => {
        this.formRefDataCreate = formRef;
    }
    deleteConfirm = (record) => {
        const params = {
            learnId:record.learnId,
        }
        this.props.deleteDataML(params,this)
    }
    render() {
        let thisTemp = this
        const { classes } = this.props;
        const columns = [{
            title: '机器人id',
            dataIndex: 'robotId',
            key: 'robotId',
            width: window.screen.width*0.15,
            render: text => <Popover content={(
                <div style={{width:270}}>
                  <p>{text}</p>
                </div>
              )}>
             <span style={{overflow: 'hidden',
                    textOverflow: 'ellipsis',
                    whiteSpace: 'nowrap',
                    display: 'inline-block',
                    width: 60
                }}>{text}</span>
          </Popover>
        }, {
            title: '标准问题',
            dataIndex: 'standardQuesiton',
            key: 'standardQuesiton',
            width: window.screen.width*0.15,
            render: text => <Popover content={(
                <div style={{width:270}}>
                  <p>{text}</p>
                </div>
              )}>
             <span style={{overflow: 'hidden',
                    textOverflow: 'ellipsis',
                    whiteSpace: 'nowrap',
                    display: 'inline-block',
                    width: 100
                }}>{text}</span>
          </Popover>
        }, {
            title: '标签',
            dataIndex: 'label',
            key: 'label',
            width: window.screen.width*0.15,
        }, {
            title: '回答内容',
            key: 'answer',
            dataIndex: 'answer',
            width: window.screen.width*0.15,
            render: text => <Popover content={(
                <div style={{width:270}}>
                  <p>{text}</p>
                </div>
              )}>
             <span style={{overflow: 'hidden',
                    textOverflow: 'ellipsis',
                    whiteSpace: 'nowrap',
                    display: 'inline-block',
                    width: 100
                }}>{text}</span>
          </Popover>
        }, {
            title: '关联文章id',
            key: 'articleId',
            dataIndex: 'articleId',
            width: window.screen.width*0.15,
            render: text => <Popover content={(
                <div style={{width:270}}>
                  <p>{text}</p>
                </div>
              )}>
             <span style={{overflow: 'hidden',
                    textOverflow: 'ellipsis',
                    whiteSpace: 'nowrap',
                    display: 'inline-block',
                    width: 100
                }}>{text}</span>
          </Popover>
        }, {
            title: '状态',
            key: 'status',
            dataIndex: 'status',
            width: window.screen.width*0.15,
            render: text => <a >{text===1?'已入库':'未入库'}</a>,
        }, {
            title: '操作',
            key: 'action',
            width: window.screen.width*0.15,
            render: (text, record) => (
                <span>
                    {/* <a onClick={() => this.showModifyModal(record)} >modify</a>
                    <Divider type="vertical" /> */}
                    <Popconfirm cancelText="取消" okText="确定" title="确定删除?" onConfirm={() => this.deleteConfirm(record)}>
                        <a>删除</a>
                    </Popconfirm>
                </span>
            ),
        }];
        const CollectionCreateForm = Form.create()(
            class extends React.Component {
                render() {
                    const { visible, onCancel, onCreate, form } = this.props;
                    const { getFieldDecorator } = form;
                    return (
                       <Modal maskClosable={false}
                            visible={visible}
                            title="新增聊天窗"
                            cancelText="取消" okText="确定"
                            onCancel={onCancel}
                            onOk={onCreate}
                        >
                            <Form layout="vertical">
                                <FormItem label="机器人id">
                                    {getFieldDecorator('robotId', {
                                        rules: [{ required: true, message: '请输入新增机器人id!' }],
                                    })(
                                        <Input />
                                    )}
                                </FormItem>
                                <FormItem label="标准问题">
                                    {getFieldDecorator('standardQuesiton', {
                                        rules: [{ required: true, message: '请输入新增标准问题!' }],
                                    })(
                                        <Input />
                                    )}
                                </FormItem>
                                <FormItem label="标签">
                                    {getFieldDecorator('label', {
                                        rules: [{ required: true, message: '请输入新增标准问题!' }],
                                    })(<Input type="textarea" />)}
                                </FormItem>
                                <FormItem label="回答内容">
                                    {getFieldDecorator('answer', {
                                        rules: [{ required: true, message: '请输入新增回答内容!' }],
                                    })(<Input type="textarea" />)}
                                </FormItem>
                                <FormItem label="关联文章id">
                                    {getFieldDecorator('articleId', {
                                        rules: [{ required: true, message: '请输入新增关联文章id!' }],
                                    })(<Input type="textarea" />)}
                                </FormItem>
                                <FormItem label="状态">
                                    {getFieldDecorator('status', {
                                        rules: [{ required: true, message: '请输入新增状态!' }],
                                    })(<Input type="textarea" />)}
                                </FormItem>
                            </Form>
                        </Modal>
                    );
                }
            }
        );
        const CollectionModifyForm = Form.create()(
            class extends React.Component {
                render() {
                    const { visible, onCancel, onCreate, form } = this.props;
                    const { getFieldDecorator } = form;
                    return (
                       <Modal maskClosable={false}
                            visible={visible}
                            title="修改聊天窗"
                            cancelText="取消" okText="确定"
                            onCancel={onCancel}
                            onOk={onCreate}
                        >
                            <Form layout="vertical">
                                <FormItem label="机器人id">
                                    {getFieldDecorator('robotId', {
                                        initialValue:  thisTemp.state.recordAction.robotId ,
                                        rules: [{ required: true, message: '请输入修改机器人id!' }],
                                    })(
                                        <Input />
                                    )}
                                </FormItem>
                                <FormItem label="标准问题">
                                    {getFieldDecorator('standardQuesiton', {
                                        initialValue:  thisTemp.state.recordAction.standardQuesiton ,
                                        rules: [{ required: true, message: '请输入修改标准问题!' }],
                                    })(
                                        <Input />
                                    )}
                                </FormItem>
                                <FormItem label="标签">
                                    {getFieldDecorator('label',{
                                        initialValue:  thisTemp.state.recordAction.label ,
                                        rules: [{ required: true, message: '请输入修改标签!' }],
                                    })(<Input type="textarea" />)}
                                </FormItem>
                                <FormItem label="回答内容">
                                    {getFieldDecorator('answer',{
                                        initialValue:  thisTemp.state.recordAction.answer ,
                                        rules: [{ required: true, message: '请输入修改回答内容!' }],
                                    })(<Input type="textarea" />)}
                                </FormItem>
                                <FormItem label="关联文章id">
                                    {getFieldDecorator('articleId',{
                                        initialValue:  thisTemp.state.recordAction.articleId ,
                                        rules: [{ required: true, message: '请输入修改关联文章id!' }],
                                    })(<Input type="textarea" />)}
                                </FormItem>
                                <FormItem label="状态">
                                    {getFieldDecorator('status',{
                                        initialValue:  thisTemp.state.recordAction.status ,
                                        rules: [{ required: true, message: '请输入修改状态!' }],
                                    })(<Input type="textarea" />)}
                                </FormItem>
                            </Form>
                        </Modal>
                    );
                }
            }
        );
        const props = {
            name: 'file',
            showUploadList:false,
            // accept:'xls',
            action: '/cs/api/robot/import',
            data: {robotId:thisTemp.state.robotId},
            headers: {
              authorization: window.sessionStorage.getItem('token'),
              username: window.sessionStorage.getItem('username'),
            //   contentType:''
            },
            onChange(info) {
                if(info.file.response!==undefined){
                    if(info.file.response.code===400){
                        message.error(`${info.file.name} 导入失败，原因：`+info.file.response.msg);
                    }
                }
                
              if (info.file.status !== 'uploading') {
                console.log(info.file, info.fileList);
              }
              if (info.file.status === 'done') {
                // message.success(`${info.file.name} 导入成功`);
                // const obj = thisTemp.parseQueryString(thisTemp.props.location.search)
                // if(obj.page===''||obj.page===undefined){
                //     this.setState({ page:obj.page });
                // }
                thisTemp.getTableData('',1,20,thisTemp.state.robotId);
            } else if (info.file.status === 'error') {
                // message.error(`${info.file.name} 导入失败.`);
              }
            },
          };
          let optionsRobot = ''
        if(this.props.tablesML.responseOtherML.rows!==undefined&&this.props.tablesML.responseOtherML.rows!==''){
            optionsRobot = this.props.tablesML.responseOtherML.rows.map((item,i) => {
                return <Option value={item.robotId}>{item.robotName}</Option>
            })
        }
        function onShowSizeChange(current, pageSize) {
            // console.log(current, pageSize);
            thisTemp.setState({
                defaultPageSize:pageSize
            })
            thisTemp.getTableData('',current,pageSize,thisTemp.state.robotId)
          }
        const rowSelection = {
        onChange: (selectedRowKeys, selectedRows) => {
            let learnId = []
            let i=0
            for (i;i<selectedRows.length;i++)
            {
                learnId.push(selectedRows[i].learnId)
            }
            thisTemp.setState({
                selectedRows:selectedRows,
                learnIds:learnId
            })
            // console.log(`robotId: ${robotId}`);
        },
        // getCheckboxProps: record => ({
        //   disabled: record.name === 'Disabled User', // Column configuration not to be checked
        //   name: record.name,
        // }),
        };
        let treeList = ''
        if(thisTemp.props.tablesKnowladgeMng.tableDataKnowladgeMng!==undefined&&thisTemp.props.tablesKnowladgeMng.tableDataKnowladgeMng!==''){
            treeList = thisTemp.props.tablesKnowladgeMng.tableDataKnowladgeMng.map((item,i) => {
                return <TreeNode value={item.categoryId} title={item.categoryName} key={'layer1-'+i}>
                            {item.children.map((child,index)=>{
                                            return <TreeNode value={child.categoryId} title={child.categoryName}  key={'layer1-'+i+'-layer2-'+index}>
                                                    </TreeNode>
                                        })}
                            
                        </TreeNode>
            })
        }
        // console.log(treeList)
        return (
            <GridContainer>
                <GridItem xs={12}>
                    <Card>
                        <CardHeader color="rose" icon>
                            <Grid container spacing={24}>
                                <Grid item xs={2}>
                                    <CardIcon color="rose">
                                        <Assignment />
                                    </CardIcon>
                                    <h4 className={classes.cardIconTitle}> </h4>
                                </Grid>
                                <Grid style={{textAlign:'right',marginTop:10}} item xs={10}>
                                <Select style={{ width: 200,borderStyle:'solid',
                                            borderWidth:0,paddingRight:10 }}
                                            showSearch
                                            placeholder="请选择机器人"
                                            value={this.state.robotId}
                                            optionFilterProp="children"
                                            onChange={(value)=>this.handleChange(value)}
                                            onFocus={this.handleFocus}
                                            onBlur={this.handleBlur}
                                            filterOption={(input, option) => option.props.children.toLowerCase().indexOf(input.toLowerCase()) >= 0}
                                        >
                                            {optionsRobot}
                                        </Select>
                                    <Search
                                        placeholder="名称搜索"
                                        onSearch={value => this.getTableData(value,1,20,this.state.robotId)}
                                        style={{ width: 200,borderStyle:'solid',
                                            borderWidth:0,paddingRight:10 }}
                                    />
                                    {/* <Button onClick={this.showModalCreate} style={{ height: 30,marginRight:10 }} size={'small'}>增加</Button> */}
                                    <TreeSelect
                                        showSearch
                                        style={{ width: 200 }}
                                        value={this.state.value}
                                        dropdownStyle={{ maxHeight: 400, overflow: 'auto' }}
                                        placeholder="选择知识库"
                                        allowClear
                                        multiple
                                        treeDefaultExpandAll
                                        onChange={this.onChangeSelectTree}
                                    >
                                        {treeList}
                                    </TreeSelect>
                                    <Button onClick={this.handleImport} style={{ height: 30,marginRight:10,borderLeftWidth: 0,height: 31 }} size={'small'}>在线导入</Button>
                                    <Button onClick={this.handleML} style={{ height: 30,marginRight:10 }} size={'small'}>学习</Button>
                                    <Button onClick={this.handleTest} style={{ height: 30,marginRight:10 }} size={'small'}>测试</Button>
                                    {/* <Button onClick={this.handleImport} style={{ height: 30,marginRight:10 }} size={'small'}>导入</Button> */}
                                    <Upload style={{ height: 30,marginRight:10 }} {...props}><Button style={{ height: 30,marginRight:10 }} size={'small'}>本地导入</Button></Upload>
                                </Grid>
                            </Grid>
                        </CardHeader>
                        <CardBody>
                            <Table rowSelection={rowSelection} onRow={(record) => {
                                    return {
                                    onClick: () => {this.onRowSelect(record)},       
                                    // onMouseEnter: () => {},  
                                    };
                                }}  key={"tablesML"} pagination={false} columns={columns} dataSource={this.props.tablesML.tableDataML} scroll={{ y: 360}} />
                            {/* <Pagination showSizeChanger onShowSizeChange={onShowSizeChange} defaultCurrent={1} defaultPageSize={this.state.defaultPageSize} total={this.props.tablesML.tableCountML} style={{textAlign:'right',marginTop:25}}  onChange={(page, pageSize)=>this.getTableData('',page,10,this.state.robotId)}/> */}
                            <Pagination defaultCurrent={1} defaultPageSize={this.state.defaultPageSize} total={this.props.tablesML.tableCountML} style={{textAlign:'right',marginTop:25}}  onChange={(page, pageSize)=>this.getTableData('',page,20,this.state.robotId)}/>
                        </CardBody>
                    </Card>
                </GridItem>
                <CollectionCreateForm
                    wrappedComponentRef={this.saveFormRefCreate}
                    visible={this.state.visible}
                    onCancel={this.handleCancelCreate}
                    onCreate={this.handleCreate}
                />
                <CollectionModifyForm
                    wrappedComponentRef={this.saveFormRefModify}
                    visible={this.state.visibleModify}
                    onCancel={this.handleCancelModify}
                    onCreate={this.handleModify}
                />
                {/* <Modal
                    title="选择知识库"
                    visible={this.state.visible}
                    onOk={this.handleOk}
                    onCancel={this.handleCancel}
                    >
                    <p>Some contents...</p>
                    <p>Some contents...</p>
                    <p>Some contents...</p>
                    </Modal> */}
            </GridContainer>
        );
    }
}
const mapStateToProps = (state) => {
    return{
        tablesML: state.tablesML,
        tablesKnowladgeMng: state.tablesKnowladgeMng,
    }
}
const mapDispatchToProps = (dispatch) => {
    return{
        getDataKnowladgeMng: (params,obj) => {
            dispatch(getDataKnowladgeMng(params,obj))
        },
        getDataML: (params,obj) => {
            dispatch(getDataML(params,obj))
        },
        updateDataML: (params,obj) => {
            dispatch(updateDataML(params,obj))
        },
        deleteDataML: (params,obj) => {
            dispatch(deleteDataML(params,obj))
        },
        createDataML: (params,obj) => {
            dispatch(createDataML(params,obj))
        },
        importDataML: (params,obj) => {
            dispatch(importDataML(params,obj))
        },
        getOtherML: (params,obj) => {
            dispatch(getOtherML(params,obj))
        }
    }
}

export default connect(mapStateToProps,mapDispatchToProps)(withStyles(extendedTablesStyle)(tablesML));
