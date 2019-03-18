import React, {Component} from 'react';
import {appReduxChange, appReduxTest} from "actions/app";
import {connect} from "react-redux";

import PropTypes from "prop-types";
import { Switch, Route, Redirect } from "react-router-dom";

import withStyles from "@material-ui/core/styles/withStyles";

import PagesHeader from "components/Header/PagesHeader.jsx";
import Footer from "components/Footer/Footer.jsx";

import pagesRoutes from "routes/loginPages.jsx";

import pagesStyle from "assets/jss/material-dashboard-pro-react/layouts/pagesStyle.jsx";

import bgImage from "../assets/img/login.jpg";

let timer1
class LoginPages extends Component {
    
    componentWillMount(){

         timer1=window.setInterval(() => {
            if(document.getElementById("layui-layer2")==null){
            }else{
                setTimeout(function () {
                    document.getElementById("layui-layer2").style.visibility='hidden'
                    // document.getElementById("layui-layer2").classList.add('visible')
                    document.getElementById("layui-layer2").style.display='none'
                },300)
              window.clearInterval(timer1);
            }
          },100);
    }
    checkMessage = (message) =>{
        console.log(message)
         if(message==='show'){
                // console.log('放大界面')
                // const chatDiv =  window.document.getElementById("chatDiv")
                // // parent.window.document.getElementById("button")
                // console.log(chatDiv)
                // console.log(document)
                // const divCss = ''
                // layim-chat-footer 背景改为white
                // layui-layer layui-layer-page layui-box layui-layim-chat layer-anim 距离上方距离 top 改为零
                document.getElementById("chatDiv").setAttribute('style', 'width: 602px;height: 714px;margin-top: -714px;margin-left: 830px;');
                document.getElementById("chatIframe").setAttribute('style', 'width: 602px;height: 714px;;z-index: 9999;position: relative;border: 0px;');
                // document.getElementById("chatDiv").style.width=602
                // document.getElementById("chatDiv").style.height=522
                // document.getElementById("chatDiv").style.marginTop=-523
                // document.getElementById("chatDiv").style.marginLeft=-185
                // document.getElementById("chatIframe").style.width=602
                // document.getElementById("chatIframe").style.height=522
            }
    }
    componentDidMount(){  
        // console.log(this.props.app.username)
        // console.log('加载完毕，发送iframe消息')
        // const thisObj = this
        // window.onload = function(){
        //     document.getElementById('chatIframe')
        //      .contentWindow.postMessage("主页面发来的消息", 
        //             "http://localhost:3001/user?tenantId=502883989623668736&userId=12345&userName=uer01")
        // }
        // window.addEventListener('message', function(event){ 
        //     console.log('主页面收到信息')    
        //     console.log(event)    
        //     // console.log(event.data)
        //     thisObj.checkMessage(event.data)
         
        // }, false);
    }
    render() {
        const { classes, ...rest } = this.props;
        return (
            <div>
                <PagesHeader {...rest} />
                <div className={classes.wrapper} ref="wrapper">
                    <div className={classes.fullPage}>
                        <Switch>
                            {pagesRoutes.map((prop, key) => {
                                if (prop.collapse) {
                                    return null;
                                }
                                if (prop.redirect) {
                                    return (
                                        <Redirect from={prop.path} to={prop.pathTo} key={key} />
                                    );
                                }
                                return (
                                    <Route
                                        path={prop.path}
                                        component={prop.component}
                                        key={key}
                                    />
                                );
                            })}
                        </Switch>
                        <Footer white />
                        <div
                            className={classes.fullPageBackground}
                            style={{ backgroundImage: "url(" + bgImage + ")" }}
                        />
                    </div>
                </div>
                <div id='chatDiv' style={{width:184,height:52,marginTop:-53,marginLeft:document.body.clientWidth-185}}>
                {/* <div id='chatDiv' style={{width:602,height:522,marginTop:-523,marginLeft:document.body.clientWidth-603}}> */}
                {/* <iframe id='chatIframe' style={{width:184,height:52,zIndex:9999,position:'relative',border:0}} src="http://localhost:3001/user?tenantId=502883989623668736&userId=12345&userName=uer01"> */}
                {/* <iframe id='chatIframe' style={{width:602,height:522,zIndex:9999,position:'relative',border:0,background:'#fff'}} src="http://localhost:3001/user?tenantId=502883989623668736&userId=12345&userName=uer01"> */}
                {/* <iframe style={{width:document.body.clientWidth*0.49,height:document.body.clientHeight*0.49,zIndex:9999,position:'relative',border:0,background:'#fff',right:-document.body.clientHeight,top:-document.body.clientHeight}} src="http://localhost:3001/user"> */}
                    {/* <p>浏览器不支持iframe</p> */}
                {/* </iframe> */}
                </div>
                
            </div>
        );
    }
}
const mapStateToProps = (state) => {
    return{
        app: state.app
    }
}
const mapDispatchToProps = (dispatch) => {
    return{
        appReduxTest: () => {
            dispatch(appReduxTest())
        },
        appReduxChange: () => {
            dispatch(appReduxChange())
        }
    }
}
LoginPages.propTypes = {
    classes: PropTypes.object.isRequired
};

export default connect(mapStateToProps,mapDispatchToProps)(withStyles(pagesStyle)(LoginPages));
