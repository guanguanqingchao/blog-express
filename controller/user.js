const {
    exec
} = require('../db/mysql')


const login = (username, password) => {

    const sql = `select username,realname from myblog.users where username='${username}' and password='${password}'`


    return exec(sql).then(row => {

        // [ RowDataPacket { username: 'guanqingchao', realname: 'alice' } ]
        return row[0] || {}
    })
}

module.exports = {
    login
}