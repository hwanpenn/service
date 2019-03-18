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
import cardBodyStyle from "assets/jss/material-dashboard-pro-react/components/cardBodyStyle.jsx";

//function CardBody({ ...props }) {
//const {
//  classes,
//  className,
//  children,
//  background,
//  plain,
//  formHorizontal,
//  pricing,
//  signup,
//  color,
//  profile,
//  calendar,
//  ...rest
//} = props;
//const cardBodyClasses = classNames({
//  [classes.cardBody]: true,
//  [classes.cardBodyBackground]: background,
//  [classes.cardBodyPlain]: plain,
//  [classes.cardBodyFormHorizontal]: formHorizontal,
//  [classes.cardPricing]: pricing,
//  [classes.cardSignup]: signup,
//  [classes.cardBodyColor]: color,
//  [classes.cardBodyProfile]: profile,
//  [classes.cardBodyCalendar]: calendar,
//  [className]: className !== undefined
//});
//return (
//  <div className={cardBodyClasses} {...rest}>
//    {children}
//  </div>
//);
//}
//
//CardBody.propTypes = {
//classes: PropTypes.object.isRequired,
//className: PropTypes.string,
//background: PropTypes.bool,
//plain: PropTypes.bool,
//formHorizontal: PropTypes.bool,
//pricing: PropTypes.bool,
//signup: PropTypes.bool,
//color: PropTypes.bool,
//profile: PropTypes.bool,
//calendar: PropTypes.bool
//};
class Echartsix extends React.Component {
	componentDidMount() {
		const mychart = echarts.init(document.getElementById('echartsix'));
		mychart.setOption({
			angleAxis: {
				type: 'category',
				data: ['客服一', '客服二', '客服三',
					'客服四', '客服五', '客服六', '客服七', '客服八', '客服九', '客服十', '客服十一', '客服十二', '客服十三', '客服十四', '客服十五', '客服十六', '客服十七'
				],
				axisLine: {
					show: false
				},
				axisTick: {
					show: false
				},
				z: 10
			},
			
			radiusAxis: {
				max: 100,
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
			polar: {
				radius:"65%"
			},
			tooltip: {
				trigger: 'axis',
				formatter: '通过率：{c}%',
			},
			series: [{
				type: 'bar',
				data: [42, 22, 25, 36, 72, 8, 13, 9, 29, 35, 36, 72, 8, 13, 9, 29, 35, ],
				coordinateSystem: 'polar',
				name: '通过率',
				stack: 'a',
				itemStyle: {
				normal: {
					color: '#68a2a9',
				}
			},
			}]
		});
	}

	render() {
		return(
			<div id="echartsix" className="echartcenter" style={{width:400,height:450}}></div>
		)
	}
}

export default withStyles(cardBodyStyle)(Echartsix);