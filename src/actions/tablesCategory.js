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

let dataTotal
let lastPage


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
            lastPage = parseInt(response.data.total/params.pageSize)+1
            dataTotal = response.data.total
            /*请求成功后执行的函数*/
        },
        // otherData:otherData
    }
}
export function createDataCategory(params,obj) {
    return {
        types: [CREATE_REQUEST_Category, CREATE_SUCCESS_Category, CREATE_FAIL_Category],
        promise: client => client.post('/cs/api/organization/addCategory',params),
        afterSuccess:(dispatch,getState,response)=>{
            if(response.data.code===0){
                message.info(response.data.msg);
                obj.setState({
                    current:lastPage
                })
                const params = {
                    pageNo:lastPage,
                    pageSize:obj.state.pageSize,
                };
                dispatch(getDataCategory(params));
            }else {
                message.info(response.data.msg);
            }
        },
    }
}
export function updateDataCategory(params,obj) {
    return {
        types: [UPDATE_REQUEST_Category, UPDATE_SUCCESS_Category, UPDATE_FAIL_Category],
        promise: client => client.post('/cs/api/organization/updateCategory',params),
        afterSuccess:(dispatch,getState,response)=>{
            if(response.data.code===0){
                message.info(response.data.msg);
                const params = {
                    pageNo:1,
                    pageSize:obj.state.pageSize,
                };
                dispatch(getDataCategory(params));
            }else {
                message.info(response.data.msg);
            }
        },
    }
}
export function deleteDataCategory(params,obj) {
    return {
        types: [DELETE_REQUEST_Category, DELETE_SUCCESS_Category, DELETE_FAIL_Category],
        promise: client => client.post('/cs/api/organization/deleteCategory',params),
        afterSuccess:(dispatch,getState,response)=>{
            if(response.data.code===0){
                message.info(response.data.msg);
                if(dataTotal % obj.state.pageSize === 1){
                    lastPage -= 1
                    obj.setState({
                        current:lastPage
                    })
                    const params = {
                        pageNo:lastPage,
                        pageSize:obj.state.pageSize,
                    };
                    dispatch(getDataCategory(params));
                }else{
                    const params = {
                        pageNo:obj.state.current,
                        pageSize:obj.state.pageSize,
                    };
                    dispatch(getDataCategory(params));
                }

            }else {
                message.info(response.data.msg);
            }
        },
    }
}
