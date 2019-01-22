import { message } from 'antd';
message.config({
    duration: 1,
});

export const GET_REQUEST_ArticleMng = "GET_REQUEST_ArticleMng";
export const GET_SUCCESS_ArticleMng = "GET_SUCCESS_ArticleMng";
export const GET_FAIL_ArticleMng = "GET_FAIL_ArticleMng";
export const CREATE_REQUEST_ArticleMng = "CREATE_REQUEST_ArticleMng";
export const CREATE_SUCCESS_ArticleMng = "CREATE_SUCCESS_ArticleMng";
export const CREATE_FAIL_ArticleMng = "CREATE_FAIL_ArticleMng";
export const UPDATE_REQUEST_ArticleMng = "UPDATE_REQUEST_ArticleMng";
export const UPDATE_SUCCESS_ArticleMng = "UPDATE_SUCCESS_ArticleMng";
export const UPDATE_FAIL_ArticleMng = "UPDATE_FAIL_ArticleMng";
export const DELETE_REQUEST_ArticleMng = "DELETE_REQUEST_ArticleMng";
export const DELETE_SUCCESS_ArticleMng = "DELETE_SUCCESS_ArticleMng";
export const DELETE_FAIL_ArticleMng = "DELETE_FAIL_ArticleMng";

export const GET_REQUEST_ArticleMng_OTHER = "GET_REQUEST_ArticleMng_OTHER";
export const GET_SUCCESS_ArticleMng_OTHER = "GET_SUCCESS_ArticleMng_OTHER";
export const GET_FAIL_ArticleMng_OTHER = "GET_FAIL_ArticleMng_OTHER";
export let last
export let total

export function getOtherArticleMng(params) {
    // console.log('getOtherArticleMng')
    // console.log(params)
    return {
        types: [GET_REQUEST_ArticleMng_OTHER, GET_SUCCESS_ArticleMng_OTHER, GET_FAIL_ArticleMng_OTHER],
        promise: client => client.get('/cs/api/knowledgeBase/export',{
            params: params,
            headers: {
                responseType:'blob'
                // responseType:'arraybuffer'
            }
        }),
        afterSuccess:(dispatch,getState,response)=>{
            const blob = new Blob([response.data], { type: 'application/vnd.ms-excel;charset=UTF-8' });
            const url = window.URL.createObjectURL(blob);
            const a = document.createElement('a');
            a.href = url;
            a.download = ['file.xls'];
            a.click();
            window.URL.revokeObjectURL(url);
            /*请求成功后执行的函数*/
        },
        // otherData:otherData
    }
}

export function getDataArticleMng(params) {
    // console.log('getDataArticleMng')
    return {
        types: [GET_REQUEST_ArticleMng, GET_SUCCESS_ArticleMng, GET_FAIL_ArticleMng],
        promise: client => client.get('/cs/api/knowledgeBase/queryArticle',{params: params}),
        afterSuccess:(dispatch,getState,response)=>{
            last = parseInt(response.data.total/10)+1
            total = response.data.total
            // console.log(response.data.total % 10 )
            // // console.log(response.data.total % response.rows.length )
            // if(response.data.total % 10 === 1){
            //     last = parseInt(response.data.total/10)
            // }else{
            //     last = parseInt(response.data.total/10)+1
            // }
            // last = parseInt(response.data.total/10)+1
            /*请求成功后执行的函数*/
        },
        // otherData:otherData
    }
}
export function createDataArticleMng(params,obj) {
    // console.log('createDataArticleMng')
    return {
        types: [CREATE_REQUEST_ArticleMng, CREATE_SUCCESS_ArticleMng, CREATE_FAIL_ArticleMng],
        promise: client => client.post('/cs/api/knowledgeBase/addArticle',params),
        afterSuccess:(dispatch,getState,response)=>{
            obj.setState({
                current:last
            })
            if(response.data.code===0){
                message.info(response.data.msg);
                const paramsTemp = {
                    categoryId:params.categoryId,
                    pageNo:last,
                    pageSize:10,
                };
                dispatch(getDataArticleMng(paramsTemp));
            }else {
                message.info(response.data.msg);
            }
        },
    }
}
export function updateDataArticleMng(params,obj) {
    return {
        types: [UPDATE_REQUEST_ArticleMng, UPDATE_SUCCESS_ArticleMng, UPDATE_FAIL_ArticleMng],
        promise: client => client.post('/cs/api/knowledgeBase/updateArticle',params),
        afterSuccess:(dispatch,getState,response)=>{
            if(response.data.code===0){
                message.info(response.data.msg);
                const paramsTemp = {
                    categoryId:params.categoryId,
                    pageNo:obj.state.current,
                    pageSize:10,
                };
                dispatch(getDataArticleMng(paramsTemp));
            }else {
                message.info(response.data.msg);
            }
        },
    }
}
export function deleteDataArticleMng(params,obj) {
    return {
        types: [DELETE_REQUEST_ArticleMng, DELETE_SUCCESS_ArticleMng, DELETE_FAIL_ArticleMng],
        promise: client => client.post('/cs/api/knowledgeBase/deleteArticle',params),
        afterSuccess:(dispatch,getState,response)=>{
            if(response.data.code===0){
                message.info(response.data.msg);
                // console.log(response.data.total % response.rows.length )
                if(total % 10 === 1){
                    last = last - 1;
                    obj.setState({
                        current:last
                    })
                    const paramsTemp = {
                        categoryId:params.categoryId,
                        pageNo:last,
                        pageSize:10,
                    };
                    dispatch(getDataArticleMng(paramsTemp));
                }else{
                    const paramsTemp = {
                        categoryId:params.categoryId,
                        pageNo:obj.state.current,
                        pageSize:10,
                    };
                    dispatch(getDataArticleMng(paramsTemp));
                }
            }else {
                message.info(response.data.msg);
            }
        },
    }
}
