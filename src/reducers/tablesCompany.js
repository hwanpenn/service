import {GET_SUCCESS_Company } from "actions/tablesCompany";
import {CREATE_SUCCESS_Company } from "actions/tablesCompany";
import {UPDATE_SUCCESS_Company } from "actions/tablesCompany";
import {DELETE_SUCCESS_Company } from "actions/tablesCompany";
import {GET_SUCCESS_Company_OTHER } from "actions/tablesCompany";

const initState = {
    responseGetCompany:'',
    responseCreateCompany:'',
    responseUpdateCompany:'',
    responseDeleteCompany:'',
    responseOtherCompany:'',
    tableDataCompany:'',
    tableCountCompany:''
};

export default function reducer(state = initState,action) {
    switch (action.type) {
        case GET_SUCCESS_Company_OTHER:
            const responseOtherCompany = action.result.data;
            console.log(responseOtherCompany)
            return {
                ...state,
                responseOtherCompany:responseOtherCompany,
            };
        case GET_SUCCESS_Company:
            const responseGetCompany = action.result.data;
            return {
                ...state,
                tableDataCompany:responseGetCompany.rows,
                tableCountCompany:responseGetCompany.total,
                responseGetCompany:responseGetCompany
            };
        case CREATE_SUCCESS_Company:
            const responseCreateCompany = action.result.data;
            return {
                ...state,
                responseCreateCompany:responseCreateCompany
            };
        case UPDATE_SUCCESS_Company:
            const responseUpdateCompany = action.result.data;
            return {
                ...state,
                responseUpdateCompany:responseUpdateCompany
            };
        case DELETE_SUCCESS_Company:
            const responseDeleteCompany = action.result.data;
            return {
                ...state,
                responseDeleteCompany:responseDeleteCompany
            };
        default:
            return state
    }
}
