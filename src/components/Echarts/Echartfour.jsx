import React from "react";
// nodejs library that concatenates classes
import classNames from "classnames";
// nodejs library to set properties for components
import PropTypes from "prop-types";

import echarts from "echarts";
// @material-ui/core components
import withStyles from "@material-ui/core/styles/withStyles";
// @material-ui/icons
// core components
import cardHeaderStyle from "assets/jss/material-dashboard-pro-react/components/cardHeaderStyle.jsx";

//function CardHeader({ ...props }) {
//const {
//  classes,
//  className,
//  children,
//  color,
//  plain,
//  image,
//  contact,
//  signup,
//  stats,
//  icon,
//  text,
//  ...rest
//} = props;
//const cardHeaderClasses = classNames({
//  [classes.cardHeader]: true,
//  [classes[color + "CardHeader"]]: color,
//  [classes.cardHeaderPlain]: plain,
//  [classes.cardHeaderImage]: image,
//  [classes.cardHeaderContact]: contact,
//  [classes.cardHeaderSignup]: signup,
//  [classes.cardHeaderStats]: stats,
//  [classes.cardHeaderIcon]: icon,
//  [classes.cardHeaderText]: text,
//  [className]: className !== undefined
//});
//return (
//  <div className={cardHeaderClasses} {...rest}>
//    {children}
//  </div>
//);
//}
//
//CardHeader.propTypes = {
//classes: PropTypes.object.isRequired,
//className: PropTypes.string,
//color: PropTypes.oneOf([
//  "warning",
//  "success",
//  "danger",
//  "info",
//  "primary",
//  "rose"
//]),
//plain: PropTypes.bool,
//image: PropTypes.bool,
//contact: PropTypes.bool,
//signup: PropTypes.bool,
//stats: PropTypes.bool,
//icon: PropTypes.bool,
//text: PropTypes.bool
//};

class Echartfour extends React.Component {
	componentDidMount() {
		const mychart = echarts.init(document.getElementById('second'));
		mychart.setOption({
			tooltip: {
				trigger: "item",
				formatter:function(p){
					return p.data.name+":"+p.data.value+"分钟"
				}
			},
			series: [{
				name: '销量',
				type: 'pie',
				center:["50%","50%"],
				radius: ["35%", "55%"],
				avoidLabelOverlap: false,
				label: {
					normal: {
						show: true,
					},
					emphasis: {
						show: true,
					}
				},
				labelLine: {
					normal: {
						show: true
					}
				},
				data: [{
						value: 315,
						name: '客服一'
					},
					{
						value: 310,
						name: '客服二'
					},
					{
						value: 234,
						name: '客服三'
					},
					{
						value: 135,
						name: '客服四'
					}
				]
			}]
		});
	}
	render() {
		return(
			<div id="second" className="echartcenter" style={{width:400,height:400}}></div>
		)
	}
}

export default withStyles(cardHeaderStyle)(Echartfour);