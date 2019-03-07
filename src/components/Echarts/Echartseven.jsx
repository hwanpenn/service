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

import cardAvatarStyle from "assets/jss/material-dashboard-pro-react/components/cardAvatarStyle.jsx";
import axios from "../../Utils/axios";

class Echartseven extends React.Component {
    componentDidMount() {

        let createTime,createTimeCount1,createTime1
        let time = []
        let count = []
        let countArray = []
        let totalCountArray=[]
        let keys = []
        let createTime2 = []
        let series1 = []
        let robotDialogData
        axios.get('/cs/api/index/').then((res) => {
            robotDialogData = res.data.rows.robotDialogData;
            const mychart = echarts.init(document.getElementById('echartseven'));
            //获取不同的聊天时间
            for (let key in robotDialogData) {
                if (robotDialogData[key] == "") {
                } else {
                    for (let robotDialogDataKey in robotDialogData[key]) {
                        createTime = robotDialogData[key][robotDialogDataKey].createTime
                        time.push(createTime)
                    }

                }
                keys.push(key)
            }
            let totalRobotName = new Array();
            for(let i in keys){
                //该元素在tmp内部不存在才允许追加
                if(totalRobotName.indexOf(keys[i]) < 0){
                    totalRobotName.push(keys[i]);
                }
            }
            //去掉重复的时间

                let tmp = new Array();
                for(let i in time){
                    //该元素在tmp内部不存在才允许追加
                    if(tmp.indexOf(time[i]) < 0){
                        tmp.push(time[i]);
                    }
                }
                tmp.sort();
                tmp.reverse();
            let keys1 = new Array();
            for(let i in keys){
                //该元素在tmp内部不存在才允许追加
                if(keys1.indexOf(keys[i]) < 0){
                    keys1.push(keys[i]);
                }
            }

                //根据时间去遍历得到当前时间下的聊天机器人极其数据
            for(let j=0;j<totalRobotName.length;j++){
                for(let i=0;i<tmp.length;i++) {
                    if(robotDialogData[totalRobotName[j]] == ""){

                    }else{
                        for (let robotDialogDataKey1 in robotDialogData[totalRobotName[j]]) {
                            createTime1 = robotDialogData[totalRobotName[j]][robotDialogDataKey1].createTime
                            createTimeCount1 = robotDialogData[totalRobotName[j]][robotDialogDataKey1].createTimeCount
                            createTime2.push(createTime1)
                        }
                        if(createTime2.length == tmp.length){

                            for (let robotDialogDataKey1 in robotDialogData[totalRobotName[j]]) {
                                createTime1 = robotDialogData[totalRobotName[j]][robotDialogDataKey1].createTime
                                createTimeCount1 = robotDialogData[totalRobotName[j]][robotDialogDataKey1].createTimeCount
                                if (createTime1 === tmp[i]) {
                                    count = createTimeCount1
                                }
                            }
                            countArray.push(count)
                        }else {
                            if (createTime1 === tmp[i]) {
                                count = createTimeCount1
                            }else{
                                count = 0
                            }
                            countArray.push(count)
                        }
                        createTime2=[]
                    }

                }
                totalCountArray.push(countArray)
                countArray=[]
            }

            for(let j in totalRobotName) {
                    const series = {
                        name: totalRobotName[j],    //机器人名称
                        type: 'bar',
                        stack: '总量',
                        barWidth: "40",
                        label: {
                            normal: {
                                show: false,
                                position: 'insideRight'
                            }
                        },
                        data: totalCountArray[j] //机器人对应的数据
                    }
                    series1.push(series)
            }

                mychart.setOption({
                    tooltip: {
                        trigger: 'axis',
                        axisPointer: {            // 坐标轴指示器，坐标轴触发有效
                            type: 'shadow'        // 默认为直线，可选为：'line' | 'shadow'
                        }
                    },
                    legend: {
                        data: totalRobotName    //右上方颜色指示
                    },
                    grid: {
                        left: '10%',
                        right: '10%',
                        bottom: '10%',
                        containLabel: true
                    },
                    xAxis: {
                        type: 'value'
                    },
                    yAxis: {
                        type: 'category',
                        data: tmp          //y轴时间
                    },
                    series: series1
                });
        }).catch((err) => {
            console.log(err)
        })
    }
    render(){
        return(
            <div id="echartseven" className="echartcenter" style={{width:550,height:450,marginLeft:-40}}></div>
        )
    }
}

export default withStyles(cardAvatarStyle)(Echartseven);
