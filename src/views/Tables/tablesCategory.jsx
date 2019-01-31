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
import {getOtherCategory,getDataCategory,updateDataCategory,deleteDataCategory,createDataCategory } from "actions/tablesCategory";
import {connect} from "react-redux";
import {Table, Divider, Button, LocaleProvider} from 'antd';
import {Input,Modal } from 'antd';
import {Form,Pagination,Popconfirm } from 'antd';
import zh_CN from "antd/lib/locale-provider/zh_CN";

const FormItem = Form.Item;
const Search = Input.Search;

class tablesCategory extends React.Component {
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
    getTableData = (categoryName,start,size) => {
        this.setState({
            current:start,
            pageSize:size
        })
        const params = {
            categoryName:categoryName,
            pageNo:start,
            pageSize:size,
        };
        this.props.getDataCategory(params);
    }
    getOtherData = (username,start,size) => {
        const params = {
            search:username,
            isPaging:true,
            currentPage:start,
            pageSize:size,
        };
        this.props.getOtherCategory(params);
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
            values.id=this.state.recordAction.id
            this.props.updateDataCategory(values);
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
            this.props.createDataCategory(values,this)
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
        this.props.deleteDataCategory(params,this)
    }
    render() {
        let thisTemp = this
        const { classes } = this.props;
        const columns = [{
            title: '企业分类',
            dataIndex: 'id',
            key: 'id',
            width: 200,
            fixed: 'left',
            render: text => <a >{text}</a>,
        }, {
            title: '分类名称',
            dataIndex: 'categoryName',
            key: 'categoryName',
            align: 'center'
            // width: 200
        }, {
            title: '操作',
            key: 'action',
            width: 200,
            fixed: 'right',
            render: (text, record) => (
                <span>
                    <a onClick={() => this.showModifyModal(record)} >修改</a>
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
                            title="新增企业分类"
                            cancelText="取消" okText="确定"
                            onCancel={onCancel}
                            onOk={onCreate}
                        >
                            <Form layout="vertical">
                                <FormItem label="企业分类名称">
                                    {getFieldDecorator('categoryName', {
                                        rules: [{ required: true, message: '请输入新增企业分类名称!' }],
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
                            title="修改企业分类"
                            cancelText="取消" okText="确定"
                            onCancel={onCancel}
                            onOk={onCreate}
                        >
                            <Form layout="vertical">
                                <FormItem label="企业分类名称">
                                    {getFieldDecorator('categoryName', {
                                        initialValue:  thisTemp.state.recordAction.categoryName ,
                                        rules: [{ required: true, message: '请输入修改企业分类名称!' }],
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
                                }} key={"tablesCategory"} pagination={false} columns={columns} dataSource={this.props.tablesCategory.tableDataCategory} scroll={{x: 200, y: 360}} />
                            {/*<Pagination current={this.state.current} defaultPageSize={10} total={this.props.tablesCategory.tableCountCategory} style={{textAlign:'right',marginTop:25}}  onChange={(page, pageSize)=>this.getTableData('',page,10)}/>*/}
                            <LocaleProvider locale={zh_CN}>
                                <Pagination  current={this.state.current} showTotal={total => `总共 ${total} 条`} showSizeChanger showQuickJumper defaultPageSize={10} total={this.props.tablesCategory.tableCountCategory} style={{textAlign:'right',marginTop:25}}  onShowSizeChange={(current, pageSize)=>this.getTableData('',current, pageSize)} onChange={(page, pageSize)=>this.getTableData('',page,pageSize)}/>
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
        tablesCategory: state.tablesCategory,
    }
}
const mapDispatchToProps = (dispatch) => {
    return{
        getDataCategory: (params) => {
            dispatch(getDataCategory(params))
        },
        updateDataCategory: (params) => {
            dispatch(updateDataCategory(params))
        },
        deleteDataCategory: (params,obj) => {
            dispatch(deleteDataCategory(params,obj))
        },
        createDataCategory: (params,obj) => {
            dispatch(createDataCategory(params,obj))
        },
        getOtherCategory: (params) => {
            dispatch(getOtherCategory(params))
        }
    }
}

export default connect(mapStateToProps,mapDispatchToProps)(withStyles(extendedTablesStyle)(tablesCategory));
