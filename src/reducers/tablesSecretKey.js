import {GET_SUCCESS_SecretKey } from "actions/tablesSecretKey";
import {CREATE_SUCCESS_SecretKey } from "actions/tablesSecretKey";
import {UPDATE_SUCCESS_SecretKey } from "actions/tablesSecretKey";
import {DELETE_SUCCESS_SecretKey } from "actions/tablesSecretKey";
import {GET_SUCCESS_SecretKey_OTHER } from "actions/tablesSecretKey";

const initState = {
    responseGetSecretKey:'',
    responseCreateSecretKey:'',
    responseUpdateSecretKey:'',
    responseDeleteSecretKey:'',
    responseOtherSecretKey:'',
    tableDataSecretKey:'',
    tableCountSecretKey:'',
    visibleModifySecretKey: false
};

export default function reducer(state = initState,action) {
    switch (action.type) {
        case GET_SUCCESS_SecretKey_OTHER:
            const responseOtherSecretKey = action.result.data;
            return {
                ...state,
                responseOtherSecretKey:responseOtherSecretKey,
            };
        case GET_SUCCESS_SecretKey:
            const responseGetSecretKey = action.result.data;
            return {
                ...state,
                tableDataSecretKey:responseGetSecretKey.rows,
                tableCountSecretKey:responseGetSecretKey.total,
                responseGetSecretKey:responseGetSecretKey
            };
        case CREATE_SUCCESS_SecretKey:
            const responseCreateSecretKey = action.result.data;
            return {
                ...state,
                responseCreateSecretKey:responseCreateSecretKey
            };
        case UPDATE_SUCCESS_SecretKey:
            // const responseUpdateSecretKey = action.result.data;
            // return {
            //     ...state,
            //     responseUpdateSecretKey:responseUpdateSecretKey
            // };
        case DELETE_SUCCESS_SecretKey:
            const responseDeleteSecretKey = action.result.data;
            return {
                ...state,
                responseDeleteSecretKey:responseDeleteSecretKey
            };
        default:
            return state
    }
}
