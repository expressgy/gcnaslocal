const net = require("net");
const moment = require("moment");

const server = net.createServer();
server.setNoDelay=true;

server.on("connection",function (client){

    client.on("data",function (data){
        console.log(data.toString())
    })
})

server.listen("8888",function (){
    console.log("start")
})