import { message } from 'antd';
import {getDataChatMng} from "./tablesChatMng";
message.config({
    duration: 1,
});

export const GET_REQUEST_Admin = "GET_REQUEST_Admin";
export const GET_SUCCESS_Admin = "GET_SUCCESS_Admin";
export const GET_FAIL_Admin = "GET_FAIL_Admin";
export const CREATE_REQUEST_Admin = "CREATE_REQUEST_Admin";
export const CREATE_SUCCESS_Admin = "CREATE_SUCCESS_Admin";
export const CREATE_FAIL_Admin = "CREATE_FAIL_Admin";
export const UPDATE_REQUEST_Admin = "UPDATE_REQUEST_Admin";
export const UPDATE_SUCCESS_Admin = "UPDATE_SUCCESS_Admin";
export const UPDATE_FAIL_Admin = "UPDATE_FAIL_Admin";
export const UPDATE_REQUEST_PasswordAdmin = "UPDATE_REQUEST_PasswordAdmin";
export const UPDATE_SUCCESS_PasswordAdmin = "UPDATE_SUCCESS_PasswordAdmin";
export const UPDATE_FAIL_PasswordAdmin = "UPDATE_FAIL_PasswordAdmin";
export const DELETE_REQUEST_Admin = "DELETE_REQUEST_Admin";
export const DELETE_SUCCESS_Admin = "DELETE_SUCCESS_Admin";
export const DELETE_FAIL_Admin = "DELETE_FAIL_Admin";

export const GET_REQUEST_Admin_OTHER = "GET_REQUEST_Admin_OTHER";
export const GET_SUCCESS_Admin_OTHER = "GET_SUCCESS_Admin_OTHER";
export const GET_FAIL_Admin_OTHER = "GET_FAIL_Admin_OTHER";

let dataTotal = ''
let lastPage = ''

export function getOtherAdmin(params) {
    return {
        types: [GET_REQUEST_Admin_OTHER, GET_SUCCESS_Admin_OTHER, GET_FAIL_Admin_OTHER],
        promise: client => client.get('/cs/api/organization/queryTenant',{params: params}),
        afterSuccess:(dispatch,getState,response)=>{
            /*请求成功后执行的函数*/
        },
        // otherData:otherData
    }
}

export function getDataAdmin(params) {
    return {
        types: [GET_REQUEST_Admin, GET_SUCCESS_Admin, GET_FAIL_Admin],
        promise: client => client.get('/cs/api/organization/queryUser',{params: params}),
        afterSuccess:(dispatch,getState,response)=>{
            lastPage = parseInt(response.data.total/10)+1
            dataTotal = response.data.total
            /*请求成功后执行的函数*/
        },
        // otherData:otherData
    }
}
export function createDataAdmin(params,obj) {
    return {
        types: [CREATE_REQUEST_Admin, CREATE_SUCCESS_Admin, CREATE_FAIL_Admin],
        promise: client => client.post('/cs/api/organization/addUser',params),
        afterSuccess:(dispatch,getState,response)=>{
            if(response.data.code===0){
                message.info(response.data.msg);
                obj.setState({
                    current:lastPage
                })
                const params = {
                    pageNo:lastPage,
                    pageSize:10,
                };
                dispatch(getDataAdmin(params));
            }else {
                message.info(response.data.msg);
            }
        },
    }
}
export function updateDataAdmin(params) {
    return {
        types: [UPDATE_REQUEST_Admin, UPDATE_SUCCESS_Admin, UPDATE_FAIL_Admin],
        promise: client => client.post('/cs/api/organization/updateUser',params),
        afterSuccess:(dispatch,getState,response)=>{
            if(response.data.code===0){
                message.info(response.data.msg);
                const params = {
                    pageNo:1,
                    pageSize:10,
                };
                dispatch(getDataAdmin(params));
            }else {
                message.info(response.data.msg);
            }
        },
    }
}
export function updatePasswordDataAdmin(params) {
    return {
        types: [UPDATE_REQUEST_PasswordAdmin, UPDATE_SUCCESS_PasswordAdmin, UPDATE_FAIL_PasswordAdmin],
        promise: client => client.post('/cs/api/organization/updatePassword',params),
        afterSuccess:(dispatch,getState,response)=>{
            if(response.data.code===0){
                message.info('操作成功');
            }else {
                message.info(response.data.msg);
            }
        },
    }
}
export function deleteDataAdmin(params,obj) {
    return {
        types: [DELETE_REQUEST_Admin, DELETE_SUCCESS_Admin, DELETE_FAIL_Admin],
        promise: client => client.post('/cs/api/organization/deleteUser',params),
        afterSuccess:(dispatch,getState,response)=>{
            if(response.data.code===0){
                message.info(response.data.msg);
                if(dataTotal % 10 === 1){
                    lastPage -= 1
                    obj.setState({
                        current:lastPage
                    })
                    const params = {
                        pageNo:lastPage,
                        pageSize:10,
                    };
                    dispatch(getDataAdmin(params));
                }else{
                    const params = {
                        pageNo:obj.state.current,
                        pageSize:10,
                    };
                    dispatch(getDataAdmin(params));
                }

            }else {
                message.info(response.data.msg);
            }
        },
    }
}
