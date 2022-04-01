console.log("Hello")
const os = require('os')
    , net = require('net')
    , ws = require('ws')

window.onload=function(){
    const myHost = getIPAdress();
    // let localHostElement = document.querySelector("#host");
    // localHostElement.innerHTML = myHost;
    // console.log(localHostElement);
    //  以及数据发送状态
    global.sendStatus = 0 ;
    //  通知栏的打开状态
    global.consoleStatus = 0;
    global.sendDurationTimeout = 0
    global.sendDataInterval = 0

    //  各个服务模块的点击状态
    global.ip_box = [0];
    global.ftpd_box = [0];
    global.ftpu_box = [0];
    global.http_box = [0];
    global.ping_box = [0];
    global.video_box = [0];
    global.net_box = [0];

    //  各个模块的开启状态
    global.ip_switchStatus = [0];
    global.ftpd_switchStatus = [0];
    global.ftpu_switchStatus = [0];
    global.http_switchStatus = [0];
    global.ping_switchStatus = [0];
    global.video_switchStatus = [0];
    global.net_switchStatus = [0];

    //  执行点击盒子
    serverBox()
    //  执行点击开关
    modularSwitch()
    //  START
    startSend()

    openConsole()

    //  获取本机IP，已起用
    function getIPAdress() {
        var interfaces = os.networkInterfaces();
        for (var devName in interfaces) {
            var iface = interfaces[devName];
            for (var i = 0; i < iface.length; i++) {
                var alias = iface[i];
                if (alias.family === 'IPv4' && alias.address !== '127.0.0.1' && !alias.internal) {
                    return alias.address;
                }
            }
        }
    }
    //  获取服务盒子元素
    function serverBox(){
        let ipBox = $("#ip-box");
        const ftpdBox =  $("#ftpd-box");
        const ftpuBox =  $("#ftpu-box");
        const httpBox =  $("#http-box");
        const pingBox =  $("#ping-box");
        const videoBox =  $("#video-box");
        const netBox =  $("#net-box");

        serverBoxClick(ipBox)
        serverBoxClick(ftpdBox)
        serverBoxClick(ftpuBox)
        serverBoxClick(httpBox)
        serverBoxClick(pingBox)
        serverBoxClick(videoBox)
        serverBoxClick(netBox)
        ipBox.trigger('click')
    }
    //  服务盒子的点击处理
    function serverBoxClick(element){
        let father = element.parent();
        element.click(function (){
            let sons = father.children(".serverBox")
            for(let i = 0;i<sons.length;i++){
                $(sons[i]).css({"background":"rgba(242,244,246,0.3)"})
                $("#"+$(sons[i]).attr('id').split('-')[0]+"-show").addClass('hide')
                $("#"+$(sons[i]).attr('id').split('-')[0]+"-show").removeClass('show')
            }
            element.css({"background":"#fff"});
            $("#"+element.attr('id').split('-')[0]+"-show").removeClass("hide")
            $("#"+element.attr('id').split('-')[0]+"-show").addClass("show")
        })
        let mainShow = $("#"+element.attr('id').split('-')[0]+"-show");
        mainShowCMD(mainShow);
    }
    //  获取模块开关元素
    function modularSwitch(){
        const ipSwitch = $("#ip-switch");
        ipSwitch.status = global.ip_switchStatus;
        const ftpdSwitch = $("#ftpd-switch");
        ftpdSwitch.status = global.ftpd_switchStatus;
        const ftpuSwitch = $("#ftpu-switch");
        ftpuSwitch.status = global.ftpu_switchStatus;
        const httpSwitch = $("#http-switch");
        httpSwitch.status = global.http_switchStatus
        const pingSwitch = $("#ping-switch");
        pingSwitch.status = global.ping_switchStatus
        const videoSwitch = $("#video-switch");
        videoSwitch.status = global.video_switchStatus
        const netSwitch = $("#net-switch");
        netSwitch.status = global.net_switchStatus
        modularSwitchClick(ipSwitch);
        modularSwitchClick(ftpdSwitch);
        modularSwitchClick(ftpuSwitch);
        modularSwitchClick(httpSwitch);
        modularSwitchClick(pingSwitch);
        modularSwitchClick(videoSwitch);
        modularSwitchClick(netSwitch);
        ipSwitch.trigger('click')
    }
    //  模块开关的动画效果
    function modularSwitchClick(element){
        element.click(function (event){
            if(global.sendStatus !=0){
                return false
            }
            if(element.status[0] ==0){
                element.status[0] = 1;
                console.log(element.attr('id'),element.status[0])
                element.removeClass("closeSwitch")
                element.addClass("openSwitch")
                element.css({"background":"rgba(43,222,115,1)"})
                let son= $(element.children("div")[0])
                son.removeClass("closeSwitchMove")
                son.addClass("openSwitchMove")
                son.css({"left":"1.5rem"})
            }else{
                element.status[0] = 0;
                console.log(element.attr('id'),element.status[0])
                element.removeClass("openSwitch")
                element.addClass("closeSwitch")
                element.css({"background":"RGBA(100,100,100,1)"})
                let son= $(element.children("div")[0])
                son.removeClass("openSwitchMove")
                son.addClass("closeSwitchMove")
                son.css({"left":"0"})
            }
            return false
        })

    }
    //  mainShow窗口展示区的模块创建和切换
    function mainShowCMD(element){
        let labelFather = $("#"+element.attr('id')+" .main-window-label");
        let labelADD = $("#"+element.attr('id')+" .main-window-label-add");
    // labelFather.children(".main-window-label-box");
        let body = $("#"+element.attr('id')+" .mainShow-son-body");
        //  初始的标签点击
        $(labelFather.children(".main-window-label-box")[0]).click(function (){
            console.log($($(this).children('.main-window-label-name')[0]).html());
            for(let i =0;i<labelFather.children(".main-window-label-box").length;i++){
                $(labelFather.children(".main-window-label-box")[i]).css({'background':"rgba(0,0,0,0.3)"})
                $(body.children('.mainShow-son-body-box')[i]).removeClass('show');
                $(body.children('.mainShow-son-body-box')[i]).addClass('hide')
            }
            $(labelFather.children(".main-window-label-box")[0]).css({'background':"rgba(200,200,200,0.7)"})
            $(body.children('.mainShow-son-body-box')[0]).removeClass('hide')
            $(body.children('.mainShow-son-body-box')[0]).addClass('show')
        })

        //  初始的标点关闭按钮
        $($(labelFather.children(".main-window-label-box")[0]).children('.main-window-label-cmd')[0]).click(function (){
            if(labelFather.children(".main-window-label-box").length>1){
                // 执行关闭
                $(labelFather.children(".main-window-label-box")[0]).remove();
                $(body.children('.mainShow-son-body-box')[0]).remove();
                $(labelFather.children(".main-window-label-box")[0]).trigger('click');
            }else{
                newwin('最后的终端，无法关闭');
            }
        })
        $(labelFather.children(".main-window-label-box")[0]).trigger('click')


        //    添加终端
        labelADD.click(function (){
            if(labelFather.children(".main-window-label-box").length>=3){
                newwin("终端数量超限，无法继续创建")
            }else{
                //  添加标签
                let labelName = parseInt($($(labelFather.children(".main-window-label-box")[labelFather.children(".main-window-label-box").length-1]).children('.main-window-label-name')[0]).html().slice(2))+1;
                labelFather.append('<div class="main-window-label-box"><div class="main-window-label-name">终端'+labelName+'</div><div class="main-window-label-cmd"><img src="../static/img/adc.svg" alt=""></div></div>')
                //  添加主体
                let bodyData = $(body.children('.mainShow-son-body-box')[0]).html();
                body.append('<div class="mainShow-son-body-box hide">'+bodyData+'</div>');
                let newLabel = $(labelFather.children('.main-window-label-box').slice(-1));
                newLabel.bodys = body.children('.mainShow-son-body-box').slice(-1);
                body.focus();
                //  注册点击事件
                $(labelFather.children(".main-window-label-box")[labelFather.children(".main-window-label-box").length-1]).click(function (){
                    console.log($($(this).children('.main-window-label-name')[0]).html());
                    for(let i =0;i<labelFather.children(".main-window-label-box").length;i++){
                        $(labelFather.children(".main-window-label-box")[i]).css({'background':"rgba(0,0,0,0.3)"})
                        $(body.children('.mainShow-son-body-box')[i]).removeClass('show')
                        $(body.children('.mainShow-son-body-box')[i]).addClass('hide')
                    }
                    newLabel.css({'background':"rgba(200,200,200,0.7)"});
                    $(newLabel.bodys).removeClass('hide');
                    $(newLabel.bodys).addClass('show');
                });
                //  注册关闭事件
                $($(labelFather.children(".main-window-label-box")[labelFather.children(".main-window-label-box").length-1]).children('.main-window-label-cmd')[0]).click(function (){
                    if(labelFather.children(".main-window-label-box").length>1){
                        // 执行关闭
                        newLabel.remove();
                        $(newLabel.bodys).remove();
                        $(labelFather.children(".main-window-label-box")[0]).trigger('click');
                    }else{
                        newwin('最后的终端，无法关闭sss');
                    }
                })

            }
        })
    }
    //  开启服务点击
    function startSend(){
        $("#startSend").click(()=>{
            // newwin("开启");
            if(ip_switchStatus+ftpd_switchStatus+ftpu_switchStatus+http_switchStatus+ping_switchStatus+video_switchStatus+net_switchStatus>0){
                //  有打开的开关，可以开启服务
                //  获取服务配置数据
                let initData = getInitData()

                if(getLimitData()){//   确保数据完整
                    let baseData = getLimitData()
                    webSocket(initData.host,initData.port,initData.duration,initData.interval,baseData)
                }
            }else{
                //  没有打开的开关，无法开启服务
                newwin('未选中任何测试模块，无法开启服务！')
            }
        })
    }

    //  获取服务信息
    function getInitData(){
        let nav = $("#nav input");
        let initData = {
            host:$(nav[0]).val(),
            port:parseInt($(nav[1]).val()),
            duration:parseInt($(nav[2]).val()),
            interval:parseFloat($(nav[3]).val())
        }
        return initData
    }
    //  获取所有打开的窗口input信息
    function getLimitData(){
        let watningNone = 0;
        let statusList = [ip_switchStatus,ftpd_switchStatus,ftpu_switchStatus,http_switchStatus,ping_switchStatus,video_switchStatus,net_switchStatus];
        let returnData = []
        let mainBox = $("#main");
        let projectList = mainBox.children('.mainShow')
        for(let i = 0;i<statusList.length;i++){
            let ssData = []
            if(statusList[i][0]){
                let objID = $(projectList[i]).attr('id');
                let objBody = $("#"+objID+" .mainShow-son-body");
                let objBodySon = objBody.children('.mainShow-son-body-box')
                for(let j = 0;j<objBodySon.length;j++){
                    let boxInputList = $(objBodySon[j]).find('input');
                    let sData = []
                    for(let k = 0;k<boxInputList.length;k++){
                        if ($(boxInputList[k]).val()==''){
                            console.log('空数据')
                            watningNone++;
                            $(boxInputList[k]).addClass('warningInput');
                            $(boxInputList[k]).one('click',()=>{
                                $(boxInputList[k]).removeClass('warningInput');
                            })
                        }
                        sData[sData.length] = $(boxInputList[k]).val()
                        // console.log($(boxInputList[k]).val())
                    }
                    ssData[ssData.length] = sData;
                }
            }
            returnData[returnData.length] = ssData;
        }
        if(watningNone!=0){
            newwin('有数据未填写，服务启动失败。')
            //  数据不完整时，不进行发送
            return false
        }else{
            return returnData
        }

    }

    //  打开通知面板
    function openConsole(){
        if(consoleStatus == 0){
            $("#console").click(()=>{
                $("#console").addClass('bigConsole');
                setTimeout(()=>{
                    $("#console").css({'height':'100%'})
                },459)
                consoleStatus = 1;
            })
        }else{
            $("#console").click(()=>{
                $("#console").removeClass('bigConsole');
                setTimeout(()=>{
                    $("#console").css({'height':'100%'})
                },459)
                consoleStatus = 0;
            })
        }

    }
}

