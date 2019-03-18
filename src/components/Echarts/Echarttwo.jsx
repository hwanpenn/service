import React from "react";
/*按需加载*/
import echarts from "echarts/lib/echarts";
import 'echarts/lib/chart/line';
import 'echarts/lib/component/tooltip';
import 'echarts/lib/component/title';
import 'echarts/lib/component/grid';

import withStyles from "@material-ui/core/styles/withStyles";

import cardTextStyle from "assets/jss/material-dashboard-pro-react/components/cardTextStyle.jsx";

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
					return params.name + '：' + params.data + "个"
				}
			},
			xAxis: {
				data: ["问题"]
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
				name: '总数',
				type: 'bar',
				data: [75],
				barWidth:40,
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