import React, { Component } from 'react';
import { Modal, DatePicker } from 'antd';
// import { ArrowRightOutlined } from '@ant-design/icons';

// const { RangePicker } = DatePicker;

class TermDialog extends Component {
  constructor(props) {
    super(props);
    this.state = {
      newYear: '2020-2021',
      newTerm: '1',
      isSelected: false,
      visible: false,
      confirmLoading: false
    }
  }

  componentDidUpdate(prevProps) {
    if (this.state.visible === prevProps.visible && prevProps.visible !== this.props.visible) {
      this.setState({
        visible: this.props.visible
      })
    }
  }
   
  handleCancel = (e) => {

  }

  handleOk = (e) => {
    console.log('ok');
  }

  onChangeStart = (e) => {

  }

  onChangeEnd = (e) => {

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
          {/* <RangePicker/> */}
          <div className="m-row">
            <DatePicker onChange={this.onChangeStart} bordered={false} placeholder="开始日期"/>
            {/* <ArrowRightOutlined /> */}
            <DatePicker onChange={this.onChangeEnd} bordered={false} placeholder="结束日期"/>
          </div>
          <p>系统将新建<strong>{this.state.newYear}学年第{this.state.newTerm}学期</strong>，时间为<strong>2010年2月3日至2010年6月4日</strong>。</p>
        </div>
      </Modal>
    )
  }
}

export default TermDialog;