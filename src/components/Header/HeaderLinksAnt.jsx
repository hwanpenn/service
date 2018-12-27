import React from "react";
import classNames from "classnames";
import PropTypes from "prop-types";
import { Manager, Target, Popper } from "react-popper";

// @material-ui/core components
import withStyles from "@material-ui/core/styles/withStyles";
import MenuItem from "@material-ui/core/MenuItem";
import MenuList from "@material-ui/core/MenuList";
import ClickAwayListener from "@material-ui/core/ClickAwayListener";
import Paper from "@material-ui/core/Paper";
import Grow from "@material-ui/core/Grow";
import Hidden from "@material-ui/core/Hidden";

// @material-ui/icons
// import Person from "@material-ui/icons/Person";
import Notifications from "@material-ui/icons/Notifications";
// import Dashboard from "@material-ui/icons/Dashboard";
// import Search from "@material-ui/icons/Search";

// core components
// import CustomInput from "components/CustomInput/CustomInput.jsx";
import UIButton from "components/CustomButtons/Button.jsx";
import Grid from '@material-ui/core/Grid';

import headerLinksStyle from "assets/jss/material-dashboard-pro-react/components/headerLinksStyle";
import { Avatar } from 'antd';

let lastName = '空'
// let realName = window.sessionStorage.getItem('realName')
// if(realName===''||realName===null||realName===undefined){
// }else{
//  lastName =  realName.substring(realName.length-1)
// }

const UserList = [lastName];

const colorList = ['#f56a00', '#7265e6', '#ffbf00', '#00a2ae'];
class HeaderLinks extends React.Component {
    constructor(props) {
        super(props);
        this.state = {
            user: UserList[0],
            color: colorList[0],
            realName:''
        };
    }
    componentWillMount(){
        // const realName = window.sessionStorage.getItem('realName');
        // let lastName = '空'
        let realName = window.sessionStorage.getItem('realName')
        if(realName===''||realName===null||realName===undefined){
        
        }else{
         lastName =  realName.substring(realName.length-1)
        }
        
        this.setState({
            realName:lastName
        })
}
    changeUser = () => {
        const index = UserList.indexOf(this.state.user);
        this.setState({
            user: index < UserList.length - 1 ? UserList[index + 1] : UserList[0],
            color: index < colorList.length - 1 ? colorList[index + 1] : colorList[0],
        });
    }
  state = {
    open: false
  };
  handleClick = () => {
    this.setState({ open: !this.state.open });
  };
  handleClose = () => {
    this.setState({ open: false });
  };
  render() {
    const { classes, rtlActive } = this.props;
    const { open } = this.state;
    // const searchButton =
    //   classes.top +
    //   " " +
    //   classes.searchButton +
    //   " " +
    //   classNames({
    //     [classes.searchRTL]: rtlActive
    //   });
    const dropdownItem =
      classes.dropdownItem +
      " " +
      classNames({
        [classes.dropdownItemRTL]: rtlActive
      });
    const wrapper = classNames({
      [classes.wrapperRTL]: rtlActive
    });
    const managerClasses = classNames({
      [classes.managerClasses]: true
    });
    return (
      <div className={wrapper}>
          <Grid container spacing={24}>
              <Grid item xs={6}>
                  {/*<Paper className={classes.paper}>xs=6</Paper>*/}
                  <Manager className={managerClasses}>
                      <Target>
                          <UIButton
                              color="transparent"
                              justIcon
                              aria-label="Notifications"
                              aria-owns={open ? "menu-list" : null}
                              aria-haspopup="true"
                              onClick={this.handleClick}
                              className={rtlActive ? classes.buttonLinkRTL : classes.buttonLink}
                              muiClasses={{
                                  label: rtlActive ? classes.labelRTL : ""
                              }}
                          >
                              <Notifications
                                  className={
                                      classes.headerLinksSvg +
                                      " " +
                                      (rtlActive
                                          ? classes.links + " " + classes.linksRTL
                                          : classes.links)
                                  }
                              />
                              {/* <span className={classes.notifications}>5</span> */}
                              <Hidden mdUp>
                <span onClick={this.handleClick} className={classes.linkText}>
                  {rtlActive ? "إعلام" : "Notification"}
                </span>
                              </Hidden>
                          </UIButton>
                      </Target>
                      <Popper
                          placement="bottom-start"
                          eventsEnabled={open}
                          className={
                              classNames({ [classes.popperClose]: !open }) +
                              " " +
                              classes.pooperResponsive
                          }
                      >
                          <ClickAwayListener onClickAway={this.handleClose}>
                              {/* <Grow
                                  in={open}
                                  id="menu-list"
                                  style={{ transformOrigin: "0 0 0" }}
                              > */}
                                  {/* <Paper className={classes.dropdown}> */}
                                      {/* <MenuList role="menu"> */}
                                          {/* <MenuItem
                                              onClick={this.handleClose}
                                              className={dropdownItem}
                                          >
                                              {rtlActive
                                                  ? "إجلاء أوزار الأسيوي حين بل, كما"
                                                  : "Mike John responded to your email"}
                                          </MenuItem>
                                          <MenuItem
                                              onClick={this.handleClose}
                                              className={dropdownItem}
                                          >
                                              {rtlActive
                                                  ? "شعار إعلان الأرضية قد ذلك"
                                                  : "You have 5 new tasks"}
                                          </MenuItem>
                                          <MenuItem
                                              onClick={this.handleClose}
                                              className={dropdownItem}
                                          >
                                              {rtlActive
                                                  ? "ثمّة الخاصّة و على. مع جيما"
                                                  : "You're now friend with Andrew"}
                                          </MenuItem>
                                          <MenuItem
                                              onClick={this.handleClose}
                                              className={dropdownItem}
                                          >
                                              {rtlActive ? "قد علاقة" : "Another Notification"}
                                          </MenuItem>
                                          <MenuItem
                                              onClick={this.handleClose}
                                              className={dropdownItem}
                                          >
                                              {rtlActive ? "قد فاتّبع" : "Another One"}
                                          </MenuItem> */}
                                      {/* </MenuList> */}
                                  {/* </Paper> */}
                              {/* </Grow> */}
                          </ClickAwayListener>
                      </Popper>
                  </Manager>
              </Grid>
              <Grid style={{textAlign:'right',marginLeft:-10}} item xs={6}>
                  <div>
                      <Avatar style={{ backgroundColor: this.state.color, verticalAlign: 'middle' ,marginRight:15,marginTop:5}} size="large">
                          {this.state.realName}
                      </Avatar>
                      {/*<Button size="small" style={{ marginLeft: 16, verticalAlign: 'middle' }} onClick={this.changeUser}>*/}
                          {/*Change*/}
                      {/*</Button>*/}
                  </div>
              </Grid>

          </Grid>

      </div>
    );
  }
}

HeaderLinks.propTypes = {
  classes: PropTypes.object.isRequired,
  rtlActive: PropTypes.bool
};

export default withStyles(headerLinksStyle)(HeaderLinks);
