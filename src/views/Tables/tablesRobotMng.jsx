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
import {activeDataRobotMng,getOtherRobotMng,getDataRobotMng,updateDataRobotMng,deleteDataRobotMng,createDataRobotMng } from "actions/tablesRobotMng";
import {connect} from "react-redux";
import {Table, Divider, Button, LocaleProvider} from 'antd';
import {Input,Modal } from 'antd';
import {Form,Pagination,Popconfirm } from 'antd';
import zh_CN from "antd/lib/locale-provider/zh_CN";

const FormItem = Form.Item;
const Search = Input.Search;

class tablesRobotMng extends React.Component {
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
            current:1,
            pageSize:10
        };
    }
    componentWillMount(){
        this.getTableData('',1,10);
        // this.getOtherData('',1,10);
    }
    componentDidMount(){
    }
    getTableData = (robotName,start,size) => {
        this.setState({
            current:start,
            pageSize:size
        })
        const params = {
            robotName:robotName,
            pageNo:start,
            pageSize:size,
        };
        this.props.getDataRobotMng(params);
    }
    getOtherData = (username,start,size) => {
        const params = {
            search:username,
            isPaging:true,
            currentPage:start,
            pageSize:size,
        };
        this.props.getOtherRobotMng(params);
    }
    onRowSelect = (record) => {
        this.setState({ recordSelect:record });
    }
    showModifyModal = (record) => {
        this.setState({ visibleModify: true,recordAction:record });
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
            values.robotId=this.state.recordAction.robotId
            this.props.updateDataRobotMng(values);
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
            this.props.createDataRobotMng(values,this)
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
            robotId:record.robotId,
        }
        this.props.deleteDataRobotMng(params,this)
    }
    activeConfirm = (record) => {
        const params = {
            status:record.status,
            robotId:record.robotId,
        }
        this.props.activeDataRobotMng(params)
    }
    render() {
        let thisTemp = this
        const { classes } = this.props;
        const columns = [{
            title: '机器人名称',
            dataIndex: 'robotName',
            key: 'robotName',
            width: window.screen.width*0.15,
            render: text => <a >{text}</a>,
        }, {
            title: '机器人展示名称',
            dataIndex: 'robotShowName',
            key: 'robotShowName',
            width: window.screen.width*0.20
        },{
            title: '启用状态',
            dataIndex: 'status',
            key: 'status',
            // align: 'center'
            width: window.screen.width*0.20,
            render: text => <span >{text===1?'已启用':'未启用'}</span>,
        }, {
            title: '操作',
            key: 'action',
            width: window.screen.width*0.15,
            // fixed: 'right',
            render: (text, record) => (
                 <span>
                 <a onClick={() => this.showModifyModal(record)} >编辑</a>
                 <Divider type="vertical" />
                 <Popconfirm cancelText="取消" okText="确定" title="确定启用?" onConfirm={() => this.activeConfirm(record)}>
                     {record.status===1?<a>禁用</a>:<a>启用</a>}
                 </Popconfirm>
                 <Divider type="vertical" />
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
                            title="新增机器人"
                            cancelText="取消" okText="确定"
                            onCancel={onCancel}
                            onOk={onCreate}
                        >
                            <Form layout="vertical">
                                <FormItem label="机器人名称">
                                    {getFieldDecorator('robotName', {
                                        rules: [{ required: true, message: '请输入新增机器人名称!' }],
                                    })(
                                        <Input />
                                    )}
                                </FormItem>
                                <FormItem label="机器人展示名称">
                                    {getFieldDecorator('robotShowName', {
                                        rules: [{ required: true, message: '请输入新增机器人展示名称!' }],
                                    })(
                                        <Input />
                                    )}
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
                            title="修改机器人"
                            cancelText="取消" okText="确定"
                            onCancel={onCancel}
                            onOk={onCreate}
                        >
                            <Form layout="vertical">
                                <FormItem label="机器人名称">
                                    {getFieldDecorator('robotName', {
                                        initialValue:  thisTemp.state.recordAction.robotName ,
                                        rules: [{ required: true, message: '请输入修改机器人名称!' }],
                                    })(
                                        <Input />
                                    )}
                                </FormItem>
                                <FormItem label="机器人展示名称">
                                    {getFieldDecorator('robotShowName', {
                                        initialValue:  thisTemp.state.recordAction.robotShowName ,
                                        rules: [{ required: true, message: '请输入修改机器人展示名称!' }],
                                    })(
                                        <Input />
                                    )}
                                </FormItem>
                                {/* <FormItem label="知识库id">
                                    {getFieldDecorator('knowledgeBaseId', {
                                        rules: [{ required: true, message: '请输入修改知识库id!' }],
                                    })(
                                        <Input />
                                    )}
                                </FormItem>
                                <FormItem label="对话模型">
                                    {getFieldDecorator('dialogueType', {
                                        rules: [{ required: true, message: '请输入修改对话模型!' }],
                                    })(
                                        <Input />
                                    )}
                                </FormItem> */}
                            </Form>
                        </Modal>
                    );
                }
            }
        );
        return (
            <GridContainer>
                <GridItem xs={12}>
                    <Card>
                        <CardHeader color="rose" icon>
                            <Grid container spacing={24}>
                                <Grid item xs={6}>
                                    <CardIcon color="rose">
                                        <Assignment />
                                    </CardIcon>
                                    <h4 className={classes.cardIconTitle}> </h4>
                                </Grid>
                                <Grid style={{textAlign:'right',marginTop:10}} item xs={6}>
                                    <Search
                                        placeholder="名称搜索"
                                        onSearch={value => this.getTableData(value,1,10)}
                                        style={{ width: 200,borderStyle:'solid',
                                            borderWidth:0,paddingRight:10 }}
                                    />
                                    <Button onClick={this.showModalCreate} style={{ height: 30,marginRight:10 }} size={'small'}>增加</Button>
                                </Grid>
                            </Grid>
                        </CardHeader>
                        <CardBody>
                            <Table onRow={(record) => {
                                    return {
                                    onClick: () => {this.onRowSelect(record)},       
                                    // onMouseEnter: () => {},  
                                    };
                                }} key={"tablesRobotMng"} pagination={false} columns={columns} dataSource={this.props.tablesRobotMng.tableDataRobotMng} scroll={{  y: 360}} />
                            <LocaleProvider locale={zh_CN}>
                                <Pagination  current={this.state.current} showTotal={total => `总共 ${total} 条`} showSizeChanger showQuickJumper defaultPageSize={10} total={this.props.tablesRobotMng.tableCountRobotMng} style={{textAlign:'right',marginTop:25}}  onShowSizeChange={(current, pageSize)=>this.getTableData('',current, pageSize)} onChange={(page, pageSize)=>this.getTableData('',page,pageSize)}/>
                            </LocaleProvider>
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
            </GridContainer>
        );
    }
}
const mapStateToProps = (state) => {
    return{
        tablesRobotMng: state.tablesRobotMng,
    }
}
const mapDispatchToProps = (dispatch) => {
    return{
        getDataRobotMng: (params) => {
            dispatch(getDataRobotMng(params))
        },
        updateDataRobotMng: (params) => {
            dispatch(updateDataRobotMng(params))
        },
        deleteDataRobotMng: (params,obj) => {
            dispatch(deleteDataRobotMng(params,obj))
        },
        createDataRobotMng: (params,obj) => {
            dispatch(createDataRobotMng(params,obj))
        },
        getOtherRobotMng: (params) => {
            dispatch(getOtherRobotMng(params))
        },
        activeDataRobotMng: (params) => {
            dispatch(activeDataRobotMng(params))
        }
    }
}

export default connect(mapStateToProps,mapDispatchToProps)(withStyles(extendedTablesStyle)(tablesRobotMng));
