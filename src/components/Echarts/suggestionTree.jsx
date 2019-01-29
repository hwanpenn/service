import {Component} from "react";
import React from "react";

// 引入 ECharts 主模块
import echarts from 'echarts/lib/echarts';
// 引入柱状图
import  'echarts/lib/chart/bar';
// 引入提示框和标题组件
import 'echarts/lib/component/tooltip';
import 'echarts/lib/component/title';



class Suggestion extends React.Component{
    constructor(propos){
        super(propos)
        this.state = {
            sales:'',//销量
            type:'',//种类
            quantity:"",//数量
        }
    }
    componentWillMount() {

    }

    componentDidMount(){
        var myChart = echarts.init(document.getElementById('main'));
        var option = {
            title: {
                text: 'ECharts 入门示例'
            },
            tooltip: {},
            legend: {
                data: ['销量']
            },
            xAxis: {
                data: ["衬衫", "羊毛衫", "雪纺衫", "裤子", "高跟鞋", "袜子"]
            },
            yAxis: {},
            series: [{
                name: '销量',
                type: 'bar',
                data: [5, 20, 36, 10, 10, 20]
            }]
        };
        myChart.setOption(option)
    }

    render(){
        return (
            <div id='main' style={{width: '400px',height:'400px'}}>
            </div>
        )
    }
}
export default Suggestion