import {APPREDUXTEST,APPREDUXCHANGE} from "../actions/app";
// import {APPUSERNAME,APPPASSWORD} from "../actions/app";
import {APPPLOGINS} from "../actions/app";
const initState = {
    username: "hwanpenn"
};

export default function reducer(state = initState,action) {
    switch (action.type) {
        case APPREDUXTEST:
            return{
                ...state,
                // username: state.username
            };
        case APPREDUXCHANGE:
            return{
                ...state,
                // username: "hwanpennNew"
            };
        // case APPUSERNAME:
        //     return{
        //         ...state,
        //         username: action.temp
        //     };
        // case APPPASSWORD:
        //     return{
        //         ...state,
        //         password: action.temp
        //     };
        case APPPLOGINS:
            const responseLogin = action.result.data;
            return {
                ...state,
                // getUserRes: action.result.data,
                // tableData:responseDelete.data.list,
                responseDelete:responseLogin
            };
        default:
            return state
    }
}
