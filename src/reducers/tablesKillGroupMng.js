import {GET_SUCCESS_KillGroupMng } from "actions/tablesKillGroupMng";
import {CREATE_SUCCESS_KillGroupMng } from "actions/tablesKillGroupMng";
import {UPDATE_SUCCESS_KillGroupMng } from "actions/tablesKillGroupMng";
import {DELETE_SUCCESS_KillGroupMng } from "actions/tablesKillGroupMng";
import {GET_SUCCESS_KillGroupMng_OTHER } from "actions/tablesKillGroupMng";

const initState = {
    responseGetKillGroupMng:'',
    responseCreateKillGroupMng:'',
    responseUpdateKillGroupMng:'',
    responseDeleteKillGroupMng:'',
    responseOtherKillGroupMng:'',
    tableDataKillGroupMng:'',
    tableCountKillGroupMng:'',
    visibleModifyKillGroupMng: false
};

export default function reducer(state = initState,action) {
    switch (action.type) {
        case GET_SUCCESS_KillGroupMng_OTHER:
            const responseOtherKillGroupMng = action.result.data;
            return {
                ...state,
                responseOtherKillGroupMng:responseOtherKillGroupMng,
            };
        case GET_SUCCESS_KillGroupMng:
            const responseGetKillGroupMng = action.result.data;
            return {
                ...state,
                tableDataKillGroupMng:responseGetKillGroupMng.rows,
                tableCountKillGroupMng:responseGetKillGroupMng.total,
                responseGetKillGroupMng:responseGetKillGroupMng
            };
        case CREATE_SUCCESS_KillGroupMng:
            const responseCreateKillGroupMng = action.result.data;
            return {
                ...state,
                responseCreateKillGroupMng:responseCreateKillGroupMng
            };
        case UPDATE_SUCCESS_KillGroupMng:
            // const responseUpdateKillGroupMng = action.result.data;
            // return {
            //     ...state,
            //     responseUpdateKillGroupMng:responseUpdateKillGroupMng
            // };
        case DELETE_SUCCESS_KillGroupMng:
            const responseDeleteKillGroupMng = action.result.data;
            return {
                ...state,
                responseDeleteKillGroupMng:responseDeleteKillGroupMng
            };
        default:
            return state
    }
}
