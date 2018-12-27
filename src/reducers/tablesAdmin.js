import {GET_SUCCESS_Admin } from "actions/tablesAdmin";
import {CREATE_SUCCESS_Admin } from "actions/tablesAdmin";
import {UPDATE_SUCCESS_Admin } from "actions/tablesAdmin";
import {UPDATE_SUCCESS_PasswordAdmin } from "actions/tablesAdmin";
import {DELETE_SUCCESS_Admin } from "actions/tablesAdmin";
import {GET_SUCCESS_Admin_OTHER } from "actions/tablesAdmin";

const initState = {
    responseGetAdmin:'',
    responseCreateAdmin:'',
    responseUpdateAdmin:'',
    responseUpdatePasswordAdmin:'',
    responseDeleteAdmin:'',
    responseOtherAdmin:'',
    tableDataAdmin:'',
    tableCountAdmin:''
};

export default function reducer(state = initState,action) {
    switch (action.type) {
        case GET_SUCCESS_Admin_OTHER:
            const responseOtherAdmin = action.result.data;
            return {
                ...state,
                responseOtherAdmin:responseOtherAdmin,
            };
        case GET_SUCCESS_Admin:
            const responseGetAdmin = action.result.data;
            return {
                ...state,
                tableDataAdmin:responseGetAdmin.rows,
                tableCountAdmin:responseGetAdmin.total,
                responseGetAdmin:responseGetAdmin
            };
        case CREATE_SUCCESS_Admin:
            const responseCreateAdmin = action.result.data;
            return {
                ...state,
                responseCreateAdmin:responseCreateAdmin
            };
        case UPDATE_SUCCESS_Admin:
            const responseUpdateAdmin = action.result.data;
            return {
                ...state,
                responseUpdateAdmin:responseUpdateAdmin
            };
        case UPDATE_SUCCESS_PasswordAdmin:
            const responseUpdatePasswordAdmin = action.result.data;
            return {
                ...state,
                responseUpdatePasswordAdmin:responseUpdatePasswordAdmin
            };
        case DELETE_SUCCESS_Admin:
            const responseDeleteAdmin = action.result.data;
            return {
                ...state,
                responseDeleteAdmin:responseDeleteAdmin
            };
        default:
            return state
    }
}
