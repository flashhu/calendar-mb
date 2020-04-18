const mysql = require('mysql')

/**
 * 封装模型的基类
 * 封装数据库操作
 */
module.exports = class Model {
    //连接对象
    static conn = null;

    /**
     * 数据库连接方法
     */
    static connection() {
        Model.conn = mysql.createConnection({
            host: '127.0.0.1',
            user: 'dbuser',
            password: '123456',
            database: 'mc_calendar',
            dateStrings: [
                'DATE',
                'DATETIME'
            ]
        })
        Model.conn.connect(err => {
            if(err) {
                console.log(`数据库连接失败：${err.message}`)
            }
        })
    }

    /**
     * 关闭数据库连接
     */
    static end() {
        if(null != Model.conn) {
            Model.conn.end();
        }
    }

    /**
     * 通用查询方法
     */
    static query(sql, params = []) {
        return new Promise((resolve, reject) => {
            this.connection()

            Model.conn.query(sql, params, (err, results)=>{
                if(err){
                    reject(err)
                }else{
                    resolve(results)
                }
            })

            this.end()
        })
    }
}