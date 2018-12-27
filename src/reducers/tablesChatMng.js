import {GET_SUCCESS_ChatMng } from "actions/tablesChatMng";
import {CREATE_SUCCESS_ChatMng } from "actions/tablesChatMng";
import {UPDATE_SUCCESS_ChatMng } from "actions/tablesChatMng";
import {ACTIVE_SUCCESS_ChatMng } from "actions/tablesChatMng";
import {DELETE_SUCCESS_ChatMng } from "actions/tablesChatMng";
import {GET_SUCCESS_ChatMng_OTHER } from "actions/tablesChatMng";
import {GET_SUCCESS_Robot_OTHER } from "actions/tablesChatMng";
import {GET_SUCCESS_KillGroup_OTHER } from "actions/tablesChatMng";

const initState = {
    responseGetChatMng:'',
    responseCreateChatMng:'',
    responseUpdateChatMng:'',
    responseDeleteChatMng:'',
    responseActiveChatMng:'',
    responseOtherChatMng:'',
    responseOtherRobotChatMng:'',
    responseOtherKillGroupChatMng:'',
    tableDataChatMng:'',
    tableCountChatMng:''
};

export default function reducer(state = initState,action) {
    switch (action.type) {
        case GET_SUCCESS_KillGroup_OTHER:
            const responseOtherKillGroupChatMng = action.result.data;
            return {
                ...state,
                responseOtherKillGroupChatMng:responseOtherKillGroupChatMng,
            };
        case GET_SUCCESS_Robot_OTHER:
            const responseOtherRobotChatMng = action.result.data;
            return {
                ...state,
                responseOtherRobotChatMng:responseOtherRobotChatMng,
            };
        case GET_SUCCESS_ChatMng_OTHER:
            const responseOtherChatMng = action.result.data;
            return {
                ...state,
                responseOtherChatMng:responseOtherChatMng,
            };
        case GET_SUCCESS_ChatMng:
            const responseGetChatMng = action.result.data;
            return {
                ...state,
                tableDataChatMng:responseGetChatMng.rows,
                tableCountChatMng:responseGetChatMng.total,
                responseGetChatMng:responseGetChatMng
            };
        case CREATE_SUCCESS_ChatMng:
            const responseCreateChatMng = action.result.data;
            return {
                ...state,
                responseCreateChatMng:responseCreateChatMng
            };
        case UPDATE_SUCCESS_ChatMng:
            const responseUpdateChatMng = action.result.data;
            return {
                ...state,
                responseUpdateChatMng:responseUpdateChatMng
            };
        case DELETE_SUCCESS_ChatMng:
            const responseDeleteChatMng = action.result.data;
            return {
                ...state,
                responseDeleteChatMng:responseDeleteChatMng
            };
        case ACTIVE_SUCCESS_ChatMng:
            const responseActiveChatMng = action.result.data;
            return {
                ...state,
                responseActiveChatMng:responseActiveChatMng
            };
        default:
            return state
    }
}
