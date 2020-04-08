import React, { Component } from 'react';
import { Modal, DatePicker, message } from 'antd';
import '../../less/global.less';
import './index.less';
import HttpUtil from '../../util/HttpUtil';
import ApiUtil from '../../util/ApiUtil';

class TermDialog extends Component {
  constructor(props) {
    super(props);
    this.state = {
      newYear: '',
      newTerm: '',
      isSelected: false,
      visible: false,
      confirmLoading: false,
      starttime:'',
      endtime:'',
      showInfo: false
    }
  }

   syear;
   eyear;

  componentDidUpdate(prevProps) {
    if (this.state.visible === prevProps.visible && prevProps.visible !== this.props.visible) {
      this.setState({
        visible: this.props.visible
      })
    }
  }
   
  handleCancel = (e) => {
    this.setState({
      visible: false
    })
  }

  handleOk = (e) => {
    let values = {};
    values['tyear'] = this.state.newYear;
    values['torder'] = this.state.newTerm;
    values['sdate'] = this.state.starttime;
    values['edate'] = this.state.endtime;
    let add = JSON.stringify(values);
    let url = ApiUtil.API_ADD_TERM + encodeURI(add);
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
      this.props.onDialogConfirm(add);
    }, 1000);
  }

  onChangeStart = (value, dateString) => {
    console.log('start date:', dateString);
    this.setState({
      starttime: dateString
    })
    this.syear = dateString.slice(0, 4);
    this.getData();
  }

  onChangeEnd = (value, dateString) => {
    console.log('end date:', dateString);
    this.setState({
      endtime: dateString
    })
    this.eyear = dateString.slice(0, 4);
    this.getData();
  }

  getData = () => {
    let newyear = '';
    let newterm = 0;
    if (parseInt(this.syear) < parseInt(this.eyear)) {
      newyear = this.syear + '-' + this.eyear;
      newterm = 1;
    }
    if (parseInt(this.syear) === parseInt(this.eyear)) {
      newyear = (parseInt(this.syear) - 1).toString() + '-' + this.eyear;
      newterm = 2;
    }
    this.setState({
      newYear: newyear,
      newTerm: newterm,
      showInfo: true
    })
  }

  render() {
    return(
      <Modal
        title="新建学期"
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
            <DatePicker onChange={this.onChangeStart} bordered={false} placeholder="开始日期"/>
            <DatePicker onChange={this.onChangeEnd} bordered={false} placeholder="结束日期"/>
          </div>
          {this.state.newYear && this.state.newTerm &&
            <p>系统将新建<span>{this.state.newYear}学年第{this.state.newTerm}学期</span>。</p>
          }
        </div>
      </Modal>
    )
  }
}

export default TermDialog;