import {GET_SUCCESS_KillGroupHidden } from "actions/tablesKillGroupHidden";
import {CREATE_SUCCESS_KillGroupHidden } from "actions/tablesKillGroupHidden";
import {UPDATE_SUCCESS_KillGroupHidden } from "actions/tablesKillGroupHidden";
import {DELETE_SUCCESS_KillGroupHidden } from "actions/tablesKillGroupHidden";
import {GET_SUCCESS_KillGroupHidden_OTHER } from "actions/tablesKillGroupHidden";

const initState = {
    responseGetKillGroupHidden:'',
    responseCreateKillGroupHidden:'',
    responseUpdateKillGroupHidden:'',
    responseDeleteKillGroupHidden:'',
    responseOtherKillGroupHidden:'',
    tableDataKillGroupHidden:'',
    tableCountKillGroupHidden:''
};

export default function reducer(state = initState,action) {
    switch (action.type) {
        case GET_SUCCESS_KillGroupHidden_OTHER:
            const responseOtherKillGroupHidden = action.result.data;
            return {
                ...state,
                responseOtherKillGroupHidden:responseOtherKillGroupHidden,
            };
        case GET_SUCCESS_KillGroupHidden:
            const responseGetKillGroupHidden = action.result.data;
            return {
                ...state,
                tableDataKillGroupHidden:responseGetKillGroupHidden.rows,
                tableCountKillGroupHidden:responseGetKillGroupHidden.total,
                responseGetKillGroupHidden:responseGetKillGroupHidden
            };
        case CREATE_SUCCESS_KillGroupHidden:
            const responseCreateKillGroupHidden = action.result.data;
            return {
                ...state,
                responseCreateKillGroupHidden:responseCreateKillGroupHidden
            };
        case UPDATE_SUCCESS_KillGroupHidden:
            const responseUpdateKillGroupHidden = action.result.data;
            return {
                ...state,
                responseUpdateKillGroupHidden:responseUpdateKillGroupHidden
            };
        case DELETE_SUCCESS_KillGroupHidden:
            const responseDeleteKillGroupHidden = action.result.data;
            return {
                ...state,
                responseDeleteKillGroupHidden:responseDeleteKillGroupHidden
            };
        default:
            return state
    }
}
