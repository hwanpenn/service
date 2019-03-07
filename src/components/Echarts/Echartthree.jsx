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
import axios from "../../Utils/axios";

class Echartthree extends React.Component {

	componentDidMount() {
	    let keys=[]
        let creatCount=[]
        axios.get('/cs/api/index/').then((res)=>{
        	console.log(res,"res")

			const mychart = echarts.init(document.getElementById('echartthree'));
			for(const key in res.data.rows.robotLearn){
                keys.push(key)
                creatCount.push(res.data.rows.robotLearn[key])
            }
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
                        data: keys//[key]
                    },
                    yAxis: [{
                        name:'学习总数',
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
                        data: creatCount//[res.data.rows.robotLearn[key]]
                    }]
                });



        }).catch((err)=>{
            console.log(err)
        })

}
render() {
	return(
		<div id="echartthree" className="echartcenter" style={{width:900,height:400}}></div>
	)
}
}

export default withStyles(cardIconStyle)(Echartthree);