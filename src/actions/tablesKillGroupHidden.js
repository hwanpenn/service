import { message } from 'antd';
message.config({
    duration: 1,
});

export const GET_REQUEST_KillGroupHidden = "GET_REQUEST_KillGroupHidden";
export const GET_SUCCESS_KillGroupHidden = "GET_SUCCESS_KillGroupHidden";
export const GET_FAIL_KillGroupHidden = "GET_FAIL_KillGroupHidden";
export const CREATE_REQUEST_KillGroupHidden = "CREATE_REQUEST_KillGroupHidden";
export const CREATE_SUCCESS_KillGroupHidden = "CREATE_SUCCESS_KillGroupHidden";
export const CREATE_FAIL_KillGroupHidden = "CREATE_FAIL_KillGroupHidden";
export const UPDATE_REQUEST_KillGroupHidden = "UPDATE_REQUEST_KillGroupHidden";
export const UPDATE_SUCCESS_KillGroupHidden = "UPDATE_SUCCESS_KillGroupHidden";
export const UPDATE_FAIL_KillGroupHidden = "UPDATE_FAIL_KillGroupHidden";
export const DELETE_REQUEST_KillGroupHidden = "DELETE_REQUEST_KillGroupHidden";
export const DELETE_SUCCESS_KillGroupHidden = "DELETE_SUCCESS_KillGroupHidden";
export const DELETE_FAIL_KillGroupHidden = "DELETE_FAIL_KillGroupHidden";

export const GET_REQUEST_KillGroupHidden_OTHER = "GET_REQUEST_KillGroupHidden_OTHER";
export const GET_SUCCESS_KillGroupHidden_OTHER = "GET_SUCCESS_KillGroupHidden_OTHER";
export const GET_FAIL_KillGroupHidden_OTHER = "GET_FAIL_KillGroupHidden_OTHER";

export let dataTotal
export let lastPage

export function getOtherKillGroupHidden(params) {
    return {
        types: [GET_REQUEST_KillGroupHidden_OTHER, GET_SUCCESS_KillGroupHidden_OTHER, GET_FAIL_KillGroupHidden_OTHER],
        promise: client => client.get('/api/role',{params: params}),
        afterSuccess:(dispatch,getState,response)=>{
            /*请求成功后执行的函数*/
        },
        // otherData:otherData
    }
}

export function getDataKillGroupHidden(params) {
    // console.log('getDataKillGroupHidden')
    return {
        types: [GET_REQUEST_KillGroupHidden, GET_SUCCESS_KillGroupHidden, GET_FAIL_KillGroupHidden],
        promise: client => client.get('/cs/api/customer/achieveUser',{params: params}),
        afterSuccess:(dispatch,getState,response)=>{
            lastPage = parseInt(response.data.total/10)+1
            dataTotal = response.data.total
            /*请求成功后执行的函数*/
        },
        // otherData:otherData
    }
}
export function createDataKillGroupHidden(params) {
    return {
        types: [CREATE_REQUEST_KillGroupHidden, CREATE_SUCCESS_KillGroupHidden, CREATE_FAIL_KillGroupHidden],
        promise: client => client.post('/cs/api/customer/addCustomerUser',params),
        afterSuccess:(dispatch,getState,response)=>{
            if(response.data.code===0){
                message.info(response.data.msg);
                const params = {
                    pageNo:1,
                    pageSize:10,
                };
                dispatch(getDataKillGroupHidden(params));
            }else {
                message.info(response.data.msg);
            }
        },
    }
}
export function updateDataKillGroupHidden(params) {
    return {
        types: [UPDATE_REQUEST_KillGroupHidden, UPDATE_SUCCESS_KillGroupHidden, UPDATE_FAIL_KillGroupHidden],
        promise: client => client.post('/cs/api/customer/updateCustomerUser',params),
        afterSuccess:(dispatch,getState,response)=>{
            if(response.data.code===0){
                message.info(response.data.msg);
                const params = {
                    pageNo:1,
                    pageSize:10,
                };
                dispatch(getDataKillGroupHidden(params));
            }else {
                message.info(response.data.msg);
            }
        },
    }
}
export function deleteDataKillGroupHidden(params,obj) {
    // console.log('params')
    // console.log(params)
    const paramsTemp = params
    return {
        types: [DELETE_REQUEST_KillGroupHidden, DELETE_SUCCESS_KillGroupHidden, DELETE_FAIL_KillGroupHidden],
        promise: client => client.post('/cs/api/customer/deleteCustomerUser',params),
        afterSuccess:(dispatch,getState,response)=>{
            if(response.data.code===0){
                message.info(response.data.msg);
                if(dataTotal % 10 === 1){
                    lastPage -= 1;
                    obj.setState({
                        current:lastPage
                    })
                    const params = {
                        pageNo:lastPage,
                        pageSize:10,
                        cuSkGroupId: paramsTemp.cuSkGroupId,
                    };
                    dispatch(getDataKillGroupHidden(params));
                }else{
                    const params = {
                        pageNo:obj.state.current,
                        pageSize:10,
                        cuSkGroupId: paramsTemp.cuSkGroupId,
                    };
                    dispatch(getDataKillGroupHidden(params));
                }

            }else {
                message.info(response.data.msg);
            }
        },
    }
}
