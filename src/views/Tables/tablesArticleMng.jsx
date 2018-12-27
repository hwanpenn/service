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
import {getOtherArticleMng,getDataArticleMng,updateDataArticleMng,deleteDataArticleMng,createDataArticleMng } from "actions/tablesArticleMng";
import {connect} from "react-redux";
import {Table, Divider,Button } from 'antd';
import {Input,Modal } from 'antd';
import {Form,Pagination,Popconfirm } from 'antd';
import {Upload, message, Icon } from 'antd';
import { Menu } from 'antd';

const FormItem = Form.Item;
const Search = Input.Search;
const SubMenu = Menu.SubMenu;


class tablesArticleMng extends React.Component {
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
            openKeys: ['sub1'],
        };
    }
    rootSubmenuKeys = ['sub1', 'sub2', 'sub4'];
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
        if(obj.page===''||obj.page===undefined){
            this.setState({ page:obj.page });
            // this.setState({ categoryId:obj.categoryId });
        }
        // this.setState({ page:obj.page });
        // console.log('componentWillMount')
        this.getTableData('',1,10,obj.categoryId);
        // this.getOtherData('',1,10);
    }
    componentDidMount(){
    }
    // componentWillUpdate(){
    //     alert('刷新')
    // }
    getTableData = (articleTitle,start,size,categoryId) => {
        const params = {
            articleTitle:articleTitle,
            pageNo:start,
            pageSize:size,
            categoryId:categoryId
        };
        this.props.getDataArticleMng(params);
    }
    getOtherData = (username,start,size) => {
        const params = {
            search:username,
            isPaging:true,
            currentPage:start,
            pageSize:size,
        };
        this.props.getOtherArticleMng(params);
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
    handleExport = () => {
        
        const obj = this.parseQueryString(this.props.location.search)
        // window.open("/cs/api/knowledgeBase/export?categoryId="+obj.categoryId);
        window.location.href="/cs/api/knowledgeBase/export?categoryId="+obj.categoryId
        // const params = {
        //     categoryId:obj.categoryId
        // };
        // this.props.getOtherArticleMng(params);
    }
    handleImport = () => {

    }
    goBack = () => {
        const page = this.state.page
        this.props.history.push("/cms/home/tables/knowladgemng?page="+page);
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
            this.props.updateDataArticleMng(values,this);
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
            this.props.createDataArticleMng(values)
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
        this.props.deleteDataArticleMng(params)
    }
    activeConfirm = (record) => {
        const params = {
            status:record.status,
            cuSkGroupId:record.cuSkGroupId,
        }
        // this.props.activeDataArticleMng(params)
    }
    onOpenChange = (openKeys) => {
        const latestOpenKey = openKeys.find(key => this.state.openKeys.indexOf(key) === -1);
        if (this.rootSubmenuKeys.indexOf(latestOpenKey) === -1) {
          this.setState({ openKeys });
        } else {
          this.setState({
            openKeys: latestOpenKey ? [latestOpenKey] : [],
          });
        }
      }
    render() {
        let thisTemp = this
        const { classes } = this.props;
        const columns = [{
            title: '文章名称',
            dataIndex: 'articleTitle',
            key: 'articleTitle',
            fixed: 'left',
            width: 200,
            render: text => <a >{text}</a>,
        }, {
            title: '文章内容',
            dataIndex: 'articleContent',
            key: 'articleContent',
            // align: 'center'
            width: 220,
        }, {
            title: '启用状态',
            dataIndex: 'status',
            key: 'status',
            // align: 'center'
            width: 170,
            render: text => <span >{text===0?'已启用':'未启用'}</span>,
        }, {
            title: '操作',
            key: 'action',
            width: 150,
            fixed: 'right',
            render: (text, record) => (
                <span>
                    <a onClick={() => this.showModifyModal(record)} >编辑</a>
                    <Divider type="vertical" />
                    <Popconfirm cancelText="取消" okText="确定" title="确定启用?" onConfirm={() => this.activeConfirm(record)}>
                        {record.status==='1'?<a>禁用</a>:<a>启用</a>}
                    </Popconfirm>
                    <Divider type="vertical" />
                    <Popconfirm cancelText="取消" okText="确定" title="确定删除?" onConfirm={() => this.deleteConfirm(record)}>
                        <a>删除</a>
                    </Popconfirm>
                    {/* <Divider type="vertical" />
                        <a onClick={() => this.showDetailModal(record)}>查看成员</a> */}
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
                            title="新增文章"
                            cancelText="取消" okText="确定"
                            onCancel={onCancel}
                            onOk={onCreate}
                        >
                            <Form layout="vertical">
                                <FormItem label="名称">
                                    {getFieldDecorator('articleTitle', {
                                        rules: [{ required: true, message: '请输入新增名称!' }],
                                    })(
                                        <Input />
                                    )}
                                </FormItem>
                                <FormItem label="内容">
                                    {getFieldDecorator('articleContent', {
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
                            title="修改文章"
                            cancelText="取消" okText="确定"
                            onCancel={onCancel}
                            onOk={onCreate}
                        >
                            <Form layout="vertical">
                                <FormItem label="名称">
                                    {getFieldDecorator('articleTitle', {
                                        initialValue:  thisTemp.state.recordAction.articleTitle ,
                                        rules: [{ required: true, message: '请输入修改名称!' }],
                                    })(
                                        <Input />
                                    )}
                                </FormItem>
                                <FormItem label="内容">
                                    {getFieldDecorator('articleContent', {
                                        initialValue:  thisTemp.state.recordAction.articleContent ,
                                        rules: [{ required: true, message: '请输入修改内容!' }],
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
        const obj = this.parseQueryString(this.props.location.search)
        const props = {
            name: 'file',
            action: '/cs/api/knowledgeBase/import',
            data: {categoryId:obj.categoryId},
            headers: {
              authorization: window.sessionStorage.getItem('token'),
              username: window.sessionStorage.getItem('username'),
            //   contentType:''
            },
            onChange(info) {
              if (info.file.status !== 'uploading') {
                console.log(info.file, info.fileList);
              }
              if (info.file.status === 'done') {
                message.success(`${info.file.name} file uploaded successfully`);
                const obj = thisTemp.parseQueryString(thisTemp.props.location.search)
                if(obj.page===''||obj.page===undefined){
                    this.setState({ page:obj.page });
                }
                thisTemp.getTableData('',1,10,obj.categoryId);
            } else if (info.file.status === 'error') {
                message.error(`${info.file.name} file upload failed.`);
              }
            },
          };
        return (
            <GridContainer>
                <GridItem xs={12}>
                    <Card>
                        <CardHeader color="rose" icon>
                            <Grid container spacing={24}>
                                <Grid item xs={3}>
                                    <CardIcon color="rose">
                                        <Assignment />
                                    </CardIcon>
                                    <h4 className={classes.cardIconTitle}> </h4>
                                </Grid>
                                <Grid style={{textAlign:'right',marginTop:10}} item xs={9}>
                                    <Search
                                        placeholder="名称搜索"
                                        onSearch={value => this.getTableData(value,1,10)}
                                        style={{ width: 200,borderStyle:'solid',
                                            borderWidth:0,paddingRight:10 }}
                                    />
                                    <Button onClick={this.showModalCreate} style={{ height: 30,marginRight:10 }} size={'small'}>增加</Button>
                                    <Button onClick={this.goBack} style={{ height: 30,marginRight:10 }} size={'small'}>返回</Button>
                                    {/* <Button onClick={this.handleImport} style={{ height: 30,marginRight:10 }} size={'small'}>导入</Button> */}
                                    <Button onClick={this.handleExport} style={{ height: 30,marginRight:10 }} size={'small'}>导出</Button>
                                    <Upload style={{ height: 30,marginRight:10 }} {...props}><Button style={{ height: 30,marginRight:10 }} size={'small'}>导入</Button></Upload>
                                    
                                </Grid>
                            </Grid>
                        </CardHeader>
                        <CardBody>
                            <Table onRow={(record) => {
                                    return {
                                    onClick: () => {this.onRowSelect(record)},       
                                    // onMouseEnter: () => {},  
                                    };
                                }} key={"tablesArticleMng"} pagination={false} columns={columns} dataSource={this.props.tablesArticleMng.tableDataArticleMng} scroll={{  y: 360}} />
                            <Pagination defaultCurrent={1} defaultPageSize={10} total={this.props.tablesArticleMng.tableCountArticleMng} style={{textAlign:'right',marginTop:25}}  onChange={(page, pageSize)=>this.getTableData('',page,10)}/>
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
        tablesArticleMng: state.tablesArticleMng,
    }
}
const mapDispatchToProps = (dispatch) => {
    return{
        getDataArticleMng: (params) => {
            dispatch(getDataArticleMng(params))
        },
        updateDataArticleMng: (params,obj) => {
            dispatch(updateDataArticleMng(params,obj))
        },
        deleteDataArticleMng: (params) => {
            dispatch(deleteDataArticleMng(params))
        },
        createDataArticleMng: (params) => {
            dispatch(createDataArticleMng(params))
        },
        getOtherArticleMng: (params) => {
            dispatch(getOtherArticleMng(params))
        },
        // activeDataArticleMng: (params) => {
        //     dispatch(activeDataArticleMng(params))
        // }
    }
}

export default connect(mapStateToProps,mapDispatchToProps)(withStyles(extendedTablesStyle)(tablesArticleMng));
