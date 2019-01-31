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
import {getOtherMyCompany,addKillGroup,getDataMyCompany,updateDataMyCompany,deleteDataMyCompany,createDataMyCompany } from "actions/tablesMyCompany";
import {updatePasswordDataAdmin } from "actions/tablesAdmin";
import {connect} from "react-redux";
import {Table, Divider, Button, LocaleProvider} from 'antd';
import {Input,Modal } from 'antd';
import {Form,Pagination,Popconfirm,Select } from 'antd';
import { message } from 'antd';
import zh_CN from "antd/lib/locale-provider/zh_CN";
message.config({
    duration: 1,
});

const FormItem = Form.Item;
const Search = Input.Search;
const Option = Select.Option;

class tablesMyCompany extends React.Component {
    constructor(props) {
        super(props);
        this.state = {
            checked: [],
            tableData: [],
            visible: false,
            visibleModify: false,
            visibleKillGroup: false,
            recordAction:{},
            recordSelect:{},
            defaultSelectValue:'',
            selectedRowKeys:[],
            selectedRows:'',
            current:1,
            pageSize:10
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
        this.props.getDataMyCompany(params);
    }
    getOtherData = (username,start,size) => {
        const params = {
            pageNo:'1',
            pageSize:'999',
        };
        this.props.getOtherMyCompany(params);
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
    showKillGroup = () => {
        if(this.state.selectedRows.length!==0){
            this.setState({ visibleKillGroup: true });
        }else{
            message.info('请先选择要分配的用户');
        }
        
        
    }
    handleCancelKillGroup = () => {
        this.setState({ visibleKillGroup: false });
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
            this.props.updateDataMyCompany(values,this);
            form.resetFields();
            this.setState({ visibleModify: false });
        });
    }
    handleKillGroup = () => {
        const form = this.formRefKillGroupData.props.form;
        form.validateFields((err, values) => {
            if (err) {
                return;
            }
            values.userIds = this.state.userIds
            this.props.addKillGroup(values);
            form.resetFields();
            this.setState({ visibleKillGroup: false });
        });
    }
    handleCreate = () => {
        const form = this.formRefDataCreate.props.form;
        form.validateFields((err, values) => {
            if (err) {
                return;
            }
            this.props.createDataMyCompany(values,this)
            form.resetFields();
            this.setState({ visible: false });
        });
    }
    saveFormRefModify = (formRef) => {
        this.formRefModifyData = formRef;
    }
    saveFormRefKillGroup = (formRef) => {
        this.formRefKillGroupData = formRef;
    }
    saveFormRefCreate = (formRef) => {
        this.formRefDataCreate = formRef;
    }
    deleteConfirm = (record) => {
        const params = {
            id:record.id,
        }
        this.props.deleteDataMyCompany(params,this)
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
            title: '账号',
            dataIndex: 'username',
            key: 'username',
            width: '22%',
            // fixed: 'left',
            render: text => <a >{text}</a>,
        }, {
            title: '用户名称',
            dataIndex: 'caption',
            key: 'caption',
            // align: 'center'
            width: '22%'
        }, {
            title: '企业名称',
            dataIndex: 'tenantName',
            key: 'tenantName',
            // align: 'center'
            width: '22%'
        }, {
            title: '操作',
            key: 'action',
            width: '22%',
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
        if(this.props.tablesMyCompany.responseOtherMyCompany.rows!==undefined){
             options = this.props.tablesMyCompany.responseOtherMyCompany.rows.map((item,i) => {
                return <Option value={item.cuSkGroupId}>{item.groupName}</Option>
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
                            title="新增用户"
                            cancelText="取消" okText="确定"
                            onCancel={onCancel}
                            onOk={onCreate}
                        >
                            <Form layout="vertical">
                                <FormItem label="账号">
                                    {getFieldDecorator('username', {
                                        rules: [{ required: true, message: '请输入新增账号!' }],
                                    })(
                                        <Input />
                                    )}
                                </FormItem>
                                <FormItem label="工号">
                                    {getFieldDecorator('jobNumber', {
                                        rules: [{ required: false, message: '请输入新增工号!' }],
                                    })(
                                        <Input />
                                    )}
                                </FormItem>
                                <FormItem label="用户名">
                                    {getFieldDecorator('caption', {
                                        rules: [{ required: true, message: '请输入新增用户名称!' }],
                                    })(
                                        <Input />
                                    )}
                                </FormItem>
                                {/* <FormItem label="用户密码">
                                    {getFieldDecorator('password', {
                                        rules: [{ required: true, message: '请输入新增企业用户名称!' }],
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
                                {/* <FormItem label="密码">
                                    {getFieldDecorator('password', {
                                        initialValue:  thisTemp.state.recordAction.password ,
                                        rules: [{ required: true, message: '请输入修改密码!' }],
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
        const rowSelection = {
            onChange: (selectedRowKeys, selectedRows) => {
                let userId = []
                let i=0
                for (i;i<selectedRows.length;i++)
                {
                    userId.push(selectedRows[i].id)
                }
                thisTemp.setState({
                    selectedRows:selectedRows,
                    userIds:userId
                })
                // console.log(`userId: ${userId}`);
            },
            // getCheckboxProps: record => ({
            //   disabled: record.name === 'Disabled User', // Column configuration not to be checked
            //   name: record.name,
            // }),
          };
          const CollectionKillGroupForm = Form.create()(
            class extends React.Component {
                handleChange = (value) => {
                    // console.log(`selected ${value}`);
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
                            title="添加至技能组"
                            cancelText="取消" okText="确定"
                            onCancel={onCancel}
                            onOk={onCreate}
                        >
                            <Form layout="vertical">
                                <FormItem label="技能组">
                                        {getFieldDecorator('cuSkGroupId', {
                                            initialValue:  thisTemp.state.recordAction.tenantName ,
                                            rules: [{ required: true, message: '请输入修改所属企业!' }],
                                        })(
                                            <Select
                                            showSearch
                                            placeholder="请选择技能组"
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
                                        placeholder="名称搜索"
                                        onSearch={value => this.getTableData(value,1,10)}
                                        style={{ width: 200,borderStyle:'solid',
                                            borderWidth:0,paddingRight:10 }}
                                    />
                                    <Button onClick={this.showModalCreate} style={{ height: 30,marginRight:10 }} size={'small'}>增加</Button>
                                    <Button onClick={this.showKillGroup} style={{ height: 30,marginRight:10 }} size={'small'}>分配</Button>
                                </Grid>
                            </Grid>
                        </CardHeader>
                        <CardBody>
                            <Table rowSelection={rowSelection} onRow={(record) => {
                                    return {
                                    onClick: () => {this.onRowSelect(record)},       
                                    // onMouseEnter: () => {},  
                                    };
                                }} key={"tablesMyCompany"} pagination={false} columns={columns} dataSource={this.props.tablesMyCompany.tableDataMyCompany} scroll={{x: 600, y: 360}} />
                            <LocaleProvider locale={zh_CN}>
                                <Pagination  current={this.state.current} showTotal={total => `总共 ${total} 条`} showSizeChanger showQuickJumper defaultPageSize={10} total={this.props.tablesMyCompany.tableCountMyCompany} style={{textAlign:'right',marginTop:25}}  onShowSizeChange={(current, pageSize)=>this.getTableData('',current, pageSize)} onChange={(page, pageSize)=>this.getTableData('',page,pageSize)}/>
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
                <CollectionKillGroupForm
                    wrappedComponentRef={this.saveFormRefKillGroup}
                    visible={this.state.visibleKillGroup}
                    onCancel={this.handleCancelKillGroup}
                    onCreate={this.handleKillGroup}
                />
            </GridContainer>
        );
    }
}
const mapStateToProps = (state) => {
    return{
        tablesMyCompany: state.tablesMyCompany,
        tablesAdmin: state.tablesAdmin,
    }
}
const mapDispatchToProps = (dispatch) => {
    return{
        getDataMyCompany: (params) => {
            dispatch(getDataMyCompany(params))
        },
        updateDataMyCompany: (params,obj) => {
            dispatch(updateDataMyCompany(params,obj))
        },
        deleteDataMyCompany: (params,obj) => {
            dispatch(deleteDataMyCompany(params,obj))
        },
        createDataMyCompany: (params,obj) => {
            dispatch(createDataMyCompany(params,obj))
        },
        getOtherMyCompany: (params) => {
            dispatch(getOtherMyCompany(params))
        },
        addKillGroup: (params) => {
            dispatch(addKillGroup(params))
        },
        updatePasswordDataAdmin: (params) => {
            dispatch(updatePasswordDataAdmin(params))
        }
    }
}

export default connect(mapStateToProps,mapDispatchToProps)(withStyles(extendedTablesStyle)(tablesMyCompany));
