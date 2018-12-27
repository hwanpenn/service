import { message } from 'antd';
message.config({
    duration: 1,
});

export const GET_REQUEST_ChatMng = "GET_REQUEST_ChatMng";
export const GET_SUCCESS_ChatMng = "GET_SUCCESS_ChatMng";
export const GET_FAIL_ChatMng = "GET_FAIL_ChatMng";
export const CREATE_REQUEST_ChatMng = "CREATE_REQUEST_ChatMng";
export const CREATE_SUCCESS_ChatMng = "CREATE_SUCCESS_ChatMng";
export const CREATE_FAIL_ChatMng = "CREATE_FAIL_ChatMng";
export const UPDATE_REQUEST_ChatMng = "UPDATE_REQUEST_ChatMng";
export const UPDATE_SUCCESS_ChatMng = "UPDATE_SUCCESS_ChatMng";
export const UPDATE_FAIL_ChatMng = "UPDATE_FAIL_ChatMng";
export const DELETE_REQUEST_ChatMng = "DELETE_REQUEST_ChatMng";
export const DELETE_SUCCESS_ChatMng = "DELETE_SUCCESS_ChatMng";
export const DELETE_FAIL_ChatMng = "DELETE_FAIL_ChatMng";

export const ACTIVE_REQUEST_ChatMng = "ACTIVE_REQUEST_ChatMng";
export const ACTIVE_SUCCESS_ChatMng = "ACTIVE_SUCCESS_ChatMng";
export const ACTIVE_FAIL_ChatMng = "ACTIVE_FAIL_ChatMng";

export const GET_REQUEST_ChatMng_OTHER = "GET_REQUEST_ChatMng_OTHER";
export const GET_SUCCESS_ChatMng_OTHER = "GET_SUCCESS_ChatMng_OTHER";
export const GET_FAIL_ChatMng_OTHER = "GET_FAIL_ChatMng_OTHER";

export const GET_REQUEST_KillGroup_OTHER = "GET_REQUEST_KillGroup_OTHER";
export const GET_SUCCESS_KillGroup_OTHER = "GET_SUCCESS_KillGroup_OTHER";
export const GET_FAIL_KillGroup_OTHER = "GET_FAIL_KillGroup_OTHER";

export const GET_REQUEST_Robot_OTHER = "GET_REQUEST_Robot_OTHER";
export const GET_SUCCESS_Robot_OTHER = "GET_SUCCESS_Robot_OTHER";
export const GET_FAIL_Robot_OTHER = "GET_FAIL_Robot_OTHER";

export function getOtherKillGroupChatMng(params) {
    return {
        types: [GET_REQUEST_KillGroup_OTHER, GET_SUCCESS_KillGroup_OTHER, GET_FAIL_KillGroup_OTHER],
        promise: client => client.get('/cs/api/customer/achieveGroup',{params: params}),
        afterSuccess:(dispatch,getState,response)=>{
            /*请求成功后执行的函数*/
        },
        // otherData:otherData
    }
}
export function getOtherRobotChatMng(params) {
    return {
        types: [GET_REQUEST_Robot_OTHER, GET_SUCCESS_Robot_OTHER, GET_FAIL_Robot_OTHER],
        promise: client => client.get('/cs/api/robot/achieveRobot',{params: params}),
        afterSuccess:(dispatch,getState,response)=>{
            /*请求成功后执行的函数*/
        },
        // otherData:otherData
    }
}
export function getOtherChatMng(params) {
    return {
        types: [GET_REQUEST_ChatMng_OTHER, GET_SUCCESS_ChatMng_OTHER, GET_FAIL_ChatMng_OTHER],
        promise: client => client.get('/api/role',{params: params}),
        afterSuccess:(dispatch,getState,response)=>{
            /*请求成功后执行的函数*/
        },
        // otherData:otherData
    }
}

export function getDataChatMng(params) {
    return {
        types: [GET_REQUEST_ChatMng, GET_SUCCESS_ChatMng, GET_FAIL_ChatMng],
        promise: client => client.get('/cs/api/robot/queryPageToChatWindow',{params: params}),
        afterSuccess:(dispatch,getState,response)=>{
            /*请求成功后执行的函数*/
        },
        // otherData:otherData
    }
}
export function createDataChatMng(params) {
    return {
        types: [CREATE_REQUEST_ChatMng, CREATE_SUCCESS_ChatMng, CREATE_FAIL_ChatMng],
        promise: client => client.post('/cs/api/robot/addChatWindow',params),
        afterSuccess:(dispatch,getState,response)=>{
            if(response.data.code===0){
                message.info(response.data.msg);
                const params = {
                    pageNo:1,
                    pageSize:10,
                };
                dispatch(getDataChatMng(params));
            }else {
                message.info(response.data.msg);
            }
        },
    }
}
export function updateDataChatMng(params) {
    return {
        types: [UPDATE_REQUEST_ChatMng, UPDATE_SUCCESS_ChatMng, UPDATE_FAIL_ChatMng],
        promise: client => client.post('/cs/api/robot/updateChatWindow',params),
        afterSuccess:(dispatch,getState,response)=>{
            if(response.data.code===0){
                message.info(response.data.msg);
                const params = {
                    pageNo:1,
                    pageSize:10,
                };
                dispatch(getDataChatMng(params));
            }else {
                message.info(response.data.msg);
            }
        },
    }
}
export function deleteDataChatMng(params) {
    return {
        types: [DELETE_REQUEST_ChatMng, DELETE_SUCCESS_ChatMng, DELETE_FAIL_ChatMng],
        promise: client => client.post('/cs/api/robot/deleteChatWindow',params),
        afterSuccess:(dispatch,getState,response)=>{
            if(response.data.code===0){
                message.info(response.data.msg);
                const params = {
                    pageNo:1,
                    pageSize:10,
                };
                dispatch(getDataChatMng(params));
            }else {
                message.info(response.data.msg);
            }
        },
    }
}
export function activeDataChatMng(params) {
    return {
        types: [ACTIVE_REQUEST_ChatMng, ACTIVE_SUCCESS_ChatMng, ACTIVE_FAIL_ChatMng],
        promise: client => client.post('/cs/api/robot/operationChatWindow',params),
        afterSuccess:(dispatch,getState,response)=>{
            if(response.data.code===0){
                message.info(response.data.msg);
                const params = {
                    pageNo:1,
                    pageSize:10,
                };
                dispatch(getDataChatMng(params));
            }else {
                message.info(response.data.msg);
            }
        },
    }
}
