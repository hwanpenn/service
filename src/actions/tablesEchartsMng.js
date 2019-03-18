// import { message } from 'antd';
// message.config({
//     duration: 1,
// });
//
// export const GET_REQUEST_Suggestion = "GET_REQUEST_Suggestion";
// export const GET_SUCCESS_Suggestion = "GET_SUCCESS_Suggestion";
// export const GET_FAIL_Suggestion = "GET_FAIL_Suggestion";
//
// export const GET_REQUEST_Suggestion_OTHER = "GET_REQUEST_Suggestion_OTHER";
// export const GET_SUCCESS_Suggestion_OTHER = "GET_SUCCESS_Suggestion_OTHER";
// export const GET_FAIL_Suggestion_OTHER = "GET_FAIL_Suggestion_OTHER";
//
// export function getOtherSecretKey(thisObj) {
//     return {
//         types: [GET_REQUEST_Suggestion_OTHER, GET_SUCCESS_Suggestion_OTHER, GET_FAIL_Suggestion_OTHER],
//         promise: client => client.get('/cs/api/sys/generateSecretKey',{params: ''}),
//         afterSuccess:(dispatch,getState,response)=>{
//             /*请求成功后执行的函数*/
//             // console.log('请求成功')
//             // console.log(response.data)
//             thisObj.setState({ visible: true,privateKey:response.data.rows.privateKey,publicKey:response.data.rows.publicKey });
//         },
//         // otherData:otherData
//     }
// }
//
// export function getTreeDataSuggestion(params) {
//     return {
//         types: [GET_REQUEST_Suggestion, GET_SUCCESS_Suggestion, GET_FAIL_Suggestion],
//         promise: client => client.get('/cs/api/sys/queryPage', {params: params}),
//         afterSuccess: (dispatch, getState, response) => {
//             /*请求成功后执行的函数*/
//         },
//         // otherData:otherData
//     }
// }
