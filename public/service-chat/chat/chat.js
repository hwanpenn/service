
var url = window.location.href;
var publicKey = 'MIGfMA0GCSqGSIb3DQEBAQUAA4GNADCBiQKBgQDRoXWHKSkmbrar8+xstOgOl2VNM8PARvbFSlFepiFnqv7Arc1zpjkVUYDRauagZEabxrmja8phaRMy9NW3/IpEZhBzUQpwNVriOYH8YmZ1hLrrOxFeAtqv43DwUo7ah2hzRYMIUi0KFssGYPaFMAueIXQO7a3jHERcfaleUS1R/QIDAQAB'
var socket = '';
var tenantId = '1112'
var userId = "502911085762838528"
var toUserId = "12345"
var toUserName = "用户"
var fromUserId = "502911085762838528"
var fromUserName = "客服"
var userName = "我"
var caption = "客服"
var isLoginOnOtherPlace = false

var ipTemp = window.location.host;
var portTemp = window.location.port;
var group = ''
var enterpriseCode = ''
var chatUserData = ''
var status = ''
var timerHeartbeat = ''
var reconnectedWebsocket = false
var resrows = ''
var robotShowName = '小玥'
var isSetByUser = false
var url = window.location.href;
var obj = parseQueryString(url)
if(url.indexOf("192.168.2.198")>0||url.indexOf("12329.pub")>0||url.indexOf("192.168.2.105")>0||url.indexOf("gjj12329.cn")>0){
    document.write("<script  src='/service-chat/chat/config/config.js'></script>");
}else{
    document.write("<script  src='http://www.gjj12329.cn//service-chat/chat/config/config.js'></script>");
}


//加密
function encryptData(data, publicKey){
    data = JSON.stringify(data)
    var encrypt = new JSEncrypt();
    encrypt.setPublicKey(publicKey);
    var encrypted = encrypt.encrypt(data);
    encrypted=encodeURIComponent(encrypted)
    encrypted=encodeURIComponent(encrypted)
    return encrypted;
}

if(url.indexOf("platform") >0){//判断是综合服务平台
    if(obj.type==='robotChatTest'){
        enterpriseCode = obj.tenantId
        tenantId = obj.tenantId
        group = obj.tenantId
        userId = obj.userId
        userName = obj.userName
        caption = obj.caption
    }else{
        enterpriseCode = chatConfig.tenantId
        tenantId = chatConfig.tenantId
        group = chatConfig.tenantId
        userId = chatConfig.userId
        userName = chatConfig.userName
        caption = chatConfig.caption
    }
}else{
    enterpriseCode = obj.tenantId
    tenantId = obj.tenantId
    group = obj.tenantId
    userId = obj.userId
    userName = obj.userName
    caption = obj.caption
}

function parseQueryString(url){
    var obj = {};
    var keyvalue = [];
    var key = "",
        value = "";
    var paraString = url.substring(url.indexOf("?") + 1, url.length).split("&");
    for (var i in paraString) {
        keyvalue = paraString[i].split("=");
        key = keyvalue[0];
        value = keyvalue[1];
        obj[key] = value;
    }
    return obj;
}

// try{
//   enterpriseCode = chatConfig.tenantId
//   tenantId = chatConfig.tenantId
//   group = chatConfig.tenantId
//   userId = chatConfig.userId
//   userName = chatConfig.userName
//   caption = chatConfig.caption
//   console.log(chatConfig)
// } catch(err) {
//   console.log(err)
// }


