import React from "react";
import Grid from '@material-ui/core/Grid';
import Assignment from "@material-ui/icons/Assignment";
import Echartone from "components/Echarts/Echartone.jsx";
import Echarttwo from "components/Echarts/Echarttwo.jsx";
import Echartthree from "components/Echarts/Echartthree.jsx";
import Echartseven from "components/Echarts/Echartseven.jsx";
import Echartfive from "components/Echarts/Echartfive.jsx";
import Echartsix from "components/Echarts/Echartsix.jsx";
import Echartfour from "components/Echarts/Echartfour.jsx";
import GridContainer from "components/Grid/GridContainer.jsx";
import Card from "components/Card/Card.jsx";
import CardIcon from "components/Card/CardIcon.jsx";
import CardHeader from "components/Card/CardHeader.jsx";
import {getOtherSecretKey,getDataSecretKey,updateDataSecretKey,deleteDataSecretKey,createDataSecretKey,activeDataSecretKey } from "actions/tablesSecretKey";
import {Button, Input, Modal, Upload} from 'antd';
import { Tabs } from 'antd';
const TabPane = Tabs.TabPane;
const Search = Input.Search;


class tablesEchartsMng extends React.Component {

    componentWillMount(){
    }
    componentDidMount(){
    }
    render(){
        return(
            <GridContainer>
                <Card>
                    <CardHeader color="rose" icon>
                        <Grid container spacing={24}>
                            <Grid item xs={3}>
                                <CardIcon color="rose">
                                    <Assignment />
                                </CardIcon>
                            </Grid>
                            <Grid style={{textAlign:'center',marginTop:10}} item xs={9}>
                                <h4>1234 </h4>
                            </Grid>
                        </Grid>
                    </CardHeader>
                    <Grid container style={{marginLeft:25,marginTop:20}}>
                        <Grid item xs={6}>
                            <Tabs defaultActiveKey="1" style={{ width: 500 }}>
                                <TabPane tab="投诉建议" key="1">
                                    <Echartone></Echartone>
                                </TabPane>
                                <TabPane tab="对话详情" key="2">
                                    <Echarttwo></Echarttwo>
                                </TabPane>
                            </Tabs>
                        </Grid>
                        <Grid item xs={6}>
                            <Tabs defaultActiveKey="1" style={{ width: 500 }}>
                                <TabPane tab="人员管理" key="1">
                                    <Echartfour></Echartfour>
                                </TabPane>
                                <TabPane tab="机器人" key="2">
                                    <Echartfive></Echartfive>
                                </TabPane>
                            </Tabs>
                        </Grid>
                        <Grid item xs={12} style={{ marginTop:50}}>
                            <h3 className="echarttitle">知识库</h3>
                            <Echartthree></Echartthree>
                        </Grid>
                        <Grid item xs={5}>
                            <h3 className="echarttitle">技能组管理</h3>
                            <Echartsix></Echartsix>
                        </Grid>
                        <Grid item xs={7}>
                            <h3 className="echarttitle">聊天窗管理</h3>
                            <Echartseven></Echartseven>
                        </Grid>
                    </Grid>

                </Card>
            </GridContainer>
        );
    }

    }
//
// const mapDispatchToProps = (dispatch) => {
//     return {
//         getTreeDataSuggestion: (params) => {
//             dispatch(getTreeDataSuggestion(params))
//         }
//     }
// }


// export default connect(mapDispatchToProps)(tablesEchartsMng);
export default tablesEchartsMng;
