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
import {getOtherChatMng,getOtherRobotChatMng,getOtherKillGroupChatMng,getDataChatMng,updateDataChatMng,deleteDataChatMng,activeDataChatMng,createDataChatMng } from "actions/tablesChatMng";
import {connect} from "react-redux";
import {Table, Divider, Button, LocaleProvider} from 'antd';
import {Input,Modal,Select } from 'antd';
import {Form,Pagination,Popconfirm } from 'antd';
import { message ,Row,Col,Popover} from 'antd';
import { TimePicker } from 'antd';
import moment from 'moment';
import zh_CN from "antd/lib/locale-provider/zh_CN";
message.config({
    duration: 1,
});

const FormItem = Form.Item;
const Search = Input.Search;
const Option = Select.Option;
const { TextArea } = Input;

class tablesChatMng extends React.Component {
    constructor(props) {
        super(props);
        this.state = {
            checked: [],
            tableData: [],
            visible: false,
            visibleModify: false,
            visibleNull:false,
            recordAction:{},
            recordSelect:{},
            defaultSelectValue:'',
            cuSkGroupId:'',
            robotId:'',
            timeValueStart: '',
            timeValueEnd: '',
            timeValueStartModify: '',
            timeValueEndModify: '',
            current:1,
            pageSize:10
        };
    }
    componentWillMount(){
        this.getTableData('',1,10);
        this.getOtherDataRobot('',1,10);
        this.getOtherDataKillGroup('',1,10);
        // this.getOtherData('',1,10);
    }
    componentDidMount(){
    }
    getTableData = (windowName,start,size) => {
        this.setState({
            current:start,
            pageSize:size
        })
        const params = {
            windowName:windowName,
            pageNo:start,
            pageSize:size,
        };
        this.props.getDataChatMng(params);
    }
    getOtherDataRobot = (username,start,size) => {
        const params = {
            search:username,
            isPaging:true,
            currentPage:start,
            pageSize:size,
        };
        this.props.getOtherRobotChatMng(params);
    }
    getOtherDataKillGroup = (username,start,size) => {
        const params = {
            search:username,
            isPaging:true,
            currentPage:start,
            pageSize:size,
        };
        this.props.getOtherKillGroupChatMng(params);
    }
    getOtherData = (username,start,size) => {
        const params = {
            search:username,
            isPaging:true,
            currentPage:start,
            pageSize:size,
        };
        this.props.getOtherChatMng(params);
    }
    onRowSelect = (record) => {
        this.setState({ recordSelect:record });
    }
    showModifyModal = (record) => {
        this.setState({ visibleModify: true,recordAction:record });
    }
    showModalCreate = () => {
        // if(this.props.tablesChatMng.responseOtherKillGroupChatMng.rows.length===0){
        //     // message.info('技能组为空，请先增加技能组');
        // }else if(this.props.tablesChatMng.responseOtherRobotChatMng.rows.length===0){
        //     // message.info('机器人为空，请先增加机器人');
        // }else{
        //     this.setState({ visible: true });
        // }
        this.setState({ visible: true });
    }
    handleCancelModify = () => {
        this.setState({ visibleModify: false });
    }
    handleCancelCreate = () => {
        this.setState({ visible: false });
    }
    handleModify = () => {
        const thisObj = this
        const form = this.formRefModifyData.props.form;
        form.validateFields((err, values) => {
            if (err) {
                return;
            }
            values.windowId=this.state.recordAction.windowId
            values.startTime=this.formRefModifyData.state.timeValueStartModify
            values.endTime=this.formRefModifyData.state.timeValueEndModify
            this.props.updateDataChatMng(values,this);
            form.resetFields();
            this.setState({ visibleModify: false });
        });
    }
    handleCreate = () => {
        if(this.props.tablesChatMng.responseOtherKillGroupChatMng.rows.length===0){
            message.info('技能组为空，请先增加技能组');
            // this.setState({ visibleNull: true });
        }else if(this.props.tablesChatMng.responseOtherRobotChatMng.rows.length===0){
            message.info('机器人为空，请先增加机器人');
        }else{
            const form = this.formRefDataCreate.props.form;
            // console.log(this.formRefDataCreate.state.timeValueStart)
            // console.log(this.formRefDataCreate.state.timeValueEnd)
            form.validateFields((err, values) => {
                if (err) {
                    return;
                }
                values.startTime=this.formRefDataCreate.state.timeValueStart
                values.endTime=this.formRefDataCreate.state.timeValueEnd
                this.props.createDataChatMng(values,this)
                form.resetFields();
                this.setState({ visible: false });
            });
        }

        
    }
    saveFormRefModify = (formRef) => {
        this.formRefModifyData = formRef;
    }
    saveFormRefCreate = (formRef) => {
        this.formRefDataCreate = formRef;
    }
    activeConfirm = (record) => {
        const params = {
            status:record.status,
            windowId:record.windowId,
        }
        this.props.activeDataChatMng(params,this)
    }
    deleteConfirm = (record) => {
        const params = {
            windowId:record.windowId,
        }
        this.props.deleteDataChatMng(params,this)
    }
    handleChangeRobotId = (value) => {
        this.setState({ robotId: value });
    }
    handleChangeCuSkGroupId = (value) => {
        this.setState({ cuSkGroupId: value });
    }
    handleAddKillGroup = (e) => {
        this.props.history.push("/cms/home/tables/killgroup");
    }
    
