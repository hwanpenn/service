import React from "react";
import {Pagination} from "antd";

export default class pagination extends React.Component{
<Pagination defaultCurrent={1} defaultPageSize={10} total={this.props.tablesArticleMng.tableCountArticleMng} style={{textAlign:'right',marginTop:25}}  onChange={(page, pageSize)=>this.getTableData('',page,10)}/>
}