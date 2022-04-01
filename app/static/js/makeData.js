const moment = require('moment')

function makeData(data){
    console.log(moment().format("YYYY-MM-DD HH:mm:ss.SSS"))
    // data[0]
    let ipdata = []
    if(data[0]){
        for(let i = 0;i<data[0].length;i++){
            let T = data[0][i];//   terminalData
            let ipT1= {
                terminalID:T[0],
                time: moment().format("YYYY-MM-DD HH:mm:ss.SSS"),
                data:{
                    CpeInfo:{
                        netType:T[0],
                        IMEI:T[1],
                        cellID:T[2],
                        SigLevel:R(T[4],T[5])
                    },
                    TestTerminalInfo:{
                        CPU:R(T[7],T[8]),
                        MemoryUsage:R(T[10],T[11])
                    },
                    ipTest:{
                        IpDelay:R(T[13],T[14]),//14,15
                        IpJitter: R(T[16],T[17]),//17,18
                        IpLostpct: R(T[19],T[20]),//20,21
                        IpRelSpeed: R(T[22],T[23]),//23,24
                        IpAvgSpeed: R(T[25],T[26]),//26,27
                        IpsendCnt: R(T[28],T[29]),//29,30
                        IpRecvCnt: R(T[31],T[32]),//32,33
                        IpType: R(T[34],T[35]),//35,36
                        IpTotalTrans: R(T[37],T[38])//38,39
                    }
                }
            }
            ipdata[ipdata.length] = ipT1
        }
    }

    let ftpdData = []
    if(data[1]){
        for(let i = 0;i<data[1].length;i++) {
            let T = data[1][i]
            let ftpdT1 = {
                terminalID:T[0],
                time: moment().format("YYYY-MM-DD HH:mm:ss.SSS"),
                data:{
                    CpeInfo:{
                        netType:T[0],
                        IMEI:T[1],
                        cellID:T[2],
                        SigLevel:R(T[4],T[5])
                    },
                    TestTerminalInfo:{
                        CPU:R(T[7],T[8]),
                        MemoryUsage:R(T[10],T[11])//11,12
                    },
                    FtpDlTest:{
                        DLSp: R(T[13],T[14]),
                        DLMin: R(T[16],T[17]),
                        DLMax: R(T[19],T[20]),
                        DLMean: R(T[22],T[23])
                    }
                }
            }
            ftpdData[ftpdData.length] = ftpdT1
        }
    }

    let ftpuData = []
    if(data[2]){
        for(let i = 0;i<data[2].length;i++) {
            let T = data[2][i]
            let ftpuT1 = {
                terminalID:T[0],
                time: moment().format("YYYY-MM-DD HH:mm:ss.SSS"),
                data:{
                    CpeInfo:{
                        netType:T[0],
                        IMEI:T[1],
                        cellID:T[2],
                        SigLevel:R(T[4],T[5])
                    },
                    TestTerminalInfo:{
                        CPU:R(T[7],T[8]),
                        MemoryUsage:R(T[10],T[11])//11,12
                    },
                    FtpUlTestTest:{
                        ULSp: R(T[13],T[14]),
                        ULMin: R(T[16],T[17]),
                        ULMax: R(T[19],T[20]),
                        ULMean: R(T[22],T[23])
                    }
                }
            }
            ftpuData[ftpuData.length] = ftpuT1
        }
    }

    let httpData = []
    if(data[3]){
        for(let i = 0;i<data[3].length;i++) {
            let T = data[3][i]
            let httpT1 = {
                terminalID:T[0],
                time: moment().format("YYYY-MM-DD HH:mm:ss.SSS"),
                data:{
                    CpeInfo:{
                        netType:T[0],
                        IMEI:T[1],
                        cellID:T[2],
                        SigLevel:R(T[4],T[5])
                    },
                    TestTerminalInfo:{
                        CPU:R(T[7],T[8]),
                        MemoryUsage:R(T[10],T[11])//11,12
                    },
                    FtpUlTestTest:{
                        WebDelay: R(T[13],T[14]),
                        WebSucRate: R(T[16],T[17]),
                        WebNum: R(T[19],T[20]),
                        WebSucNum: R(T[22],T[23])
                    }
                }
            }
            httpData[httpData.length] = httpT1
        }
    }

    let pingData = []
    if(data[4]){
        for(let i = 0;i<data[4].length;i++) {
            let T = data[4][i];
            let pingT1 = {
                terminalID:T[0],
                time: moment().format("YYYY-MM-DD HH:mm:ss.SSS"),
                data:{
                    CpeInfo:{
                        netType:T[0],
                        IMEI:T[1],
                        cellID:T[2],
                        SigLevel:R(T[4],T[5])
                    },
                    TestTerminalInfo:{
                        CPU:R(T[7],T[8]),
                        MemoryUsage:R(T[10],T[11])//11,12
                    },
                    FtpUlTestTest:{
                        PingDelay: R(T[13],T[14]),
                        PingLostRate: R(T[16],T[17]),
                        PingJitter: R(T[19],T[20]),
                        PingSendpct: R(T[22],T[23]),
                        PingRecvpct: R(T[25],T[26]),
                        PingLostpct: R(T[28],T[29])
                    }
                }
            }
            pingData[pingData.length] = pingT1
        }
    }

    let videoData = []
    if(data[5]){
        for(let i = 0;i<data[4].length;i++) {
            let T = data[4][i]
            let videoT1 = {
                terminalID:T[0],
                time: moment().format("YYYY-MM-DD HH:mm:ss.SSS"),
                data:{
                    CpeInfo:{
                        netType:T[0],
                        IMEI:T[1],
                        cellID:T[2],
                        SigLevel:R(T[4],T[5])
                    },
                    TestTerminalInfo:{
                        CPU:R(T[7],T[8]),
                        MemoryUsage:R(T[10],T[11])//11,12
                    },
                    FtpUlTestTest:{
                        VideoFrameDelay: R(T[13],T[14]),
                        VideoFrameSize: R(T[16],T[17]),
                        VideoFrameRate: R(T[19],T[20]),
                        VideoBps: R(T[22],T[23]),
                        VideoFirstFrameDelay: R(T[25],T[26])
                    }
                }
            }
            videoData[videoData.length] = videoT1
        }
    }

    let netData = []
    if(data[6]){
    }
    return [ipdata,ftpdData,ftpuData,httpData,pingData,videoData]
}

function R(Max,Min){
    if(Max<Min){
        console.log('出现不规则随机分布')
        return 0;
    }
    Max = parseInt(Max)
    Min = parseInt(Min)
    const aaa = 2;//    精度
    let Range = Max - Min;
    let Rand = Math.random();
    let num = Min + Rand * Range;
    return num.toFixed(aaa);
}

// console.log(R(3,1));

module.exports = makeData