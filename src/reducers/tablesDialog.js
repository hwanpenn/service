import {GET_SUCCESS_Dialog } from "actions/tablesDialog";
import {CREATE_SUCCESS_Dialog } from "actions/tablesDialog";
import {UPDATE_SUCCESS_Dialog } from "actions/tablesDialog";
import {DELETE_SUCCESS_Dialog } from "actions/tablesDialog";
import {GET_SUCCESS_Dialog_OTHER } from "actions/tablesDialog";

const initState = {
    responseGetDialog:'',
    responseCreateDialog:'',
    responseUpdateDialog:'',
    responseDeleteDialog:'',
    responseOtherDialog:'',
    tableDataDialog:'',
    tableCountDialog:''
};

export default function reducer(state = initState,action) {
    switch (action.type) {
        case GET_SUCCESS_Dialog_OTHER:
            const responseOtherDialog = action.result.data;
            return {
                ...state,
                responseOtherDialog:responseOtherDialog,
            };
        case GET_SUCCESS_Dialog:
            const responseGetDialog = action.result.data;
            return {
                ...state,
                tableDataDialog:responseGetDialog.rows,
                tableCountDialog:responseGetDialog.total,
                responseGetDialog:responseGetDialog
            };
        case CREATE_SUCCESS_Dialog:
            const responseCreateDialog = action.result.data;
            return {
                ...state,
                responseCreateDialog:responseCreateDialog
            };
        case UPDATE_SUCCESS_Dialog:
            const responseUpdateDialog = action.result.data;
            return {
                ...state,
                responseUpdateDialog:responseUpdateDialog
            };
        case DELETE_SUCCESS_Dialog:
            const responseDeleteDialog = action.result.data;
            return {
                ...state,
                responseDeleteDialog:responseDeleteDialog
            };
        default:
            return state
    }
}