function refreshCount() {
  console.log('heartbeat')
  socket.send('heartbeat');  
}
function addEnent(socket,isDoByUser,layim){
  socket.onopen = function (evt) {
    // window.clearInterval(reconnected);
    console.log("连接成功")
    isSetByUser=false
    if(reconnectedWebsocket){
      obj = {
        username: robotShowName
        ,avatar: nginxUrl+"/service-chat/chat/picture/xiaoyue.png"
        ,id: 2222
        ,type: "robot"
        ,content: "重连成功"
      }
      layim.getMessage(obj); 
      // window.clearInterval(reconnected);
    }else{
      
    };
    var dataTemp = {role:'0',operationType:'0',type:'11',group:group};
    // socket.emit('open', dataTemp);
    socket.send(JSON.stringify(dataTemp));
    // var dataTempValue = encryptData(dataTemp,publicKey)
    // socket.send(JSON.stringify({"systemName":tenantId,"sign":dataTempValue}));
    console.log('添加心跳')
    timerHeartbeat=window.setInterval(refreshCount, 5000);
    if(isDoByUser==='isDoByUser'){
      // console.log('上线')
      var dataTemp = {role:'0',operationType:'1',type:'11',group:group};
      // socket.emit('open', dataTemp);
      socket.send(JSON.stringify(dataTemp));
    }  
  };
  socket.onclose = function (evt) {
      console.log("断开链接")
      // window.clearTimeout(timerHeartbeat);
      window.clearInterval(timerHeartbeat);
      if(isSetByUser){
        console.log('用户主动断开')
        socket = ''
      }else if(isLoginOnOtherPlace){

      }else{
        var obj = {};
        obj = {
          username: robotShowName
          ,avatar: nginxUrl+"/service-chat/chat/picture/xiaoyue.png"
          ,id: 1111
          ,type: "robot"
          ,content: "非常抱歉，连接断开了，正在尝试重连"
        }
        layim.getMessage(obj);
        reconnectedWebsocket=true
        socket = ''
        // reconnectWebsocket=window.setInterval(reconnected(layim), 5000); 
        // reconnected()
        // var data = {userId:userId,userName:userName};
        // addEnent(socket,'',layim)
      }
  };
  socket.onerror = function(evt){
    // doing something
    console.log(evt)
  };
  socket.onmessage = function (evt) {
    // console.log('evt.data')
    // console.log(evt.data)
    // console.log(JSON.parse(evt.data))
    var data = JSON.parse(evt.data)
    // if(data.)
    if(data.type==='16'){
        isLoginOnOtherPlace = true
        var obj = {};
            obj = {
              username: robotShowName
              ,avatar: nginxUrl+"/service-chat/chat/picture/xiaoyue.png"
              ,id: 1111
              ,type: "robot"
              ,content: '您已在其他地方登录'
            }
            layim.getMessage(obj);
        // console.log('type=====16')
    }
    console.log('客服端socket数据包+++')
    console.log(evt.data)
    if(data.status===5){
      toUserId=data.userId
      toUserName=data.userName
      fromUserId=data.customerCode
      fromUserName=data.customerName
      console.log('toUserId'+toUserId+'---'+'toUserName'+toUserName
      +'fromUserId'+fromUserId+'---'+'fromUserName'+fromUserName)
    }
    
    if(data.type==='11'){
        if(data.status===0){
            var obj = {};
            obj = {
              username: robotShowName
              ,avatar: nginxUrl+"/service-chat/chat/picture/xiaoyue.png"
              ,id: 1111
              ,type: "robot"
              ,content: '登录成功'
            }
            layim.getMessage(obj);
            var obj1 = {};
            obj1 = {
              username: robotShowName
              ,avatar: nginxUrl+"/service-chat/chat/picture/xiaoyue.png"
              ,id: 1111
              ,type: "robot"
              ,content: resrows.welcomeSentence===''?'连接成功，很高兴为您服务':resrows.welcomeSentence
            }
            layim.getMessage(obj1);
            // status=data.status
        }
        if(data.status===1){
            var obj = {};
            obj = {
              username: robotShowName
              ,avatar: nginxUrl+"/service-chat/chat/picture/xiaoyue.png"
              ,id: 1111
              ,type: "robot"
              ,content: '上线成功'
            }
            layim.getMessage(obj);
            status='1'
        }
        if(data.status===5){
          chatUserData = data
          // status=data.status
          // toUserId=data.toUserId
            var obj = {};
            obj = {
              username: robotShowName
              ,avatar: nginxUrl+"/service-chat/chat/picture/xiaoyue.png"
              ,id: 1111
              ,type: "robot"
              ,content: '您可以开始与用户：'+chatUserData.userName+'对话了'
              // ,content: '连接成功，客户名称：'+chatUserData.userName
            }
            layim.getMessage(obj);
        }
        if(data.status===6){
            var obj = {};
            obj = {
              username: robotShowName
              ,avatar: nginxUrl+"/service-chat/chat/picture/xiaoyue.png"
              ,id: 1111
              ,type: "robot"
              ,content: '已经结束与用户：'+chatUserData.userName+'的对话'
            }
            layim.getMessage(obj);
            // status=data.status
            chatUserData = ''
        }
        if(data.status===2){
            var obj = {};
            obj = {
              username: robotShowName
              ,avatar: nginxUrl+"/service-chat/chat/picture/xiaoyue.png"
              ,id: 1111
              ,type: "robot"
              ,content: '已将状态改为忙碌'
            }
            layim.getMessage(obj);
            // status=data.status
        }
        if(data.status===3){
            var obj = {};
            obj = {
              username: robotShowName
              ,avatar: nginxUrl+"/service-chat/chat/picture/xiaoyue.png"
              ,id: 1111
              ,type: "robot"
              ,content: '已成功下线'
            }
            layim.getMessage(obj);
            status='0'
            isSetByUser=true
            socket.close()
        }
    }else{
      console.log('接受数据')
      if(data.respType==='2'){
        var obj = {};
            obj = {
              username: data.fromUserName
              ,avatar: nginxUrl+"/service-chat/chat/picture/yonghu.png"
              ,id: 1111
              ,type: "robot"
              ,content: data.content
            }
            layim.getMessage(obj);

        var dataTemp = {type:'10',uqIdentNo:data.uqIdentNo};
        // console.log(dataTemp)
        socket.send(JSON.stringify(dataTemp));
      }
    }
  }
}
function reconnected(layim) {
  // if(socket.readyState===1||socket.readyState==='1'){
  //   // reconnected()
  //     window.clearInterval(reconnected);
  //     addEnent(socket,'',layim)
  //   }
  var data = {userId:userId,userName:userName};
  var encryptValue = encryptData(data,publicKey) 
  console.log("重连websocket")
  socket = new WebSocket(robotSocketUrl+"?systemName="+tenantId+"&userName="+caption+"&userId="+userId+"&requestSource=0");
}
function initRobotConfig(layim,userName){
  //窗口配置
  layim.config({
    tool: [
    {
      alias: 'start'
      ,title: '上线'
      ,icon: '上线'
    },{
      alias: 'hangup'
      ,title: '挂断'
      ,icon: '挂断'
    },{
      alias: 'end'
      ,title: '下线'
      ,icon: '下线'
    },{
      alias: 'busy'
      ,title: '忙碌'
      ,icon: '忙碌'
    }],
    init: {
      mine: {
        "username": userName
        ,"id": 1111
        ,"status": "online"
        ,"remark": "kefu"
        ,"avatar": nginxUrl+"/service-chat/chat/picture/ktkf.png"
      }
      ,friend: []
      ,group: []
    },
    brief: true,
    voice:false,
    minRight: '0px'
    ,chatLog: chatlogUrlPage+'/chatlog'
  });
}
window.onload = function(){
    layui.use('layim', function(layim){
        layim = layim

        //初始化机器人
        initRobotConfig(layim,userName)

        //监听advice
        layim.on('tool(advice)', function(insert, send, obj){
            layer.prompt({
                title: '建议'
                ,formType: 2
                ,shade: 0
            }, function(text, index){
                layer.close(index);
                // alert("已提交客服人员，提示内容："+text)
            });
        });

        //监听start
        layim.on('tool(start)', function(insert, send, obj){
            // if(socket===''){
            //   console.log('重新上线')
            //   reconnectedWebsocket=true
            //   reconnectWebsocket=window.setInterval(reconnected, 5000);
            //   // reconnected()
            // }
            if(status==='1'){
                var obj = {};
                obj = {
                    username: robotShowName
                    ,avatar: nginxUrl+"/service-chat/chat/picture/xiaoyue.png"
                    ,id: 1111
                    ,type: "robot"
                    ,content: '您已上线'
                }
                layim.getMessage(obj);
            }else if(status==='0'){
                console.log("发起websocket")
                var data = {userId:userId,userName:userName};
                var encryptValue = encryptData(data,publicKey)
                if(group ===null){
                    obj1 = {
                        username: robotShowName
                        ,avatar: nginxUrl+"/service-chat/chat/picture/xiaoyue.png"
                        ,id: 1111
                        ,type: "robot"
                        ,content: "暂未启用客服服务"
                    }
                    layim.getMessage(obj1);
                }else{
                    socket = new WebSocket(robotSocketUrl+"?systemName="+tenantId+"&userName="+caption+"&userId="+userId+"&requestSource=0");
                    addEnent(socket,'isDoByUser',layim)
                }
            }else if(status==='2'){
                console.log("忙碌转上线")
                var dataTemp = {role:'0',operationType:'1',type:'11',group:group};
                socket.send(JSON.stringify(dataTemp));
            }else{
                console.log('上线')
                var dataTemp = {role:'0',operationType:'1',type:'11',group:group};
                socket.send(JSON.stringify(dataTemp));
                // socket.emit('open', dataTemp);
            }
        });

        //监听hangup
        layim.on('tool(hangup)', function(insert, send, obj){
            if(chatUserData===''){
                var obj = {};
                obj = {
                    username: robotShowName
                    ,avatar: nginxUrl+"/service-chat/chat/picture/xiaoyue.png"
                    ,id: 1111
                    ,type: "robot"
                    ,content: '没有连接的用户'
                }
                layim.getMessage(obj);
            }else{
                console.log('挂断')
                var dataTemp = {role:'0',operationType:'2',type:'11',group:group,overUserId:chatUserData.userId};
                socket.send(JSON.stringify(dataTemp));
            }

        });

        //监听end
        layim.on('tool(end)', function(insert, send, obj){
            console.log(status,"状态1")
            if(status==='0'){
                // console.log("go")
                status='0'
                var obj = {};
                obj = {
                    username: robotShowName
                    ,avatar: nginxUrl+"/service-chat/chat/picture/xiaoyue.png"
                    ,id: 1111
                    ,type: "robot"
                    ,content: '您还没有上线'
                }
                layim.getMessage(obj);
            }else if(status==='1'){
                status='0'
                var dataTemp = {role:'0',operationType:'4',type:'11',group:group};
                socket.send(JSON.stringify(dataTemp));
            }else if(status==='2'){
                var obj = {};
                obj = {
                    username: robotShowName
                    ,avatar: nginxUrl+"/service-chat/chat/picture/xiaoyue.png"
                    ,id: 1111
                    ,type: "robot"
                    ,content: '请先挂断用户'
                }
                layim.getMessage(obj);
            }

        });

        //监听busy
        layim.on('tool(busy)', function(insert, send, obj){
            if(status!=='1'){
                var obj = {};
                obj = {
                    username: robotShowName
                    ,avatar: nginxUrl+"/service-chat/chat/picture/xiaoyue.png"
                    ,id: 1111
                    ,type: "robot"
                    ,content: '您还没有上线'
                }
                layim.getMessage(obj);
            }else{
                status='2'
                var dataTemp = {role:'0',operationType:'3',type:'11',group:group,overUserId:chatUserData.userId};
                socket.send(JSON.stringify(dataTemp));
            }

        });

        layim.chat({
            name: '在线答疑'
            ,type: 'robot'
            ,avatar: nginxUrl+'/service-chat/chat/picture/xiaoyue.png'
            ,id: 1111
        });

        // alert(url.indexOf("platform") )
        if(url.indexOf("platform") <0){
            layim.setChatMin();
        }

        var $ = layui.jquery;
        $('.layim-chat-main').children("ul").children("li").remove();
            console.log("加载完成")
            // var chatlogButton = document.getElementsByClassName("layim-tool-log")
            //   $('.layim-tool-log').on('click', function(){

            //   console.log('添加定时')
            //   var t1=window.setInterval(sendParams(), 3000);
            // })
            window.onbeforeunload = function(){
                status='0'
                var dataTemp = {role:'0',operationType:'4',type:'11',group:group,overUserId:chatUserData.userId};
                socket.send(JSON.stringify(dataTemp));
            }

            console.log('初始化socket---空值')
            console.log(socket)
            // 去sessionstorage里去权限数据 publicKey group 企业编码 userId
            // publicKey = window.sessionStorage.getItem('publicKey')
            // chatConfig = window.sessionStorage.getItem('chatConfig')
            if(window.sessionStorage.getItem('tenantId')!==null){
                userId = window.sessionStorage.getItem('userId')
                userName = window.sessionStorage.getItem('userName')
                tenantId = window.sessionStorage.getItem('tenantId')
                caption = window.sessionStorage.getItem('caption')
                group = window.sessionStorage.getItem('tenantId')
                enterpriseCode = window.sessionStorage.getItem('tenantId')
                console.log('获取数据')
                console.log('userName:'+userName+'--'+'userId:'+userId+'--'+'tenantId:'+tenantId
                    +'--'+'caption:'+caption+'--'+'group:'+group+'--'+'enterpriseCode:'+enterpriseCode)
            }
            //更新机器人
            initRobotConfig(layim,userName)

            var params = {enterpriseCode:enterpriseCode,sortNum:'',source:'0'}
            $.ajax({
                type : "get",
                async:false,
                url : serviceUrl+"/cs/api/robot/achieveChatWindow",
                data: params,
                success : function(res){
                    console.log('http请求返回值')
                    console.log(res.rows)
                    resrows = res.rows
                    uniqueKey = resrows.robotId
                    group = res.rows.cuSkGroupId
                    robotShowName = resrows.robotShowName===''?robotShowName:resrows.robotShowName
                }
            });

            var cache =  layui.layim.cache();
            if(cache!==undefined&&cache.chatlog!==undefined){
                delete cache.chatlog;
            }
            var local = layui.data('layim')[cache.mine.id];
            if(local!==undefined&&local.chatlog!==undefined){
                delete local.chatlog;
            }
            layui.data('layim', {
                key: cache.mine.id
                ,value: local
            });

            var data = {userId:userId,userName:userName};
            var encryptValue = encryptData(data,publicKey)

            if(socket===''){
                if(reconnectedWebsocket){

                }else{
                    console.log("发起websocket")
                    socket = new WebSocket(robotSocketUrl+"?systemName="+tenantId+"&userName="+caption+"&userId="+userId+"&requestSource=0");
                };
            }
            addEnent(socket,'',layim)

            S4 = () => {
                return (((1+Math.random())*0x10000)|0).toString(16).substring(1);
            }
            guid = () => {
                return (S4()+S4()+S4());
            }
            layim.on('sendMessage', function(data){
                var dataTemp = {content:data.mine.content,toUserId:chatUserData.userId,toUserName:chatUserData.userName,type:'3',uqIdentNo:Date.parse(new Date())};
                // console.log(dataTemp)
                socket.send(JSON.stringify(dataTemp));
            });
    });
}

// userId toUserId tenantId caption fromUserName
// function sendParams() {
//   var iframeConfig  = {
//     fromUserId: fromUserId,
//     toUserId: toUserId,
//     fromUserName: fromUserName,
//     toUserName: toUserName,
//     channel:tenantId
//   }
//   return iframeConfig
// }
