import React, { Component } from 'react';
import { Button, Divider, Cascader } from 'antd';
import { PlusOutlined } from '@ant-design/icons';
import TermDialog from '../../component/termDialog';
import 'antd/dist/antd.css';
import './index.less';

class Term extends Component {
  constructor(props) {
    super(props);
    this.state = {
      currYear: '',
      currTerm: '',
      isAddTerm: false
    }
  }

  handleTermDialogClose = () => {
    console.log('add');
  }

  //点击添加学期
  showTermDialog = () => {
    console.log('show term box');
    this.setState({
      isAddTerm: true
    })
  }

  //选择学期
  onChange = (value) => {
    console.log(value);
  }

  render() {
    const options = [
      {
        value: '2019-2020',
        label: '2019-2020学年',
        children: [
          {
            value: '1',
            label: '第一学期'
          }, {
            value: '2',
            label: '第二学期'
          }
        ],
      },
      {
        value: '2018-2019',
        label: '2018-2019学年',
        children: [
          {
            value: '1',
            label: '第一学期'
          }, {
            value: '2',
            label: '第二学期'
          }
        ],
      },
    ];

    return (
      <div className="g-term">
        <div className="m-term">
          <div className="m-row">
            <span>当前学期</span>
            <Button type="primary" icon={<PlusOutlined />} size="small" className="m-btn" onClick={this.showTermDialog}></Button>
          </div>
          {/* {this.state.isAddTerm && <RangePicker /> } */}
          <Cascader
            placeholder="请选择当前学期"
            defaultValue={['2019-2020学年', '2018-2019学年']}
            options={options}
            onChange={this.onChange}
          />
        </div>
        <TermDialog 
          visible = {this.state.isAddTerm}
          afterClose={() => this.setState({ isAddTerm: false })}
          onDialogConfirm={this.handleTermDialogClose}
        />
        <Divider />
        <div className="m-leave">
          <div className="m-row">
            <span>休假</span>
            {  this.state.currYear &&
              <Button type="primary" icon={<PlusOutlined />} size="small" className="m-btn"></Button>
            }
            </div>
        </div>
      </div>
    )
  }
}

export default Term;