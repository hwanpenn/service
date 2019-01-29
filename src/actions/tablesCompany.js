import { message } from 'antd';
import {last, total} from "./tablesArticleMng";
message.config({
    duration: 1,
});

export const GET_REQUEST_Company = "GET_REQUEST_Company";
export const GET_SUCCESS_Company = "GET_SUCCESS_Company";
export const GET_FAIL_Company = "GET_FAIL_Company";
export const CREATE_REQUEST_Company = "CREATE_REQUEST_Company";
export const CREATE_SUCCESS_Company = "CREATE_SUCCESS_Company";
export const CREATE_FAIL_Company = "CREATE_FAIL_Company";
export const UPDATE_REQUEST_Company = "UPDATE_REQUEST_Company";
export const UPDATE_SUCCESS_Company = "UPDATE_SUCCESS_Company";
export const UPDATE_FAIL_Company = "UPDATE_FAIL_Company";
export const DELETE_REQUEST_Company = "DELETE_REQUEST_Company";
export const DELETE_SUCCESS_Company = "DELETE_SUCCESS_Company";
export const DELETE_FAIL_Company = "DELETE_FAIL_Company";

export const GET_REQUEST_Company_OTHER = "GET_REQUEST_Company_OTHER";
export const GET_SUCCESS_Company_OTHER = "GET_SUCCESS_Company_OTHER";
export const GET_FAIL_Company_OTHER = "GET_FAIL_Company_OTHER";
export const GET_REQUEST_Province = "GET_REQUEST_Province";
export const GET_SUCCESS_Province = "GET_SUCCESS_Province";
export const GET_FAIL_Province = "GET_FAIL_Province";

let lastPage
let dataTotal

export function getOtherCompany(params) {
    return {
        types: [GET_REQUEST_Company_OTHER, GET_SUCCESS_Company_OTHER, GET_FAIL_Company_OTHER],
        promise: client => client.get('/cs/api/organization/queryCategory',{params: params}),
        afterSuccess:(dispatch,getState,response)=>{
            /*请求成功后执行的函数*/
        },
        // otherData:otherData
    }
}

export function getDataCompany(params) {
    return {
        types: [GET_REQUEST_Company, GET_SUCCESS_Company, GET_FAIL_Company],
        promise: client => client.get('/cs/api/organization/queryTenant',{params: params}),
        afterSuccess:(dispatch,getState,response)=>{
            lastPage = parseInt(response.data.total/10)+1
            dataTotal = response.data.total
            /*请求成功后执行的函数*/
        },
        // otherData:otherData
    }
}
export function createDataCompany(params,obj) {
    return {
        types: [CREATE_REQUEST_Company, CREATE_SUCCESS_Company, CREATE_FAIL_Company],
        promise: client => client.post('/cs/api/organization/addTenant',params),
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
                dispatch(getDataCompany(params));
            }else {
                message.info(response.data.msg);
            }
        },
    }
}
export function updateDataCompany(params) {
    return {
        types: [UPDATE_REQUEST_Company, UPDATE_SUCCESS_Company, UPDATE_FAIL_Company],
        promise: client => client.post('/cs/api/organization/updateTenant',params),
        afterSuccess:(dispatch,getState,response)=>{
            if(response.data.code===0){
                message.info(response.data.msg);
                const params = {
                    pageNo:1,
                    pageSize:10,
                };
                dispatch(getDataCompany(params));
            }else {
                message.info(response.data.msg);
            }
        },
    }
}
export function deleteDataCompany(params,obj) {
    return {
        types: [DELETE_REQUEST_Company, DELETE_SUCCESS_Company, DELETE_FAIL_Company],
        promise: client => client.post('/cs/api/organization/deleteTenant',params),
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
                    dispatch(getDataCompany(params));
                }
                const params = {
                    pageNo:obj.state.current,
                    pageSize:10,
                };
                dispatch(getDataCompany(params));
            }else {
                message.info(response.data.msg);
            }
        },
    }
}

export function getProvince(params) {
    return {
        types: [GET_REQUEST_Province, GET_SUCCESS_Province, GET_FAIL_Province],
        promise: client => client.get('/cs/api/area/selectProvince',{params: params}),
        afterSuccess:(dispatch,getState,response)=>{
            /*请求成功后执行的函数*/
        },
        // otherData:otherData
    }
}
