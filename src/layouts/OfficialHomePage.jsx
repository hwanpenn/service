import React, {Component} from 'react';
import {appReduxChange, appReduxTest} from "actions/app";
import {connect} from "react-redux";

import PropTypes from "prop-types";
import { Switch, Route, Redirect } from "react-router-dom";

import withStyles from "@material-ui/core/styles/withStyles";

import PagesHeader from "components/Header/PagesHeader.jsx";
import Footer from "components/Footer/Footer.jsx";

import pagesRoutes2 from "routes/officialHomePage.jsx";

import officialHomePageStyle from "assets/jss/material-dashboard-pro-react/layouts/officialHomePageStyle.jsx";

// import image from "../assets/img/homepage3.jpg";
import image from "../assets/img/homepage1.jpg";
// import image from "../assets/img/homepage2.jpg";
let timer1
class OfficialHomePage extends Component {

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

    }
    componentDidMount(){

    }
    render() {
        const { classes, ...rest } = this.props;
        return (
            <div>
                <div className={classes.wrapper}>
                    <div className={classes.fullPage}>
                        <Switch>
                            {pagesRoutes2.map((prop, key) => {
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
                        <div
                            className={classes.fullPageBackground}
                            style={{ backgroundImage: "url(" + image + ")",marginTop:60,}}
                        />
                    </div>
                </div>
                <div id='chatDiv' style={{width:184,height:52,marginTop:-53,marginLeft:document.body.clientWidth-185}}>
                </div>

            </div>
        );
    }
}
// const mapStateToProps = (state) => {
//     return{
//         app: state.app
//     }
// }
// const mapDispatchToProps = (dispatch) => {
//     return{
//         appReduxTest: () => {
//             dispatch(appReduxTest())
//         },
//         appReduxChange: () => {
//             dispatch(appReduxChange())
//         }
//     }
// }
OfficialHomePage.propTypes = {
    classes: PropTypes.object.isRequired
};

export default withStyles(officialHomePageStyle)(OfficialHomePage);
