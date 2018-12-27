import {GET_SUCCESS_MyCompany } from "actions/tablesMyCompany";
import {CREATE_SUCCESS_MyCompany } from "actions/tablesMyCompany";
import {UPDATE_SUCCESS_MyCompany } from "actions/tablesMyCompany";
import {DELETE_SUCCESS_MyCompany } from "actions/tablesMyCompany";
import {GET_SUCCESS_MyCompany_OTHER } from "actions/tablesMyCompany";
import {GET_SUCCESS_KillGroup_OTHER } from "actions/tablesMyCompany";

const initState = {
    responseGetMyCompany:'',
    responseCreateMyCompany:'',
    responseUpdateMyCompany:'',
    responseDeleteMyCompany:'',
    responseOtherMyCompany:'',
    responseOtherKillGroup:'',
    tableDataMyCompany:'',
    tableCountMyCompany:''
};

export default function reducer(state = initState,action) {
    switch (action.type) {
        case GET_SUCCESS_MyCompany_OTHER:
            const responseOtherMyCompany = action.result.data;
            // console.log(responseOtherMyCompany)
            return {
                ...state,
                responseOtherMyCompany:responseOtherMyCompany,
            };
        case GET_SUCCESS_KillGroup_OTHER:
            const responseOtherKillGroup = action.result.data;
            // console.log(responseOtherMyCompany)
            return {
                ...state,
                responseOtherKillGroup:responseOtherKillGroup,
            };
        case GET_SUCCESS_MyCompany:
            const responseGetMyCompany = action.result.data;
            return {
                ...state,
                tableDataMyCompany:responseGetMyCompany.rows,
                tableCountMyCompany:responseGetMyCompany.total,
                responseGetMyCompany:responseGetMyCompany
            };
        case CREATE_SUCCESS_MyCompany:
            const responseCreateMyCompany = action.result.data;
            return {
                ...state,
                responseCreateMyCompany:responseCreateMyCompany
            };
        case UPDATE_SUCCESS_MyCompany:
            const responseUpdateMyCompany = action.result.data;
            return {
                ...state,
                responseUpdateMyCompany:responseUpdateMyCompany
            };
        case DELETE_SUCCESS_MyCompany:
            const responseDeleteMyCompany = action.result.data;
            return {
                ...state,
                responseDeleteMyCompany:responseDeleteMyCompany
            };
        default:
            return state
    }
}
