import React from "react";
// nodejs library that concatenates classes
import classNames from "classnames";
// nodejs library to set properties for components
import PropTypes from "prop-types";
// @material-ui/core components
import withStyles from "@material-ui/core/styles/withStyles";
import echarts from "echarts/lib/echarts";
import 'echarts/lib/chart/bar';
import 'echarts/lib/component/tooltip';
import 'echarts/lib/component/title';
import 'echarts/lib/component/grid';
// @material-ui/icons

// core components
import cardIconStyle from "assets/jss/material-dashboard-pro-react/components/cardIconStyle.jsx";

//function CardIcon({ ...props }) {
//const { classes, className, children, color, ...rest } = props;
//const cardIconClasses = classNames({
//  [classes.cardIcon]: true,
//  [classes[color + "CardHeader"]]: color,
//  [className]: className !== undefined
//});
//return (
//  <div className={cardIconClasses} {...rest}>
//    {children}
//  </div>
//);
//}
//
//CardIcon.propTypes = {
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
class Echartthree extends React.Component {
	componentDidMount() {
		const mychart = echarts.init(document.getElementById('echartthree'));
		mychart.setOption({
				title: {
					left: "center"
				},
				grid: {
					left: "10%",
					right: "10%",
					top: "10%",
					bottom: "20%"
				},
				tooltip: {
					trigger:"axis"
				},
				xAxis: {
					data: ["机器人1号", "机器人2号", "机器人3号", "机器人4号", "机器人5号", "机器人6号", "机器人7号", "机器人8号", "机器人9号", "机器人10号", "机器人11号", "机器人12号"]
				},
				yAxis: [{
					name:'对话量',
					max:50,
					splitNumber:3,
					type:"value",
					interval:10,
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
				},{
					name: '时间总长',
					max:200,
					splitNumber:3,
					interval:40,
					type:"value",
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
				}],
				series: [{
						name: '对话量',
						type: 'bar',
						barWidth: 30,
						itemStyle: {
							normal: {
								color: function(params) {
									var colorList = ['rgb(164,205,238)', 'rgb(42,170,227)', 'rgb(25,46,94)', 'rgb(195,229,235)'];
									return colorList[params.dataIndex];
								}

							}
						},
						data: [5, 20, 36, 10, 10, 20, 11, 23, 2, 12, 11, 51]
					}, {
						name: '时间总长',
						yAxisIndex:1,
						type: 'line',
						itemStyle: {
							normal: {
								lineStyle: {
									width: 2,
									type: "dotted"
								}
							}

						},
						data: [23, 112, 156, 42, 51, 114, 54, 123, 9, 45, 89, 188]
					}]
		});
}
render() {
	return(
		<div id="echartthree" className="echartcenter" style={{width:900,height:400}}></div>
	)
}
}

export default withStyles(cardIconStyle)(Echartthree);