import {GET_SUCCESS_ML } from "actions/tablesML";
import {CREATE_SUCCESS_ML } from "actions/tablesML";
import {IMPORT_SUCCESS_ML } from "actions/tablesML";
import {UPDATE_SUCCESS_ML } from "actions/tablesML";
import {DELETE_SUCCESS_ML } from "actions/tablesML";
import {GET_SUCCESS_ML_OTHER } from "actions/tablesML";

const initState = {
    responseGetML:'',
    responseCreateML:'',
    responseUpdateML:'',
    responseDeleteML:'',
    responseOtherML:'',
    tableDataML:'',
    tableCountML:'',
    defaultRobotId:''
};

export default function reducer(state = initState,action) {
    switch (action.type) {
        case GET_SUCCESS_ML_OTHER:
            const responseOtherML = action.result.data;
            // let defaultRobotId
            // if(responseOtherML.rows!==[]){
            //      defaultRobotId = responseOtherML.rows[0].robotId
            // }
            // console.log(defaultRobotId)
            return {
                ...state,
                responseOtherML:responseOtherML,
                // defaultRobotId:defaultRobotId
            };
        case GET_SUCCESS_ML:
            const responseGetML = action.result.data;
            return {
                ...state,
                tableDataML:responseGetML.rows,
                tableCountML:responseGetML.total,
                responseGetML:responseGetML
            };
        case CREATE_SUCCESS_ML:
            const responseCreateML = action.result.data;
            return {
                ...state,
                responseCreateML:responseCreateML
            };
        case IMPORT_SUCCESS_ML:
            const responseImportML = action.result.data;
            return {
                ...state,
                responseImportML:responseImportML
            };
        case UPDATE_SUCCESS_ML:
            const responseUpdateML = action.result.data;
            return {
                ...state,
                responseUpdateML:responseUpdateML
            };
        case DELETE_SUCCESS_ML:
            const responseDeleteML = action.result.data;
            return {
                ...state,
                responseDeleteML:responseDeleteML
            };
        default:
            return state
    }
}
