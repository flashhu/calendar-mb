/**
 * 学期数据模型
 */
module.exports = class Term extends require('./model') {
    /**
     * 获取所有学期信息
     */
    static getTerm() {
        return new Promise((resolve, reject) => {
            let sql = 'SELECT * FROM term ORDER BY tyear, torder';
            this.query(sql).then(results => {
                resolve(results);
            }).catch(err => {
                console.log('获取学期失败：${err.message}');
            })
        })
    }

    /**
     * 查询学期是否存在
     * @param {string} tyear 学年
     * @param {int} torder 学期次序
     */
    static findOne(tyear, torder) {
        return new Promise((resolve, reject) => {
            let sql = 'SELECT * FROM term WHERE tyear = ? AND torder = ?'
            this.query(sql, [tyear, torder]).then(results => {
                resolve(results.length);
            }).catch(err => {
                console.log(`查找学期失败：${err.message}`);
            })
        })
    }


    /**
     * 新建学期
     * @param {object} item 
     */
    static addNewTerm(item) {
        return new Promise((resolve, reject) => {
            let sql = 'INSERT INTO term SET tyear = ?, torder = ?, sdate = ?, edate = ?'
            this.query(sql, [item.tyear, item.torder, item.sdate, item.edate]).then(results => {
                resolve(results.affectedRows)
            }).catch(err => {
                console.log(`新增学期失败：${err.message}`)
                reject(err);
            })
        })
    }

    /**
     * 查询学期具体信息
     * @param {string} tyear 学年 
     * @param {int} torder 学期次序
     */   
    static searchOne(tyear, torder) {
        return new Promise((resolve, reject) => {
            let sql = 'SELECT * FROM term WHERE tyear = ? AND torder = ?';
            this.query(sql, [tyear, torder]).then(results => {
                resolve(results);
            }).catch(err => {
                console.log(`查询学期失败：${err.message}`);
                reject(err);
            })
        })
    }

    /**
     * 修改学期信息
     * @param {date} sdate '2020-04-13'
     * @param {date} edate '2020-04-13'
     * @param {int} id 
     */
    static updateTerm(sdate, edate, id) {
        return new Promise((resolve, reject) => {
            let sql = 'UPDATE term SET sdate = ?, edate = ? WHERE id = ?;';
            this.query(sql, [sdate, edate, id]).then(results => {
                resolve(results.affectedRows);
            }).catch(err => {
                console.log(`修改学期失败：${err.message}`);
                reject(err);
            })
        })
    }
}