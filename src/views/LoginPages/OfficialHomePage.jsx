import React from "react";
import PropTypes from "prop-types";
import withStyles from "@material-ui/core/styles/withStyles";
import InputAdornment from "@material-ui/core/InputAdornment";

import Face from "@material-ui/icons/Face";

import GridContainer from "components/Grid/GridContainer.jsx";
import GridItem from "components/Grid/GridItem.jsx";
import CustomInput from "components/CustomInput/CustomInput.jsx";
import { Button,Breadcrumb } from 'antd';
import Card from "components/Card/Card.jsx";
import CardBody from "components/Card/CardBody.jsx";
import CardHeader from "components/Card/CardHeader.jsx";
import CardFooter from "components/Card/CardFooter.jsx";

import officialHomePageStyle from "assets/jss/material-dashboard-pro-react/views/officialHomePageStyle.jsx";
import LockOpen from "@material-ui/icons/LockOpen";
// import axios from 'axios';
import axios from '../../Utils/axios';
import { message } from 'antd';
import VCode from '../../variables/VCode'
import {canvas} from '../../variables/VCode'
import cx from "classnames";
import logo from "assets/img/xiaoyue.png";
import shineyueLogo from "assets/img/logoRule.png";
import logo1 from "assets/img/shineyuelogo.png";


import 'jsencrypt';



let  publicKey = 'MIGfMA0GCSqGSIb3DQEBAQUAA4GNADCBiQKBgQCEzFQe2lrG++hcZDkbrZstjnMKjUc8IBk07mRC0fc6DyTlbwwnB9MMkhvkJAUtZo02kARHeH5HWoxPpdWuHmF7lYeEma9m6z4uyFc4e0hVpXI1qdjToylOpPgI66Yge0mcvyd/FyWCFl7LrzrALPQ9qIqvUKmp7CwzISoa6IToSwIDAQAB'

message.config({
    duration: 1,
});

let documentObj =''
class OfficialHomePage extends React.Component {

    constructor(props) {
        super(props);
        // we use this to make the card to appear after the page has been rendered
        this.state = {
            cardAnimaton: "cardHidden",
            username:'1',
            size: 'large',
        };
    }


    componentWillMount(){
        // documentObj=document
        // document.addEventListener("keydown",this.handleEnterKey);
        const userSession = window.sessionStorage.getItem('token');
        // console.log(userSession)
        if(userSession===null||userSession===undefined||userSession===''){

        }else {
            this.props.history.push("/cms/login");
        }
    }
    handleEnterKey = (e) => {
        // console.log(e.keyCode)
        if(e.keyCode === 13){
            this.handleClick()
        }
    }
    componentWillUmount(){

    }
    componentDidMount() {
        // we add a hidden class to the card and after 700 ms we delete it and the transition appears

    }

    renovate = (vaule) =>{
        this.child = vaule
    }
    handleClick = (event) =>{

    }
    handleChange = name => event => {

    };

    render() {
        const { classes,white,rtlActive } = this.props;
        const size = this.state.size;

        var anchor =
            classes.a +
            cx({
                [" " + classes.whiteColor]: white
            });
        return (
            <div >
                <div className={classes.header}>
                    <img src={shineyueLogo} className={classes.logo}></img>
                    <ul>
                        <li className={classes.navigation}>
                            <a href="http://www.gjj12329.cn:8079/cms">客服系统</a>
                        </li>
                        <li className={classes.navigation}>
                            <a href="https://www.shineyue.com/about.jhtml">公司简介</a>
                        </li>
                        <li className={classes.navigation}>
                            <a href="https://www.shineyue.com/sjgjj/index.jhtml">手机公积金</a>
                        </li>
                        <li className={classes.navigation}>
                            <a href="https://www.shineyue.com/qysm.jhtml">公司使命</a>
                        </li>

                    </ul>
                </div>
                <div className={classes.button}>
                    <h1 className={classes.title}>智能世界早已联网</h1>
                    <Button style={{marginLeft:50,marginTop:50}} size={size}>
                        <a href="http://www.gjj12329.cn:8081/client?tenantId=515941559682727936&userId=12345&userName=uer01&type=robotChatTest">
                            <img src={logo} alt="logo" className={classes.img} />体&nbsp;&nbsp;&nbsp;&nbsp;验
                        </a>

                    </Button>
                    <Button style={{marginLeft:20}} size={size} >
                        <img src={logo1} alt="logo" className={classes.img} />文&nbsp;&nbsp;&nbsp;&nbsp;档</Button>
                </div>
                <div className={classes.content}>
                    <Breadcrumb separator="|" className={classes.content}>
                        <Breadcrumb.Item>
                            {1900 + new Date().getYear()}{" "} &copy;
                            <a href="https://www.shineyue.com/" className={anchor}>
                                {rtlActive ? "توقيت الإبداعية" : "shineyue"}
                            </a>
                            {/*{rtlActive*/}
                            {/*? ", مصنوعة مع الحب لشبكة الإنترنت أفضل"*/}
                            {/*: ", service content manage system"}*/}
                        </Breadcrumb.Item>
                        <Breadcrumb.Item>冀ICP备17024734号-1</Breadcrumb.Item>
                        <Breadcrumb.Item>河北神玥软件科技股份有限公司</Breadcrumb.Item>
                    </Breadcrumb>
                    <Breadcrumb separator="|" >
                        <Breadcrumb.Item>地址：石家庄市鹿泉经济开发区御园路99号光谷科技园</Breadcrumb.Item>
                        <Breadcrumb.Item>邮编：050200</Breadcrumb.Item>
                        <Breadcrumb.Item>电话：0311-85138610</Breadcrumb.Item>
                        <Breadcrumb.Item>传真：0311-85138619</Breadcrumb.Item>

                    </Breadcrumb>
                </div>

            </div>

        );
    }
}

OfficialHomePage.propTypes = {
    classes: PropTypes.object.isRequired
};

export default withStyles(officialHomePageStyle)(OfficialHomePage);