    handleAddRobot = (e) => {
        this.props.history.push("/cms/home/tables/robotmng");
    }
    render() {
        let thisTemp = this
        const { classes } = this.props;
        const columns = [{
            title: '聊天窗名称',
            dataIndex: 'windowName',
            key: 'windowName',
            width: 150,
            // fixed: 'left',
            render: text => <a >{text}</a>,
        }, {
            title: '聊天窗头像',
            dataIndex: 'windowHeadUrl',
            key: 'windowHeadUrl',
            // align: 'center'
            width:150
        }, {
            title: '机器人名称',
            dataIndex: 'robotName',
            key: 'robotId',
            // align: 'center'
            width: 150
        }, {
            title: '人工客服组',
            key: 'groupName',
            dataIndex: 'groupName',
            // align: 'center'
            width:150,
            render: text => <Popover content={(
                <div style={{width:270}}>
                  <p>{text}</p>
                </div>
              )}>
             <span style={{overflow: 'hidden',
                    textOverflow: 'ellipsis',
                    whiteSpace: 'nowrap',
                    display: 'inline-block',
                    width: 80
                }}>{text}</span>
          </Popover>
        }, {
            title: '转人工对话次数',
            key: 'toCustomerNum',
            dataIndex: 'toCustomerNum',
            // align: 'center'
            width: 150
        }, {
            title: '转人工关键词',
            key: 'toCustomerKeywords',
            dataIndex: 'toCustomerKeywords',
            // align: 'center'
            width: 150
        },  {
            title: '开始时间',
            key: 'startTime',
            dataIndex: 'startTime',
            // align: 'center'
            width: 150
        },  {
            title: '结束时间',
            key: 'endTime',
            dataIndex: 'endTime',
            // align: 'center'
            width: 150
        }, {
            title: '欢迎语',
            key: 'welcomeSentence',
            dataIndex: 'welcomeSentence',
            // align: 'center'
            width:150,
            render: text => <Popover content={(
                <div style={{width:270}}>
                  <p>{text}</p>
                </div>
              )}>
             <span style={{overflow: 'hidden',
                    textOverflow: 'ellipsis',
                    whiteSpace: 'nowrap',
                    display: 'inline-block',
                    width: 80
                }}>{text}</span>
          </Popover>
        }, {
            title: '致歉语',
            key: 'apologySentence',
            dataIndex: 'apologySentence',
            // align: 'center'
            width: 150,
            render: text => <Popover content={(
                <div style={{width:270}}>
                  <p>{text}</p>
                </div>
              )}>
             <span style={{overflow: 'hidden',
                    textOverflow: 'ellipsis',
                    whiteSpace: 'nowrap',
                    display: 'inline-block',
                    width: 80
                }}>{text}</span>
          </Popover>
        }, {
            title: '离线致歉语',
            key: 'failApologySentence',
            dataIndex: 'failApologySentence',
            // align: 'center'
            width: 150,
            render: text => <Popover content={(
                <div style={{width:270}}>
                  <p>{text}</p>
                </div>
              )}>
             <span style={{overflow: 'hidden',
                    textOverflow: 'ellipsis',
                    whiteSpace: 'nowrap',
                    display: 'inline-block',
                    width: 80
                }}>{text}</span>
          </Popover>
        }, {
            title: '输入框默认语',
            key: 'inputDefaultSentence',
            dataIndex: 'inputDefaultSentence',
            // align: 'center'
            width: 150,
            render: text => <Popover content={(
                <div style={{width:270}}>
                  <p>{text}</p>
                </div>
              )}>
             <span style={{overflow: 'hidden',
                    textOverflow: 'ellipsis',
                    whiteSpace: 'nowrap',
                    display: 'inline-block',
                    width: 80
                }}>{text}</span>
          </Popover>
        }, {
            title: '排序号',
            key: 'sortNum',
            dataIndex: 'sortNum',
            // align: 'center'
            width: 150
        }, {
            title: '启用状态',
            dataIndex: 'status',
            key: 'status',
            // fixed: 'right',
            // align: 'center'
            width: 150,
            render: text => <span >{text===1?'已启用':'未启用'}</span>,
        }, {
            title: '操作',
            key: 'action',
            width: 150,
            fixed: 'right',
            render: (text, record) => (
                <span>
                    <a onClick={() => this.showModifyModal(record)} >编辑</a>
                    <Divider type="vertical" />
                    <Popconfirm cancelText="取消" okText="确定" title="确定操作?" onConfirm={() => this.activeConfirm(record)}>
                        {record.status===1?<a>禁用</a>:<a>启用</a>}
                    </Popconfirm>
                    <Divider type="vertical" />
                    <Popconfirm cancelText="取消" okText="确定" title="确定删除?" onConfirm={() => this.deleteConfirm(record)}>
                        <a>删除</a>
                    </Popconfirm>
                </span>
            ),
        }];
        let optionsRobot = ''
        if(this.props.tablesChatMng.responseOtherRobotChatMng.rows!==undefined){
            optionsRobot = this.props.tablesChatMng.responseOtherRobotChatMng.rows.map((item,i) => {
                return <Option value={item.robotId}>{item.robotName}</Option>
            })
        }
        let optionsKillGroup = ''
        if(this.props.tablesChatMng.responseOtherKillGroupChatMng.rows!==undefined&&this.props.tablesChatMng.responseOtherKillGroupChatMng.rows!==''){
            optionsKillGroup = this.props.tablesChatMng.responseOtherKillGroupChatMng.rows.map((item,i) => {
                return <Option value={item.cuSkGroupId}>{item.groupName}</Option>
            })
        }
        const CollectionCreateForm = Form.create()(
            class extends React.Component {
                constructor(props) {
                    super(props);
                    this.state = {
                        cuSkGroupId:'',
                        robotId:''
                    };
                }
                onChangeStart = (time, timeString) => {
                    // console.log( timeString);
                    this.setState({ timeValueStart: timeString });
                }
                onChangeEnd = (time, timeString) => {
                    // console.log( timeString);
                    this.setState({ timeValueEnd: timeString });
                }
                handleChangeRobotId = (value) => {
                    this.setState({ robotId: value });
                }
                handleChangeCuSkGroupId = (value) => {
                    this.setState({ cuSkGroupId: value });
                }
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
                            // zIndex={2000}
                        >
                            <Form layout="vertical">
                                <FormItem label="聊天窗名称">
                                    {getFieldDecorator('windowName', {
                                        rules: [{ required: true, message: '请输入新增聊天窗名称!' }],
                                    })(
                                        <Input />
                                    )}
                                </FormItem>
                                <FormItem style={{marginTop:-15}} label="排序号">
                                    {getFieldDecorator('sortNum', {
                                        rules: [{ required: true, message: '请输入新增排序号!' }],
                                    })(
                                        <Input />
                                    )}
                                </FormItem>
                                <FormItem style={{marginTop:-15}} label="聊天窗头像">
                                    {getFieldDecorator('windowHeadUrl')(<Input type="textarea" />)}
                                </FormItem>
                                <FormItem style={{marginTop:-15}} label="机器人名称">
                                    {/* {getFieldDecorator('robotId')(<Input type="textarea" />)} */}
                                    {getFieldDecorator('robotId', {
                                            // initialValue:  thisTemp.state.recordAction.robotId ,
                                            rules: [{ required: true, message: '请输入机器人!' }],
                                        })(
                                            <Select
                                            showSearch
                                            placeholder="请选择机器人"
                                            optionFilterProp="children"
                                            onChange={this.handleChangeRobotId}
                                            value={this.state.robotId}
                                            onFocus={this.handleFocus}
                                            onBlur={this.handleBlur}
                                            // disabled={thisTemp.props.tablesChatMng.responseOtherRobotChatMng.rows===undefined||thisTemp.props.tablesChatMng.responseOtherRobotChatMng.rows.length===0}
                                            // filterOption={(input, option) => option.props.children.toLowerCase().indexOf(input.toLowerCase()) >= 0}
                                        >
                                            {optionsRobot}
                                        </Select>
                                       
                                        )}
                                </FormItem>
                                <FormItem style={{marginTop:-15}} label="人工客服组名称">
                                    {/* {getFieldDecorator('cuSkGroupId')(<Input type="textarea" />)} */}
                                    {getFieldDecorator('cuSkGroupId', {
                                            // initialValue:  thisTemp.state.recordAction.cuSkGroupId ,
                                            rules: [{ required: true, message: '请选择人工客服组名称!' }],
                                        })(
                                            <Select
                                                    showSearch
                                                    placeholder="请选择技能组"
                                                    optionFilterProp="children"
                                                    onChange={this.handleChangeCuSkGroupId}
                                                    value={this.state.cuSkGroupId}
                                                    onFocus={this.handleFocus}
                                                    onBlur={this.handleBlur}
                                                    disabled={thisTemp.props.tablesChatMng.responseOtherKillGroupChatMng.rows===undefined||thisTemp.props.tablesChatMng.responseOtherKillGroupChatMng.rows.length===0}
                                                    // filterOption={(input, option) => option.props.children.toLowerCase().indexOf(input.toLowerCase()) >= 0}
                                                >
                                                    {optionsKillGroup}
                                                </Select>
                                        //     <Row>
                                        //     <Col span={thisTemp.props.tablesChatMng.responseOtherKillGroupChatMng.rows===undefined||thisTemp.props.tablesChatMng.responseOtherKillGroupChatMng.rows.length===0?18:18} style={{ textAlign: 'right' }}>
                                        //         <Select
                                        //             showSearch
                                        //             placeholder="请选择技能组"
                                        //             optionFilterProp="children"
                                        //             onChange={this.handleChangeCuSkGroupId}
                                        //             value={this.state.cuSkGroupId}
                                        //             onFocus={this.handleFocus}
                                        //             onBlur={this.handleBlur}
                                        //             disabled={thisTemp.props.tablesChatMng.responseOtherKillGroupChatMng.rows===undefined||thisTemp.props.tablesChatMng.responseOtherKillGroupChatMng.rows.length===0}
                                        //             // filterOption={(input, option) => option.props.children.toLowerCase().indexOf(input.toLowerCase()) >= 0}
                                        //         >
                                        //             {optionsKillGroup}
                                        //         </Select>
                                        //     </Col>
                                        //     <Col span={thisTemp.props.tablesChatMng.responseOtherKillGroupChatMng.rows===undefined||thisTemp.props.tablesChatMng.responseOtherKillGroupChatMng.rows.length===0?6:6} style={{ textAlign: 'right' }}>
                                        //     {thisTemp.props.tablesChatMng.responseOtherKillGroupChatMng.rows===undefined||thisTemp.props.tablesChatMng.responseOtherKillGroupChatMng.rows.length===0?<a onClick={thisTemp.handleAddKillGroup}>前往添加客服组</a>:<a onClick={thisTemp.handleAddKillGroup}>前往添加客服组</a>}
                                        //     </Col>
                                        //   </Row>
                                        
                                        )}
                                </FormItem>
                                <FormItem style={{marginTop:-15}} label="转人工对话次数">
                                    {getFieldDecorator('toCustomerNum')(<Input type="textarea" />)}
                                </FormItem>
                                <FormItem style={{marginTop:-15}} label="转人工关键词">
                                    {getFieldDecorator('toCustomerKeywords')(<Input type="textarea" />)}
                                </FormItem>
                                <FormItem style={{marginTop:-15}} label="开始时间">
                                    {getFieldDecorator('startTime')(<TimePicker style={{width:'50%'}} placeholder={'请选择时间'} onChange={this.onChangeStart} value={this.state.timeValueStart}  />)}
                                </FormItem>
                                <FormItem style={{marginTop:-15}} label="结束时间">
                                    {getFieldDecorator('endTime')(<TimePicker style={{width:'50%'}} placeholder={'请选择时间'} onChange={this.onChangeEnd} value={this.state.timeValueEnd}  />)}
                                </FormItem>
                                <FormItem style={{marginTop:-15}} label="欢迎语">
                                    {getFieldDecorator('welcomeSentence',{rules: [{ required: true, message: '请输入一个欢迎语!' }]})(<TextArea rows={4} />)}
                                </FormItem>
                                <FormItem style={{marginTop:-15}} label="致歉语">
                                    {getFieldDecorator('apologySentence',{rules: [{ required: true, message: '请输入一个道歉语!，连接失败时需要' }]})(<TextArea rows={4} />)}
                                </FormItem>
                                <FormItem style={{marginTop:-15}} label="客服离线致歉语">
                                    {getFieldDecorator('failApologySentence',{rules: [{ required: true, message: '请输入一个客服离线致歉语!' }]})(<TextArea rows={4} />)}
                                </FormItem>
                                <FormItem style={{marginTop:-15}} label="输入框默认语">
                                    {getFieldDecorator('inputDefaultSentence')(<TextArea rows={4} />)}
                                </FormItem>
                            </Form>
                        </Modal>
                    );
                }
            }
        );
        const CollectionModifyForm = Form.create()(
            class extends React.Component {
                constructor(props) {
                    super(props);
                    this.state = {
                        cuSkGroupId:'',
                        robotId:''
                    };
                }
                handleChangeRobotId = (value) => {
                    this.setState({ robotId: value });
                }
                handleChangeCuSkGroupId = (value) => {
                    this.setState({ cuSkGroupId: value });
                }
                onChangeStartModify = (time, timeString) => {
                    console.log( timeString);
                    this.setState({ timeValueStartModify: timeString });
                }
                onChangeEndModify = (time, timeString) => {
                    console.log( timeString);
                    this.setState({ timeValueEndModify: timeString });
                }
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
                                <FormItem label="聊天窗名称">
                                    {getFieldDecorator('windowName', {
                                        initialValue:  thisTemp.state.recordAction.windowName ,
                                        rules: [{ required: true, message: '请输入修改聊天窗名称!' }],
                                    })(
                                        <Input />
                                    )}
                                </FormItem>
                                <FormItem style={{marginTop:-15}} label="排序号">
                                    {getFieldDecorator('sortNum', {
                                        initialValue:  thisTemp.state.recordAction.sortNum ,
                                        rules: [{ required: true, message: '请输入修改排序号!' }],
                                    })(
                                        <Input />
                                    )}
                                </FormItem>
                                <FormItem style={{marginTop:-15}} label="聊天窗头像">
                                    {getFieldDecorator('windowHeadUrl', {
                                        initialValue:  thisTemp.state.recordAction.windowHeadUrl ,
                                    })(<Input type="textarea" />)}
                                </FormItem>
                                <FormItem style={{marginTop:-15}} label="机器人名称">
                                    {/* {getFieldDecorator('robotId')(<Input type="textarea" />)} */}
                                    {getFieldDecorator('robotId', {
                                            initialValue:  thisTemp.state.recordAction.robotId ,
                                            rules: [{ required: true, message: '请输入机器人!' }],
                                        })(
                                            <Select
                                            showSearch
                                            placeholder="请选择机器人"
                                            optionFilterProp="children"
                                            onChange={this.handleChangeRobotId}
                                            value={this.state.robotId}
                                            onFocus={this.handleFocus}
                                            onBlur={this.handleBlur}
                                            filterOption={(input, option) => option.props.children.toLowerCase().indexOf(input.toLowerCase()) >= 0}
                                        >
                                            {optionsRobot}
                                        </Select>
                                        )}
                                </FormItem>
                                <FormItem style={{marginTop:-15}} label="人工客服组名称">
                                    {/* {getFieldDecorator('cuSkGroupId')(<Input type="textarea" />)} */}
                                    {getFieldDecorator('cuSkGroupId', {
                                            initialValue:  thisTemp.state.recordAction.cuSkGroupId ,
                                            rules: [{ required: true, message: '请输入技能组!' }],
                                        })(
                                            <Select
                                            showSearch
                                            placeholder="请选择技能组"
                                            optionFilterProp="children"
                                            onChange={this.handleChangeCuSkGroupId}
                                            value={this.state.cuSkGroupId}
                                            onFocus={this.handleFocus}
                                            onBlur={this.handleBlur}
                                            filterOption={(input, option) => option.props.children.toLowerCase().indexOf(input.toLowerCase()) >= 0}
                                        >
                                            {optionsKillGroup}
                                        </Select>
                                        )}
                                </FormItem>
                                <FormItem style={{marginTop:-15}} label="转人工对话次数">
                                    {getFieldDecorator('toCustomerNum', {
                                        initialValue:  thisTemp.state.recordAction.toCustomerNum ,
                                    })(<Input type="textarea" />)}
                                </FormItem>
                                <FormItem style={{marginTop:-15}} label="转人工关键词">
                                    {getFieldDecorator('toCustomerKeywords', {
                                        initialValue:  thisTemp.state.recordAction.toCustomerKeywords ,
                                    })(<Input type="textarea" />)}
                                </FormItem>
                                <FormItem style={{marginTop:-15}} label="开始时间">
                                    {getFieldDecorator('startTime',{
                                        // initialValue:  thisTemp.state.recordAction.startTime ,
                                    })(<TimePicker style={{width:'50%'}} placeholder={'请选择时间'} onChange={this.onChangeStartModify} value={this.state.timeValueStartModify} initialValue={moment('12:08:23', 'HH:mm:ss')}  />)}
                                </FormItem>
                                <FormItem style={{marginTop:-15}} label="结束时间">
                                    {getFieldDecorator('endTime',{
                                        // initialValue:  thisTemp.state.recordAction.endTime ,
                                    })(<TimePicker style={{width:'50%'}} placeholder={'请选择时间'} onChange={this.onChangeEndModify} value={this.state.timeValueEndModify}  />)}
                                </FormItem>
                                <FormItem style={{marginTop:-15}} label="欢迎语">
                                    {getFieldDecorator('welcomeSentence', {
                                        initialValue:  thisTemp.state.recordAction.welcomeSentence ,
                                    })(<TextArea rows={4} />)}
                                </FormItem>
                                <FormItem style={{marginTop:-15}} label="致歉语">
                                    {getFieldDecorator('apologySentence', {
                                        initialValue:  thisTemp.state.recordAction.apologySentence ,
                                    })(<TextArea rows={4} />)}
                                </FormItem>
                                <FormItem style={{marginTop:-15}} label="客服离线致歉语">
                                    {getFieldDecorator('failApologySentence', {
                                        initialValue:  thisTemp.state.recordAction.failApologySentence ,
                                    })(<TextArea rows={4} />)}
                                </FormItem>
                                <FormItem style={{marginTop:-15}} label="输入框默认语">
                                    {getFieldDecorator('inputDefaultSentence', {
                                        initialValue:  thisTemp.state.recordAction.inputDefaultSentence ,
                                    })(<TextArea rows={4} />)}
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
                                        onSearch={value => this.getTableData(value,1,this.state.pageSize)}
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
                                }} key={"tablesChatMng"} pagination={false} columns={columns} dataSource={this.props.tablesChatMng.tableDataChatMng} scroll={{ x: 2250 , y: 360}} />
                            {/*<Pagination current={this.state.current} defaultPageSize={10} total={this.props.tablesChatMng.tableCountChatMng} style={{textAlign:'right',marginTop:25}}  onChange={(page, pageSize)=>this.getTableData('',page,10)}/>*/}
                            <LocaleProvider locale={zh_CN}>
                                <Pagination  current={this.state.current} showTotal={total => `总共 ${total} 条`} showSizeChanger showQuickJumper defaultPageSize={10} total={this.props.tablesChatMng.tableCountChatMng} style={{textAlign:'right',marginTop:25}}  onShowSizeChange={(current, pageSize)=>this.getTableData('',current, pageSize)} onChange={(page, pageSize)=>this.getTableData('',page,pageSize)}/>
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
        tablesChatMng: state.tablesChatMng,
    }
}
const mapDispatchToProps = (dispatch) => {
    return{
        getDataChatMng: (params) => {
            dispatch(getDataChatMng(params))
        },
        updateDataChatMng: (params,obj) => {
            dispatch(updateDataChatMng(params,obj))
        },
        deleteDataChatMng: (params,obj) => {
            dispatch(deleteDataChatMng(params,obj))
        },
        activeDataChatMng: (params,obj) => {
            dispatch(activeDataChatMng(params,obj))
        },
        createDataChatMng: (params,obj) => {
            dispatch(createDataChatMng(params,obj))
        },
        getOtherChatMng: (params) => {
            dispatch(getOtherChatMng(params))
        },
        getOtherRobotChatMng: (params) => {
            dispatch(getOtherRobotChatMng(params))
        },
        getOtherKillGroupChatMng: (params) => {
            dispatch(getOtherKillGroupChatMng(params))
        }
    }
}

export default connect(mapStateToProps,mapDispatchToProps)(withStyles(extendedTablesStyle)(tablesChatMng));
