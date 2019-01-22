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
import {getOtherSecretKey,getDataSecretKey,updateDataSecretKey,deleteDataSecretKey,createDataSecretKey,activeDataSecretKey } from "actions/tablesSecretKey";
import {connect} from "react-redux";
import {Table, Divider,Button } from 'antd';
import {Input,Modal } from 'antd';
import {Form,Pagination,Popconfirm,Popover } from 'antd';

const FormItem = Form.Item;
const Search = Input.Search;

class tablesSecretKey extends React.Component {
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
            page:1,
            current:1
        };
    }
    componentWillMount(){
        this.getTableData('',1,10);
        // this.getOtherData('',1,10);
    }
    componentDidMount(){
    }
    // componentWillUpdate(){
    //     alert('刷新')
    // }
    // chineseNameGetTableData = (chineseName,start,size) => {
    //     this.setState({ page:start });
    //     const params = {
    //         systemName:chineseName,
    //         pageNo:start,
    //         pageSize:size,
    //     };
    //     this.props.getDataSecretKey(params);
    // }
    getTableData = (systemName,start,size) => {
        this.setState({
            current:start
        })
        const params = {
            systemName:systemName,
            pageNo:start,
            pageSize:size,
        };
        this.props.getDataSecretKey(params);
    }
    getOtherData = (thisObj) => {
        this.props.getOtherSecretKey(thisObj);
    }
    onRowSelect = (record) => {
        this.setState({ recordSelect:record });
    }
    showDetailModal = (record) => {
        this.props.history.push("/cms/home/tables/groupdetail?page="+this.state.page+"&id="+record.id);
        // this.setState({ showTable: true });
        // this.setState({ visibleModifyArticleMngDetail: true });
        this.setState({ visibleDetail: true,recordDetail:record });
    }
    showModifyModal = (record) => {
        this.setState({ visibleModify: true,recordAction:record });
    }
    showModalCreate = () => {
        this.getOtherData(this);
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
            values.id=this.state.recordAction.id
            this.props.updateDataSecretKey(values);
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
            this.props.createDataSecretKey(values,this)
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
        this.props.deleteDataSecretKey(params,this)
    }
    activeConfirm = (record) => {
        const params = {
            status:record.status,
            id:record.id,
        }
        this.props.activeDataSecretKey(params)
    }
    render() {
        let thisTemp = this
        const { classes } = this.props;
        const columns = [{
            title: '中文别名',
            dataIndex: 'chineseName',
            key: 'chineseName',
            // fixed: 'left',
            width: 100,
            render: text =>
                <Popover content={(
                    <div style={{width:170,wordWrap:'break-word'}}>
                        <p style={{wordWrap:'break-word'}}>{text===undefined||text===null?'空':text}</p>
                    </div>
                )}>
             <span style={{overflow: 'hidden',
                 textOverflow: 'ellipsis',
                 whiteSpace: 'nowrap',
                 display: 'inline-block',
                 width: 140
             }}>{text===undefined||text===null?'空':text}</span>
                </Popover>,
        },{
            title: '企业id',
            dataIndex: 'systemName',
            key: 'systemName',
            // fixed: 'left',
            width: 100,
            render: text =><Popover content={(
                <div style={{width:170,wordWrap:'break-word'}}>
                    <p style={{wordWrap:'break-word'}}>{text}</p>
                </div>
            )}>
             <span style={{overflow: 'hidden',
                 textOverflow: 'ellipsis',
                 whiteSpace: 'nowrap',
                 display: 'inline-block',
                 width: 140
             }}>{text}</span>
            </Popover>,
        }, {
            title: '公钥',
            dataIndex: 'publicKey',
            key: 'publicKey',
            // align: 'center'
            width: 170,
            render: text => <Popover content={(
                <div style={{width:170,wordWrap:'break-word'}}>
                  <p style={{wordWrap:'break-word'}}>{text}</p>
                </div>
              )}>
             <span style={{overflow: 'hidden',
                    textOverflow: 'ellipsis',
                    whiteSpace: 'nowrap',
                    display: 'inline-block',
                    width: 140
                }}>{text}</span>
          </Popover>,
        },{
            title: '私钥',
            dataIndex: 'privateKey',
            key: 'privateKey',
            // align: 'center'
            width: 170,
            render: text => <Popover content={(
                <div style={{width:170,wordWrap:'break-word'}}>
                  <p >{text}</p>
                </div>
              )}>
             <span style={{overflow: 'hidden',
                    textOverflow: 'ellipsis',
                    whiteSpace: 'nowrap',
                    display: 'inline-block',
                    width: 140
                }}>{text}</span>
          </Popover>,
        },  {
            title: '启用状态',
            dataIndex: 'status',
            key: 'status',
            // align: 'center'
            width: 100,
            render: text => <span >{text===1?'已启用':'未启用'}</span>,
        }, {
            title: '操作',
            // fixed:'right',
            key: 'action',
            width: 100,
            // fixed: 'right',
            render: (text, record) => (
                <span>
                    <a onClick={() => this.showModifyModal(record)} >编辑</a>
                    <Divider type="vertical" />
                    <Popconfirm cancelText="取消" okText="确定" title="确定操作?" onConfirm={() => this.activeConfirm(record)}>
                        {record.status===1?<a>禁用</a>:<a>启用</a>}
                    </Popconfirm>
                    {/*<Divider type="vertical" />*/}
                    {/*<Popconfirm cancelText="取消" okText="确定" title="确定删除?" onConfirm={() => this.deleteConfirm(record)}>*/}
                        {/*<a>删除</a>*/}
                    {/*</Popconfirm>*/}

                    {/* <Divider type="vertical" />
                        <a onClick={() => this.showDetailModal(record)}>查看详情</a> */}
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
                            title="新增密钥"
                            cancelText="取消" okText="确定"
                            onCancel={onCancel}
                            onOk={onCreate}
                        >
                            <Form layout="vertical">
                                <FormItem label="中文别名">
                                    {getFieldDecorator('chineseName', {
                                        rules: [{ required: true, message: '请输入新增中文别名!' }],
                                    })(
                                        <Input  />
                                    )}
                                </FormItem>
                                <FormItem label="企业id">
                                    {getFieldDecorator('systemName', {
                                        rules: [{ required: true, message: '请输入新增企业id!' }],
                                    })(
                                        <Input  />
                                    )}
                                </FormItem>
                                <FormItem label="私钥">
                                    {getFieldDecorator('privateKey', {
                                        initialValue:  thisTemp.state.privateKey ,
                                        rules: [{ required: true, message: '请输入新增私钥!' }],
                                    })(
                                        <Input disabled />
                                    )}
                                </FormItem>
                                <FormItem label="公钥">
                                    {getFieldDecorator('publicKey', {
                                        initialValue:  thisTemp.state.publicKey ,
                                        rules: [{ required: true, message: '请输入新增私钥!' }],
                                    })(
                                        <Input disabled />
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
                            title="修改密钥"
                            cancelText="取消" okText="确定"
                            onCancel={onCancel}
                            onOk={onCreate}
                        >
                            <Form layout="vertical">
                                <FormItem label="中文别名">
                                    {getFieldDecorator('chineseName', {
                                        initialValue:  thisTemp.state.recordAction.chineseName ,
                                        rules: [{ required: true, message: '请输入修改中文别名!' }],
                                    })(
                                        <Input />
                                    )}
                                </FormItem>
                                <FormItem label="企业id">
                                    {getFieldDecorator('systemName', {
                                        initialValue:  thisTemp.state.recordAction.systemName ,
                                        rules: [{ required: true, message: '请输入修改企业id!' }],
                                    })(
                                        <Input />
                                    )}
                                </FormItem>
                                <FormItem label="私钥">
                                    {getFieldDecorator('privateKey', {
                                        initialValue:  thisTemp.state.recordAction.privateKey ,
                                        rules: [{ required: true, message: '请输入修改组展示名称!' }],
                                    })(
                                        <Input disabled />
                                    )}
                                </FormItem>
                                <FormItem label="公钥">
                                    {getFieldDecorator('publicKey', {
                                        initialValue:  thisTemp.state.recordAction.publicKey ,
                                        rules: [{ required: true, message: '请输入修改组展示名称!' }],
                                    })(
                                        <Input disabled />
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
                                        placeholder="企业id搜索"
                                        onSearch={value => this.getTableData(value,1,10)}
                                        style={{ width: 200,borderStyle:'solid',
                                            borderWidth:0,paddingRight:10 }}
                                    />
                                    {/*<Search*/}
                                        {/*placeholder="中文别名搜索"*/}
                                        {/*onSearch={value => this.chineseNameGetTableData(value,1,10)}*/}
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
                                }} key={"tablesSecretKey"} pagination={false} columns={columns} dataSource={this.props.tablesSecretKey.tableDataSecretKey} scroll={{ x: 500 , y: 360}} />
                            <Pagination current={this.state.current} defaultPageSize={10} total={this.props.tablesSecretKey.tableCountSecretKey} style={{textAlign:'right',marginTop:25}}  onChange={(page, pageSize)=>this.getTableData('',page,10)}/>
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
        tablesSecretKey: state.tablesSecretKey,
    }
}
const mapDispatchToProps = (dispatch) => {
    return{
        getDataSecretKey: (params) => {
            dispatch(getDataSecretKey(params))
        },
        updateDataSecretKey: (params) => {
            dispatch(updateDataSecretKey(params))
        },
        deleteDataSecretKey: (params,obj) => {
            dispatch(deleteDataSecretKey(params,obj))
        },
        createDataSecretKey: (params,obj) => {
            dispatch(createDataSecretKey(params,obj))
        },
        getOtherSecretKey: (thisObj) => {
            dispatch(getOtherSecretKey(thisObj))
        },
        activeDataSecretKey: (params) => {
            dispatch(activeDataSecretKey(params))
        }
    }
}

export default connect(mapStateToProps,mapDispatchToProps)(withStyles(extendedTablesStyle)(tablesSecretKey));
