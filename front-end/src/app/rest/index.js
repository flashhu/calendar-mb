import React, { Component } from 'react';
import { Button } from 'antd';
import { PlusOutlined } from '@ant-design/icons';
// import '../../less/global.less';
import './index.less';

class Rest extends Component {
  constructor(props) {
    super(props);
    this.state = {
      currYear:''
    };
  }

  render() {
    return (
      <div className = "g-rest">
        <div className="m-row">
          <span className="m-title">休假</span>
          {this.state.currYear &&
            <Button type="primary" icon={<PlusOutlined />} size="small" className="m-btn"></Button>
          }
        </div>
      </div >      
    )
  }
}

export default Rest;