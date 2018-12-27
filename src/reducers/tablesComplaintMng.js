import {GET_SUCCESS_ComplaintMng } from "actions/tablesComplaintMng";
import {CREATE_SUCCESS_ComplaintMng } from "actions/tablesComplaintMng";
import {UPDATE_SUCCESS_ComplaintMng } from "actions/tablesComplaintMng";
import {DELETE_SUCCESS_ComplaintMng } from "actions/tablesComplaintMng";
import {GET_SUCCESS_ComplaintMng_OTHER } from "actions/tablesComplaintMng";

const initState = {
    responseGetComplaintMng:'',
    responseCreateComplaintMng:'',
    responseUpdateComplaintMng:'',
    responseDeleteComplaintMng:'',
    responseOtherComplaintMng:'',
    tableDataComplaintMng:'',
    tableCountComplaintMng:''
};

export default function reducer(state = initState,action) {
    switch (action.type) {
        case GET_SUCCESS_ComplaintMng_OTHER:
            const responseOtherComplaintMng = action.result.data;
            return {
                ...state,
                responseOtherComplaintMng:responseOtherComplaintMng,
            };
        case GET_SUCCESS_ComplaintMng:
            const responseGetComplaintMng = action.result.data;
            return {
                ...state,
                tableDataComplaintMng:responseGetComplaintMng.rows,
                tableCountComplaintMng:responseGetComplaintMng.total,
                responseGetComplaintMng:responseGetComplaintMng
            };
        case CREATE_SUCCESS_ComplaintMng:
            const responseCreateComplaintMng = action.result.data;
            return {
                ...state,
                responseCreateComplaintMng:responseCreateComplaintMng
            };
        case UPDATE_SUCCESS_ComplaintMng:
            const responseUpdateComplaintMng = action.result.data;
            return {
                ...state,
                responseUpdateComplaintMng:responseUpdateComplaintMng
            };
        case DELETE_SUCCESS_ComplaintMng:
            const responseDeleteComplaintMng = action.result.data;
            return {
                ...state,
                responseDeleteComplaintMng:responseDeleteComplaintMng
            };
        default:
            return state
    }
}
