const mysql = require('mysql');
const { DBCONFIG } = require('../../togy.gc.config')

const DB_HOST = DBCONFIG.DB_HOST
    , DB_USER = DBCONFIG.DB_USER
    , DB_PASSWD = DBCONFIG.DB_PASSWD
    , DB_NAME = DBCONFIG.DB_NAME

async function initUserTable(username){
    return new Promise(async (rec,rej) => {
        const connection = mysql.createConnection({
            host:DB_HOST,
            user:DB_USER,
            password:DB_PASSWD,
            database :DB_NAME
        });
        connection.connect();
        const SQL = 'Create Table If Not Exists '+'file_'+username+' (' +
            'id INT AUTO_INCREMENT PRIMARY KEY,' +
            'md5 varchar(32),' +
            'filename varchar(256),' +
            'filetype varchar(32),' +
            'filesize bigint(8),' +
            'ascription bigint(8),' +
            'state int(1),' +
            'isfolder int(1),' +
            'createtime bigint(13))';
        connection.query(SQL,[],(err, results) => {
            if(err){
                rej(err)
            }else{
                rec(results)
            }
            connection.end()
        })
    })
}
async function checkExistFile(md5){
    return new Promise(async (rec,rej) => {
        const connection = mysql.createConnection({
            host:DB_HOST,
            user:DB_USER,
            password:DB_PASSWD,
            database :DB_NAME
        });
        connection.connect();
        const SQL = "SELECT * from file_global where md5 = ?"
        console.log(SQL,md5)
        connection.query(SQL,[md5],(err, results) => {
            if(err){
                rej(err)
            }else{
                console.log(results)
                rec(results)
            }
            connection.end()
        })
    })
}
async function createFile(md5, filename, filetype, filesize, createuser){
    //  库中没有文件
    return new Promise(async (rec,rej) => {
        const connection = mysql.createConnection({
            host:DB_HOST,
            user:DB_USER,
            password:DB_PASSWD,
            database :DB_NAME
        });
        connection.connect();
        const state = 1;
        const createtime = new Date().getTime()
        const SQL = `INSERT INTO file_global (md5, filename, filetype, filesize, state, createuser, createtime) VALUES(?, ?, ?, ?, ?, ?, ?)`;
        connection.query(SQL,[md5, filename, filetype, filesize, state, createuser, createtime],(err, results) => {
            if(err){
                rej(err)
            }else{
                rec(results)
            }
            connection.end()
        })
    })
}
async function insertFile(username, md5, filename, filetype, filesize, ascription){
    //  库中有文件
    return new Promise(async (rec,rej) => {
        const connection = mysql.createConnection({
            host:DB_HOST,
            user:DB_USER,
            password:DB_PASSWD,
            database :DB_NAME
        });
        connection.connect();
        const state = 1;
        const isfolder = 0;
        const createtime = new Date().getTime()
        const SQL = `INSERT INTO file_${ username } (md5, filename, filetype, filesize, ascription, state, isfolder, createtime) VALUES(?, ?, ?, ?, ?, ?, ?, ?)`;
        connection.query(SQL,[md5, filename, filetype, filesize, ascription, state, isfolder, createtime],(err, results) => {
            if(err){
                console.log(err)
                rej(err)
            }else{
                rec(results)
            }
            connection.end()
        })
    })
}

async function getFileList(username, ascription){
    return new Promise(async (rec,rej) => {
        const connection = mysql.createConnection({
            host:DB_HOST,
            user:DB_USER,
            password:DB_PASSWD,
            database :DB_NAME
        });
        connection.connect();
        const SQL = `SELECT * FROM file_${ username }  WHERE ascription = ? and state = 1`;
        connection.query(SQL,[ascription],(err, results) => {
            if(err){
                console.log(err)
                rej(err)
            }else{
                rec(results)
            }
            connection.end()
        })
    })
}

