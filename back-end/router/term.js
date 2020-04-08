const express = require('express');
const Term = require('../module/term');
const router = express.Router();

router.get('/getAll', (req, res) => {
  Term.getTerm().then(results => {
    let str = JSON.stringify(results);
    let terms = JSON.parse(str);
    res.json({ isSuccess: true, terms: terms });
  }).catch(err => {
    console.log('router term get error:', err);
    res.json({ isSuccess: false, message: '数据被外星人劫持了...' });
  })
})

router.get('/add/:new', (req, res) => {
  let newterm = JSON.parse(req.params.new);
  console.log(newterm.tyear);
  Term.findOne(newterm.tyear, newterm.torder).then(len => {
    if(len === 0) {
      Term.addNewTerm(newterm).then(rownum => {
        if (rownum === 1) {
          res.json({ isSuccess: true, message: '添加成功！' });
        }
      }).catch(err => {
        console.log('router term add error:', err);
        res.json({ isSuccess: false, message: '添加失败，请重试...' });
      })
    }else{
      res.json({ isSuccess: true, message: '学期已存在！' });
    }
  }).catch (err => {
    console.log('router term findone error:', err);
    res.json({ isSuccess: false, message: '添加失败，请重试...' });
  })
})

module.exports = router