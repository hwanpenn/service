import {GET_SUCCESS_Category } from "actions/tablesCategory";
import {CREATE_SUCCESS_Category } from "actions/tablesCategory";
import {UPDATE_SUCCESS_Category } from "actions/tablesCategory";
import {DELETE_SUCCESS_Category } from "actions/tablesCategory";
import {GET_SUCCESS_Category_OTHER } from "actions/tablesCategory";

const initState = {
    responseGetCategory:'',
    responseCreateCategory:'',
    responseUpdateCategory:'',
    responseDeleteCategory:'',
    responseOtherCategory:'',
    tableDataCategory:'',
    tableCountCategory:''
};

export default function reducer(state = initState,action) {
    switch (action.type) {
        case GET_SUCCESS_Category_OTHER:
            const responseOtherCategory = action.result.data;
            return {
                ...state,
                responseOtherCategory:responseOtherCategory,
            };
        case GET_SUCCESS_Category:
            const responseGetCategory = action.result.data;
            return {
                ...state,
                tableDataCategory:responseGetCategory.rows,
                tableCountCategory:responseGetCategory.total,
                responseGetCategory:responseGetCategory
            };
        case CREATE_SUCCESS_Category:
            const responseCreateCategory = action.result.data;
            return {
                ...state,
                responseCreateCategory:responseCreateCategory
            };
        case UPDATE_SUCCESS_Category:
            const responseUpdateCategory = action.result.data;
            return {
                ...state,
                responseUpdateCategory:responseUpdateCategory
            };
        case DELETE_SUCCESS_Category:
            const responseDeleteCategory = action.result.data;
            return {
                ...state,
                responseDeleteCategory:responseDeleteCategory
            };
        default:
            return state
    }
}
