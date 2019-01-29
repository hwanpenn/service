import {Component} from "react";
import React from "react";

// 引入 ECharts 主模块
import echarts from 'echarts/lib/echarts';
// 引入柱状图
import  'echarts/lib/chart/bar';
// 引入提示框和标题组件
import 'echarts/lib/component/tooltip';
import 'echarts/lib/component/title';



class Suggestion1 extends React.Component{
    constructor(propos){
        super(propos)
        this.state = {
            sales:[5, 20,10],//销量
            type:'',//种类
            quantity:"",//数量
        }
    }
    componentWillMount() {

    }

    componentDidMount(){
        var myChart = echarts.init(document.getElementById('main1'));
        var option = {
            title: {
                text: '投诉建议数据'
            },
            tooltip: {},
            legend: {
                data: ['销量']
            },
            xAxis: {
                data: ["投诉", "建议","123"]
            },
            yAxis: {},
            series: [{
                name: '销量',
                type: 'bar',
                data: this.state.sales
            }]
        };
        myChart.setOption(option)
    }

    render(){
        return (
            <div id='main1' style={{width: '400px',height:'400px'}}>
            </div>
        )
    }
}
export default Suggestion1