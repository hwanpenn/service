import { message } from 'antd';
message.config({
    duration: 1,
});

export const GET_REQUEST_ML = "GET_REQUEST_ML";
export const GET_SUCCESS_ML = "GET_SUCCESS_ML";
export const GET_FAIL_ML = "GET_FAIL_ML";
export const CREATE_REQUEST_ML = "CREATE_REQUEST_ML";
export const CREATE_SUCCESS_ML = "CREATE_SUCCESS_ML";
export const CREATE_FAIL_ML = "CREATE_FAIL_ML";
export const IMPORT_REQUEST_ML = "IMPORT_REQUEST_ML";
export const IMPORT_SUCCESS_ML = "IMPORT_SUCCESS_ML";
export const IMPORT_FAIL_ML = "IMPORT_FAIL_ML";
export const UPDATE_REQUEST_ML = "UPDATE_REQUEST_ML";
export const UPDATE_SUCCESS_ML = "UPDATE_SUCCESS_ML";
export const UPDATE_FAIL_ML = "UPDATE_FAIL_ML";
export const DELETE_REQUEST_ML = "DELETE_REQUEST_ML";
export const DELETE_SUCCESS_ML = "DELETE_SUCCESS_ML";
export const DELETE_FAIL_ML = "DELETE_FAIL_ML";

export const GET_REQUEST_ML_OTHER = "GET_REQUEST_ML_OTHER";
export const GET_SUCCESS_ML_OTHER = "GET_SUCCESS_ML_OTHER";
export const GET_FAIL_ML_OTHER = "GET_FAIL_ML_OTHER";

export function getOtherML(params,obj) {
    // let defaultRobotId
    return {
        types: [GET_REQUEST_ML_OTHER, GET_SUCCESS_ML_OTHER, GET_FAIL_ML_OTHER],
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
                        pageSize:20,
                    };
                    dispatch(getDataML(params));
                }
                
            }else {
                message.info(response.data.msg);
            }
            /*请求成功后执行的函数*/
        },
        // defaultRobotId:defaultRobotId
    }
}

export function getDataML(params,obj) {
    return {
        types: [GET_REQUEST_ML, GET_SUCCESS_ML, GET_FAIL_ML],
        promise: client => client.get('/cs/api/robot/queryPageToRobotLearn',{params: params}),
        afterSuccess:(dispatch,getState,response)=>{
            /*请求成功后执行的函数*/
        },
        // otherData:otherData
    }
}
export function importDataML(params,obj) {
    return {
        types: [IMPORT_REQUEST_ML, IMPORT_SUCCESS_ML, IMPORT_FAIL_ML],
        promise: client => client.post('/cs/api/robot/addLearnDataList',params),
        afterSuccess:(dispatch,getState,response)=>{
            if(response.data.code===0){
                message.info(response.data.msg);
                const params = {
                    robotId:obj.state.robotId,
                    pageNo:1,
                    pageSize:999,
                };
                dispatch(getDataML(params));
            }else {
                message.info(response.data.msg);
            }
        },
    }
}
export function createDataML(params,obj) {
    return {
        types: [CREATE_REQUEST_ML, CREATE_SUCCESS_ML, CREATE_FAIL_ML],
        promise: client => client.post('/cs/api/robot/addRobotLearn',params),
        afterSuccess:(dispatch,getState,response)=>{
            if(response.data.code===0){
                message.info(response.data.msg);
                const params = {
                    robotId:obj.state.robotId,
                    pageNo:1,
                    pageSize:999,
                };
                dispatch(getDataML(params));
            }else {
                message.info(response.data.msg);
            }
        },
    }
}
export function updateDataML(params,obj) {
    return {
        types: [UPDATE_REQUEST_ML, UPDATE_SUCCESS_ML, UPDATE_FAIL_ML],
        promise: client => client.post('/cs/api/robot/robotLearnData',params),
        afterSuccess:(dispatch,getState,response)=>{
            if(response.data.code===0){
                message.info(response.data.msg);
                const params = {
                    robotId:obj.state.robotId,
                    pageNo:1,
                    pageSize:999,
                };
                dispatch(getDataML(params));
            }else {
                message.info(response.data.msg);
            }
        },
    }
}
export function deleteDataML(params,obj) {
    return {
        types: [DELETE_REQUEST_ML, DELETE_SUCCESS_ML, DELETE_FAIL_ML],
        promise: client => client.post('/cs/api/robot/deleteRobotLearn',params),
        afterSuccess:(dispatch,getState,response)=>{
            if(response.data.code===0){
                message.info(response.data.msg);
                const params = {
                    robotId:obj.state.robotId,
                    pageNo:1,
                    pageSize:10,
                };
                dispatch(getDataML(params));
            }else {
                message.info(response.data.msg);
            }
        },
    }
}