//  弹窗函数
function newwin(data){
    if($("#newWin").length!=0){
        return false
    }else {
        console.log('可以弹窗')
    }
    $('body').append('<div id="newWin" class="all-center"><div id="newWinBox"><div>警告</div><div id="newWinBoxText">'+data+'</div><div id="newWinClose" class="all-center"><div>OK</div></div></div></div>');
    $("#newWinBox").addClass('winShow');
    $("#newWinClose").click(function (){
        $("#newWinBox").removeClass('winShow');
        $("#newWinBox").addClass('winHide');
        setTimeout(()=>{
            $("#newWin").remove()
        },295)
    })

}
window.newwin = newwin;
//  打印处理
function cout(data){
    console.log(data)
}

function server(host,port,duration,interval,baseData){
    const client = new net.Socket()
    const serverHost = host
    const serverPort = parseInt(port)

    cout('服务开启状态');
    cout(global.sendStatus)
    if(global.sendStatus==0){
        $("#startSend").html('<div><img src="../static/img/stop.svg" alt=""></div><div>关闭服务</div>');
        $("#startSend").addClass('red');
        global.sendStatus=1;
    }else{
        client.end();
        serverEnd();
        clearInterval(sendDataInterval)
        clearTimeout(sendDurationTimeout)
        global.sendStatus=0;
        newwin('服务停止成功')
        return true;
    }

    client.connect(serverPort, serverHost, () => {

        client.setNoDelay=true;
        console.log(host,port,duration,interval)
        newwin('与服务器成功连接');
        let intervalTime = parseInt(1000/interval)
        cout(intervalTime)
        // client.write('你好，服务器');
        global.sendDataInterval = setInterval(()=>{
            let allData = makeData(baseData)
            for(let i = 0;i<allData.length;i++){
                if(allData[i].length==0){
                    break;
                }else{
                    let modelData = allData[i];
                    for(let j = 0;j<modelData.length;j++){
                        let terminalData = modelData[j];
                        client.write(JSON.stringify(terminalData)+'\n')
                    }
                }
            }
        },intervalTime)
        client.on('data',data=>{
            cout(data)
        })

        global.sendDurationTimeout = setTimeout(()=>{
            clearInterval(sendDataInterval)

            serverEnd()
            newwin('约定时间到达，与服务断开连接')
            global.sendStatus=0;
            // client.close()
            client.end()
            return true
        },duration*60*1000)
        client.on('error',e=>{
            cout(e)
            clearInterval(sendDataInterval)
            clearTimeout(sendDurationTimeout)

            newwin('目标地址未响应，请开启数据接收服务器，或更换地址')
            serverEnd()
            global.sendStatus=0;
            client.end()
        })
    })
    client.on('error',e=>{
        cout(e.code)
        if(e.code == 'ECONNREFUSED'){
            newwin('目标地址未响应，请开启数据接收服务器，或更换地址')
            serverEnd()
            global.sendStatus=0;
        }else{
            newwin('连接中断');
            serverEnd()
            global.sendStatus=0;
        }
    })
}

