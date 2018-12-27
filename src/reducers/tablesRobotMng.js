import {GET_SUCCESS_RobotMng } from "actions/tablesRobotMng";
import {CREATE_SUCCESS_RobotMng } from "actions/tablesRobotMng";
import {UPDATE_SUCCESS_RobotMng } from "actions/tablesRobotMng";
import {DELETE_SUCCESS_RobotMng } from "actions/tablesRobotMng";
import {GET_SUCCESS_RobotMng_OTHER } from "actions/tablesRobotMng";
import {ACTIVE_SUCCESS_RobotMng } from "actions/tablesRobotMng";

const initState = {
    responseGetRobotMng:'',
    responseCreateRobotMng:'',
    responseUpdateRobotMng:'',
    responseDeleteRobotMng:'',
    responseOtherRobotMng:'',
    tableDataRobotMng:'',
    tableCountRobotMng:''
};

export default function reducer(state = initState,action) {
    switch (action.type) {
        case GET_SUCCESS_RobotMng_OTHER:
            const responseOtherRobotMng = action.result.data;
            return {
                ...state,
                responseOtherRobotMng:responseOtherRobotMng,
            };
        case GET_SUCCESS_RobotMng:
            const responseGetRobotMng = action.result.data;
            return {
                ...state,
                tableDataRobotMng:responseGetRobotMng.rows,
                tableCountRobotMng:responseGetRobotMng.total,
                responseGetRobotMng:responseGetRobotMng
            };
        case CREATE_SUCCESS_RobotMng:
            const responseCreateRobotMng = action.result.data;
            return {
                ...state,
                responseCreateRobotMng:responseCreateRobotMng
            };
        case UPDATE_SUCCESS_RobotMng:
            const responseUpdateRobotMng = action.result.data;
            return {
                ...state,
                responseUpdateRobotMng:responseUpdateRobotMng
            };
        case DELETE_SUCCESS_RobotMng:
            const responseDeleteRobotMng = action.result.data;
            return {
                ...state,
                responseDeleteRobotMng:responseDeleteRobotMng
            };
        case ACTIVE_SUCCESS_RobotMng:
            const responseActiveRobotMng = action.result.data;
            return {
                ...state,
                responseActiveRobotMng:responseActiveRobotMng
            };
        default:
            return state
    }
}
