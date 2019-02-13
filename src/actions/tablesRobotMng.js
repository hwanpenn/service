import { message } from 'antd';
import {getDataArticleMng} from "./tablesArticleMng";
message.config({
    duration: 1,
});

export const GET_REQUEST_RobotMng = "GET_REQUEST_RobotMng";
export const GET_SUCCESS_RobotMng = "GET_SUCCESS_RobotMng";
export const GET_FAIL_RobotMng = "GET_FAIL_RobotMng";
export const CREATE_REQUEST_RobotMng = "CREATE_REQUEST_RobotMng";
export const CREATE_SUCCESS_RobotMng = "CREATE_SUCCESS_RobotMng";
export const CREATE_FAIL_RobotMng = "CREATE_FAIL_RobotMng";
export const UPDATE_REQUEST_RobotMng = "UPDATE_REQUEST_RobotMng";
export const UPDATE_SUCCESS_RobotMng = "UPDATE_SUCCESS_RobotMng";
export const UPDATE_FAIL_RobotMng = "UPDATE_FAIL_RobotMng";
export const DELETE_REQUEST_RobotMng = "DELETE_REQUEST_RobotMng";
export const DELETE_SUCCESS_RobotMng = "DELETE_SUCCESS_RobotMng";
export const DELETE_FAIL_RobotMng = "DELETE_FAIL_RobotMng";

export const GET_REQUEST_RobotMng_OTHER = "GET_REQUEST_RobotMng_OTHER";
export const GET_SUCCESS_RobotMng_OTHER = "GET_SUCCESS_RobotMng_OTHER";
export const GET_FAIL_RobotMng_OTHER = "GET_FAIL_RobotMng_OTHER";

export const ACTIVE_REQUEST_RobotMng = "ACTIVE_REQUEST_RobotMng";
export const ACTIVE_SUCCESS_RobotMng = "ACTIVE_SUCCESS_RobotMng";
export const ACTIVE_FAIL_RobotMng = "ACTIVE_FAIL_RobotMng";
export let dataTotal
export let lastPage

export function getOtherRobotMng(params) {
    return {
        types: [GET_REQUEST_RobotMng_OTHER, GET_SUCCESS_RobotMng_OTHER, GET_FAIL_RobotMng_OTHER],
        promise: client => client.get('/api/role',{params: params}),
        afterSuccess:(dispatch,getState,response)=>{
            /*请求成功后执行的函数*/
        },
        // otherData:otherData
    }
}

export function getDataRobotMng(params) {
    return {
        types: [GET_REQUEST_RobotMng, GET_SUCCESS_RobotMng, GET_FAIL_RobotMng],
        promise: client => client.get('/cs/api/robot/queryPageToRobot',{params: params}),
        afterSuccess:(dispatch,getState,response)=>{
            lastPage = parseInt(response.data.total/params.pageSize)+1
            dataTotal = response.data.total
            /*请求成功后执行的函数*/
        },
        // otherData:otherData
    }
}
export function createDataRobotMng(params,obj) {
    return {
        types: [CREATE_REQUEST_RobotMng, CREATE_SUCCESS_RobotMng, CREATE_FAIL_RobotMng],
        promise: client => client.post('/cs/api/robot/addRobot',params),
        afterSuccess:(dispatch,getState,response)=>{
            if(response.data.code===0){
                message.info(response.data.msg);
                obj.setState({
                    current:1
                })
                const params = {
                    pageNo:1,
                    pageSize:10,
                };
                dispatch(getDataRobotMng(params));
            }else {
                message.info(response.data.msg);
            }
        },
    }
}
export function updateDataRobotMng(params) {
    return {
        types: [UPDATE_REQUEST_RobotMng, UPDATE_SUCCESS_RobotMng, UPDATE_FAIL_RobotMng],
        promise: client => client.post('/cs/api/robot/updateRobot',params),
        afterSuccess:(dispatch,getState,response)=>{
            if(response.data.code===0){
                message.info(response.data.msg);
                const params = {
                    pageNo:1,
                    pageSize:10,
                };
                dispatch(getDataRobotMng(params));
            }else {
                message.info(response.data.msg);
            }
        },
    }
}
export function deleteDataRobotMng(params,obj) {
    return {
        types: [DELETE_REQUEST_RobotMng, DELETE_SUCCESS_RobotMng, DELETE_FAIL_RobotMng],
        promise: client => client.post('/cs/api/robot/deleteRobot',params),
        afterSuccess:(dispatch,getState,response)=>{
            if(response.data.code===0){
                message.info(response.data.msg);
                if(dataTotal % obj.state.pageSize  === 1){
                    lastPage = lastPage - 1;
                    obj.setState({
                        current:lastPage
                    })
                    const params = {
                        pageNo:lastPage,
                        pageSize:obj.state.pageSize,
                    };
                    dispatch(getDataRobotMng(params));
                }else{
                    const params = {
                        pageNo:obj.state.current,
                        pageSize:obj.state.pageSize,
                    };
                    dispatch(getDataRobotMng(params));
                }
            }else {
                message.info(response.data.msg);
            }
        },
    }
}

export function activeDataRobotMng(params) {
    return {
        types: [ACTIVE_REQUEST_RobotMng, ACTIVE_SUCCESS_RobotMng, ACTIVE_FAIL_RobotMng],
        promise: client => client.post('/cs/api/robot/operationRobot',params),
        afterSuccess:(dispatch,getState,response)=>{
            if(response.data.code===0){
                message.info(response.data.msg);
                const params = {
                    pageNo:1,
                    pageSize:10,
                };
                dispatch(getDataRobotMng(params));
            }else {
                message.info(response.data.msg);
            }
        },
    }
}
