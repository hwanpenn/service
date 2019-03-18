import { message } from 'antd';
import {dataTotal, lastPage} from "./tablesML";
message.config({
    duration: 1,
});

export const GET_REQUEST_KillGroupMng = "GET_REQUEST_KillGroupMng";
export const GET_SUCCESS_KillGroupMng = "GET_SUCCESS_KillGroupMng";
export const GET_FAIL_KillGroupMng = "GET_FAIL_KillGroupMng";
export const CREATE_REQUEST_KillGroupMng = "CREATE_REQUEST_KillGroupMng";
export const CREATE_SUCCESS_KillGroupMng = "CREATE_SUCCESS_KillGroupMng";
export const CREATE_FAIL_KillGroupMng = "CREATE_FAIL_KillGroupMng";
export const UPDATE_REQUEST_KillGroupMng = "UPDATE_REQUEST_KillGroupMng";
export const UPDATE_SUCCESS_KillGroupMng = "UPDATE_SUCCESS_KillGroupMng";
export const UPDATE_FAIL_KillGroupMng = "UPDATE_FAIL_KillGroupMng";
export const DELETE_REQUEST_KillGroupMng = "DELETE_REQUEST_KillGroupMng";
export const DELETE_SUCCESS_KillGroupMng = "DELETE_SUCCESS_KillGroupMng";
export const DELETE_FAIL_KillGroupMng = "DELETE_FAIL_KillGroupMng";

export const ACTIVE_REQUEST_KillGroupMng = "ACTIVE_REQUEST_KillGroupMng";
export const ACTIVE_SUCCESS_KillGroupMng = "ACTIVE_SUCCESS_KillGroupMng";
export const ACTIVE_FAIL_KillGroupMng = "ACTIVE_FAIL_KillGroupMng";

export const GET_REQUEST_KillGroupMng_OTHER = "GET_REQUEST_KillGroupMng_OTHER";
export const GET_SUCCESS_KillGroupMng_OTHER = "GET_SUCCESS_KillGroupMng_OTHER";
export const GET_FAIL_KillGroupMng_OTHER = "GET_FAIL_KillGroupMng_OTHER";

export let total
export let last

export function getOtherKillGroupMng(params) {
    return {
        types: [GET_REQUEST_KillGroupMng_OTHER, GET_SUCCESS_KillGroupMng_OTHER, GET_FAIL_KillGroupMng_OTHER],
        promise: client => client.get('/api/role',{params: params}),
        afterSuccess:(dispatch,getState,response)=>{
            /*请求成功后执行的函数*/
        },
        // otherData:otherData
    }
}

export function getDataKillGroupMng(params) {
    return {
        types: [GET_REQUEST_KillGroupMng, GET_SUCCESS_KillGroupMng, GET_FAIL_KillGroupMng],
        promise: client => client.get('/cs/api/customer/queryPageToCustomerSkillGroup',{params: params}),
        afterSuccess:(dispatch,getState,response)=>{
            last = parseInt(response.data.total/params.pageSize)+1
            total = response.data.total
            /*请求成功后执行的函数*/
        },
        // otherData:otherData
    }
}
export function createDataKillGroupMng(params,obj) {
    return {
        types: [CREATE_REQUEST_KillGroupMng, CREATE_SUCCESS_KillGroupMng, CREATE_FAIL_KillGroupMng],
        promise: client => client.post('/cs/api/customer/addCustomerSkillGroup',params),
        afterSuccess:(dispatch,getState,response)=>{
            if(response.data.code===0){
                console.log("obj.state.page",obj.state.page)
                message.info(response.data.msg);
                obj.setState({
                    page:1
                })
                const params = {
                    pageNo:1,
                    pageSize:obj.state.pageSize,
                };
                dispatch(getDataKillGroupMng(params));
            }else {
                message.info(response.data.msg);
            }
        },
    }
}
export function updateDataKillGroupMng(params,obj) {
    return {
        types: [UPDATE_REQUEST_KillGroupMng, UPDATE_SUCCESS_KillGroupMng, UPDATE_FAIL_KillGroupMng],
        // promise: client => alert('进入axios'),
        promise: client => client.post('/cs/api/customer/updateCustomerSkillGroup',params),
        afterSuccess:(dispatch,getState,response)=>{
            if(response.data.code===0){
                obj.setState({ visibleModify: false })
                message.info(response.data.msg);
                const params = {
                    pageNo:obj.state.page,
                    pageSize:obj.state.pageSize,
                };
                dispatch(getDataKillGroupMng(params));
            }else {
                // obj.setState({ visibleModify: true })
                message.info('操作失败：'+response.data.msg);
            }
        },
    }
}
export function deleteDataKillGroupMng(params,obj) {
    return {
        types: [DELETE_REQUEST_KillGroupMng, DELETE_SUCCESS_KillGroupMng, DELETE_FAIL_KillGroupMng],
        promise: client => client.post('/cs/api/customer/deleteCustomerSkillGroup',params),
        afterSuccess:(dispatch,getState,response)=>{
            if(response.data.code===0){
                message.info(response.data.msg);
                if(total % obj.state.pageSize ===1){
                    last -= 1
                    obj.setState({
                        page:last
                    })
                    const params = {
                        pageNo:last,
                        pageSize:obj.state.pageSize,
                    };
                    dispatch(getDataKillGroupMng(params));
                }else{
                    const params = {
                        pageNo:obj.state.page,
                        pageSize:obj.state.pageSize,
                    };
                    dispatch(getDataKillGroupMng(params));
                }
            }else {
                message.info(response.data.msg);
            }
        },
    }
}
export function activeDataKillGroupMng(params) {
    return {
        types: [ACTIVE_REQUEST_KillGroupMng, ACTIVE_SUCCESS_KillGroupMng, ACTIVE_FAIL_KillGroupMng],
        promise: client => client.post('/cs/api/customer/operationCustomerSkillGroup',params),
        afterSuccess:(dispatch,getState,response)=>{
            if(response.data.code===0){
                message.info(response.data.msg);
                const params = {
                    pageNo:1,
                    pageSize:10,
                };
                dispatch(getDataKillGroupMng(params));
            }else {
                message.info(response.data.msg);
            }
        },
    }
}
