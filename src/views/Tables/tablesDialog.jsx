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
import {getOtherDialog,getDataDialog,updateDataDialog,deleteDataDialog,createDataDialog } from "actions/tablesDialog";
import {connect} from "react-redux";
import {Table, Divider,Button } from 'antd';
import {Input,Modal } from 'antd';
import {Form,Pagination,Popconfirm,Select,Popover,DatePicker } from 'antd';
import { LocaleProvider } from 'antd';
import zh_CN from 'antd/lib/locale-provider/zh_CN';
import 'moment/locale/zh-cn';

const FormItem = Form.Item;
const Search = Input.Search;
const Option = Select.Option;
const { MonthPicker, RangePicker, WeekPicker } = DatePicker;

class tablesDialog extends React.Component {
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
            robotId:'',
            startTime: '',
            endTime: '',
            endOpen: false,
            requestSource:''
        };
    }
    requestSource = ''
    startTime = ''
    endTime = ''
    componentWillMount(){
        // this.getTableData('',1,10);
        this.getOtherData('',1,10);
    }
    componentDidMount(){
    }
    getTableData = (question,start,size) => {
        // console.log(this.state.requestSource)
        const params = {
            robotId:this.state.robotId,
            startTime:this.startTime,
            endTime:this.endTime,
            requestSource:this.requestSource,
            question:question,
            pageNo:start,
            pageSize:size,
        };
        this.props.getDataDialog(params);
    }
    getOtherData = (username,start,size) => {
        const params = {
            search:username,
            isPaging:true,
            currentPage:start,
            pageSize:size,
        };
        this.props.getOtherDialog(params,this);
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
            values.windowId=this.state.recordAction.windowId
            this.props.updateDataDialog(values);
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
            this.props.createDataDialog(values)
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
        this.props.deleteDataDialog(params)
    }
    handleChange = (value) => {
        // console.log('value')
        // console.log(value)
        this.setState({ robotId: value });
        this.getTableData('',1,10,value);
    }
    timeFormat = (nS) => { 
        if(nS===null){
            return '空'
        }else{
            return new Date(parseInt(("/Date("+nS+")/").substr(6, 13))).toLocaleDateString();     
            // return JSON.parse(new Date(nS))
        }   
     };
     timestampToTime = (timestamp) => {
        if(timestamp===null){
            return '空'
        }else{
            //13位 除以一千
            timestamp=timestamp/1000
            var date = new Date(timestamp * 1000);//时间戳为10位需*1000，时间戳为13位的话不需乘1000
            var Y = date.getFullYear() + '-';
            var M = (date.getMonth()+1 < 10 ? '0'+(date.getMonth()+1) : date.getMonth()+1) + '-';
            var D = date.getDate() + ' ';
            var h = date.getHours() + ':';
            var m = date.getMinutes() + ':';
            var s = date.getSeconds();
            return Y+M+D+h+m+s;
        }   
    }
    
    onTimeChange = (date, dateString) => {
        // this.setState({
        //     startTime: dateString[0]+' 00:00:00',
        //     endTime: dateString[1]+' 00:00:00',
        // });
        this.startTime = dateString[0]+' 00:00:00'
        this.endTime = dateString[1]+' 00:00:00'
        this.getTableData('',1,10);
      }
      handleRequestSourceChange = (value)=> {
          console.log('value')
          console.log(value)
        // this.setState({ requestSource: value });
        this.requestSource = value
        this.getTableData('',1,10);
      }

    render() {
        const { startValue, endValue, endOpen } = this.state;
        let thisTemp = this
        const { classes } = this.props;
        const columns = [
        //     {
        //     title: '主题',
        //     dataIndex: 'title',
        //     key: 'title',
        //     fixed: 'left',
        //     width: 150,
        //     render: text => <a >{text}</a>,
        // }, 
        {
            title: '问题',
            dataIndex: 'question',
            key: 'question',
            // align: 'center'
            width: '33%',
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
        }, {
            title: '答案',
            dataIndex: 'answer',
            key: 'answer',
            // align: 'center'
            width: '33%',
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
        //     title: '用户id',
        //     key: 'userId',
        //     dataIndex: 'userId',
        //     // align: 'center'
        //     width: 150,
        // }, 
        {
            title: '创建时间',
            key: 'createTime',
            dataIndex: 'createTime',
            // align: 'center'
            width: '33%',
            // render: text => this.timeFormat(text)
            render: text => this.timestampToTime(text)

        }];
        const CollectionCreateForm = Form.create()(
            class extends React.Component {
                render() {
                    const { visible, onCancel, onCreate, form } = this.props;
                    const { getFieldDecorator } = form;
                    return (
                       <Modal maskClosable={false}
                            visible={visible}
                            title="新增聊天窗"
                            cancelText="取消" okText="确定"
                            onCancel={onCancel}
                            onOk={onCreate}
                        >
                            <Form layout="vertical">
                                <FormItem label="主题">
                                    {getFieldDecorator('title', {
                                        rules: [{ required: true, message: '请输入新增主题!' }],
                                    })(
                                        <Input />
                                    )}
                                </FormItem>
                                <FormItem label="排序号">
                                    {getFieldDecorator('sortNum', {
                                        rules: [{ required: true, message: '请输入新增排序号!' }],
                                    })(
                                        <Input />
                                    )}
                                </FormItem>
                                <FormItem label="问题">
                                    {getFieldDecorator('question')(<Input type="textarea" />)}
                                </FormItem>
                                <FormItem label="答案">
                                    {getFieldDecorator('answer')(<Input type="textarea" />)}
                                </FormItem>
                                <FormItem label="用户id">
                                    {getFieldDecorator('userId')(<Input type="textarea" />)}
                                </FormItem>
                                <FormItem label="创建时间">
                                    {getFieldDecorator('createTime')(<Input type="textarea" />)}
                                </FormItem>
                                <FormItem label="转人工关键词">
                                    {getFieldDecorator('welcomeSentence')(<Input type="textarea" />)}
                                </FormItem>
                                <FormItem label="欢迎语">
                                    {getFieldDecorator('userId')(<Input type="textarea" />)}
                                </FormItem>
                                <FormItem label="致歉语">
                                    {getFieldDecorator('apologySentence')(<Input type="textarea" />)}
                                </FormItem>
                                <FormItem label="输入框默认语">
                                    {getFieldDecorator('inputDefaultSentence')(<Input type="textarea" />)}
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
                                <FormItem label="主题">
                                    {getFieldDecorator('title', {
                                        initialValue:  thisTemp.state.recordAction.title ,
                                        rules: [{ required: true, message: '请输入修改主题!' }],
                                    })(
                                        <Input />
                                    )}
                                </FormItem>
                                <FormItem label="排序号">
                                    {getFieldDecorator('sortNum', {
                                        rules: [{ required: true, message: '请输入修改排序号!' }],
                                    })(
                                        <Input />
                                    )}
                                </FormItem>
                                <FormItem label="问题">
                                    {getFieldDecorator('question')(<Input type="textarea" />)}
                                </FormItem>
                                <FormItem label="答案">
                                    {getFieldDecorator('answer')(<Input type="textarea" />)}
                                </FormItem>
                                <FormItem label="用户id">
                                    {getFieldDecorator('userId')(<Input type="textarea" />)}
                                </FormItem>
                                <FormItem label="创建时间">
                                    {getFieldDecorator('createTime')(<Input type="textarea" />)}
                                </FormItem>
                                <FormItem label="转人工关键词">
                                    {getFieldDecorator('welcomeSentence')(<Input type="textarea" />)}
                                </FormItem>
                                <FormItem label="欢迎语">
                                    {getFieldDecorator('userId')(<Input type="textarea" />)}
                                </FormItem>
                                <FormItem label="致歉语">
                                    {getFieldDecorator('apologySentence')(<Input type="textarea" />)}
                                </FormItem>
                                <FormItem label="输入框默认语">
                                    {getFieldDecorator('inputDefaultSentence')(<Input type="textarea" />)}
                                </FormItem>
                            </Form>
                        </Modal>
                    );
                }
            }
        );
        let optionsRobot = ''
        if(this.props.tablesDialog.responseOtherDialog.rows!==undefined&&this.props.tablesDialog.responseOtherDialog.rows!==""){
            optionsRobot = this.props.tablesDialog.responseOtherDialog.rows.map((item,i) => {
                return <Option value={item.robotId}>{item.robotName}</Option>
            })
        }
        return (
            <GridContainer>
                <GridItem xs={12}>
                    <Card>
                        <CardHeader color="rose" icon>
                            <Grid container spacing={24}>
                                <Grid item xs={1}>
                                    <CardIcon color="rose">
                                        <Assignment />
                                    </CardIcon>
                                    <h4 className={classes.cardIconTitle}> </h4>
                                </Grid>
                                <Grid style={{textAlign:'right',marginTop:10}} item xs={11}>
                                <Select style={{ width: 200,borderStyle:'solid',
                                    borderWidth:0,paddingRight:10 }}
                                    showSearch
                                    placeholder="请选择机器人"
                                    value={this.state.robotId}
                                    optionFilterProp="children"
                                    onChange={(value)=>this.handleChange(value)}
                                    onFocus={this.handleFocus}
                                    onBlur={this.handleBlur}
                                    filterOption={(input, option) => option.props.children.toLowerCase().indexOf(input.toLowerCase()) >= 0}
                                >
                                    {optionsRobot}
                                </Select>
                                {/* <RangePicker onChange={this.onTimeChange} /> */}
                                
                                <LocaleProvider locale={zh_CN}><RangePicker size={'default'} onChange={this.onTimeChange}  /></LocaleProvider>;
                                    <Select placeholder="选择渠道"  style={{ width: 120,paddingRight:10 }} onChange={this.handleRequestSourceChange}>
                                        <Option value="">所有</Option>
                                        <Option value="0">网厅</Option>
                                        <Option value="1">APP</Option>
                                        <Option value="2">小程序</Option>
                                    </Select>
                                    <Search
                                        placeholder="名称搜索"
                                        onSearch={value => this.getTableData(value,1,10)}
                                        style={{ width: 200,borderStyle:'solid',
                                            borderWidth:0,paddingRight:10 }}
                                    />
                                    {/* <Button onClick={this.showModalCreate} style={{ height: 30,marginRight:10 }} size={'small'}>增加</Button> */}
                                </Grid>
                            </Grid>
                        </CardHeader>
                        <CardBody>
                            <Table onRow={(record) => {
                                    return {
                                    onClick: () => {this.onRowSelect(record)},       
                                    // onMouseEnter: () => {},  
                                    };
                                }} key={"tablesDialog"} pagination={false} columns={columns} dataSource={this.props.tablesDialog.tableDataDialog} scroll={{ x: 600 , y: 360}} />
                            <Pagination defaultCurrent={1} defaultPageSize={10} total={this.props.tablesDialog.tableCountDialog} style={{textAlign:'right',marginTop:25}}  onChange={(page, pageSize)=>this.getTableData('',page,10)}/>
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
        tablesDialog: state.tablesDialog,
    }
}
const mapDispatchToProps = (dispatch) => {
    return{
        getDataDialog: (params) => {
            dispatch(getDataDialog(params))
        },
        updateDataDialog: (params) => {
            dispatch(updateDataDialog(params))
        },
        deleteDataDialog: (params) => {
            dispatch(deleteDataDialog(params))
        },
        createDataDialog: (params) => {
            dispatch(createDataDialog(params))
        },
        getOtherDialog: (params,obj) => {
            dispatch(getOtherDialog(params,obj))
        }
    }
}

export default connect(mapStateToProps,mapDispatchToProps)(withStyles(extendedTablesStyle)(tablesDialog));
