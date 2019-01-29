// import {GET_SUCCESS_Suggestion} from"actions/tablesEchartsMng.js"
// import {GET_SUCCESS_Suggestion_OTHER} from"actions/tablesEchartsMng.js"
//
// const initState = {
//     responseOtherSuggestion:"",
//     treeDataSuggestion:""
// }
//
// export default function reducer(state = initState,action) {
//     switch (action.type) {
//         case GET_SUCCESS_Suggestion:
//             const responseOtherSuggestion = action.result.data;
//             return {
//                 ...state,
//                 responseOtherSuggestion: responseOtherSuggestion,
//             };
//         case GET_SUCCESS_Suggestion_OTHER:
//             const responseGetSuggestion = action.result.data;
//             return {
//                 ...state,
//                 treeDataSuggestion: responseGetSuggestion.rows,
//
//             };
//     }
// }