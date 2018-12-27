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
import {getOtherComplaintMng,getDataComplaintMng,updateDataComplaintMng,deleteDataComplaintMng,createDataComplaintMng } from "actions/tablesComplaintMng";
import {connect} from "react-redux";
import {Table, Divider,Button } from 'antd';
import {Input,Modal } from 'antd';
import {Form,Pagination,Popconfirm,Select,TreeSelect,Popover } from 'antd';

const FormItem = Form.Item;
const Search = Input.Search;
const { TextArea } = Input;
const Option = Select.Option;
const TreeNode = TreeSelect.TreeNode
class tablesComplaintMng extends React.Component {
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
        };
    }
    componentWillMount(){
        this.getTableData('',1,10);
        this.getOtherData('',1,999);
    }
    componentDidMount(){
    }
    getTableData = (content,start,size) => {
        const params = {
            content:content,
            pageNo:start,
            pageSize:size,
        };
        this.props.getDataComplaintMng(params);
    }
    getOtherData = (username,start,size) => {
        const params = {
            search:username,
            isPaging:true,
            currentPage:start,
            pageSize:size,
        };
        this.props.getOtherComplaintMng(params);
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
            values.answerUserId=window.sessionStorage.getItem('userId')
            values.answerUserName=window.sessionStorage.getItem('caption')
            values.id=this.state.recordAction.id
            this.props.updateDataComplaintMng(values);
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
            this.props.createDataComplaintMng(values)
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
            windowId:record.windowId,
        }
        this.props.deleteDataComplaintMng(params)
    }
    render() {
        let thisTemp = this
        const { classes } = this.props;
        const columns = [{
            title: '名称',
            dataIndex: 'content',
            key: 'content',
            // fixed: 'left',
            width: '100',
            render: text => <Popover content={(
                <div style={{width:170}}>
                  <p>{text}</p>
                </div>
              )}>
             <span style={{overflow: 'hidden',
                    textOverflow: 'ellipsis',
                    whiteSpace: 'nowrap',
                    display: 'inline-block',
                    width: 80
                }}>{text}</span>
          </Popover>,
        }, {
            title: '回答',
            dataIndex: 'answer',
            key: 'answer',
            // width: '15%',
            width: '100',
            render: text => <a >{text===''?'未回复':<Popover content={(
                <div style={{width:170}}>
                  <p>{text}</p>
                </div>
              )}>
             <span style={{overflow: 'hidden',
                    textOverflow: 'ellipsis',
                    whiteSpace: 'nowrap',
                    display: 'inline-block',
                    width: 80
                }}>{text}</span>
          </Popover>}</a>,
            // render: text => 
        }, {
            title: '时间',
            dataIndex: 'createDate',
            key: 'createDate',
            width: '15%',
        }, {
            title: '创建人',
            key: 'createUser',
            dataIndex: 'createUser',
            width: '10%',
        }, {
            title: '回复人',
            key: 'answerUserName',
            dataIndex: 'answerUserName',
            width: '10%',
        },  {
            title: '回复日期',
            key: 'answerDate',
            dataIndex: 'answerDate',
            width: '15%',
        }, {
            title: '分类',
            key: 'category',
            dataIndex: 'category',
            width: '15%',
        },  {
            title: '操作',
            key: 'action',
            width: 150,
            fixed: 'right',
            render: (text, record) => (
                <span>
                    <a onClick={() => this.showModifyModal(record)} >{record.answerStatus==='未回复'?'回复':'编辑'}</a>
                </span>
            ),
        }];
        let treeNodes = ''
        if(this.props.tablesComplaintMng.responseOtherComplaintMng.rows!==undefined){
            treeNodes = this.props.tablesComplaintMng.responseOtherComplaintMng.rows.map((item,i) => {
                return <TreeNode value={item.categoryId} title={item.categoryName} key={"1"+i} >
                            {(item.children==='')?'':
                                item.children.map((item1,i1) => {
                                    return <TreeNode value={item1.categoryId} title={item1.categoryName} key={"1"+i+"2"+i1} ></TreeNode>  
                            })}
                        </TreeNode>
            })
        }
        // console.log((treeNodes))
        const CollectionCreateForm = Form.create()(
            class extends React.Component {
                state = {
                    value: undefined,
                  }
                
                  onChange = (value) => {
                    console.log(value);
                    this.setState({ value });
                  }
                render() {
                    const { visible, onCancel, onCreate, form } = this.props;
                    const { getFieldDecorator } = form;
                    return (
                       <Modal maskClosable={false}
                            visible={visible}
                            title="新增投诉建议"
                            cancelText="取消" okText="确定"
                            onCancel={onCancel}
                            onOk={onCreate}
                        >
                            <Form layout="vertical">
                                <FormItem label="名称">
                                    {getFieldDecorator('content', {
                                        rules: [{ required: true, message: '请输入新增名称!' }],
                                    })(
                                        <Input />
                                    )}
                                </FormItem>
                                <FormItem label="投书还是建议">
                                    {getFieldDecorator('type', {
                                        rules: [{ required: true, message: '请输入类别!' }],
                                    })(
                                        <Input />
                                    )}
                                </FormItem>
                                <FormItem label="渠道号">
                                    {getFieldDecorator('channel', {
                                        rules: [{ required: true, message: '请输入类别!' }],
                                    })(
                                        <Input />
                                    )}
                                </FormItem>
                                <FormItem label="投诉人">
                                    {getFieldDecorator('createUser', {
                                        rules: [{ required: true, message: '请输入类别!' }],
                                    })(
                                        <Input />
                                    )}
                                </FormItem>
                                {/* <FormItem label="回答">
                                    {getFieldDecorator('answer', {
                                        rules: [{ required: true, message: '请输入新增回答!' }],
                                    })(
                                        <TextArea rows={4} />
                                    )}
                                </FormItem> */}
                                <FormItem label="分类">
                                    {getFieldDecorator('category', {
                                        rules: [{ required: true, message: '请输入新增回答!' }],
                                    })(
                                        <TreeSelect
                                            // showSearch
                                            style={{ width: '100%' }}
                                            value={this.state.value}
                                            dropdownStyle={{ maxHeight: 400, overflow: 'auto' }}
                                            placeholder="请选择"
                                            allowClear
                                            treeDefaultExpandAll
                                            onChange={this.onChange}
                                        >
                                             {treeNodes}
                                        </TreeSelect>
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
                state = {
                    value: undefined,
                  }
                
                  onChange = (value) => {
                    console.log(value);
                    this.setState({ value });
                  }
                render() {
                    const { visible, onCancel, onCreate, form } = this.props;
                    const { getFieldDecorator } = form;
                    return (
                       <Modal maskClosable={false}
                            visible={visible}
                            title="修改投诉建议"
                            cancelText="取消" okText="确定"
                            onCancel={onCancel}
                            onOk={onCreate}
                        >
                            <Form layout="vertical">
                                <FormItem label="名称">
                                    {getFieldDecorator('content', {
                                        initialValue:  thisTemp.state.recordAction.content ,
                                        rules: [{ required: true, message: '请输入新增名称!' }],
                                    })(
                                        <Input disabled />
                                    )}
                                </FormItem>
                                <FormItem label="回答">
                                    {getFieldDecorator('answer', {
                                        initialValue:  thisTemp.state.recordAction.answer ,
                                        rules: [{ required: true, message: '请输入回答!' }],
                                    })(
                                        <TextArea rows={4} />
                                    )}
                                </FormItem>
                                {/* <FormItem label="分类">
                                    {getFieldDecorator('category', {
                                        initialValue:  thisTemp.state.recordAction.category ,
                                        rules: [{ required: true, message: '请输入回答!' }],
                                    })(
                                        <TreeSelect
                                            // showSearch
                                            style={{ width: '100%' }}
                                            value={this.state.value}
                                            dropdownStyle={{ maxHeight: 400, overflow: 'auto' }}
                                            placeholder="请选择"
                                            allowClear
                                            treeDefaultExpandAll
                                            onChange={this.onChange}
                                        >
                                             {treeNodes}
                                        </TreeSelect>
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
                                }} key={"tablesComplaintMng"} pagination={false} columns={columns} dataSource={this.props.tablesComplaintMng.tableDataComplaintMng} scroll={{ x: 1400 , y: 360}} />
                            <Pagination defaultCurrent={1} defaultPageSize={10} total={this.props.tablesComplaintMng.tableCountComplaintMng} style={{textAlign:'right',marginTop:25}}  onChange={(page, pageSize)=>this.getTableData('',page,10)}/>
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
        tablesComplaintMng: state.tablesComplaintMng,
    }
}
const mapDispatchToProps = (dispatch) => {
    return{
        getDataComplaintMng: (params) => {
            dispatch(getDataComplaintMng(params))
        },
        updateDataComplaintMng: (params) => {
            dispatch(updateDataComplaintMng(params))
        },
        deleteDataComplaintMng: (params) => {
            dispatch(deleteDataComplaintMng(params))
        },
        createDataComplaintMng: (params) => {
            dispatch(createDataComplaintMng(params))
        },
        getOtherComplaintMng: (params) => {
            dispatch(getOtherComplaintMng(params))
        }
    }
}

export default connect(mapStateToProps,mapDispatchToProps)(withStyles(extendedTablesStyle)(tablesComplaintMng));
