import {GET_SUCCESS_KnowladgeMng } from "actions/tablesKnowladgeMng";
import {CREATE_SUCCESS_KnowladgeMng } from "actions/tablesKnowladgeMng";
import {UPDATE_SUCCESS_KnowladgeMng } from "actions/tablesKnowladgeMng";
import {DELETE_SUCCESS_KnowladgeMng } from "actions/tablesKnowladgeMng";
import {GET_SUCCESS_KnowladgeMng_OTHER } from "actions/tablesKnowladgeMng";

// import {GET_SUCCESS_ArticleMng } from "actions/tablesKnowladgeMng";
// import {CREATE_SUCCESS_ArticleMng } from "actions/tablesKnowladgeMng";
// import {UPDATE_SUCCESS_ArticleMng } from "actions/tablesKnowladgeMng";
// import {DELETE_SUCCESS_ArticleMng } from "actions/tablesKnowladgeMng";
// import {GET_SUCCESS_ArticleMng_OTHER } from "actions/tablesKnowladgeMng";

const initState = {
    responseGetKnowladgeMng:'',
    responseCreateKnowladgeMng:'',
    responseUpdateKnowladgeMng:'',
    responseDeleteKnowladgeMng:'',
    responseOtherKnowladgeMng:'',
    tableDataKnowladgeMng:'',
    tableCountKnowladgeMng:'',

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
        case GET_SUCCESS_KnowladgeMng_OTHER:
            const responseOtherKnowladgeMng = action.result.data;
            return {
                ...state,
                responseOtherKnowladgeMng:responseOtherKnowladgeMng,
            };
        case GET_SUCCESS_KnowladgeMng:
            const responseGetKnowladgeMng = action.result.data;
            // console.log('responseGetKnowladgeMng.rows')
            // console.log(responseGetKnowladgeMng.rows)
            return {
                ...state,
                tableDataKnowladgeMng:responseGetKnowladgeMng.rows,
                tableCountKnowladgeMng:responseGetKnowladgeMng.total,
                responseGetKnowladgeMng:responseGetKnowladgeMng
            };
        case CREATE_SUCCESS_KnowladgeMng:
            const responseCreateKnowladgeMng = action.result.data;
            return {
                ...state,
                responseCreateKnowladgeMng:responseCreateKnowladgeMng
            };
        case UPDATE_SUCCESS_KnowladgeMng:
            const responseUpdateKnowladgeMng = action.result.data;
            return {
                ...state,
                responseUpdateKnowladgeMng:responseUpdateKnowladgeMng
            };
        case DELETE_SUCCESS_KnowladgeMng:
            const responseDeleteKnowladgeMng = action.result.data;
            return {
                ...state,
                responseDeleteKnowladgeMng:responseDeleteKnowladgeMng
            };

        //     case GET_SUCCESS_ArticleMng_OTHER:
        //     const responseOtherArticleMng = action.result.data;
        //     return {
        //         ...state,
        //         responseOtherArticleMng:responseOtherArticleMng,
        //     };
        // case GET_SUCCESS_ArticleMng:
        //     const responseGetArticleMng = action.result.data;
        //     return {
        //         ...state,
        //         tableDataArticleMng:responseGetArticleMng.rows,
        //         tableCountArticleMng:responseGetArticleMng.total,
        //         responseGetArticleMng:responseGetArticleMng
        //     };
        // case CREATE_SUCCESS_ArticleMng:
        //     const responseCreateArticleMng = action.result.data;
        //     return {
        //         ...state,
        //         responseCreateArticleMng:responseCreateArticleMng
        //     };
        // case UPDATE_SUCCESS_ArticleMng:
        //     const responseUpdateArticleMng = action.result.data;
        //     return {
        //         ...state,
        //         responseUpdateArticleMng:responseUpdateArticleMng
        //     };
        // case DELETE_SUCCESS_ArticleMng:
        //     const responseDeleteArticleMng = action.result.data;
        //     return {
        //         ...state,
        //         responseDeleteArticleMng:responseDeleteArticleMng
        //     };
        default:
            return state
    }
}
