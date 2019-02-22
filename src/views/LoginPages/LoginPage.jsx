import React from "react";
import PropTypes from "prop-types";
import withStyles from "@material-ui/core/styles/withStyles";
import InputAdornment from "@material-ui/core/InputAdornment";

import Face from "@material-ui/icons/Face";

import GridContainer from "components/Grid/GridContainer.jsx";
import GridItem from "components/Grid/GridItem.jsx";
import CustomInput from "components/CustomInput/CustomInput.jsx";
import Button from "components/CustomButtons/Button.jsx";
import Card from "components/Card/Card.jsx";
import CardBody from "components/Card/CardBody.jsx";
import CardHeader from "components/Card/CardHeader.jsx";
import CardFooter from "components/Card/CardFooter.jsx";

import loginPageStyle from "assets/jss/material-dashboard-pro-react/views/loginPageStyle.jsx";
import LockOpen from "@material-ui/icons/LockOpen";
// import axios from 'axios';
import axios from '../../Utils/axios';
import { message } from 'antd';
import VCode from '../../variables/VCode'
import {canvas} from '../../variables/VCode'


import 'jsencrypt';



let  publicKey = 'MIGfMA0GCSqGSIb3DQEBAQUAA4GNADCBiQKBgQCEzFQe2lrG++hcZDkbrZstjnMKjUc8IBk07mRC0fc6DyTlbwwnB9MMkhvkJAUtZo02kARHeH5HWoxPpdWuHmF7lYeEma9m6z4uyFc4e0hVpXI1qdjToylOpPgI66Yge0mcvyd/FyWCFl7LrzrALPQ9qIqvUKmp7CwzISoa6IToSwIDAQAB'

message.config({
    duration: 1,
});

let documentObj =''
class LoginPage extends React.Component {

    constructor(props) {
        super(props);
        // we use this to make the card to appear after the page has been rendered
        this.state = {
            cardAnimaton: "cardHidden",
            username:'1'
        };
    }
    componentWillMount(){
        // documentObj=document
        // document.addEventListener("keydown",this.handleEnterKey);
        const userSession = window.sessionStorage.getItem('token');
        // console.log(userSession)
        if(userSession===null||userSession===undefined||userSession===''){

        }else {
            this.props.history.push("/cms/home");
        }
    }
    handleEnterKey = (e) => {
        // console.log(e.keyCode)
        if(e.keyCode === 13){
            this.handleClick()
        }
    }
    componentWillUmount(){
        // document.removeEventListener("keydown",this.handleEenterKey);
    }
    removeEvt(){
        document.removeEventListener("keydown",this.handleEenterKey);
    }
    componentDidMount() {
        // we add a hidden class to the card and after 700 ms we delete it and the transition appears
        setTimeout(
            function() {
                this.setState({ cardAnimaton: "" });
            }.bind(this),
            500
        );
    }
    // S4 = () => {
    //     return (((1+Math.random())*0x10000)|0).toString(16).substring(1);
    // }
    // guid = () => {
    //     return (this.S4()+this.S4()+"-"+this.S4()+"-"+this.S4()+"-"+this.S4()+"-"+this.S4()+this.S4()+this.S4());
    // }
    renovate = (vaule) =>{
        this.child = vaule
    }
    handleClick = (event) =>{

        const thisTemp = this;
        const username = window.sessionStorage.getItem('username');
        // alert("用户名"+username)
        const password = window.sessionStorage.getItem('password');
        const checked = window.sessionStorage.getItem('checked');
        const check = window.sessionStorage.getItem('check');
        const {JSEncrypt} = require('jsencrypt')
        // const JSEncrypt=JSEncryptExports.JSEncrypt;
        let encrypt = new JSEncrypt();
        encrypt.setPublicKey(publicKey);
        // encrypt.setPublicKey('-----BEGIN PUBLIC KEY-----'+'\n' + publicKey + '\n'+'-----END PUBLIC KEY-----');
        let encrypted = encrypt.encrypt(password);

        if(checked !== check ){
            this.child.renovate()
            message.info("验证码有误请重新输入");

        }else{
            // this.props.history.push("/cms/home");
            // axios.defaults.headers.common['Authorization'] = '';
            axios.post('/cs/api/login',
                {
                    username: username,
                    password: encrypted,
                }
            ).then( (response) => {
                // console.log(response)async await
                if(response.data.status==='success'){
                    console.log(response);
                    // const uuid = thisTemp.guid();
                    // 全局修改axios默认配置
                    axios.defaults.headers.common['Authorization'] = response.data.Authorization;
                    // axios.defaults.headers.common['uuid'] = uuid;
                    // window.sessionStorage.setItem('uuid',uuid)
                    //存储
                    window.sessionStorage.setItem('userId',response.data.userId)
                    window.sessionStorage.setItem('username',username)
                    window.sessionStorage.setItem('token',response.data.Authorization)
                    window.sessionStorage.setItem('role',response.data.role)
                    window.sessionStorage.setItem('realName',response.data.name)

                    //window.sessionStorage.setItem('publicKey',response.data.publicKey)
                    window.sessionStorage.setItem('userId',response.data.userId)
                    window.sessionStorage.setItem('userName',response.data.name)
                    window.sessionStorage.setItem('caption',response.data.caption)
                    window.sessionStorage.setItem('tenantId',response.data.tenantId)
                    window.sessionStorage.setItem('customerFlag',response.data.customerFlag)

                    window.sessionStorage.setItem('password','')
                    // thisTemp.removeEvt()
                    // document.write("<script id='script1' src='/service-chat/chat/chat.js'></script>");

                    thisTemp.props.history.push("/cms/home");
                    // document.getElementById("layui-layer2").style.display='block'
                }else {
                    this.child.renovate()
                    message.info(response.data.msg);
                }

            })
            //post遭到拒绝时执行
                .catch(function (error) {
                    console.log(error);
                });
        }

    }
    handleChange = name => event => {
        this.setState({
            [name]: event.target.value,
        });
    };

