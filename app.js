const {app,BrowserWindow} = require("electron");

app.on("ready",function(){
    console.log("Hello Electron");
    const win = new BrowserWindow({
        height:800,width:1200,maxHeight:800,maxWidth:1200,minHeight:800,minWidth:1200,//    这样设置窗口大小无法改变
        // frame:false,//	无边框
        // transparent: true,//	透明背景
        hasShadow:true,//	边框阴影
        // resizable:false,//	禁止改变窗口大小，但是就不能拖动了
        minimizable:true,//是否可以最小化
        webPreferences: {
            nodeIntegration: true,
            contextIsolation: false,//	以上两句设置能够全局使用node
        }
    });

    win.webContents.openDevTools({mode:'detach'});//	开发者工具出现的地方
    win.webContents.loadFile("app/templates/index.html");// 设置静态文件

});

try {
    require('electron-reloader')(module,{});
} catch (_) {}//	自动刷新