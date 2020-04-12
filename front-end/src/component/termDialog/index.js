import React, { Component } from 'react';
import { Modal, DatePicker, message } from 'antd';
import moment from 'moment';
import './index.less';
import HttpUtil from '../../util/HttpUtil';
import ApiUtil from '../../util/ApiUtil';

class TermDialog extends Component {
  constructor(props) {
    super(props);
    this.state = {
      term: {},
      defsdate: '',
      defedate: '',
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
        defsdate: '',
        defedate: ''
      })
    }

    //点击编辑 加后面条件是为防止无限循环
    if (this.props.editTerm && this.state.term.id !== this.props.editTerm.id) {
      this.setState({
        visible: true,
        term: this.props.editTerm,
        deleteConfirm: false,
        defsdate: moment(this.props.editTerm.sdate, "YYYY-MM-DD"),
        defedate: moment(this.props.editTerm.edate, "YYYY-MM-DD")
      })
    }
  }
   
  handleCancel = (e) => {
    this.setState({
      visible: false,
      
    })
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
          if(re.isSuccess) {
            message.success(re.message);
          }else {
            message.error(re.message);
          }
        }
      ).catch(error => {
        console.log("here");
        message.error(error.message);
      })
    
    setTimeout(() => {
      this.setState({
        visible: false,
        confirmLoading: false
      });
      this.props.onDialogConfirm(this.state.term);
    }, 1000);
  }

  onChangeStart = (value, dateString) => {
    //console.log('start date:', dateString);
    let tmp = this.state.term;
    tmp.sdate = dateString;
    this.setState({
      term: tmp
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
      term: tmp
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
    // DatePicker设置默认值 只会记住第一次输入的值 变不动...
    // console.log(this.state.term, this.state.defsdate, this.state.defedate);

    return(
      <Modal
        title="编辑学期"
        visible={this.state.visible}
        width={400}
        onOk={this.handleOk}
        confirmLoading={this.state.confirmLoading}
        onCancel={this.handleCancel}
        afterClose={this.props.afterClose}
        okText="保存"
        cancelText="取消"
      > 
        <div className="g-dialog">
          <div className="m-row">
            {/* <DatePicker onChange={this.onChangeStart} bordered={false} placeholder="开始日期" defaultValue={this.state.defsdate} />
            <DatePicker onChange={this.onChangeEnd} bordered={false} placeholder="结束日期" defaultValue={this.state.defedate} /> */}
            {
              this.state.defsdate &&
              <div>
              <DatePicker onChange={this.onChangeStart} bordered={false} placeholder="开始日期" defaultValue={this.state.defsdate} />
              <DatePicker onChange={this.onChangeEnd} bordered={false} placeholder="结束日期" defaultValue={this.state.defedate} />
              </div>
            }
            {
              this.state.visible && !this.state.defedate &&
              <div>
              <DatePicker onChange={this.onChangeStart} bordered={false} placeholder="开始日期"/>
              <DatePicker onChange={this.onChangeEnd} bordered={false} placeholder="结束日期"/>
              </div>
            }
          </div>
          {this.state.term.tyear && this.state.term.torder &&
            <p>系统将编辑<span>{this.state.term.tyear}学年第{this.state.term.torder}学期</span>。</p>
          }
        </div>
      </Modal>
    )
  }
}

export default TermDialog;