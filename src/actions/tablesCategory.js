import { message } from 'antd';
message.config({
    duration: 1,
});

export const GET_REQUEST_Category = "GET_REQUEST_Category";
export const GET_SUCCESS_Category = "GET_SUCCESS_Category";
export const GET_FAIL_Category = "GET_FAIL_Category";
export const CREATE_REQUEST_Category = "CREATE_REQUEST_Category";
export const CREATE_SUCCESS_Category = "CREATE_SUCCESS_Category";
export const CREATE_FAIL_Category = "CREATE_FAIL_Category";
export const UPDATE_REQUEST_Category = "UPDATE_REQUEST_Category";
export const UPDATE_SUCCESS_Category = "UPDATE_SUCCESS_Category";
export const UPDATE_FAIL_Category = "UPDATE_FAIL_Category";
export const DELETE_REQUEST_Category = "DELETE_REQUEST_Category";
export const DELETE_SUCCESS_Category = "DELETE_SUCCESS_Category";
export const DELETE_FAIL_Category = "DELETE_FAIL_Category";

export const GET_REQUEST_Category_OTHER = "GET_REQUEST_Category_OTHER";
export const GET_SUCCESS_Category_OTHER = "GET_SUCCESS_Category_OTHER";
export const GET_FAIL_Category_OTHER = "GET_FAIL_Category_OTHER";

export function getOtherCategory(params) {
    return {
        types: [GET_REQUEST_Category_OTHER, GET_SUCCESS_Category_OTHER, GET_FAIL_Category_OTHER],
        promise: client => client.get('/api/role',{params: params}),
        afterSuccess:(dispatch,getState,response)=>{
            /*请求成功后执行的函数*/
        },
        // otherData:otherData
    }
}

export function getDataCategory(params) {
    return {
        types: [GET_REQUEST_Category, GET_SUCCESS_Category, GET_FAIL_Category],
        promise: client => client.get('/cs/api/organization/queryCategory',{params: params}),
        afterSuccess:(dispatch,getState,response)=>{
            /*请求成功后执行的函数*/
        },
        // otherData:otherData
    }
}
export function createDataCategory(params) {
    return {
        types: [CREATE_REQUEST_Category, CREATE_SUCCESS_Category, CREATE_FAIL_Category],
        promise: client => client.post('/cs/api/organization/addCategory',params),
        afterSuccess:(dispatch,getState,response)=>{
            if(response.data.code===0){
                message.info(response.data.msg);
                const params = {
                    pageNo:1,
                    pageSize:10,
                };
                dispatch(getDataCategory(params));
            }else {
                message.info(response.data.msg);
            }
        },
    }
}
export function updateDataCategory(params) {
    return {
        types: [UPDATE_REQUEST_Category, UPDATE_SUCCESS_Category, UPDATE_FAIL_Category],
        promise: client => client.post('/cs/api/organization/updateCategory',params),
        afterSuccess:(dispatch,getState,response)=>{
            if(response.data.code===0){
                message.info(response.data.msg);
                const params = {
                    pageNo:1,
                    pageSize:10,
                };
                dispatch(getDataCategory(params));
            }else {
                message.info(response.data.msg);
            }
        },
    }
}
export function deleteDataCategory(params) {
    return {
        types: [DELETE_REQUEST_Category, DELETE_SUCCESS_Category, DELETE_FAIL_Category],
        promise: client => client.post('/cs/api/organization/deleteCategory',params),
        afterSuccess:(dispatch,getState,response)=>{
            if(response.data.code===0){
                message.info(response.data.msg);
                const params = {
                    pageNo:1,
                    pageSize:10,
                };
                dispatch(getDataCategory(params));
            }else {
                message.info(response.data.msg);
            }
        },
    }
}
