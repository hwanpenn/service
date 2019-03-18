import React from "react";
// nodejs library that concatenates classes
import classNames from "classnames";
// nodejs library to set properties for components
import PropTypes from "prop-types";

import echarts from "echarts";
import withStyles from "@material-ui/core/styles/withStyles";

import cardHeaderStyle from "assets/jss/material-dashboard-pro-react/components/cardHeaderStyle.jsx";

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
                roseType: 'angle',
				center:["50%","50%"],
				radius: "60%",
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