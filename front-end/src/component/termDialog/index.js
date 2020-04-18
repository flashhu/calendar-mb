import React, { Component } from 'react'
import { Modal, DatePicker, message, Button } from 'antd'
import { DeleteOutlined } from '@ant-design/icons'
import moment from 'moment'
import './index.less'
import HttpUtil from '../../util/HttpUtil'
import ApiUtil from '../../util/ApiUtil'
import msgret from '../../util/msgret'

class TermDialog extends Component {
  constructor(props) {
    super(props);
    this.state = {
      term: {},
      dtpsdate: '',
      dtpedate: '',
      visible: false,
      confirmLoading: false,
      deleteConfirm: false
    }
  }

   syear;
   eyear;

  componentDidUpdate(prevProps) {
    // 点击添加 及 跳出弹窗后修改 
    if (this.state.visible === prevProps.visible && prevProps.visible !== this.props.visible) {
      this.setState({
        visible: this.props.visible,
        term: {},
        dtpsdate: '',
        dtpedate: ''
      })
    }

    //点击编辑 加后面条件是为防止无限循环
    if (this.props.editTerm && this.state.term.id !== this.props.editTerm.id) {
      //深拷贝
      let {...temp} = this.props.editTerm;
      this.setState({
        term: temp,
        deleteConfirm: false,
        dtpsdate: moment(this.props.editTerm.sdate, "YYYY-MM-DD"),
        dtpedate: moment(this.props.editTerm.edate, "YYYY-MM-DD")
      })
    }
  }
   
  handleCancel = (e) => {
    this.setState({
      visible: false,
    })
  }

  handleDelete = () => {
    if(this.state.deleteConfirm) {
      console.log('delete');
      HttpUtil.get(ApiUtil.API_DELETE_TERM + encodeURI(this.state.term.id))
      .then(re => {
        msgret(re.isSuccess, re.message);
      }).catch(error =>{
        message.error(error.message);
      })
      //不加会出现数据没有更新的情况 异步
      setTimeout(() => {
        this.setState({
          deleteConfirm: false,
          visible: false
        });
        this.props.onDialogConfirm(undefined);
      }, 500);
    }else {
      this.setState({
        deleteConfirm: true
      })
    }
  }

  handleOk = (e) => {
    let add = JSON.stringify(this.state.term);
    let url = ApiUtil.API_EDIT_TERM + encodeURI(add);
    console.log(add);
    this.setState({
      confirmLoading: true,
    });

    HttpUtil.get(url)
      .then(
        re => {
          msgret(re.isSuccess, re.message);
        }
      ).catch(error => {
        message.error(error.message);
      })
    
    setTimeout(() => {
      this.setState({
        visible: false,
        confirmLoading: false
      });
      this.props.onDialogConfirm(this.state.term);
    }, 500);
  }

  onChangeStart = (value, dateString) => {
    console.log('start date:', value, dateString);
    let tmp = this.state.term;
    tmp.sdate = dateString;
    this.setState({
      term: tmp,
      dtpsdate: value
    })
    //添加学期，需要调用判断所属学年学期
    if (!this.props.editTerm) {
      this.syear = dateString.slice(0, 4);
      this.getData();
    }
  }

  onChangeEnd = (value, dateString) => {
    //console.log('end date:', dateString);
    let tmp = this.state.term;
    tmp.edate = dateString;
    this.setState({
      term: tmp,
      dtpedate: value
    })
    //添加学期，需要调用判断所属学年学期
    if(!this.props.editTerm) {
      this.eyear = dateString.slice(0, 4);
      this.getData();
    }
  }

  getData = () => {
    let newyear, newterm;
    //简单逻辑判断学年学期
    if (parseInt(this.syear) < parseInt(this.eyear)) {
      newyear = this.syear + '-' + this.eyear;
      newterm = 1;
    }
    if (parseInt(this.syear) === parseInt(this.eyear)) {
      newyear = (parseInt(this.syear) - 1).toString() + '-' + this.eyear;
      newterm = 2;
    }
    let tmp = this.state.term;
    tmp.tyear = newyear;
    tmp.torder = newterm;
    this.setState({
      term: tmp
    })
  }

  render() {
    const { visible, confirmLoading, dtpsdate, dtpedate, term, deleteConfirm } = this.state;

    return(
      <Modal
        title="编辑学期"
        visible={visible}
        width={400}
        onOk={this.handleOk}
        confirmLoading={confirmLoading}
        onCancel={this.handleCancel}
        afterClose={this.props.afterClose}
        okText="保存"
        cancelText="取消"
      > 
        <div className="g-dialog">
          <div className="m-row">
            <DatePicker onChange={this.onChangeStart} bordered={false} placeholder="开始日期" value={dtpsdate} />
            <DatePicker onChange={this.onChangeEnd} bordered={false} placeholder="结束日期" value={dtpedate} />
          </div>
          {term.tyear && term.torder &&
            <p>系统将编辑<span>{term.tyear}学年第{term.torder}学期</span>。</p>
          }
          {term.id && 
            <Button className="m-btn" type="primary" danger icon={<DeleteOutlined />} onClick={this.handleDelete}>
            {deleteConfirm ? '请再次点击确认删除' : '删除'}
            </Button>
          }
        </div>
      </Modal>
    )
  }
}

export default TermDialog;