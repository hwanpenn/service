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
import {getOtherArticleMng,getDataArticleMng,updateDataArticleMng,deleteDataArticleMng,createDataArticleMng,last } from "actions/tablesArticleMng";
import {getOtherKnowladgeMng,getDataKnowladgeMng,updateDataKnowladgeMng,deleteDataKnowladgeMng,createDataKnowladgeMng } from "actions/tablesKnowladgeMng";
import {connect} from "react-redux";
import {Table, Divider, Button, LocaleProvider} from 'antd';
import {Input,Modal } from 'antd';
import {Form,Pagination,Popconfirm,Select } from 'antd';
import { Menu,Icon } from 'antd';
import tablesArticleMng from "views/Tables/tablesArticleMng.jsx";
import { Tree ,Upload, message,Popover} from 'antd';
import zh_CN from "antd/lib/locale-provider/zh_CN";
const SubMenu = Menu.SubMenu;
message.config({
    duration: 1,
});



const FormItem = Form.Item;
const Search = Input.Search;
const Option = Select.Option;
const TreeNode = Tree.TreeNode;
const { TextArea } = Input;

class tablesKnowladgeMng extends React.Component {
    constructor(props) {
        super(props);
        this.state = {
            checked: [],
            tableData: [],
            visible: false,
            visibleArticleData: false,
            visibleModifyArticleData: false,
            visibleModify: false,
            visibleModifyArticleMngDetail: false,
            recordAction:{},
            recordActionArticleData:{},
            recordSelect:{},
            recordSelectValue:'',
            defaultSelectValue:'',
            categoryId:'',
            page:1,
            selectedKeys:['layer1-0-layer2-0'],
            category: 'bigCategory',
            current:1,
            pageSize:10
        };
    }
    rootSubmenuKeys = ['sub1', 'sub2', 'sub4'];
    componentWillMount(){
        // console.log(this.props.location)
        const obj = this.parseQueryString(this.props.location.search)
        // console.log(obj)
        if(obj.page===''||obj.page===undefined){
            this.setState({ page:obj.page });
        }
        this.getTableDataKnowladgeMng('',this.state.page,10);
        // this.getOtherData('',1,10);
    }
    componentDidMount(){
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
    getTableDataKnowladgeMng = (categoryName,start,size) => {
        this.setState({ page:start });
        const params = {
            categoryName:categoryName,
            pageNo:start,
            pageSize:size,
        };
        this.props.getDataKnowladgeMng(params,this);
    }
    getTableDataArticleMng = (articleTitle,start,size,categoryId) => {
            this.setState({
                current:start,
                pageSize:size
            })
        const params = {
            categoryId:categoryId,
            articleTitle:articleTitle,
            pageNo:start,
            pageSize:size,
        };
        this.props.getDataArticleMng(params,this);
    }
    getOtherData = (username,start,size) => {
        const params = {
            search:username,
            isPaging:true,
            currentPage:start,
            pageSize:size,
        };
        this.props.getOtherKnowladgeMng(params);
    }
    onRowSelect = (record,index, e) => {
        // this.onRowSelectHandle(index, e)
        this.setState({ recordActionArticleData:record });
    }
    onRowSelectHandle = (index, e)=> {
        if (this.selectIndex === index) return; // 不加个判断会连续在一行tr加样式,到时候会有多个选中
        this.selectIndex = index;

        const tbodytrs = e.target.parentNode.parentNode.childNodes;
        // console.log(tbodytrs)
        const counts = tbodytrs.length;

        for (let i = 0; i < counts; i++) {
            if (i !== index) {
                tbodytrs[i].className = tbodytrs[i].className.replace(" tableBackground", "");
            } else {
                tbodytrs[i].className += " tableBackground";
            }
        }
        // console.log(tbodytrs)
    }
    showDetailModal = (record) => {
        this.props.history.push("/cms/home/tables/articlemng?page="+this.state.page+"&categoryId="+record.categoryId);
        // this.setState({ showTable: true });
        this.setState({ visibleModifyArticleMngDetail: true });
    }
    showModifyModal = (record) => {
     
        // if(record.children!==undefined){
        //     this.setState({ category: 'bigCategory' });
        // }else{
        //     this.setState({ category: 'smallCategory', categoryIdModify:record.categoryId});
        // }
        this.setState({ visibleModify: true });
    }
    showModifyModalArticleData = (record) => {
        this.setState({ visibleModifyArticleData: true,recordActionArticleData:record });
    }
    showModalCreateArticleData = () => {
        if(this.state.recordSelect.categoryId===undefined){
            message.info('请先选择分类');
        }else{
            this.setState({ visibleArticleData: true });
        }
        
    }
    handleAddCategory = () => {
        this.setState({
            layerStatus: 'layer1-add2'
        });
        this.showModalCreate()
    }
    showModalCreate = (record) => {
        // console.log(record)
        // if(record.categoryId===undefined){
        //     this.setState({ category: 'bigCategory' });
        // }else{
        //     this.setState({ category: 'smallCategory'});
        // }
        this.setState({ visible: true });
    }
    showModalCreateArticle = () => {
        this.setState({ visible: true });
    }
    deleteConfirmArticleData = (record) => {
        const params = {
            id:record.articleId,
            categoryId:record.categoryId,
        }
        this.props.deleteDataArticleMng(params,this)
    }
    activeConfirmArticleData = (record) => {
        const params = {
            status:record.status,
            articleId:record.articleId,
        }
        this.props.activeDataArticleMng(params)
    }
    handleExport = () => {
        
        // const obj = this.parseQueryString(this.props.location.search)
        // window.open("/cs/api/knowledgeBase/export?categoryId="+obj.categoryId);
        window.location.href="/cs/api/knowledgeBase/export?categoryId="+this.state.categoryId+'&tenantId='+window.sessionStorage.getItem('tenantId')
        // const params = {
        //     categoryId:obj.categoryId
        // };
        // this.props.getOtherArticleMng(params);
    }
    handleCancelModifyArticleData = () => {
        this.setState({ visibleModifyArticleData: false });
    }
    handleCancelCreateArticleData = () => {
        this.setState({ visibleArticleData: false });
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
            // if(values.category==='smallCategory'){
            //     values.categoryParentId=this.state.categoryIdModify
            // }
            // if(this.state.layerStatus==='layer2'){
            //     values.categoryParentId=this.state.categoryIdModify
            // }
            values.categoryId=this.state.recordSelect.categoryId
            this.props.updateDataKnowladgeMng(values,this);
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
            if(this.state.layerStatus==='layer1-add2'){
                values.categoryParentId=this.state.recordSelect.categoryId
            }
            if(this.state.layerStatus==='layer2-add2'){
                values.categoryParentId=this.state.recordSelect.categoryParentId
            }
            this.props.createDataKnowladgeMng(values)
            form.resetFields();
            this.setState({ visible: false });
        });
    }
    handleModifyArticleData = () => {
        const form = this.formRefModifyDataArticleData.props.form;
        form.validateFields((err, values) => {
            if (err) {
                return;
            }
            // console.log(values)
            values.articleId=this.state.recordActionArticleData.articleId
            values.categoryId=this.state.recordSelect.categoryId
            this.props.updateDataArticleMng(values,this);
            form.resetFields();
            this.setState({ visibleModifyArticleData: false });
        });
    }
    handleCreateArticleData = () => {

        const form = this.formRefDataCreateArticleData.props.form;
        form.validateFields((err, values) => {
            console.log(values)
            if (err) {
                return;
            }
            const uPattern = /^[\u4e00-\u9fa5\S]{1,4}$/;
            if(uPattern.test(values.articleLabel)===false){
                message.info('请输入小于4个汉字长度的标签');
            }else{
                values.categoryId=this.state.recordSelect.categoryId
                console.log('开始调用getDataArticleMng')
                this.props.createDataArticleMng(values,this)
                //清空表单的值
                form.resetFields();
                this.setState({ visibleArticleData: false });
            }
            // console.log(uPattern.test(values.articleLabel),"正则匹配标签")
            // values.categoryId=this.state.categoryId

        });
    }
    saveFormRefModify = (formRef) => {
        this.formRefModifyData = formRef;
    }
    saveFormRefCreate = (formRef) => {
        this.formRefDataCreate = formRef;
    }
    saveFormRefModifyArticleData = (formRef) => {
        this.formRefModifyDataArticleData = formRef;
    }
    saveFormRefCreateArticleData = (formRef) => {
        this.formRefDataCreateArticleData = formRef;
    }
    deleteConfirm = (record) => {
        const params = {
            id:record.categoryId,
        }
        this.props.deleteDataKnowladgeMng(params,this)
    }
    onOpenChange = (openKeys) => {
        // console.log(openKeys)
        const latestOpenKey = openKeys.find(key => this.state.openKeys.indexOf(key) === -1);
        if (this.rootSubmenuKeys.indexOf(latestOpenKey) === -1) {
          this.setState({ openKeys });
        } else {
          this.setState({
            openKeys: latestOpenKey ? [latestOpenKey] : [],
          });
        }
      }
    onRightClick = (e, key, keyPath) => {
        this.setState({
            recordSelect: e.node.props.content,
            rightClickNodeTreeItem: {
                pageX: e.event.pageX,
                pageY: e.event.pageY,
            }
        });
        this.getNodeTreeRightClickMenu()
      }
      onSelectTree = (selectedKeys, info) => {
          const categoryId = info.node.props.content.categoryId
        // console.log('点击categoryId'+selectedKeys)
        this.setState({
            recordSelect: info.node.props.content,
            categoryId: categoryId,
            recordSelectValue: info.node.props.content,
            selectedKeys:selectedKeys
        });
        this.getTableDataArticleMng('',1,this.state.pageSize,categoryId)
      }
      handleMenuClick = (item) => { 
          const record = this.state.recordSelect
          if(record.children===undefined){
            this.setState({
                layerStatus: 'layer2'
            });
          }else{
            this.setState({
                layerStatus: 'layer1'
            });
          }
        if(item.key==='1'){
            this.setState({
                layerStatus: 'layer2-add2'
            });
            this.showModalCreate(record)
            this.setState({
                rightClickNodeTreeItem: null
            });
        }else if(item.key==='2'){
            this.showModifyModal(record)
            this.setState({
                rightClickNodeTreeItem: null
            });
        }else if(item.key==='3'){
            this.deleteConfirm(record)
            this.setState({
                rightClickNodeTreeItem: null
            });
        }else if(item.key==='5'){
            this.setState({
                layerStatus: 'layer1-add2'
            });
            this.showModalCreate(record)
            this.setState({
                rightClickNodeTreeItem: null
            });
        }else{
            this.setState({
                rightClickNodeTreeItem: null
            });
        }
      }
      handleModalClicked = ()=>{
            this.setState({
                rightClickNodeTreeItem: null
            });
      }
      getNodeTreeRightClickMenu = ()=> {
        const record = this.state.recordSelect
        const {pageX, pageY} = {...this.state.rightClickNodeTreeItem};
        const tmpStyle = {
            position: 'absolute',
            left: `${pageX - 270}px`,
            top: `${pageY - 107}px`
        };
        const menu = (
            <div style={{width: '100%',
                height: '100%',
                position: 'absolute'}} onClick={this.handleModalClicked}>
                <div className="box" onClick={e => e.stopPropagation()}>
                    <Menu
                    onClick={(item)=>this.handleMenuClick(item)}
                    style={tmpStyle}
                    >
                        <Menu.Item key='1'><Icon type='plus-circle-o'/>{record.children===undefined?'添加子节点':'添加节点'}</Menu.Item>
                        {record.children===undefined?'':  <Menu.Item style={{marginTop:-10}} key='5'><Icon type='plus'/>{'添加子节点'}</Menu.Item>}
                        <Menu.Item style={{marginTop:-10}} key='2'><Icon type='edit'/>{record.children===undefined?'修改子节点':'修改节点'}</Menu.Item>
                        <Menu.Item style={{marginTop:-10}} key='3'><Icon type='minus-circle-o'/>{record.children===undefined?'删除子节点':'删除节点'}</Menu.Item>
                        <Menu.Item style={{marginTop:-10}} key='4'><Icon type='rollback'/>{'取消操作'}</Menu.Item>
                    </Menu>
                </div>
            </div>
            
        );
        return (this.state.rightClickNodeTreeItem == null) ? '' : menu;
    }
 
    
      
    formatDateTime = (inputTime)=> {  
        var date = new Date(inputTime);
        var y = date.getFullYear();  
        var m = date.getMonth() + 1;  
        m = m < 10 ? ('0' + m) : m;  
        var d = date.getDate();  
        d = d < 10 ? ('0' + d) : d;  
        var h = date.getHours();
        h = h < 10 ? ('0' + h) : h;
        var minute = date.getMinutes();
        var second = date.getSeconds();
        minute = minute < 10 ? ('0' + minute) : minute;  
        second = second < 10 ? ('0' + second) : second; 
        return y + '-' + m + '-' + d+' '+h+':'+minute+':'+second;  
    }
    render() {
        let thisTemp = this
        const { classes } = this.props;
        const CollectionCreateForm = Form.create()(
            class extends React.Component {
                render() {
                    // let thisObj = this;
                    const { visible, onCancel, onCreate, form } = this.props;
                    const { getFieldDecorator } = form;
                    return (
                       <Modal maskClosable={false}
                            visible={visible}
                            title="新增分类"
                            cancelText="取消" okText="确定"
                            onCancel={onCancel}
                            onOk={onCreate}
                        >
                            <Form layout="vertical">
                                <FormItem label="类别名称">
                                    {getFieldDecorator('categoryName', {
                                        rules: [{ required: true, message: '请输入新增分类名称!' }],
                                    })(
                                        <Input />
                                    )}
                                </FormItem>
                                <FormItem label="描述">
                                    {getFieldDecorator('categoryDesc', {
                                        rules: [{ required: true, message: '请输入新增分类描述!' }],
                                    })(
                                        <TextArea rows={4} />
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
                            title="修改分类"
                            cancelText="取消" okText="确定"
                            onCancel={onCancel}
                            onOk={onCreate}
                        >
                            <Form layout="vertical">
                                <FormItem label="类别名称">
                                    {getFieldDecorator('categoryName', {
                                        initialValue:  thisTemp.state.recordSelect.categoryName ,
                                        rules: [{ required: true, message: '请输入修改类别名称!' }],
                                    })(
                                        <Input />
                                    )}
                                </FormItem>
                                <FormItem label="描述">
                                    {getFieldDecorator('categoryDesc', {
                                        initialValue:  thisTemp.state.recordSelect.categoryDesc ,
                                        rules: [{ required: true, message: '请输入修改类别描述!' }],
                                    })(
                                        <TextArea rows={4} />
                                    )}
                                </FormItem>
                            </Form>
                        </Modal>
                    );
                }
            }
        );
        const CollectionCreateFormArticleMng = Form.create()(
            class extends React.Component {
                render() {
                    const { visible, onCancel, onCreate, form } = this.props;
                    const { getFieldDecorator } = form;
                    return (
                       <Modal maskClosable={false}
                            visible={visible}
                            title="新增分类"
                            cancelText="取消" okText="确定"
                            onCancel={onCancel}
                            onOk={onCreate}
                        >
                            <Form layout="vertical">
                                <FormItem label="类别名称">
                                    {getFieldDecorator('categoryName', {
                                        rules: [{ required: true, message: '请输入新增聊天窗名称!' }],
                                    })(
                                        <Input />
                                    )}
                                </FormItem>
                                <FormItem label="描述">
                                    {getFieldDecorator('categoryDesc', {
                                        rules: [{ required: true, message: '请输入新增分类描述!' }],
                                    })(
                                        <TextArea rows={4} />
                                    )}
                                </FormItem>
                            </Form>
                        </Modal>
                    );
                }
            }
        );
        // const CollectionModifyFormArticleMng = Form.create()(
        //     class extends React.Component {
        //         render() {
        //             const { visible, onCancel, onCreate, form } = this.props;
        //             const { getFieldDecorator } = form;
        //             return (
        //                <Modal maskClosable={false}
        //                     visible={visible}
        //                     title="修改聊天窗"
        //                     cancelText="取消" okText="确定"
        //                     onCancel={onCancel}
        //                     onOk={onCreate}
        //                 >
        //                     <Form layout="vertical">
        //                         <FormItem label="类别名称">
        //                             {getFieldDecorator('categoryName', {
        //                                 initialValue:  thisTemp.state.recordAction.categoryName ,
        //                                 rules: [{ required: true, message: '请输入修改类别名称!' }],
        //                             })(
        //                                 <Input />
        //                             )}
        //                         </FormItem>
        //                         <FormItem label="描述">
        //                             {getFieldDecorator('categoryDesc', {
        //                                 initialValue:  thisTemp.state.recordAction.categoryDesc ,
        //                                 rules: [{ required: true, message: '请输入修改类别描述!' }],
        //                             })(
        //                                 <Input type="textarea" />
        //                             )}
        //                         </FormItem>
        //                     </Form>
        //                 </Modal>
        //             );
        //         }
        //     }
        // );
        // const CollectionCreateFormArticleMngDetail = Form.create()(
        //     class extends React.Component {
        //         render() {
        //             const { visible, onCancel, onCreate, form } = this.props;
        //             const { getFieldDecorator } = form;
        //             return (
        //                <Modal maskClosable={false}
        //                     visible={visible}
        //                     title="分类详情"
        //                     footer={null}
        //                     width={900}
        //                     // cancelText="取消" okText="确定"
        //                     // onCancel={onCancel}
        //                     // onOk={onCreate}
        //                 >
        //                       <Table style={{marginTop:50}} onRow={(record,index, ) => {
        //                         return {
        //                         onClick: (e) => {this.onRowSelect(record,index, e)},
        //                         // onMouseEnter: () => {},
        //                         };
        //                     }} key={"tablesArticleMng"} pagination={false} columns={columnsArticleMng} dataSource={thisTemp.props.tablesArticleMng.tableDataArticleMng} scroll={{  y: 360}} />
        //                     <Pagination defaultCurrent={1} defaultPageSize={10} total={thisTemp.props.tablesArticleMng.tableCountArticleMng} style={{textAlign:'right',marginTop:25}}  onChange={(page, pageSize)=>this.getTableDataArticleMng('',page,10)}/>
        //                 </Modal>
        //             );
        //         }
        //     }
        // );
        const CollectionCreateFormArticleData = Form.create()(
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
                                <FormItem label="标题">
                                    {getFieldDecorator('articleTitle', {
                                        rules: [{ required: true, message: '请输入新增名称!' }],
                                    })(
                                        <Input />
                                    )}
                                </FormItem>
                                <FormItem label="标签">
                                    {getFieldDecorator('articleLabel', {
                                        rules: [{ required: true, message: '请输入新增标签!' }],
                                    })(
                                        <Input placeholder="请输入小于4个汉字长度的标签"/>
                                    )}
                                </FormItem>
                                <FormItem label="内容">
                                    {getFieldDecorator('articleContent', {
                                        rules: [{ required: true, message: '请输入新增内容!' }],
                                    })(
                                        <TextArea rows={4} />
                                    )}
                                </FormItem>
                            </Form>
                        </Modal>
                    );
                }
            }
        );
        const CollectionModifyFormArticleData = Form.create()(
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
                                <FormItem label="标题">
                                    {getFieldDecorator('articleTitle', {
                                        initialValue:  thisTemp.state.recordActionArticleData.articleTitle ,
                                        rules: [{ required: true, message: '请输入修改名称!' }],
                                    })(
                                        <Input />
                                    )}
                                </FormItem>
                                <FormItem label="标签">
                                    {getFieldDecorator('articleLabel', {
                                        initialValue:  thisTemp.state.recordActionArticleData.articleLabel ,
                                        rules: [{ required: true, message: '请输入修改标签!' }],
                                    })(
                                        <Input />
                                    )}
                                </FormItem>
                                <FormItem label="内容">
                                    {getFieldDecorator('articleContent', {
                                        initialValue:  thisTemp.state.recordActionArticleData.articleContent ,
                                        rules: [{ required: true, message: '请输入修改内容!' }],
                                    })(
                                        <TextArea rows={4} />
                                    )}
                                </FormItem>
                            </Form>
                        </Modal>
                    );
                }
            }
        );
        const columnsKnowladgeMng = [{
            title: '类别名称',
            dataIndex: 'categoryName',
            key: 'categoryName',
            width: 350,
            // fixed: 'left',
          }, {
            title: '描述',
            dataIndex: 'categoryDesc',
            key: 'categoryDesc',
            // align: 'center'
            width: 225
          }, {
            title: '创建时间',
            dataIndex: 'createDate',
            // align: 'center'
            width: 225,
            // render: (text)=>{JSON.stringify(new Date(1511399397470))}
            // render: (text)=>{(1511399397470)}
          }, {
            title: '操作',
            key: 'action',
            width: 200,
            // fixed: 'right',
            render: (text, record) => (
                <span>
                    <a onClick={() => this.showModifyModalArticleData(record)} >编辑</a>
                    <Divider type="vertical" />
                    {record.children!==undefined?<a onClick={() => this.showModalCreate(record)} >新增子类</a>:<a onClick={() => this.showDetailModal(record)} >查看详情</a>}
                    {/* <Popconfirm title="确定启用?" onConfirm={() => this.activeConfirm(record)}>
                        {record.status==='1'?<a>禁用</a>:<a>启用</a>}
                    </Popconfirm> */}
                    <Divider type="vertical" />
                    <Popconfirm cancelText="取消" okText="确定" title="确定删除?" onConfirm={() => this.deleteConfirm(record)}>
                        <a>删除</a>
                    </Popconfirm>
                </span>
            ),
        }];
        const columnsArticleMng = [{
            title: '文字名称',
            dataIndex: 'name',
            key: 'name',
            width: '350',
            fixed: 'left',
          }, {
            title: '描述',
            dataIndex: 'script',
            key: 'script',
            // align: 'center'
            width: 225
          }, {
            title: '创建时间',
            dataIndex: 'data',
            // align: 'center'
            width: 225,
            // render: (text)=>{(1511399397470)}
          }, {
            title: '操作',
            key: 'action',
            width: 200,
            fixed: 'right',
            render: (text, record) => (
                <span>
                    <a onClick={() => this.showModifyModal(record)} >编辑</a>
                    <Divider type="vertical" />
                    <Popconfirm title="确定启用?" onConfirm={() => this.activeConfirmArticleData(record)}>
                        {record.status==='1'?<a>禁用</a>:<a>启用</a>}
                    </Popconfirm>
                    <Divider type="vertical" />
                    <Popconfirm title="确定删除?" onConfirm={() => this.deleteConfirmArticleData(record)}>
                        <a>删除</a>
                    </Popconfirm>
                </span>
            ),
        }];
        const content = (
            <div>
              <p>Content</p>
              <p>Content</p>
            </div>
          );
        const columns = [{
            title: '文章标题',
            dataIndex: 'articleTitle',
            key: 'articleTitle',
            // fixed: 'left',
            width: '30%',
            render: text =><Popover content={(
                <div style={{width:270}}>
                    <p>{text}</p>
                </div>
            )}>
             <span style={{overflow: 'hidden',
                 textOverflow: 'ellipsis',
                 whiteSpace: 'nowrap',
                 display: 'inline-block',
                 width: 150
             }}>{text}</span>
            </Popover>,
        }, {
            title: '文章标签',
            dataIndex: 'articleLabel',
            key: 'articleLabel',
            // fixed: 'left',
            // align: 'center'
            width: '25%',
            render: text => <Popover content={(
                <div style={{width:270}}>
                  <p>{text}</p>
                </div>
              )}>
             <span style={{overflow: 'hidden',
                    textOverflow: 'ellipsis',
                    whiteSpace: 'nowrap',
                    display: 'inline-block',
                    width: 150
                }}>{text}</span>
          </Popover>
        },{
            title: '文章内容',
            dataIndex: 'articleContent',
            key: 'articleContent',
            // fixed: 'left',
            // align: 'center'
            width: '30%',
            render: text => <Popover content={(
                <div style={{width:270}}>
                    <p>{text}</p>
                </div>
            )}>
             <span style={{overflow: 'hidden',
                 textOverflow: 'ellipsis',
                 whiteSpace: 'nowrap',
                 display: 'inline-block',
                 width: 150
             }}>{text}</span>
            </Popover>
        },
        // {
        //     title: '启用状态',
        //     dataIndex: 'status',
        //     key: 'status',
        //     // align: 'center'
        //     width: 170,
        //     render: text => <span >{'已激活'}</span>,
        // },
        {
            title: '操作',
            key: 'action',
            width: '15%',
            // fixed: 'right',
            render: (text, record) => (
                <span>
                    <a onClick={() => this.showModifyModalArticleData(record)} >编辑</a>
                    {/* <Divider type="vertical" />
                    <Popconfirm title="确定启用?" onConfirm={() => this.activeConfirmArticleData(record)}>
                        {record.status===1?<a>禁用</a>:<a>启用</a>}
                    </Popconfirm> */}
                    <Divider type="vertical" />
                    <Popconfirm  cancelText="取消" okText="确定" title="确定删除?" onConfirm={() => this.deleteConfirmArticleData(record)}>
                        <a>删除</a>
                    </Popconfirm>
                    {/* <Divider type="vertical" />
                        <a onClick={() => this.showDetailModal(record)}>查看成员</a> */}
                </span>
            ),
        }];
          
        const rowSelection = {
            onChange: (selectedRowKeys, selectedRows) => {
              console.log(`selectedRowKeys: ${selectedRowKeys}`, 'selectedRows: ', selectedRows);
            },
            onSelect: (record, selected, selectedRows) => {
              console.log(record, selected, selectedRows);
            },
            onSelectAll: (selected, selectedRows, changeRows) => {
              console.log(selected, selectedRows, changeRows);
            },
          };
        // const showTable = this.state.showTable;
        // let table;
        // let pagination;
        // if (showTable) {
        // table = <Table style={{marginTop:50}} onRow={(record,index, ) => {
        //     return {
        //     onClick: (e) => {this.onRowSelect(record,index, e)},
        //     // onMouseEnter: () => {},
        //     };
        // }} key={"tablesArticleMng"} pagination={false} columns={columnsArticleMng} dataSource={thisTemp.props.tablesArticleMng.tableDataArticleMng} scroll={{  y: 360}} />
        // pagination = <Pagination defaultCurrent={1} defaultPageSize={10} total={thisTemp.props.tablesArticleMng.tableCountArticleMng} style={{textAlign:'right',marginTop:25}}  onChange={(page, pageSize)=>this.getTableDataArticleMng('',page,10)}/>
        // } else {
        // table = ''
        // pagination = ''
        // }
        let treeList = ''
        if(thisTemp.props.tablesKnowladgeMng.tableDataKnowladgeMng!==undefined&&thisTemp.props.tablesKnowladgeMng.tableDataKnowladgeMng!==''){
            treeList = thisTemp.props.tablesKnowladgeMng.tableDataKnowladgeMng.map((item,i) => {
                return <TreeNode style={{marginLeft:40,marginTop:10}} content={item} title={item.categoryName} key={'layer1-'+i}>
                            {item.children.map((child,index)=>{
                                            return <TreeNode style={{marginLeft:20,marginTop:10}} content={child} title={child.categoryName} key={'layer1-'+i+'-layer2-'+index}>
                                                    </TreeNode>
                                        })}
                            
                        </TreeNode>
            })
        }
        const props = {
            name: 'file',
            showUploadList:false,
            action: '/cs/api/knowledgeBase/import',
            data: {categoryId:thisTemp.state.categoryId},
            headers: {
              authorization: window.sessionStorage.getItem('token'),
              username: window.sessionStorage.getItem('username'),
            //   contentType:''
            },
            onChange(info) {
                // console.log(info.file.response.msg);
                if(info.file.response!==undefined && info.file.response.msg==='请求成功') {
                    // const obj = thisTemp.parseQueryString(thisTemp.props.location.search)
                    // if(obj.page===''||obj.page===undefined){
                    //     thisTemp.setState({ page:obj.page });
                    // }
                    thisTemp.getTableDataArticleMng('',1,this.state.pageSize,thisTemp.state.categoryId);
                }

            //   if (info.file.status !== 'uploading') {
            //     // console.log(info.file, info.fileList);
            //   }
            //   if (info.file.status === 'done') {
            //     // message.success(`${info.file.name} file uploaded successfully`);
            //     const obj = thisTemp.parseQueryString(thisTemp.props.location.search)
            //     if(obj.page===''||obj.page===undefined){
            //         thisTemp.setState({ page:obj.page });
            //     }
            //     thisTemp.getTableDataArticleMng('',1,10,thisTemp.state.categoryId);
            // } else if (info.file.status === 'error') {
            //     // message.error(`${info.file.name} file upload failed.`);
            //   }
            },
          };
        return (
            <GridContainer>
                <GridItem style={{marginTop:10}} xs={3}>
                <text style={{fontSize:17,marginLeft:20,marginTop:0}}>分类列表</text>
                {/* {thisTemp.props.tablesKnowladgeMng.tableDataKnowladgeMng===undefined||thisTemp.props.tablesKnowladgeMng.tableDataKnowladgeMng===''?<Icon type="plus-circle" theme="outlined" onClick={this.handleAddCategory} style={{ marginLeft: 50,marginRight:10,fontSize:20 }} size={'small'}/>:''} */}
                <Icon type="plus-circle" theme="outlined" onClick={this.handleAddCategory} style={{ marginLeft: 50,marginRight:10,fontSize:20 }} size={'small'}/>
                <Tree
                    onSelect={this.onSelectTree}
                    onRightClick={this.onRightClick}
                    defaultSelectedKeys={this.state.selectedKeys}
                    style={{marginLeft:0.15*window.screen.width,marginTop:0.15*window.screen.height}}
                >
                    {treeList}
                </Tree>
                </GridItem>
                <GridItem xs={9}>
                    {/* <Card>
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
                                        onSearch={value => this.getTableDataKnowladgeMng(value,1,10)}
                                        style={{ width: 200,borderStyle:'solid',
                                            borderWidth:0,paddingRight:10 }}
                                    />
                                    <Button onClick={this.showModalCreate} style={{ height: 30,marginRight:10 }} size={'small'}>增加</Button>
                                </Grid>
                            </Grid>
                        </CardHeader>
                        <CardBody>
                            <Table onRow={(record,index, ) => {
                                    return {
                                    onClick: (e) => {this.onRowSelect(record,index, e)},       
                                    // onMouseEnter: () => {},  
                                    };
                                }} columns={columnsKnowladgeMng} dataSource={this.props.tablesKnowladgeMng.tableDataKnowladgeMng} pagination={false} indentSize={60}/>
                                <Pagination defaultCurrent={this.state.page} defaultPageSize={10} total={this.props.tablesKnowladgeMng.tableCountKnowladgeMng} style={{textAlign:'right',marginTop:25}}  onChange={(page, pageSize)=>this.getTableDataKnowladgeMng('',page,10)}/>
                       
                            {table}
                            
                        </CardBody>
                    </Card> */}
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
                                        onSearch={value => this.getTableDataArticleMng(value,1,this.state.pageSize,this.state.categoryId)}
                                        style={{ width: 200,borderStyle:'solid',
                                            borderWidth:0,paddingRight:10 }}
                                    />
                                    <Button onClick={this.showModalCreateArticleData} style={{ height: 30,marginRight:10 }} size={'small'}>增加</Button>
                                    {/* <Button onClick={this.goBack} style={{ height: 30,marginRight:10 }} size={'small'}>返回</Button> */}
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
                            {/*<Pagination current={this.state.current} defaultPageSize={10} total={this.props.tablesArticleMng.tableCountArticleMng} style={{textAlign:'right',marginTop:25}}  onChange={(page, pageSize)=>this.getTableDataArticleMng('',page,10,this.state.categoryId)}/>*/}
                            <LocaleProvider locale={zh_CN}>
                                <Pagination  current={this.state.current} showTotal={total => `总共 ${total} 条`} showSizeChanger showQuickJumper  total={this.props.tablesArticleMng.tableCountArticleMng} style={{textAlign:'right',marginTop:25}}  onShowSizeChange={(current, pageSize)=>this.getTableDataArticleMng('',current, pageSize,this.state.categoryId)} onChange={(page, pageSize)=>this.getTableDataArticleMng('',page,pageSize,this.state.categoryId)}/>
                            </LocaleProvider>
                        </CardBody>
                    </Card>
                </GridItem>
                <CollectionCreateFormArticleData
                    wrappedComponentRef={this.saveFormRefCreateArticleData}
                    visible={this.state.visibleArticleData}
                    onCancel={this.handleCancelCreateArticleData}
                    onCreate={this.handleCreateArticleData}
                />
                <CollectionModifyFormArticleData
                    wrappedComponentRef={this.saveFormRefModifyArticleData}
                    visible={this.state.visibleModifyArticleData}
                    onCancel={this.handleCancelModifyArticleData}
                    onCreate={this.handleModifyArticleData}
                />
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
                <CollectionCreateFormArticleMng
                    wrappedComponentRef={this.saveFormRefCreateArticleMng}
                    visible={this.state.visibleArticleMng}
                    onCancel={this.handleCancelCreateArticleMng}
                    onCreate={this.handleCreateArticleMng}
                />
                {/*<CollectionModifyFormArticleMng*/}
                    {/*wrappedComponentRef={this.saveFormRefModifyArticleMng}*/}
                    {/*visible={this.state.visibleModifyArticleMng}*/}
                    {/*onCancel={this.handleCancelModifyArticleMng}*/}
                    {/*onCreate={this.handleModifyArticleMng}*/}
                {/*/>*/}
                {/*<CollectionCreateFormArticleMngDetail*/}
                    {/*wrappedComponentRef={this.saveFormRefModifyArticleMng}*/}
                    {/*visible={this.state.visibleModifyArticleMngDetail}*/}
                    {/*onCancel={this.handleCancelModifyArticleMng}*/}
                    {/*onCreate={this.handleModifyArticleMng}*/}
                {/*/>*/}
                {this.getNodeTreeRightClickMenu()}
            </GridContainer>
        );
    }
}
const mapStateToProps = (state) => {
    return{
        tablesArticleMng: state.tablesArticleMng,
        tablesKnowladgeMng: state.tablesKnowladgeMng,
    }
}
const mapDispatchToProps = (dispatch) => {
    return{
        getDataKnowladgeMng: (params,obj) => {
            dispatch(getDataKnowladgeMng(params,obj))
        },
        updateDataKnowladgeMng: (params) => {
            dispatch(updateDataKnowladgeMng(params))
        },
        deleteDataKnowladgeMng: (params,obj) => {
            dispatch(deleteDataKnowladgeMng(params,obj))
        },
        createDataKnowladgeMng: (params) => {
            dispatch(createDataKnowladgeMng(params))
        },
        getOtherKnowladgeMng: (params) => {
            dispatch(getOtherKnowladgeMng(params))
        },
        getDataArticleMng: (params) => {
            dispatch(getDataArticleMng(params))
        },
        updateDataArticleMng: (params,obj) => {
            dispatch(updateDataArticleMng(params,obj))
        },
        deleteDataArticleMng: (params,obj) => {
            dispatch(deleteDataArticleMng(params,obj))
        },
        createDataArticleMng: (params,obj) => {
            dispatch(createDataArticleMng(params,obj))
        },
        getOtherArticleMng: (params) => {
            dispatch(getOtherArticleMng(params))
        }
    }
}

export default connect(mapStateToProps,mapDispatchToProps)(withStyles(extendedTablesStyle)(tablesKnowladgeMng));
