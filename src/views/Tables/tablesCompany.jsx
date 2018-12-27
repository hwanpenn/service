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
import {getOtherCompany,getDataCompany,updateDataCompany,deleteDataCompany,createDataCompany } from "actions/tablesCompany";
import {connect} from "react-redux";
import {Table, Divider,Button } from 'antd';
import {Input,Modal } from 'antd';
import {Form,Pagination,Popconfirm,Select,Cascader } from 'antd';
import {cities } from '../../variables/city';
const cityOptions = cities.provinces
const FormItem = Form.Item;
const Search = Input.Search;
const Option = Select.Option;

class tablesCompany extends React.Component {
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
        this.getOtherData('',1,10);
    }
    componentDidMount(){
    }
    getTableData = (tenantName,start,size) => {
        const params = {
            tenantName:tenantName,
            pageNo:start,
            pageSize:size,
        };
        this.props.getDataCompany(params);
    }
    getOtherData = (username,start,size) => {
        const params = {
            pageNo:'1',
            pageSize:'999',
        };
        this.props.getOtherCompany(params);
    }
    onRowSelect = (record) => {
        this.setState({ recordSelect:record });
    }
    showModifyModal = (record) => {
        if(record.citysName!==undefined){
            const city = record.citysName
            // record.citysName=["河北省","石家庄市"]
            const index = city.indexOf("省")
            const provinceName = city.substr(0,index+1)
            const cityName = city.substr(index+1,city.length)
            let citysName = [provinceName,cityName]
            record.citysName=citysName
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
            values.citysName=values.citysName[0]+values.citysName[1]+''
            this.props.updateDataCompany(values);
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
            values.citysName=values.citysName[0]+values.citysName[1]+''
            this.props.createDataCompany(values)
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
        this.props.deleteDataCompany(params)
    }
    render() {
        let thisTemp = this
        const { classes } = this.props;
        const columns = [
        
        {
            title: '企业用户名称',
            dataIndex: 'tenantName',
            key: 'tenantName',
            // align: 'center'
            width: '40%'
        }, 
        {
            title: '企业id',
            dataIndex: 'id',
            key: 'id',
            // width: 320,
            // fixed: 'left',
            width: '40%',
            render: text => <a >{text}</a>,
        }, 
        // {
        //     title: '企业分类id',
        //     dataIndex: 'categoryId',
        //     key: 'categoryId',
        //     // align: 'center'
        //     width: 300
        // }, 
        {
            title: '操作',
            key: 'action',
            width: window.screen.width*0.20,
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
        let options = ''
        if(this.props.tablesCompany.responseOtherCompany.rows!==undefined){
             options = this.props.tablesCompany.responseOtherCompany.rows.map((item,i) => {
                return <Option value={item.id}>{item.categoryName}</Option>
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
                onCityChange = (value) => {
                    console.log(value);
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
                            title="新增企业用户"
                            cancelText="取消" okText="确定"
                            onCancel={onCancel}
                            onOk={onCreate}
                        >
                            <Form layout="vertical">
                                <FormItem label="企业用户名称">
                                    {getFieldDecorator('tenantName', {
                                        rules: [{ required: true, message: '请输入新增企业用户名称!' }],
                                    })(
                                        <Input />
                                    )}
                                </FormItem>
                                <FormItem label="所在城市">
                                    {getFieldDecorator('citysName', {
                                        rules: [{ required: false, message: '请输入新增企业所在城市!' }],
                                    })(
                                        <Cascader fieldNames={{ label: 'citysName', value: 'citysName', children: 'citys' }} options={cityOptions} onChange={this.onCityChange} placeholder="请选择" />
                                    )}
                                </FormItem>
                                <FormItem label="企业分类">
                                    {getFieldDecorator('categoryId', {
                                        rules: [{ required: true, message: '请选择企业分类!' }],
                                    })(
                                        <Select
                                            showSearch
                                            placeholder="请选择企业分类"
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
                            title="修改企业用户"
                            cancelText="取消" okText="确定"
                            onCancel={onCancel}
                            onOk={onCreate}
                        >
                            <Form layout="vertical">
                                <FormItem label="企业用户名称">
                                    {getFieldDecorator('tenantName', {
                                        initialValue:  thisTemp.state.recordAction.tenantName ,
                                        rules: [{ required: true, message: '请输入修改企业用户名称!' }],
                                    })(
                                        <Input />
                                    )}
                                </FormItem>
                                <FormItem label="所在城市">
                                    {getFieldDecorator('citysName', {
                                        initialValue:  thisTemp.state.recordAction.citysName ,
                                        rules: [{ required: false, message: '请输入新增企业所在城市!' }],
                                    })(
                                        <Cascader fieldNames={{ label: 'citysName', value: 'citysName', children: 'citys' }} options={cityOptions} onChange={this.onCityChange} placeholder="请选择" />
                                    )}
                                </FormItem>
                                <FormItem label="企业分类">
                                    {getFieldDecorator('categoryId', {
                                        initialValue:  thisTemp.state.recordAction.categoryId ,
                                        rules: [{ required: true, message: '请输入修改企业分类!' }],
                                    })(
                                        <Select
                                            showSearch
                                            placeholder="请选择企业分类"
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
                                </Grid>
                            </Grid>
                        </CardHeader>
                        <CardBody>
                            <Table onRow={(record) => {
                                    return {
                                    onClick: () => {this.onRowSelect(record)},       
                                    // onMouseEnter: () => {},  
                                    };
                                }} key={"tablesCompany"} pagination={false} columns={columns} dataSource={this.props.tablesCompany.tableDataCompany} scroll={{x: 600, y: 360}} />
                            <Pagination defaultCurrent={1} defaultPageSize={10} total={this.props.tablesCompany.tableCountCompany} style={{textAlign:'right',marginTop:25}}  onChange={(page, pageSize)=>this.getTableData('',page,10)}/>
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
        tablesCompany: state.tablesCompany,
    }
}
const mapDispatchToProps = (dispatch) => {
    return{
        getDataCompany: (params) => {
            dispatch(getDataCompany(params))
        },
        updateDataCompany: (params) => {
            dispatch(updateDataCompany(params))
        },
        deleteDataCompany: (params) => {
            dispatch(deleteDataCompany(params))
        },
        createDataCompany: (params) => {
            dispatch(createDataCompany(params))
        },
        getOtherCompany: (params) => {
            dispatch(getOtherCompany(params))
        }
    }
}

export default connect(mapStateToProps,mapDispatchToProps)(withStyles(extendedTablesStyle)(tablesCompany));
