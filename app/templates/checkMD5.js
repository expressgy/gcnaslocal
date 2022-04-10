const crypto = require('crypto');
const fs = require('fs');



function checkMD5(filePath, callback){
    const stream = fs.createReadStream(filePath)

    const fsHash = crypto.createHash('md5')

    stream.on('data',d => {
        fsHash.update(d)
    })

    stream.on('end', () => {
        const md5 = fsHash.digest('hex');
        callback(md5)
    })
}