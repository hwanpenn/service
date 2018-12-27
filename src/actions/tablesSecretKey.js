import { message } from 'antd';
message.config({
    duration: 1,
});

export const GET_REQUEST_SecretKey = "GET_REQUEST_SecretKey";
export const GET_SUCCESS_SecretKey = "GET_SUCCESS_SecretKey";
export const GET_FAIL_SecretKey = "GET_FAIL_SecretKey";
export const CREATE_REQUEST_SecretKey = "CREATE_REQUEST_SecretKey";
export const CREATE_SUCCESS_SecretKey = "CREATE_SUCCESS_SecretKey";
export const CREATE_FAIL_SecretKey = "CREATE_FAIL_SecretKey";
export const UPDATE_REQUEST_SecretKey = "UPDATE_REQUEST_SecretKey";
export const UPDATE_SUCCESS_SecretKey = "UPDATE_SUCCESS_SecretKey";
export const UPDATE_FAIL_SecretKey = "UPDATE_FAIL_SecretKey";
export const DELETE_REQUEST_SecretKey = "DELETE_REQUEST_SecretKey";
export const DELETE_SUCCESS_SecretKey = "DELETE_SUCCESS_SecretKey";
export const DELETE_FAIL_SecretKey = "DELETE_FAIL_SecretKey";

export const ACTIVE_REQUEST_SecretKey = "ACTIVE_REQUEST_SecretKey";
export const ACTIVE_SUCCESS_SecretKey = "ACTIVE_SUCCESS_SecretKey";
export const ACTIVE_FAIL_SecretKey = "ACTIVE_FAIL_SecretKey";

export const GET_REQUEST_SecretKey_OTHER = "GET_REQUEST_SecretKey_OTHER";
export const GET_SUCCESS_SecretKey_OTHER = "GET_SUCCESS_SecretKey_OTHER";
export const GET_FAIL_SecretKey_OTHER = "GET_FAIL_SecretKey_OTHER";

export function getOtherSecretKey(thisObj) {
    return {
        types: [GET_REQUEST_SecretKey_OTHER, GET_SUCCESS_SecretKey_OTHER, GET_FAIL_SecretKey_OTHER],
        promise: client => client.get('/cs/api/sys/generateSecretKey',{params: ''}),
        afterSuccess:(dispatch,getState,response)=>{
            /*请求成功后执行的函数*/
            // console.log('请求成功')
            // console.log(response.data)
            thisObj.setState({ visible: true,privateKey:response.data.rows.privateKey,publicKey:response.data.rows.publicKey });
        },
        // otherData:otherData
    }
}

export function getDataSecretKey(params) {
    return {
        types: [GET_REQUEST_SecretKey, GET_SUCCESS_SecretKey, GET_FAIL_SecretKey],
        promise: client => client.get('/cs/api/sys/queryPage',{params: params}),
        afterSuccess:(dispatch,getState,response)=>{
            /*请求成功后执行的函数*/
        },
        // otherData:otherData
    }
}
export function createDataSecretKey(params) {
    return {
        types: [CREATE_REQUEST_SecretKey, CREATE_SUCCESS_SecretKey, CREATE_FAIL_SecretKey],
        promise: client => client.post('/cs/api/sys/addSecretKey',params),
        afterSuccess:(dispatch,getState,response)=>{
            if(response.data.code===0){
                message.info(response.data.msg);
                const params = {
                    pageNo:1,
                    pageSize:10,
                };
                dispatch(getDataSecretKey(params));
            }else {
                message.info(response.data.msg);
            }
        },
    }
}
export function updateDataSecretKey(params,obj) {
    return {
        types: [UPDATE_REQUEST_SecretKey, UPDATE_SUCCESS_SecretKey, UPDATE_FAIL_SecretKey],
        // promise: client => alert('进入axios'),
        promise: client => client.post('/cs/api/sys/updateSecretKey',params),
        afterSuccess:(dispatch,getState,response)=>{
            if(response.data.code===0){
                obj.setState({ visibleModify: false })
                message.info(response.data.msg);
                const params = {
                    pageNo:1,
                    pageSize:10,
                };
                dispatch(getDataSecretKey(params));
            }else {
                // obj.setState({ visibleModify: true })
                message.info('操作失败：'+response.data.msg);
            }
        },
    }
}
export function deleteDataSecretKey(params) {
    return {
        types: [DELETE_REQUEST_SecretKey, DELETE_SUCCESS_SecretKey, DELETE_FAIL_SecretKey],
        promise: client => client.post('/cs/api/sys/deleteSecretKey',params),
        afterSuccess:(dispatch,getState,response)=>{
            if(response.data.code===0){
                message.info(response.data.msg);
                const params = {
                    pageNo:1,
                    pageSize:10,
                };
                dispatch(getDataSecretKey(params));
            }else {
                message.info(response.data.msg);
            }
        },
    }
}
export function activeDataSecretKey(params) {
    return {
        types: [ACTIVE_REQUEST_SecretKey, ACTIVE_SUCCESS_SecretKey, ACTIVE_FAIL_SecretKey],
        promise: client => client.post('/cs/api/sys/operationSecretKey',params),
        afterSuccess:(dispatch,getState,response)=>{
            if(response.data.code===0){
                message.info(response.data.msg);
                const params = {
                    pageNo:1,
                    pageSize:10,
                };
                dispatch(getDataSecretKey(params));
            }else {
                message.info(response.data.msg);
            }
        },
    }
}
