//转人工服务地址
var robotSocketUrl
var nginxUrl
//客服系统后台服务地址
var serviceUrl
var chatlogUrl
var chatlogUrlPage
var url = window.location.href;


if(url.indexOf("192.168.2.198") >0){//198环境下
    //转人工服务地址
    robotSocketUrl = "ws://192.168.2.198:9322"
    nginxUrl = "http://192.168.2.198:8079"
    //客服系统后台服务地址
    serviceUrl = "http://192.168.2.198:8013"
    chatlogUrlPage = "http://192.168.2.198:8081"
    chatlogUrl = "http://192.168.2.198:8080"

}else if(url.indexOf("12329.pub") >0){//测试环境的情况下
    //转人工服务地址
    robotSocketUrl = "ws://12329.pub:10242"
    nginxUrl = "http://12329.pub:10234"
    //客服系统后台服务地址
    serviceUrl = "http://12329.pub:10235"
    chatlogUrlPage = "http://12329.pub:15000"
    chatlogUrl = "http://12329.pub:10231"

}else if(url.indexOf("gjj12329.cn") >0){//正式环境下
    //转人工服务地址
    robotSocketUrl = "ws://www.gjj12329.cn:9330"
    nginxUrl = "http://www.gjj12329.cn:8079"
    //客服系统后台服务地址
    serviceUrl = "http://www.gjj12329.cn:8079"
    chatlogUrlPage = "http://www.gjj12329.cn:8081"
    chatlogUrl = "http://www.gjj12329.cn"

}else{
    //转人工服务地址
    robotSocketUrl = "ws://192.168.2.198:9322"
    nginxUrl = "http://192.168.2.105:3000"
    //客服系统后台服务地址
    serviceUrl = "http://192.168.2.198:8013"
    chatlogUrlPage = "http://192.168.2.105:3001"
    chatlogUrl = "http://192.168.2.198:8080"
}
