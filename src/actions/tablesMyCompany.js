import { message } from 'antd';
message.config({
    duration: 1,
});

export const GET_REQUEST_MyCompany = "GET_REQUEST_MyCompany";
export const GET_SUCCESS_MyCompany = "GET_SUCCESS_MyCompany";
export const GET_FAIL_MyCompany = "GET_FAIL_MyCompany";
export const CREATE_REQUEST_MyCompany = "CREATE_REQUEST_MyCompany";
export const CREATE_SUCCESS_MyCompany = "CREATE_SUCCESS_MyCompany";
export const CREATE_FAIL_MyCompany = "CREATE_FAIL_MyCompany";
export const UPDATE_REQUEST_MyCompany = "UPDATE_REQUEST_MyCompany";
export const UPDATE_SUCCESS_MyCompany = "UPDATE_SUCCESS_MyCompany";
export const UPDATE_FAIL_MyCompany = "UPDATE_FAIL_MyCompany";
export const DELETE_REQUEST_MyCompany = "DELETE_REQUEST_MyCompany";
export const DELETE_SUCCESS_MyCompany = "DELETE_SUCCESS_MyCompany";
export const DELETE_FAIL_MyCompany = "DELETE_FAIL_MyCompany";

export const GET_REQUEST_MyCompany_OTHER = "GET_REQUEST_MyCompany_OTHER";
export const GET_SUCCESS_MyCompany_OTHER = "GET_SUCCESS_MyCompany_OTHER";
export const GET_FAIL_MyCompany_OTHER = "GET_FAIL_MyCompany_OTHER";

export const GET_REQUEST_KillGroup_OTHER = "GET_REQUEST_MyCompany_OTHER";
export const GET_SUCCESS_KillGroup_OTHER = "GET_SUCCESS_MyCompany_OTHER";
export const GET_FAIL_KillGroup_OTHER = "GET_FAIL_MyCompany_OTHER";

export function addKillGroup(params) {
    return {
        types: [GET_REQUEST_MyCompany_OTHER, GET_SUCCESS_MyCompany_OTHER, GET_FAIL_MyCompany_OTHER],
        promise: client => client.post('/cs/api/customer/addCustomerUser',params),
        afterSuccess:(dispatch,getState,response)=>{
            /*请求成功后执行的函数*/
            if(response.data.code===0){
                message.info(response.data.msg);
                const params1 = {
                    caption:'',
                    pageNo:1,
                    pageSize:10,
                };
                const params2 = {
                    pageNo:'1',
                    pageSize:'999'
                };
                dispatch(getDataMyCompany(params1));
                dispatch(getOtherMyCompany(params2));
            }else {
                message.info(response.data.msg);
            }
        },
        // otherData:otherData
    }
}

export function getOtherMyCompany(params) {
    return {
        types: [GET_REQUEST_MyCompany_OTHER, GET_SUCCESS_MyCompany_OTHER, GET_FAIL_MyCompany_OTHER],
        promise: client => client.get('/cs/api/customer/achieveGroup',{params: params}),
        afterSuccess:(dispatch,getState,response)=>{
            /*请求成功后执行的函数*/
        },
        // otherData:otherData
    }
}

export function getDataMyCompany(params) {
    return {
        types: [GET_REQUEST_MyCompany, GET_SUCCESS_MyCompany, GET_FAIL_MyCompany],
        promise: client => client.get('/cs/api/organization/queryUser',{params: params}),
        afterSuccess:(dispatch,getState,response)=>{
            /*请求成功后执行的函数*/
        },
        // otherData:otherData
    }
}
export function createDataMyCompany(params) {
    return {
        types: [CREATE_REQUEST_MyCompany, CREATE_SUCCESS_MyCompany, CREATE_FAIL_MyCompany],
        promise: client => client.post('/cs/api/organization/addUser',params),
        afterSuccess:(dispatch,getState,response)=>{
            if(response.data.code===0){
                message.info(response.data.msg);
                const params = {
                    pageNo:1,
                    pageSize:10,
                };
                dispatch(getDataMyCompany(params));
            }else {
                message.info(response.data.msg);
            }
        },
    }
}
export function updateDataMyCompany(params) {
    return {
        types: [UPDATE_REQUEST_MyCompany, UPDATE_SUCCESS_MyCompany, UPDATE_FAIL_MyCompany],
        promise: client => client.post('/cs/api/organization/updateUser',params),
        afterSuccess:(dispatch,getState,response)=>{
            if(response.data.code===0){
                message.info(response.data.msg);
                const params = {
                    pageNo:1,
                    pageSize:10,
                };
                dispatch(getDataMyCompany(params));
            }else {
                message.info(response.data.msg);
            }
        },
    }
}
export function deleteDataMyCompany(params) {
    return {
        types: [DELETE_REQUEST_MyCompany, DELETE_SUCCESS_MyCompany, DELETE_FAIL_MyCompany],
        promise: client => client.post('/cs/api/organization/deleteUser',params),
        afterSuccess:(dispatch,getState,response)=>{
            if(response.data.code===0){
                message.info(response.data.msg);
                const params = {
                    pageNo:1,
                    pageSize:10,
                };
                dispatch(getDataMyCompany(params));
            }else {
                message.info(response.data.msg);
            }
        },
    }
}
