import { message } from 'antd';
message.config({
    duration: 1,
});

export const GET_REQUEST_Dialog = "GET_REQUEST_Dialog";
export const GET_SUCCESS_Dialog = "GET_SUCCESS_Dialog";
export const GET_FAIL_Dialog = "GET_FAIL_Dialog";
export const CREATE_REQUEST_Dialog = "CREATE_REQUEST_Dialog";
export const CREATE_SUCCESS_Dialog = "CREATE_SUCCESS_Dialog";
export const CREATE_FAIL_Dialog = "CREATE_FAIL_Dialog";
export const UPDATE_REQUEST_Dialog = "UPDATE_REQUEST_Dialog";
export const UPDATE_SUCCESS_Dialog = "UPDATE_SUCCESS_Dialog";
export const UPDATE_FAIL_Dialog = "UPDATE_FAIL_Dialog";
export const DELETE_REQUEST_Dialog = "DELETE_REQUEST_Dialog";
export const DELETE_SUCCESS_Dialog = "DELETE_SUCCESS_Dialog";
export const DELETE_FAIL_Dialog = "DELETE_FAIL_Dialog";

export const GET_REQUEST_Dialog_OTHER = "GET_REQUEST_Dialog_OTHER";
export const GET_SUCCESS_Dialog_OTHER = "GET_SUCCESS_Dialog_OTHER";
export const GET_FAIL_Dialog_OTHER = "GET_FAIL_Dialog_OTHER";

export function getOtherDialog(params,obj) {
    // let defaultRobotId
    return {
        types: [GET_REQUEST_Dialog_OTHER, GET_SUCCESS_Dialog_OTHER, GET_FAIL_Dialog_OTHER],
        promise: client => client.get('/cs/api/robot/achieveRobot',{params: params}),
        afterSuccess:(dispatch,getState,response)=>{
            if(response.data.code===0){
                if(response.data.rows.length===0){
                    // message.info('机器人列表为空');
                }else{
                    obj.setState({
                        robotId:response.data.rows[0].robotId,
                    })
                    const params = {
                        robotId:response.data.rows[0].robotId,
                        pageNo:1,
                        pageSize:10,
                    };
                    dispatch(getDataDialog(params));
                }
                
            }else {
                message.info(response.data.msg);
            }
            /*请求成功后执行的函数*/
        },
        // defaultRobotId:defaultRobotId
    }
}

export function getDataDialog(params) {
    return {
        types: [GET_REQUEST_Dialog, GET_SUCCESS_Dialog, GET_FAIL_Dialog],
        promise: client => client.get('/cs/api/robot/queryDialogData',{params: params}),
        afterSuccess:(dispatch,getState,response)=>{
            /*请求成功后执行的函数*/
        },
        // otherData:otherData
    }
}
export function createDataDialog(params) {
    return {
        types: [CREATE_REQUEST_Dialog, CREATE_SUCCESS_Dialog, CREATE_FAIL_Dialog],
        promise: client => client.post('/cs/api/robot/addChatWindow',params),
        afterSuccess:(dispatch,getState,response)=>{
            if(response.data.code===0){
                message.info(response.data.msg);
                const params = {
                    pageNo:1,
                    pageSize:10,
                };
                dispatch(getDataDialog(params));
            }else {
                message.info(response.data.msg);
            }
        },
    }
}
export function updateDataDialog(params) {
    return {
        types: [UPDATE_REQUEST_Dialog, UPDATE_SUCCESS_Dialog, UPDATE_FAIL_Dialog],
        promise: client => client.post('/cs/api/robot/updateChatWindow',params),
        afterSuccess:(dispatch,getState,response)=>{
            if(response.data.code===0){
                message.info(response.data.msg);
                const params = {
                    pageNo:1,
                    pageSize:10,
                };
                dispatch(getDataDialog(params));
            }else {
                message.info(response.data.msg);
            }
        },
    }
}
export function deleteDataDialog(params) {
    return {
        types: [DELETE_REQUEST_Dialog, DELETE_SUCCESS_Dialog, DELETE_FAIL_Dialog],
        promise: client => client.post('/cs/api/robot/deleteChatWindow',params),
        afterSuccess:(dispatch,getState,response)=>{
            if(response.data.code===0){
                message.info(response.data.msg);
                const params = {
                    pageNo:1,
                    pageSize:10,
                };
                dispatch(getDataDialog(params));
            }else {
                message.info(response.data.msg);
            }
        },
    }
}
