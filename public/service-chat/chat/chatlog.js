document.write("<script  src='/service-chat/chat/config/config.js'><\/script>");

var chatlogUrl
var nginxUrl
// var iframeConfig = {fromUserId: "502911085762838528", toUserId: "12345", fromUserName: "客服", toUserName: "用户", channel: "1112"}
// var iframeConfig = parent.sendParams()

var url = window.location.href;
var serviceUrl

function choosePath() {
    if(url.indexOf("192.168.2.198") >0){//198环境下
         chatlogUrl = "http://192.168.2.198:8080"
         nginxUrl = "http://192.168.2.198:8079"
    }else if(url.indexOf("12329.pub") >0){//测试环境的情况下
         chatlogUrl = "http://12329.pub:10231"
         nginxUrl = "http://12329.pub:10234"

    }else if(url.indexOf("gjj12329.cn") >0){//正式环境下
         chatlogUrl = "http://www.gjj12329.cn"
         nginxUrl = "http://www.gjj12329.cn:8079"

    }else{
         chatlogUrl = "http://192.168.2.198:8080"
         nginxUrl = "http://192.168.2.105:3000"
    }
}

choosePath()

var iframeConfig = parseQueryString(window.location.href)
var fromUserId = iframeConfig.fromUserId
var toUserId = iframeConfig.toUserId
var fromUserName = decodeURIComponent(iframeConfig.fromUserName)
var toUserName = decodeURIComponent(iframeConfig.toUserName)
var channel = iframeConfig.channel
console.log('fromUserId'+fromUserId+'---'+'toUserId'+toUserId+'fromUserName'
+fromUserName+'---'+'toUserName'+toUserName
+'channel'+channel)
// var obj = parseQueryString(window.location.href)
// var fromUserId = obj.fromUserId
// var toUserId = obj.toUserId
// var channel = obj.channel

function parseQueryString(url){
    console.log(url)
    var obj = {};
    var keyvalue = [];
    var key = "",
        value = "";
    var paraString = url.split("?")[1].split("&");
    // console.log(url.split("?")[1])
    for (var i in paraString) {
        keyvalue = paraString[i].split("=");
        key = keyvalue[0];
        value = keyvalue[1];
        obj[key] = value;
    }
    return obj;
}

layui.use(['layim', 'laypage'], function(){
  var laytpl = layui.laytpl
  ,$ = layui.jquery
  ,laypage = layui.laypage;
    // var paramTemp = getParams()

    var valueList = []
    var params = {
        page:1,
        num:7,
        fromUserId:fromUserId,
        toUserId:toUserId,
        queryType:"1",
        channel:channel
    };
    var showData = document.getElementById("LAY_view")
    $.ajax({
        type: "get",
        // async:false,
        // url: chatlogUrl+"/chat-service/interface/queryRecord?fromUserId=502911085762838528&toUserId=12345&queryType=1&page=1&num=7&channel=502883989623668736",
        url: chatlogUrl+"/chat-service/interface/queryRecord",
        data: params,
        success: function (res) {
        //  console.log(res)
            laypage.render({
                elem: 'LAY_page'
                ,count: res.total===undefined?'':res.total//数据总数
                ,limit: 7
                ,jump: function(obj){
                    var params = {
                        page:obj.curr,
                        num:7,
                        fromUserId:fromUserId,
                        toUserId:toUserId,
                        queryType:"1",
                        channel:channel
                    };
                    $.ajax({
                        type : "get",
                        // url :chatlogUrl+"/chat-service/interface/queryRecord?fromUserId=502911085762838528&toUserId=12345&queryType=1&page=1&num=7&channel=502883989623668736",
                        url :chatlogUrl+"/chat-service/interface/queryRecord",
                        count: res.total===undefined?'':res.total, //数据总数
                        data: params,
                        success : function(res){
                            // console.log(res)
                            valueList =[]
                            res.p2pList.map((item,i) => {
                                var data = {
                                    username: item.fromCsUserId===fromUserId?fromUserName:toUserName
                                    , id: item.id
                                    , avatar: item.fromCsUserId===fromUserId?nginxUrl+'/service-chat/chat/picture/ktkf.png':nginxUrl+'/service-chat/chat/picture/yonghu.png'
                                    , timestamp: item.createTime
                                    , content: item.content
                                    , fromCsUserId: item.fromCsUserId
                                }
                                valueList.push(data);
                            })
                            var html = laytpl(LAY_tpl.value).render({
                                data: valueList
                            });
                            $('#LAY_view').html(html);
                        }
                    })
                }
            })

        },
        error:function () {

        }
    })
});