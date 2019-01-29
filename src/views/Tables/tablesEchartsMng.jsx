// import React from "react";
// import withStyles from "@material-ui/core/styles/withStyles";
// import Grid from '@material-ui/core/Grid';
// import Assignment from "@material-ui/icons/Assignment";
// import GridContainer from "components/Grid/GridContainer.jsx";
// import GridItem from "components/Grid/GridItem.jsx";
// import Card from "components/Card/Card.jsx";
// import CardBody from "components/Card/CardBody.jsx";
// import CardIcon from "components/Card/CardIcon.jsx";
// import CardHeader from "components/Card/CardHeader.jsx";
// import extendedTablesStyle from "assets/jss/material-dashboard-pro-react/views/extendedTablesStyle.jsx";
// import {getOtherSecretKey,getDataSecretKey,updateDataSecretKey,deleteDataSecretKey,createDataSecretKey,activeDataSecretKey } from "actions/tablesSecretKey";
// import {connect} from "react-redux";
// import {Table, Divider,Button } from 'antd';
// import {Input,Modal } from 'antd';
// import {Form,Pagination,Popconfirm,Popover } from 'antd';
// import Suggestion1 from "../../components/Echarts/suggestionTree1";
// import Suggestion from "../../components/Echarts/suggestionTree";
//
// const Search = Input.Search;
//
//
// class tablesEchartsMng extends React.Component {
//
//     componentWillMount(){
//         // this.getTreeData()
//     }
//     componentDidMount(){
//     }
//     // getTreeData = (TreeId) => {
//     //     const params = {
//     //         TreeId:TreeId,
//     //     };
//     //     this.props.getTreeDataSuggestion(params);
//     // }
//     render(){
//         return (
//             <GridContainer>
//                 <GridItem xs={12}>
//                     <Card>
//                         <CardHeader color="rose" icon>
//                             <Grid container spacing={24}>
//                                 <Grid item xs={6}>
//                                     <CardIcon color="rose">
//                                         <Assignment />
//                                     </CardIcon>
//                                 </Grid>
//                                 <Grid style={{textAlign:'right',marginTop:10}} item xs={6}>
//                                     <Search
//                                         placeholder="图形数据搜索"
//                                         onSearch={value => this.getTableData(value,1,10)}
//                                         style={{ width: 200,borderStyle:'solid',
//                                             borderWidth:0,paddingRight:10 }}
//                                     />
//                                 </Grid>
//                             </Grid>
//                         </CardHeader>
//                         <CardBody>
//                             <Grid container spacing={24} xs={12}>
//                                 <Grid item  xs={6}>
//                                     <Suggestion1 />
//                                 </Grid>
//                                 <Grid item  xs={6}>
//                                     <Suggestion/>
//                                 </Grid>
//                             </Grid>
//                             <Grid container spacing={24} xs={12}>
//                             </Grid>
//
//                         </CardBody>
//                     </Card>
//                 </GridItem>
//
//             </GridContainer>
//
//         );
//     }
//
//     }
// //
// // const mapDispatchToProps = (dispatch) => {
// //     return {
// //         getTreeDataSuggestion: (params) => {
// //             dispatch(getTreeDataSuggestion(params))
// //         }
// //     }
// // }
//
//
// // export default connect(mapDispatchToProps)(tablesEchartsMng);
// export default tablesEchartsMng;
