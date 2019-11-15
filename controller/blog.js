const {
    exec
} = require('../db/mysql')


const getList = (author, keyword) => {
    //where 1=1,防止author、keyword为空报错

    //select * from myblog.blogs where author = 'guanqingchao5' order by id desc;
    let sql = `select * from myblog.blogs where 1=1 `

    if (author) {
        sql += `and author='${author}' `

    }
    if (keyword) {
        sql += `and title like '%${keyword}%' `
    }

    sql += `order by id desc;`

    //返回promise
    return exec(sql)

}

const getDetail = (id) => {
    const sql = `select * from myblog.blogs where id ='${id}'`
    return exec(sql).then(row => row[0]) //返回对象非数组
}

const newBlog = (data = {}) => {

    const {
        title,
        content,
        author,

    } = data

    const create_time = Date.now();


    const sql = `insert into myblog.blogs (title,content,author,create_time)
                 values ('${title}','${content}','${author}','${create_time}');
                 `
    // OkPacket {
    //     fieldCount: 0,
    //     affectedRows: 1,
    //     insertId: 9,
    //     serverStatus: 2,
    //     warningCount: 0,
    //     message: '',
    //     protocol41: true,
    //     changedRows: 0 }

    return exec(sql).then(data => {
        return {
            id: data.insertId
        }
    })
}

const updateBlog = (id, data = {}) => {
    const {
        title,
        content
    } = data



    const sql = `update myblog.blogs set title='${title}',content='${content}' where id=${id} `

    // OkPacket {
    //     fieldCount: 0,
    //     affectedRows: 1,
    //     insertId: 0,
    //     serverStatus: 2,
    //     warningCount: 0,
    //     message: '(Rows matched: 1  Changed: 1  Warnings: 0',
    //     protocol41: true,
    //     changedRows: 1 }
    return exec(sql).then(data => {
        //更新之后affectedRows会变化
        if (data.affectedRows > 0) {
            return true
        }

        return false
    })
}


// DELETE FROM blogs
// WHERE id = 4;

const deleteBlog = (id, author) => {
    const sql = `delete from myblog.blogs where id=${id} and author='${author}'`
    //软删除
    return exec(sql).then(data => {
        if (data.affectedRows > 0) {
            return true
        }
        return false
    })
}


module.exports = {
    getList,
    getDetail,
    newBlog,
    updateBlog,
    deleteBlog
}