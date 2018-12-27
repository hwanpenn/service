import {GET_SUCCESS_ArticleMng } from "actions/tablesArticleMng";
import {CREATE_SUCCESS_ArticleMng } from "actions/tablesArticleMng";
import {UPDATE_SUCCESS_ArticleMng } from "actions/tablesArticleMng";
import {DELETE_SUCCESS_ArticleMng } from "actions/tablesArticleMng";
import {GET_SUCCESS_ArticleMng_OTHER } from "actions/tablesArticleMng";

const initState = {
    responseGetArticleMng:'',
    responseCreateArticleMng:'',
    responseUpdateArticleMng:'',
    responseDeleteArticleMng:'',
    responseOtherArticleMng:'',
    tableDataArticleMng:'',
    tableCountArticleMng:''
};

export default function reducer(state = initState,action) {
    switch (action.type) {
        case GET_SUCCESS_ArticleMng_OTHER:
            const responseOtherArticleMng = action.result.data;
            return {
                ...state,
                responseOtherArticleMng:responseOtherArticleMng,
            };
        case GET_SUCCESS_ArticleMng:
            const responseGetArticleMng = action.result.data;
            return {
                ...state,
                tableDataArticleMng:responseGetArticleMng.rows,
                tableCountArticleMng:responseGetArticleMng.total,
                responseGetArticleMng:responseGetArticleMng
            };
        case CREATE_SUCCESS_ArticleMng:
            const responseCreateArticleMng = action.result.data;
            return {
                ...state,
                responseCreateArticleMng:responseCreateArticleMng
            };
        case UPDATE_SUCCESS_ArticleMng:
            const responseUpdateArticleMng = action.result.data;
            return {
                ...state,
                responseUpdateArticleMng:responseUpdateArticleMng
            };
        case DELETE_SUCCESS_ArticleMng:
            const responseDeleteArticleMng = action.result.data;
            return {
                ...state,
                responseDeleteArticleMng:responseDeleteArticleMng
            };
        default:
            return state
    }
}
