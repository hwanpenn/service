import React from "react";
import ReactDOM from "react-dom";
import "assets/scss/material-dashboard-pro-react.css?v=1.2.0";
import App from 'App';
import registerServiceWorker from 'registerServiceWorker';
import store from 'store'
import {Provider} from 'react-redux'
// import { chatJsUrl } from './cfg/cfg';

// const l01 = document.createElement('link');
// l01.rel = 'stylesheet';
// l01.href = chatJsUrl+'/service-chat/chat/layui/css/layui.css';
// l01.media = 'all';
// document.body.appendChild(l01);

// const s01 = document.createElement('script');
// s01.type = 'text/javascript';
// s01.src = chatJsUrl+'/service-chat/chat/layui/layui.js';
// document.body.appendChild(s01);
// const s02 = document.createElement('script');
// s02.type = 'text/javascript';
// s02.src = chatJsUrl+'/service-chat/chat/socket/socket.io.js';
// document.body.appendChild(s02);
// const s03 = document.createElement('script');
// s03.type = 'text/javascript';
// s03.src = chatJsUrl+'/service-chat/chat/chat.js';
// document.body.appendChild(s03);
// const s04 = document.createElement('script');
// s04.type = 'text/javascript';
// s04.src = chatJsUrl+'/service-chat/chat/jsencrypt/jsencrypt.min.js';
// document.body.appendChild(s04);

ReactDOM.render(
    <Provider store={store}>
        <App />
        {/* <App history={hist}/> */}
    </Provider>
    , document.getElementById('root'));
registerServiceWorker();

