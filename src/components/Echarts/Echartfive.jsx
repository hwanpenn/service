import React from "react";
// nodejs library that concatenates classes
import classNames from "classnames";
// nodejs library to set properties for components
import PropTypes from "prop-types";
import echarts from "echarts"
// @material-ui/core components
import withStyles from "@material-ui/core/styles/withStyles";
// @material-ui/icons

// core components
import cardFooterStyle from "assets/jss/material-dashboard-pro-react/components/cardFooterStyle.jsx";

//function CardFooter({ ...props }) {
//const {
//  classes,
//  className,
//  children,
//  plain,
//  profile,
//  pricing,
//  testimonial,
//  stats,
//  chart,
//  product,
//  ...rest
//} = props;
//const cardFooterClasses = classNames({
//  [classes.cardFooter]: true,
//  [classes.cardFooterPlain]: plain,
//  [classes.cardFooterProfile]: profile || testimonial,
//  [classes.cardFooterPricing]: pricing,
//  [classes.cardFooterTestimonial]: testimonial,
//  [classes.cardFooterStats]: stats,
//  [classes.cardFooterChart]: chart || product,
//  [className]: className !== undefined
//});
//return (
//  <div className={cardFooterClasses} {...rest}>
//    {children}
//  </div>
//);
//}
//
//CardFooter.propTypes = {
//classes: PropTypes.object.isRequired,
//className: PropTypes.string,
//plain: PropTypes.bool,
//profile: PropTypes.bool,
//pricing: PropTypes.bool,
//testimonial: PropTypes.bool,
//stats: PropTypes.bool,
//chart: PropTypes.bool,
//product: PropTypes.bool
//};


class Echartfive extends React.Component {
	componentDidMount() {
		const mychart = echarts.init(document.getElementById('squaretree'));
		mychart.setOption({
			tooltip: {
				trigger: "item",
				formatter:function(p){
					return p.data.name+":"+p.data.value+"分钟"
				}
			},
			series: [{
				name: '销量',
				type: 'treemap',
				center:["50%","50%"],
				radius: ["35%", "55%"],
				avoidLabelOverlap: false,
				label: {
					normal: {
						show: true,
					},
					emphasis: {
						show: true,
					}
				},
				 itemStyle: {
				  normal: {
						  label: {
							  show: true,
							  formatter: "{b}"
							  
						  },
						borderWidth: 2,
					borderColor: '#ffffff',
					  },
					 
				  },
				data: [{
						value: 315,
						name: '机器人一'
					},
					{
						value: 310,
						name: '机器人二'
					},
					{
						value: 234,
						name: '机器人三'
					},
					{
						value: 135,
						name: '机器人四'
					}
				]
			}]
		});
	}
	render() {
		return(
			<div id="squaretree" className="echartcenter" style={{width:400,height:400}}></div>
		)
	}
}

export default withStyles(cardFooterStyle)(Echartfive);
