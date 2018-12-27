import React from "react";
import cx from "classnames";
import PropTypes from "prop-types";
import { Switch, Route, Redirect } from "react-router-dom";
import PerfectScrollbar from "perfect-scrollbar";
import "perfect-scrollbar/css/perfect-scrollbar.css";
import withStyles from "@material-ui/core/styles/withStyles";
import Header from "components/Header/Header.jsx";
import Footer from "components/Footer/Footer.jsx";
import Sidebar from "components/Sidebar/Sidebar.jsx";
import homePages from "routes/homePages.jsx";
import adminPages from "routes/adminPages.jsx";
import centerPages from "routes/centerPages.jsx";
import appStyle from "assets/jss/material-dashboard-pro-react/layouts/dashboardStyle.jsx";
import image from "assets/img/sidebar-2.jpg";
import logo from "assets/img/shineyuelogo.png";

const role = window.sessionStorage.getItem('role');
const adminRoutes = (
  <Switch>
    {adminPages.map((prop, key) => {
      if (prop.redirect)
        return <Redirect from={prop.path} to={prop.pathTo} key={key} />;
      if (prop.collapse)
        return prop.views.map((prop, key) => {
          return (
            <Route path={prop.path} component={prop.component} key={key} />
          );
        });
      return <Route path={prop.path} component={prop.component} key={key} />;
    })}
  </Switch>
);
const homeRoutes = (
  <Switch>
    {homePages.map((prop, key) => {
      if (prop.redirect)
        return <Redirect from={prop.path} to={prop.pathTo} key={key} />;
      if (prop.collapse)
        return prop.views.map((prop, key) => {
          return (
            <Route path={prop.path} component={prop.component} key={key} />
          );
        });
      return <Route path={prop.path} component={prop.component} key={key} />;
    })}
  </Switch>
);
const centerRoutes = (
  <Switch>
    {homePages.map((prop, key) => {
      if (prop.redirect)
        return <Redirect from={prop.path} to={prop.pathTo} key={key} />;
      if (prop.collapse)
        return prop.views.map((prop, key) => {
          return (
            <Route path={prop.path} component={prop.component} key={key} />
          );
        });
      return <Route path={prop.path} component={prop.component} key={key} />;
    })}
  </Switch>
);
let switchRoutes = homeRoutes
let pageRoutes = homePages
let timer2

var ps;

class HomePages extends React.Component {
  componentWillMount() {
      // document.removeEventListener("keydown",this.handleEenterKey);
      timer2=window.setTimeout(this.refresh,500);
      const userSession = window.sessionStorage.getItem('token');
      console.log(userSession)
      if(userSession===null||userSession===undefined||userSession===''){
          this.props.history.push("/cms/login");
      }else {
      }
      const role = window.sessionStorage.getItem('role');
      if(role==='ROLE_SUPERADMIN'){
        pageRoutes=adminPages
        switchRoutes=adminRoutes
      }
      // if(role==='ROLE_ADMIN'){
      //   pageRoutes=homePages
      //   switchRoutes=homeRoutes
      // }
      else{
        pageRoutes=homePages
        switchRoutes=homeRoutes
      }
  }
  state = {
    mobileOpen: false,
    miniActive: false
  };
  handleEnterKey = (e) => {
    // console.log(e.keyCode)
    if(e.keyCode === 13){
        this.handleClick()
    }
}
  refresh = ()=> {
    // console.log('remark')
    if(document.getElementById("layui-layer2")===null){
      // console.log('没有layui-layer2')
    }else{
      if(window.sessionStorage.getItem('customerFlag')===true||window.sessionStorage.getItem('customerFlag')==='true'){
        // console.log('客服显示layui-layer2')
        document.getElementById("layui-layer2").style.display='block'
        // document.getElementById("layui-layer1").style.display='block'
        clearInterval(this.timerID);
      }else{
        // console.log('不是客服不显示layui-layer2')
        document.getElementById("layui-layer2").style.display='none'
        // document.getElementById("layui-layer1").style.display='none'
        clearInterval(this.timerID);
      } 
  } 
  }
  handleDrawerToggle = () => {
    this.setState({ mobileOpen: !this.state.mobileOpen });
  };
  getRoute() {
    return this.props.location.pathname !== "/maps/full-screen-maps";
  }
  componentDidMount() {
    // console.log('主页添加定时器')
    this.timerID = setInterval(
      () => this.refresh(),
      500
    );
     
    if (navigator.platform.indexOf("Win") > -1) {
      ps = new PerfectScrollbar(this.refs.mainPanel, {
        suppressScrollX: true,
        suppressScrollY: false
      });
      document.body.style.overflow = "hidden";
    }
  }
  componentWillUnmount() {
    clearInterval(this.timerID);
    if (navigator.platform.indexOf("Win") > -1) {
      ps.destroy();
    }
  }
  componentDidUpdate(e) {
    if (e.history.location.pathname !== e.location.pathname) {
      this.refs.mainPanel.scrollTop = 0;
      if(this.state.mobileOpen){
        this.setState({mobileOpen: false})
      }
    }
  }
  sidebarMinimize() {
    this.setState({ miniActive: !this.state.miniActive });
  }
  render() {
    const { classes, ...rest } = this.props;
    const mainPanel =
      classes.mainPanel +
      " " +
      cx({
        [classes.mainPanelSidebarMini]: this.state.miniActive,
        [classes.mainPanelWithPerfectScrollbar]:
          navigator.platform.indexOf("Win") > -1
      });
    return (
      <div className={classes.wrapper}>
      
        <Sidebar
          routes={pageRoutes}
          logoText={"神玥客服"}
          logo={logo}
          image={image}
          handleDrawerToggle={this.handleDrawerToggle}
          open={this.state.mobileOpen}
          color="blue"
          bgColor="black"
          miniActive={this.state.miniActive}
          {...rest}
        />

        <div className={mainPanel} ref="mainPanel">
          <Header
            sidebarMinimize={this.sidebarMinimize.bind(this)}
            miniActive={this.state.miniActive}
            routes={pageRoutes}
            handleDrawerToggle={this.handleDrawerToggle}
            {...rest}
          />
          {/* On the /maps/full-screen-maps route we want the map to be on full screen - this is not possible if the content and conatiner classes are present because they have some paddings which would make the map smaller */}
          {this.getRoute() ? (
            <div className={classes.content}>
              <div className={classes.container}>{switchRoutes}</div>
            </div>
          ) : (
            <div className={classes.map}>{switchRoutes}</div>
          )}
          {this.getRoute() ? <Footer fluid /> : null}
        </div>

        {/* <div style={{background:'#666666',width:'100%',height:'100%',zIndex:8888,position:'relative'}}> */}
            {/* <iframe style={{width:'50%',height:'50%',zIndex:9999,position:'relative',top:-document.body.clientHeight}} src="http://www.runoob.com">
                <p>您的浏览器不支持  iframe 标签。</p>
            </iframe> */}
            {/* <iframe style={{border:0,width:"100%",height:630,}} src="http://www.runoob.com"/> */}
        {/* </div> */}
      </div>
    );
  }
}

HomePages.propTypes = {
  classes: PropTypes.object.isRequired
};

export default withStyles(appStyle)(HomePages);
