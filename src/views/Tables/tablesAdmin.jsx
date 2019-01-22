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
import {updatePasswordDataAdmin,getOtherAdmin,getDataAdmin,updateDataAdmin,deleteDataAdmin,createDataAdmin } from "actions/tablesAdmin";
import {connect} from "react-redux";
import {Table, Divider,Button } from 'antd';
import {Input,Modal } from 'antd';
import {Form,Pagination,Popconfirm,Select } from 'antd';

const FormItem = Form.Item;
const Search = Input.Search;
const Option = Select.Option;


class tablesAdmin extends React.Component {
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
            current:1
        };
    }
    componentWillMount(){
        this.getTableData('',1,10);
        this.getOtherData('',1,10);
    }
    componentDidMount(){
    }
    getTableData = (caption,start,size) => {
        this.setState({
            current:start
        })
        const params = {
            caption:caption,
            pageNo:start,
            pageSize:size,
        };
        this.props.getDataAdmin(params);
    }
    // UsernamegetTableData = (username,start,size) => {
    //     const params = {
    //         username:username,
    //         pageNo:start,
    //         pageSize:size,
    //     };
    //     this.props.getDataAdmin(params);
    // }
    getOtherData = (username,start,size) => {
        const params = {
            pageNo:'1',
            pageSize:'999',
        };
        this.props.getOtherAdmin(params);
    }
    onRowSelect = (record) => {
        this.setState({ recordSelect:record });
    }
    showModifyModal = (record) => {
        if(this.props.tablesAdmin.responseOtherAdmin.rows!==undefined){
            this.props.tablesAdmin.responseOtherAdmin.rows.map((item,i) => {
                if(item.tenantName===record.tenantName){
                    record.tenantId = item.id
                }
            })
        }
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
            values.id=this.state.recordAction.id
            this.props.updateDataAdmin(values);
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
            this.props.createDataAdmin(values,this)
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
            id:record.id,
        }
        this.props.deleteDataAdmin(params,this)
    }
    resetConfirm = (record) => {
        const params = {
            id:record.id,
        }
        this.props.updatePasswordDataAdmin(params)
    }
    render() {
        let thisTemp = this
        const { classes } = this.props;
        const columns = [{
            title: '用户名',
            dataIndex: 'username',
            key: 'username',
            width: '15%',
            // fixed: 'left',
            render: text => <a >{text}</a>,
        }, {
            title: '用户别名',
            dataIndex: 'caption',
            key: 'caption',
            // align: 'center'
            width: '15%'
        }, {
            title: '所属企业',
            dataIndex: 'tenantName',
            key: 'tenantName',
            // align: 'center'
            width: '15%'
        },  {
            title: '操作',
            key: 'action',
            width: '15%',
            // fixed: 'right',
            render: (text, record) => (
                <span>
                    <a onClick={() => this.showModifyModal(record)} >修改</a>
                    <Divider type="vertical" />
                    <Popconfirm cancelText="取消" okText="确定" title="确定重置?" onConfirm={() => this.resetConfirm(record)}>
                        <a>重置密码</a>
                    </Popconfirm>
                    <Divider type="vertical" />
                    <Popconfirm cancelText="取消" okText="确定" title="确定删除?" onConfirm={() => this.deleteConfirm(record)}>
                        <a>删除</a>
                    </Popconfirm>
                </span>
            ),
        }];
        let options = ''
        if(this.props.tablesAdmin.responseOtherAdmin.rows!==undefined){
             options = this.props.tablesAdmin.responseOtherAdmin.rows.map((item,i) => {
                return <Option value={item.id}>{item.tenantName}</Option>
            })
        }
        
        const CollectionCreateForm = Form.create()(
            class extends React.Component {
                handleChange = (value) => {
                    console.log(`selected ${value}`);
                    this.props.form.setFieldsValue({
                        categoryId: value,
                    });
                }
                handleBlur = () => {
                console.log('blur');
                }
                handleFocus = () => {
                console.log('focus');
                }
                render() {
                    const { visible, onCancel, onCreate, form } = this.props;
                    const { getFieldDecorator } = form;
                    return (
                       <Modal maskClosable={false}
                            visible={visible}
                            title="新增管理员"
                            cancelText="取消" okText="确定"
                            onCancel={onCancel}
                            onOk={onCreate}
                        >
                            <Form layout="vertical">
                                <FormItem label="用户名">
                                    {getFieldDecorator('username', {
                                        rules: [{ required: true, message: '请输入新增用户名!' }],
                                    })(
                                        <Input placeholder="请使用数字和字符" />
                                    )}
                                </FormItem>
                                <FormItem label="用户别名">
                                    {getFieldDecorator('caption',{rules: [{ required: true, message: '请输入新增用户别名!' }]})(<Input type="textarea" />)}
                                </FormItem>
                                <FormItem label="所属企业">
                                    {getFieldDecorator('tenantId', {
                                        rules: [{ required: true, message: '请输入修改所属企业!' }],
                                    })(
                                        <Select
                                            showSearch
                                            placeholder="请选择所属企业"
                                            optionFilterProp="children"
                                            onChange={this.handleChange}
                                            onFocus={this.handleFocus}
                                            onBlur={this.handleBlur}
                                            filterOption={(input, option) => option.props.children.toLowerCase().indexOf(input.toLowerCase()) >= 0}
                                        >
                                            {options}
                                        </Select>
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
                handleChange = (value) => {
                    console.log(`selected ${value}`);
                    this.props.form.setFieldsValue({
                        categoryId: value,
                    });
                }
                handleBlur = () => {
                console.log('blur');
                }
                handleFocus = () => {
                console.log('focus');
                }
                render() {
                    const { visible, onCancel, onCreate, form } = this.props;
                    const { getFieldDecorator } = form;
                    return (
                       <Modal maskClosable={false}
                            visible={visible}
                            title="修改管理员"
                            cancelText="取消" okText="确定"
                            onCancel={onCancel}
                            onOk={onCreate}
                        >
                            <Form layout="vertical">
                                <FormItem label="用户名">
                                    {getFieldDecorator('username', {
                                        initialValue:  thisTemp.state.recordAction.username ,
                                        rules: [{ required: true, message: '请输入修改用户名!' }],
                                    })(
                                        <Input disabled />
                                    )}
                                </FormItem>
                                <FormItem label="用户别名">
                                    {getFieldDecorator('caption', {
                                        initialValue:  thisTemp.state.recordAction.caption ,
                                        rules: [{ required: true, message: '请输入修改用户别名!' }],
                                    })(<Input type="textarea" />)}
                                </FormItem>
                                <FormItem label="所属企业">
                                        {getFieldDecorator('tenantId', {
                                            initialValue:  thisTemp.state.recordAction.tenantId ,
                                            rules: [{ required: true, message: '请输入修改所属企业!' }],
                                        })(
                                            <Select
                                            showSearch
                                            placeholder="请选择所属企业"
                                            optionFilterProp="children"
                                            onChange={this.handleChange}
                                            onFocus={this.handleFocus}
                                            onBlur={this.handleBlur}
                                            filterOption={(input, option) => option.props.children.toLowerCase().indexOf(input.toLowerCase()) >= 0}
                                        >
                                            {options}
                                        </Select>
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
                                        placeholder="用户别名搜索"
                                        onSearch={value => this.getTableData(value,1,10)}
                                        style={{ width: 200,borderStyle:'solid',
                                            borderWidth:0,paddingRight:10 }}
                                    />
                                    {/*<Search*/}
                                        {/*placeholder="用户名搜索"*/}
                                        {/*onSearch={value => this.UsernamegetTableData(value,1,10)}*/}
                                        {/*style={{ width: 200,borderStyle:'solid',*/}
                                            {/*borderWidth:0,paddingRight:10 }}*/}
                                    {/*/>*/}
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
                                }} key={"tablesAdmin"} pagination={false} columns={columns} dataSource={this.props.tablesAdmin.tableDataAdmin} scroll={{x: 600, y: 360}} />
                            <Pagination current={this.state.current} defaultPageSize={10} total={this.props.tablesAdmin.tableCountAdmin} style={{textAlign:'right',marginTop:25}}  onChange={(page, pageSize)=>this.getTableData('',page,10)}/>
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
        tablesAdmin: state.tablesAdmin,
    }
}
const mapDispatchToProps = (dispatch) => {
    return{
        getDataAdmin: (params) => {
            dispatch(getDataAdmin(params))
        },
        updateDataAdmin: (params) => {
            dispatch(updateDataAdmin(params))
        },
        deleteDataAdmin: (params,obj) => {
            dispatch(deleteDataAdmin(params,obj))
        },
        createDataAdmin: (params,obj) => {
            dispatch(createDataAdmin(params,obj))
        },
        getOtherAdmin: (params) => {
            dispatch(getOtherAdmin(params))
        },
        updatePasswordDataAdmin: (params) => {
            dispatch(updatePasswordDataAdmin(params))
        }
    }
}

export default connect(mapStateToProps,mapDispatchToProps)(withStyles(extendedTablesStyle)(tablesAdmin));
