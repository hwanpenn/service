import axios from 'axios';
import { message } from 'antd';
import createHistory from 'history/createBrowserHistory';
const history = createHistory();
message.config({
    duration: 1,
});

axios.defaults.headers.common['Authorization'] = window.sessionStorage.getItem('token');
// axios.defaults.headers.common['uuid'] = window.sessionStorage.getItem('uuid');
axios.defaults.headers.common['username'] = window.sessionStorage.getItem('username');
export default store => next => action => {
    const {dispatch, getState} = store;
    /*如果dispatch来的是一个function，此处不做处理，直接进入下一级*/
    if (typeof action === 'function') {
        action(dispatch, getState);
        return;
    }
    /*解析action*/
    const {
        promise,
        types,
        afterSuccess,
        ...rest
    } = action;

    /*没有promise，证明不是想要发送ajax请求的，就直接进入下一步啦！*/
    if (!action.promise) {
        return next(action);
    }

    /*解析types*/
    const [REQUEST,
        SUCCESS,
        FAILURE] = types;

    /*开始请求的时候，发一个action*/
    next({
        ...rest,
        type: REQUEST
    });
    /*定义请求成功时的方法*/
    const onFulfilled = result => {
        if(result.data.msg==="Token已过期"){
            window.sessionStorage.setItem('token','')
            axios.defaults.headers.common['Authorization'] = '';
        }
        // console.log(result)
        if(result.headers.authorization!==null&&result.headers.authorization!==undefined&&result.headers.authorization!==''){
            // console.log('操作失败：'+result.data.msg)
            window.sessionStorage.setItem('token',result.headers.authorization)
            axios.defaults.headers.common['Authorization'] = window.sessionStorage.getItem('token');
        }
        
        if(result.data.code===400){
            // console.log('操作失败：'+result.data.msg)
        }else{
            next({
                ...rest,
                result,
                type: SUCCESS
            });
        }
        
        if (afterSuccess) {
            afterSuccess(dispatch, getState, result);
        }
    };
    /*定义请求失败时的方法*/
    const onRejected = error => {
        if(JSON.stringify(error).indexOf("403")!=-1){
            // console.log('操作失败：权限不足')
            // this.props.history.push('/cms/login')
        }else{
            console.log('error--------------------------')
        console.log(error)
        message.info('系统错误,请稍后再试');
        next({
            ...rest,
            error,
            type: FAILURE
        });
        }
        
    };

    return promise(axios).then(onFulfilled, onRejected).catch(error => {
        console.error('MIDDLEWARE ERROR:', error);
        onRejected(error)
    })
}
