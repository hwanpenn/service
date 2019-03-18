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
import {getOtherKillGroupHidden,getDataKillGroupHidden,updateDataKillGroupHidden,deleteDataKillGroupHidden,createDataKillGroupHidden } from "actions/tablesKillGroupHidden";
import {connect} from "react-redux";
import {Table, Divider, Button, LocaleProvider} from 'antd';
import {Input,Modal } from 'antd';
import {Form,Pagination,Popconfirm } from 'antd';
import zh_CN from "antd/lib/locale-provider/zh_CN";

const FormItem = Form.Item;
const Search = Input.Search;

class tablesKillGroupHidden extends React.Component {
    constructor(props) {
        super(props);
        this.state = {
            checked: [],
            tableData: [],
            visible: false,
            visibleModify: false,
            visibleDetail: false,
            recordAction:{},
            recordDetail:{},
            recordSelect:{},
            defaultSelectValue:'',
            cuSkGroupId:'',
            current:1,
            pageSize:10
        };
    }
    parseQueryString = (url)=> {
        var obj = {};
        var keyvalue = [];
        var key = "",
            value = "";
        var paraString = url.substring(url.indexOf("?") + 1, url.length).split("&");
        for (var i in paraString) {
            keyvalue = paraString[i].split("=");
            key = keyvalue[0];
            value = keyvalue[1];
            obj[key] = value;
        }
        return obj;
    }
    componentWillMount(){
        // console.log(this.props.location)
        const obj = this.parseQueryString(this.props.location.search)
        // console.log(obj)
        if(obj.page!==''&&obj.page!==undefined){
            this.setState({ 
                page:obj.page,
                cuSkGroupId:obj.cuSkGroupId
             });
        }
        // this.setState({ page:obj.page });
        // console.log('componentWillMount')
        this.getTableData('',1,10,obj.cuSkGroupId);
        // console.log(obj.cuSkGroupId,"组名")
        // this.getOtherData('',1,10);
    }
    componentDidMount(){
    }
    // componentWillUpdate(){
    //     alert('刷新')
    // }
    getTableData = (articleTitle,start,size,cuSkGroupId) => {
        this.setState({
            current:start,
            pageSize:size
        })
        const params = {
            // articleTitle:articleTitle,
            pageNo:start,
            pageSize:size,
            cuSkGroupId:cuSkGroupId
        };
        console.log(cuSkGroupId,"组名")
        this.props.getDataKillGroupHidden(params);
    }
    getOtherData = (username,start,size) => {
        const params = {
            search:username,
            isPaging:true,
            currentPage:start,
            pageSize:size,
        };
        this.props.getOtherKillGroupHidden(params);
    }
    onRowSelect = (record) => {
        this.setState({ recordSelect:record });
    }
    showDetailModal = (record) => {
        this.setState({ visibleDetail: true,recordDetail:record });
    }
    showModifyModal = (record) => {
        this.setState({ visibleModify: true,recordAction:record });
    }
    showModalCreate = () => {
        this.setState({ visible: true });
    }
    goBack = () => {
        const page = this.state.page
        this.props.history.push("/cms/home/tables/killgroup?page="+page);
        // this.setState({ visible: true });
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
            // console.log(values)
            values.cuSkGroupId=this.state.recordAction.cuSkGroupId
            this.props.updateDataKillGroupHidden(values,this);
            // form.resetFields();
            // this.setState({ visibleModify: false });
        });
    }
    handleCreate = () => {
        const form = this.formRefDataCreate.props.form;
        form.validateFields((err, values) => {
            if (err) {
                return;
            }
            this.props.createDataKillGroupHidden(values)
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
            userId:record.user.id,
            cuSkGroupId:this.state.cuSkGroupId,
        }
        this.props.deleteDataKillGroupHidden(params,this)
    }
    activeConfirm = (record) => {
        const params = {
            status:record.status,
            cuSkGroupId:record.cuSkGroupId,
        }
        // this.props.activeDataKillGroupHidden(params)
    }
    render() {
        let thisTemp = this
        const { classes } = this.props;
        const columns = [{
            title: '账号',
            dataIndex: 'user',
            key: 'user',
            width: '40%',
            render: text => <a >{text.username}</a>,
        }, {
            title: '企业名称',
            dataIndex: 'user',
            key: 'user',
            // align: 'center'
            width: '40%',
            render: text => {return JSON.stringify(text.tenantName)==='null'?'空':text.tenantName},
        }, {
            title: '操作',
            key: 'action',
            width: 300,
            // fixed: 'right',
            render: (text, record) => (
                <span>
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
                            title="新增用户"
                            cancelText="取消" okText="确定"
                            onCancel={onCancel}
                            onOk={onCreate}
                        >
                            <Form layout="vertical">
                                <FormItem label="名称">
                                    {getFieldDecorator('username', {
                                        rules: [{ required: true, message: '请输入新增名称!' }],
                                    })(
                                        <Input />
                                    )}
                                </FormItem>
                                <FormItem label="用户名">
                                    {getFieldDecorator('caption', {
                                        rules: [{ required: true, message: '请输入新增内容!' }],
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
                            title="修改用户"
                            cancelText="取消" okText="确定"
                            onCancel={onCancel}
                            onOk={onCreate}
                        >
                            <Form layout="vertical">
                                <FormItem label="用户名称">
                                    {getFieldDecorator('caption', {
                                        initialValue:  thisTemp.state.recordAction.caption ,
                                        rules: [{ required: true, message: '请输入修改用户名称!' }],
                                    })(
                                        <Input />
                                    )}
                                </FormItem>
                                <FormItem label="内容">
                                    {getFieldDecorator('password', {
                                        initialValue:  thisTemp.state.recordAction.password ,
                                        rules: [{ required: true, message: '请输入修改密码!' }],
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
                                    {/* <Button onClick={this.showModalCreate} style={{ height: 30,marginRight:10 }} size={'small'}>增加</Button> */}
                                    <Button onClick={this.goBack} style={{ height: 30,marginRight:10 }} size={'small'}>返回</Button>
                                </Grid>
                            </Grid>
                        </CardHeader>
                        <CardBody>
                            <Table onRow={(record) => {
                                    return {
                                    onClick: () => {this.onRowSelect(record)},       
                                    // onMouseEnter: () => {},  
                                    };
                                }} key={"tablesKillGroupHidden"} pagination={false} columns={columns} dataSource={this.props.tablesKillGroupHidden.tableDataKillGroupHidden} scroll={{  y: 360}} />
                            {/*<Pagination current={this.state.current} defaultPageSize={10} total={this.props.tablesKillGroupHidden.tableCountKillGroupHidden} style={{textAlign:'right',marginTop:25}}  onChange={(page, pageSize)=>this.getTableData('',page,10,this.state.cuSkGroupId)}/>*/}
                            <LocaleProvider locale={zh_CN}>
                                <Pagination  current={this.state.current} showTotal={total => `总共 ${total} 条`} showSizeChanger showQuickJumper defaultPageSize={10} total={this.props.tablesKillGroupHidden.tableCountKillGroupHidden} style={{textAlign:'right',marginTop:25}}  onShowSizeChange={(current, pageSize)=>this.getTableData('',current, pageSize,this.state.cuSkGroupId)} onChange={(page, pageSize)=>this.getTableData('',page,pageSize,this.state.cuSkGroupId)}/>
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
                {/* <CollectionModifyForm
                    wrappedComponentRef={this.saveFormRefModify}
                    visible={this.state.visibleModify}
                    onCancel={this.handleCancelModify}
                    onCreate={this.handleModify}
                /> */}
            </GridContainer>
        );
    }
}
const mapStateToProps = (state) => {
    return{
        tablesKillGroupHidden: state.tablesKillGroupHidden,
    }
}
const mapDispatchToProps = (dispatch) => {
    return{
        getDataKillGroupHidden: (params) => {
            dispatch(getDataKillGroupHidden(params))
        },
        updateDataKillGroupHidden: (params,obj) => {
            dispatch(updateDataKillGroupHidden(params,obj))
        },
        deleteDataKillGroupHidden: (params,obj) => {
            dispatch(deleteDataKillGroupHidden(params,obj))
        },
        createDataKillGroupHidden: (params) => {
            dispatch(createDataKillGroupHidden(params))
        },
        getOtherKillGroupHidden: (params) => {
            dispatch(getOtherKillGroupHidden(params))
        },
        // activeDataKillGroupHidden: (params) => {
        //     dispatch(activeDataKillGroupHidden(params))
        // }
    }
}

export default connect(mapStateToProps,mapDispatchToProps)(withStyles(extendedTablesStyle)(tablesKillGroupHidden));