    render() {
        const { classes } = this.props;
        return (
            <div className={classes.content}>
                <div className={classes.container}>
                    <GridContainer justify="center">
                        {/*GridContainer:网格容器*/}
                        {/*响应式*/}
                        <GridItem xs={12} sm={6} md={4}>
                            <form>
                                <Card login className={classes[this.state.cardAnimaton]}>
                                    <CardHeader
                                        className={`${classes.cardHeader} ${classes.textCenter}`}
                                        color="rose"
                                    >
                                        <h4 className={classes.cardTitle}>登 录</h4>
                                        <div className={classes.socialLine}>
                                        </div>
                                    </CardHeader>
                                    <CardBody>
                                        <CustomInput
                                            labelText="用户名"
                                            id="username"
                                            type="username"
                                            formControlProps={{
                                                fullWidth: true
                                            }}
                                            // valueTemp={(event)=>this.handleClick(event)}
                                            inputProps={{
                                                endAdornment: (
                                                    <InputAdornment position="end">
                                                        <Face className={classes.inputAdornmentIcon} />
                                                    </InputAdornment>
                                                )
                                            }}
                                        />
                                        <CustomInput
                                            labelText="密码"
                                            id="password"
                                            type="password"
                                            formControlProps={{
                                                fullWidth: true
                                            }}
                                            // onChange={this.handleChange('password')}
                                            inputProps={{
                                                endAdornment: (
                                                    <InputAdornment position="end">
                                                        {/*<LockOutline*/}
                                                        <LockOpen className={classes.inputAdornmentIcon} />
                                                    </InputAdornment>
                                                )
                                            }}
                                        />
                                        <CustomInput
                                            labelText="验证码"
                                            id="checked"
                                            type="checked"
                                            formControlProps={{
                                                fullWidth: true
                                            }}
                                            inputProps={{
                                                endAdornment: (
                                                    <InputAdornment position="end">
                                                        {/*<LockOutline*/}
                                                        <VCode zsx={this.renovate} />
                                                    </InputAdornment>
                                                )
                                            }}
                                        />
                                    </CardBody>
                                    <CardFooter className={classes.justifyContentCenter}>
                                        <Button onClick={() =>{this.handleClick()}} color="rose" simple size="lg" block>
                                            登 录
                                        </Button>
                                    </CardFooter>
                                </Card>
                            </form>
                        </GridItem>
                    </GridContainer>
                </div>
            </div>
        );
    }
}

LoginPage.propTypes = {
    classes: PropTypes.object.isRequired
};

export default withStyles(loginPageStyle)(LoginPage);
