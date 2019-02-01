import React from "react";
// nodejs library that concatenates classes
import classNames from "classnames";
/*按需加载*/
import echarts from "echarts/lib/echarts";
import 'echarts/lib/chart/bar';
import 'echarts/lib/component/tooltip';
import 'echarts/lib/component/title';
import 'echarts/lib/component/grid';

// nodejs library to set properties for components
import PropTypes from "prop-types";
// @material-ui/core components
import withStyles from "@material-ui/core/styles/withStyles";
// @material-ui/icons

// core components
import cardStyle from "assets/jss/material-dashboard-pro-react/components/cardStyle.jsx";


class Echartone extends React.Component {
	componentDidMount() {
		const mychart = echarts.init(document.getElementById('main'));
		mychart.setOption({
			title: {
				text: "示例",
				left: "center"
			},
			grid: {
				left: "10%",
				right: "10%",
				top: "10%",
				bottom: "20%"
			},
			tooltip: {
				formatter: function(params) {
					console.log(params);
					return params.name + '：' + params.data + "件"
				}
			},
			xAxis: {
				data: ["衬衫", "羊毛衫", "雪纺衫", "裤子", "高跟鞋", "袜子"]
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
				data: [5, 20, 36, 10, 10, 20]
			}]
		});	
	}
	
	render() {
		return(			
                 <div id="main" className="echartcenter" style={{width:400,height:400}}></div>            	
		)
	}
}

export default withStyles(cardStyle)(Echartone);