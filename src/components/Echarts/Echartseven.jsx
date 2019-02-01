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

//function CardAvatar({ ...props }) {
//const {
//  classes,
//  children,
//  className,
//  plain,
//  profile,
//  testimonial,
//  testimonialFooter,
//  ...rest
//} = props;
//const cardAvatarClasses = classNames({
//  [classes.cardAvatar]: true,
//  [classes.cardAvatarProfile]: profile,
//  [classes.cardAvatarPlain]: plain,
//  [classes.cardAvatarTestimonial]: testimonial,
//  [classes.cardAvatarTestimonialFooter]: testimonialFooter,
//  [className]: className !== undefined
//});
//return (
//  <div className={cardAvatarClasses} {...rest}>
//    {children}
//  </div>
//);
//}
//
//CardAvatar.propTypes = {
//children: PropTypes.node.isRequired,
//className: PropTypes.string,
//profile: PropTypes.bool,
//plain: PropTypes.bool,
//testimonial: PropTypes.bool,
//testimonialFooter: PropTypes.bool
//};
class Echartseven extends React.Component {
	componentDidMount() {
		const mychart = echarts.init(document.getElementById('echartseven'));
		mychart.setOption({
    tooltip : {
        trigger: 'axis',
        axisPointer : {            // 坐标轴指示器，坐标轴触发有效
            type : 'shadow'        // 默认为直线，可选为：'line' | 'shadow'
        }
    },
    legend: {
        data: ['客户一', '客户二','客户三','客户四','客户五']
    },
    grid: {
        left: '10%',
        right: '10%',
        bottom: '10%',
        containLabel: true
    },
    xAxis:  {
        type: 'value'
    },
    yAxis: {
        type: 'category',
        data: ['周一','周二','周三','周四','周五','周六','周日']
    },
    series: [
        {
            name: '客户一',
            type: 'bar',
            stack: '总量',
            label: {
                normal: {
                    show: false,
                    position: 'insideRight'
                }
            },
            data: [320, 302, 301, 334, 390, 330, 320]
        },
        {
            name: '客户二',
            type: 'bar',
            stack: '总量',
            label: {
                normal: {
                    show: false,
                    position: 'insideRight'
                }
            },
            data: [120, 132, 101, 134, 90, 230, 210]
        },
        {
            name: '客户三',
            type: 'bar',
            stack: '总量',
            label: {
                normal: {
                    show: false,
                    position: 'insideRight'
                }
            },
            data: [220, 182, 191, 234, 290, 330, 310]
        },
        {
            name: '客户四',
            type: 'bar',
            stack: '总量',
            label: {
                normal: {
                    show: false,
                    position: 'insideRight'
                }
            },
            data: [150, 212, 201, 154, 190, 330, 410]
        },
        {
            name: '客户五',
            type: 'bar',
            stack: '总量',
            label: {
                normal: {
                    show: false,
                    position: 'insideRight'
                }
            },
            data: [820, 832, 901, 934, 1290, 1330, 1320]
        }
    ]
		});	
	}
	
	render() {
		return(			
                 <div id="echartseven" className="echartcenter" style={{width:550,height:450}}></div>            	
		)
	}
}

export default withStyles(cardAvatarStyle)(Echartseven);
