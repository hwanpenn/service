import { message } from 'antd';
message.config({
    duration: 1,
});

export const GET_REQUEST_ComplaintMng = "GET_REQUEST_ComplaintMng";
export const GET_SUCCESS_ComplaintMng = "GET_SUCCESS_ComplaintMng";
export const GET_FAIL_ComplaintMng = "GET_FAIL_ComplaintMng";
export const CREATE_REQUEST_ComplaintMng = "CREATE_REQUEST_ComplaintMng";
export const CREATE_SUCCESS_ComplaintMng = "CREATE_SUCCESS_ComplaintMng";
export const CREATE_FAIL_ComplaintMng = "CREATE_FAIL_ComplaintMng";
export const UPDATE_REQUEST_ComplaintMng = "UPDATE_REQUEST_ComplaintMng";
export const UPDATE_SUCCESS_ComplaintMng = "UPDATE_SUCCESS_ComplaintMng";
export const UPDATE_FAIL_ComplaintMng = "UPDATE_FAIL_ComplaintMng";
export const DELETE_REQUEST_ComplaintMng = "DELETE_REQUEST_ComplaintMng";
export const DELETE_SUCCESS_ComplaintMng = "DELETE_SUCCESS_ComplaintMng";
export const DELETE_FAIL_ComplaintMng = "DELETE_FAIL_ComplaintMng";

export const GET_REQUEST_ComplaintMng_OTHER = "GET_REQUEST_ComplaintMng_OTHER";
export const GET_SUCCESS_ComplaintMng_OTHER = "GET_SUCCESS_ComplaintMng_OTHER";
export const GET_FAIL_ComplaintMng_OTHER = "GET_FAIL_ComplaintMng_OTHER";

export function getOtherComplaintMng(params) {
    return {
        types: [GET_REQUEST_ComplaintMng_OTHER, GET_SUCCESS_ComplaintMng_OTHER, GET_FAIL_ComplaintMng_OTHER],
        promise: client => client.get('/cs/api/knowledgeBase/queryArticleCategory',{params: params}),
        afterSuccess:(dispatch,getState,response)=>{
            /*请求成功后执行的函数*/
        },
        // otherData:otherData
    }
}

export function getDataComplaintMng(params) {
    return {
        types: [GET_REQUEST_ComplaintMng, GET_SUCCESS_ComplaintMng, GET_FAIL_ComplaintMng],
        promise: client => client.get('/cs/api/adviceOrComplaint/query',{params: params}),
        afterSuccess:(dispatch,getState,response)=>{
            /*请求成功后执行的函数*/
        },
        // otherData:otherData
    }
}
export function createDataComplaintMng(params) {
    return {
        types: [CREATE_REQUEST_ComplaintMng, CREATE_SUCCESS_ComplaintMng, CREATE_FAIL_ComplaintMng],
        promise: client => client.post('/cs/api/adviceOrComplaint/add',params),
        afterSuccess:(dispatch,getState,response)=>{
            if(response.data.code===0){
                message.info(response.data.msg);
                const params = {
                    pageNo:1,
                    pageSize:10,
                };
                dispatch(getDataComplaintMng(params));
            }else {
                message.info(response.data.msg);
            }
        },
    }
}
export function updateDataComplaintMng(params) {
    return {
        types: [UPDATE_REQUEST_ComplaintMng, UPDATE_SUCCESS_ComplaintMng, UPDATE_FAIL_ComplaintMng],
        promise: client => client.post('/cs/api/adviceOrComplaint/answer',params),
        afterSuccess:(dispatch,getState,response)=>{
            if(response.data.code===0){
                message.info(response.data.msg);
                const params = {
                    pageNo:1,
                    pageSize:10,
                };
                dispatch(getDataComplaintMng(params));
            }else {
                message.info(response.data.msg);
            }
        },
    }
}
export function deleteDataComplaintMng(params) {
    return {
        types: [DELETE_REQUEST_ComplaintMng, DELETE_SUCCESS_ComplaintMng, DELETE_FAIL_ComplaintMng],
        promise: client => client.post('/cs/api/adviceOrComplaint/delete',params),
        afterSuccess:(dispatch,getState,response)=>{
            if(response.data.code===0){
                message.info(response.data.msg);
                const params = {
                    pageNo:1,
                    pageSize:10,
                };
                dispatch(getDataComplaintMng(params));
            }else {
                message.info(response.data.msg);
            }
        },
    }
}
