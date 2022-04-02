const {app,BrowserWindow} = require("electron");
const fs = require('fs');
const request = require('request');
const ipcMain = require('electron').ipcMain;
const ipcRenderer = require('electron').ipcRenderer;

app.on("ready",async function(){
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

    win.webContents.on('did-finish-load', async () => {
        const NasID = await getNasID()
        win.webContents.send('NasID', NasID);
        const canUserList = await getCanUserList()
        win.webContents.send('canUserList',canUserList)
    });
});

try {
    require('electron-reloader')(module,{});
} catch (_) {}//	自动刷新

async function getNasID(){
    return new Promise(rec => {
        const config = require('./.nasID');
        if(config["ID"]){
            console.log('Exist NasID : ',config['ID'])
            rec(config['ID'])
        }else{
            console.log('New Nas')
            request('http://localhost:5000/localNas/getNasID', async function (error, response, body) {
                if (!error && response.statusCode == 200) {
                    config["ID"] = JSON.parse(body).ID;
                    const jsonstr = JSON.stringify(config);
                    await fs.writeFileSync('./.nasID.json',jsonstr)
                    rec(config["ID"])
                }else{
                    rec(false)
                    console.log('Unable to get NasID, server request error.')
                }
            })
        }
    })
}
async function getCanUserList(){
    return new Promise(rec => {
        const config = require('./.nasID');
        if(config["canUserList"]){
            console.log('Exist canUserList : ',config['canUserList'])
            rec(config['canUserList'])
        }else{
            console.log('canUser is Empty')
            rec(false)
        }
    })
}