async function createFolder(username, ascription, filename){
    return new Promise(async (rec,rej) => {
        const connection = mysql.createConnection({
            host:DB_HOST,
            user:DB_USER,
            password:DB_PASSWD,
            database :DB_NAME
        });
        connection.connect();
        const state = 1;
        const isfolder = 1;
        const createtime = new Date().getTime()
        const SQL = `INSERT INTO file_${ username } (filename, ascription, state, isfolder, createtime) VALUES(?, ?, ?, ?, ?)`;
        connection.query(SQL,[filename, ascription, state, isfolder, createtime],(err, results) => {
            if(err){
                rej(err)
            }else{
                rec(results)
            }
            connection.end()
        })
    })
}
async function editFilename(username, id, filename){
    return new Promise(async (rec,rej) => {
        const connection = mysql.createConnection({
            host:DB_HOST,
            user:DB_USER,
            password:DB_PASSWD,
            database :DB_NAME
        });
        connection.connect();
        const SQL = `update file_${ username } set filename = ? where id = ? ;`
        connection.query(SQL,[filename, id],(err, results) => {
            if(err){
                rej(err)
            }else{
                rec(results)
            }
            connection.end()
        })
    })
}

async function deleteFile(username, id){
    return new Promise(async (rec,rej) => {
        const connection = mysql.createConnection({
            host:DB_HOST,
            user:DB_USER,
            password:DB_PASSWD,
            database :DB_NAME
        });
        connection.connect();
        const SQL = `update file_${ username } set state = 0 where id = ? ;`
        connection.query(SQL,[id],(err, results) => {
            if(err){
                rej(err)
            }else{
                rec(results)
            }
            connection.end()
        })
    })
}


async function checkDuplicateForUsername(username){
    return new Promise(async (rec,rej) => {
        const connection = mysql.createConnection({
            host:DB_HOST,
            user:DB_USER,
            password:DB_PASSWD,
            database :DB_NAME
        });
        connection.connect();
        const SQL = "SELECT * from user_info where username = ?";
        connection.query(SQL,[username],(err, results) => {
            if(err){
                rej(err)
            }else{
                rec(results)
            }
            connection.end()
        })
    })
}

async function insertEmailCode(username,code){
    return new Promise((rec,rej) => {
        const connection = mysql.createConnection({
            host:DB_HOST,
            user:DB_USER,
            password:DB_PASSWD,
            database :DB_NAME
        });
        connection.connect();
        const SQL = `INSERT INTO user_email_code (username, code, createtime) VALUES(?, ?, ?)`;
        connection.query(SQL,[username,code,new Date().getTime()],(err, results) => {
            if(err){
                rej(err)
            }else{
                rec(results)
            }
            connection.end()
        })
    })
}

async function veriEmailCode(username,code,email,nickname,password){
    return new Promise((rec,rej) => {
        const connection = mysql.createConnection({
            host:DB_HOST,
            user:DB_USER,
            password:DB_PASSWD,
            database :DB_NAME,
            multipleStatements: true
        });
        connection.connect();
        const SQL = `select * from user_email_code where username = ? order by id desc limit 1;`
        connection.query(SQL,[username],(err, results) => {
            if(err){
                rej(err)
            }else{
                const now = new Date().getTime()
                //  十分钟有效
                const a1 = results.length > 0 ? results[0].code == code : false;
                const a2 = results.length > 0 ?(now - results[0].createtime) < 1000 * 60 * 10 : false
                if( a1 && a2){
                    const createtime = new Date().getTime()
                    const SQL2 = `INSERT INTO user_info (username, email, createtime, nickname, state) VALUES(?, ?, ?, ?,1); INSERT INTO user_passwd (username, password, createtime) VALUES (?, ?, ?);`
                    connection.query(SQL2,[username, email, createtime, nickname, username, password, createtime],(err2, results2) => {
                        if(err2){
                            if(err2.sqlMessage.indexOf(`PRIMARY`) > -1){
                                rej('Duplicate')
                            }
                            rej('!sign')
                        }else{
                            rec(results2)
                        }
                    })
                }else{
                    rej('!code')
                }
            }
            connection.end()
        })
    })
}

async function insertJWT(username,jwt,ip,data){
    return new Promise((rec,rej) => {
        const connection = mysql.createConnection({
            host:DB_HOST,
            user:DB_USER,
            password:DB_PASSWD,
            database :DB_NAME
        });
        connection.connect();
        const SQL = `INSERT INTO user_jwt (username, jwt, ip, data, createtime) VALUES(?, ?, ?, ?, ?)`;
        connection.query(SQL,[username, jwt, ip, data, new Date().getTime()],(err, results) => {
            if(err){
                rej(err)
            }else{
                rec(results)
            }
            connection.end()
        })
    })
}

module.exports = {
    initUserTable,
    checkExistFile,
    createFile,
    insertFile,
    getFileList,
    createFolder,
    editFilename,
    deleteFile
}