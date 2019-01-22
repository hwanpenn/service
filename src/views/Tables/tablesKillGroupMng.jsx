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
import {getOtherKillGroupMng,getDataKillGroupMng,updateDataKillGroupMng,deleteDataKillGroupMng,createDataKillGroupMng,activeDataKillGroupMng } from "actions/tablesKillGroupMng";
import {connect} from "react-redux";
import {Table, Divider,Button } from 'antd';
import {Input,Modal } from 'antd';
import {Form,Pagination,Popconfirm } from 'antd';

const FormItem = Form.Item;
const Search = Input.Search;

class tablesKillGroupMng extends React.Component {
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
            page:1
        };
    }
    componentWillMount(){
        const obj = this.parseQueryString(this.props.location.search)
        // console.log(obj)
        if(obj.page===''||obj.page===undefined){
            this.setState({ page:obj.page });
        }
        this.getTableData('',this.state.page,10);
        // this.getOtherData('',1,10);
    }
    componentDidMount(){
    }
    // componentWillUpdate(){
    //     alert('刷新')
    // }
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
    getTableData = (groupName,start,size) => {
        this.setState({ page:start });
        const params = {
            groupName:groupName,
            pageNo:start,
            pageSize:size,
        };
        this.props.getDataKillGroupMng(params,this);
    }
    getOtherData = (username,start,size) => {
        const params = {
            search:username,
            isPaging:true,
            currentPage:start,
            pageSize:size,
        };
        this.props.getOtherKillGroupMng(params);
    }
    onRowSelect = (record) => {
        this.setState({ recordSelect:record });
    }
    showDetailModal = (record) => {
        this.props.history.push("/cms/home/tables/groupdetail?page="+this.state.page+"&cuSkGroupId="+record.cuSkGroupId);
        // this.setState({ showTable: true });
        // this.setState({ visibleModifyArticleMngDetail: true });
        this.setState({ visibleDetail: true,recordDetail:record });
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
            // console.log(values)
            values.cuSkGroupId=this.state.recordAction.cuSkGroupId
            this.props.updateDataKillGroupMng(values,this);
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
            this.props.createDataKillGroupMng(values,this)
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
            cuSkGroupId:record.cuSkGroupId,
        }
        this.props.deleteDataKillGroupMng(params,this)
    }
    activeConfirm = (record) => {
        const params = {
            status:record.status,
            cuSkGroupId:record.cuSkGroupId,
        }
        this.props.activeDataKillGroupMng(params)
    }
    render() {
        let thisTemp = this
        const { classes } = this.props;
        const columns = [{
            title: '组名称',
            dataIndex: 'groupName',
            key: 'groupName',
            fixed: 'left',
            width: window.screen.width*0.20,
            render: text => <a >{text}</a>,
        }, {
            title: '组展示名称',
            dataIndex: 'groupShowName',
            key: 'groupShowName',
            // align: 'center'
            width: window.screen.width*0.20,
        }, {
            title: '启用状态',
            dataIndex: 'status',
            key: 'status',
            // align: 'center'
            width: window.screen.width*0.15,
            render: text => <span >{text===1?'已启用':'未启用'}</span>,
        }, {
            title: '操作',
            key: 'action',
            width: window.screen.width*0.20,
            fixed: 'right',
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
                    <Divider type="vertical" />
                        <a onClick={() => this.showDetailModal(record)}>查看成员</a>
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
                            title="新增技能组"
                            cancelText="取消" okText="确定"
                            onCancel={onCancel}
                            onOk={onCreate}
                        >
                            <Form layout="vertical">
                                <FormItem label="组名称">
                                    {getFieldDecorator('groupName', {
                                        rules: [{ required: true, message: '请输入新增组名称!' }],
                                    })(
                                        <Input />
                                    )}
                                </FormItem>
                                <FormItem label="组展示名称">
                                    {getFieldDecorator('groupShowName', {
                                        rules: [{ required: true, message: '请输入新增组展示名称!' }],
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
                            title="修改聊天窗"
                            cancelText="取消" okText="确定"
                            onCancel={onCancel}
                            onOk={onCreate}
                        >
                            <Form layout="vertical">
                                <FormItem label="组名称">
                                    {getFieldDecorator('groupName', {
                                        initialValue:  thisTemp.state.recordAction.groupName ,
                                        rules: [{ required: true, message: '请输入修改组名称!' }],
                                    })(
                                        <Input />
                                    )}
                                </FormItem>
                                <FormItem label="组展示名称">
                                    {getFieldDecorator('groupShowName', {
                                        initialValue:  thisTemp.state.recordAction.groupShowName ,
                                        rules: [{ required: true, message: '请输入修改组展示名称!' }],
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
                                }} key={"tablesKillGroupMng"} pagination={false} columns={columns} dataSource={this.props.tablesKillGroupMng.tableDataKillGroupMng} scroll={{ x: 500 , y: 360}} />
                            <Pagination current={this.state.page} defaultPageSize={10} total={this.props.tablesKillGroupMng.tableCountKillGroupMng} style={{textAlign:'right',marginTop:25}}  onChange={(page, pageSize)=>this.getTableData('',page,10)}/>
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
        tablesKillGroupMng: state.tablesKillGroupMng,
    }
}
const mapDispatchToProps = (dispatch) => {
    return{
        getDataKillGroupMng: (params,obj) => {
            dispatch(getDataKillGroupMng(params,obj))
        },
        updateDataKillGroupMng: (params,obj) => {
            dispatch(updateDataKillGroupMng(params,obj))
        },
        deleteDataKillGroupMng: (params,obj) => {
            dispatch(deleteDataKillGroupMng(params,obj))
        },
        createDataKillGroupMng: (params,obj) => {
            dispatch(createDataKillGroupMng(params,obj))
        },
        getOtherKillGroupMng: (params) => {
            dispatch(getOtherKillGroupMng(params))
        },
        activeDataKillGroupMng: (params) => {
            dispatch(activeDataKillGroupMng(params))
        }
    }
}

export default connect(mapStateToProps,mapDispatchToProps)(withStyles(extendedTablesStyle)(tablesKillGroupMng));
