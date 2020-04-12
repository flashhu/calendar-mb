const express = require('express');
const Term = require('../module/term');
const router = express.Router();

router.get('/getAll', (req, res) => {
  Term.getTerm().then(results => {
    res.json({ isSuccess: true, terms: results });
  }).catch(err => {
    console.log('router term get error:', err);
    res.json({ isSuccess: false, message: '数据被外星人劫持了...' });
  })
})

router.get('/edit/:new', (req, res) => {
  let newterm = JSON.parse(req.params.new);
  if (newterm.id) { //编辑
    Term.updateTerm(newterm.sdate, newterm.edate, newterm.id).then(rownum => {
      if(rownum === 1) {
        res.json({ isSuccess: true, message: '修改成功！' });
      }
    }).catch(err => {
      console.log('router term update error:', err);
      res.json({ isSuccess: false, message: '修改失败，请重试...' });
    })
  }else { //新增
    Term.findOne(newterm.tyear, newterm.torder).then(len => {
      if (len === 0) {
        Term.addNewTerm(newterm).then(rownum => {
          if (rownum === 1) {
            res.json({ isSuccess: true, message: '添加成功！' });
          }
        }).catch(err => {
          console.log('router term add error:', err);
          res.json({ isSuccess: false, message: '添加失败，请重试...' });
        })
      } else {
        res.json({ isSuccess: false, message: '学期已存在！' });
      }
    }).catch(err => {
      console.log('router term findone error:', err);
      res.json({ isSuccess: false, message: '添加失败，请重试...' });
    })
  }
})

router.get('/getTermDate/:term', (req, res) => {
  let select = JSON.parse(req.params.term)
  Term.searchOne(select.tyear, select.torder).then(results => {
    res.json({ term: results });
  }).catch(err => {
    console.log('router term get date:', err);
    res.json({ message: '数据被外星人劫持了...' });
  }) 
})

module.exports = router