function webSocket(host,port,duration,interval,baseData){
    const webSocketClient = new ws(`ws://${host}:${port}`);

    if(global.sendStatus==0){
        serverStart()
    }else{
        webSocketClient.close();
        stopIntervalANDsetTimeout()
        serverEnd();
        newwin('服务停止成功')
        return true;
    }

    webSocketClient.on("error", function(err) {
        console.log("error: ", err);
        if(err.code == 'ECONNREFUSED'){
            cout('无法连接到WebSocket服务器，请检查网络连接状态，或者开启服务器！')
        }
        webSocketClient.close();
        stopIntervalANDsetTimeout()
        serverEnd();
        newwin('服务遇到错误，已经停止，请检查网络连接或WebSocket服务状态！')
        return true;
    });
    webSocketClient.on('open',()=>{
        newwin('服务开启成功')
        let intervalTime = parseInt(1000/interval);//   发包时间间隔
        global.sendDataInterval = setInterval(()=>{
            let allData = makeData(baseData)
            for(let i = 0;i<allData.length;i++){
                if(allData[i].length==0){
                    break;
                }else{
                    let modelData = allData[i];
                    for(let j = 0;j<modelData.length;j++){
                        let terminalData = modelData[j];
                        webSocketClient.send(JSON.stringify(terminalData)+'\n')
                    }
                }
            }
        },intervalTime)

        global.sendDurationTimeout = setTimeout(()=>{
            stopIntervalANDsetTimeout()
            serverEnd()
            newwin('约定时间到达，与服务断开连接')
            webSocketClient.close()
            return true
        },duration*60*1000)
    })
}
//  一下两个时按钮的状态和颜色
function serverStart(){
    $("#startSend").html('<div><img src="../static/img/stop.svg" alt=""></div><div>关闭服务</div>');
    $("#startSend").addClass('red');
    global.sendStatus=1;
}
function serverEnd(){
    $("#startSend").html('<div><img src="../static/img/send.svg" alt=""></div><div>开启服务</div>');
    $("#startSend").removeClass('red')
    global.sendStatus=0;
}

//  关闭消息发送的定时器
function stopIntervalANDsetTimeout(){
    if(global.sendDurationTimeout != 0){
        clearTimeout(sendDurationTimeout)
        global.sendDurationTimeout = 0
    }
    if(global.sendDataInterval != 0){
        clearInterval(sendDataInterval)
        global.sendDataInterval = 0;
    }
    return true
}