import React from "react";
// nodejs library that concatenates classes
import classNames from "classnames";
// nodejs library to set properties for components
/*按需加载*/
import echarts from "echarts/lib/echarts";
import 'echarts/lib/chart/line';
import 'echarts/lib/component/tooltip';
import 'echarts/lib/component/title';
import 'echarts/lib/component/grid';
// @material-ui/core components
import withStyles from "@material-ui/core/styles/withStyles";
// @material-ui/icons

// core components
import cardTextStyle from "assets/jss/material-dashboard-pro-react/components/cardTextStyle.jsx";

//function CardText({ ...props }) {
//const { classes, className, children, color, ...rest } = props;
//const cardTextClasses = classNames({
//  [classes.cardText]: true,
//  [classes[color + "CardHeader"]]: color,
//  [className]: className !== undefined
//});
//return (
//  <div className={cardTextClasses} {...rest}>
//    {children}
//  </div>
//);
//}

//CardText.propTypes = {
//classes: PropTypes.object.isRequired,
//className: PropTypes.string,
//color: PropTypes.oneOf([
//  "warning",
//  "success",
//  "danger",
//  "info",
//  "primary",
//  "rose"
//])
//};
class Echarttwo extends React.Component {
	componentDidMount() {
		const mychart = echarts.init(document.getElementById('second'));
		mychart.setOption({
			title: {
				text: "示例",
				left: "center"
			},
			grid: {
				left: "10%",
				top: "10%",
				bottom: "20%",
				right: "10%"
			},
			tooltip: {
				formatter: function(params) {
					console.log(params);
					return params.name + '：' + params.data + "件"
				}
			},
			xAxis: {
				data: ["案例一", "案例二", "案例三", "案例四", "案例五", "案例六"]
			},
			yAxis: {
				splitNumber: 3,
				axisLine: {
					show: false
				},
				axisTick: {
					show: false
				},
				splitLine: {
					lineStyle: {
						type: "dotted"
					}
				}
			},
			series: [{
				name: '销量',
				type: 'line',
				data: [5, 20, 36, 10, 10, 20],
				itemStyle:{
					normal:{
						lineStyle:{
							width:2,
							type:"dotted"
						}
					}
				}
			}]
		});
	}
	render() {
		return(
			<div id="second" className="echartcenter" style={{width:400,height:400}}></div>
		)
	}
}

export default withStyles(cardTextStyle)(Echarttwo);