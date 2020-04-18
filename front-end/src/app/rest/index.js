import React, { Component } from 'react'
import { inject, observer } from 'mobx-react'
import { computed } from 'mobx'
import { Button } from 'antd'
import { PlusOutlined } from '@ant-design/icons'
import './index.less'

@inject('calendarStore')
@observer
class Rest extends Component {
  // constructor(props) {
  //   super(props);
  // }

  @computed
  get currentTerm() {
    return this.props.calendarStore.currentTerm;
  }

  render() {
    return (
      <div className = "g-rest">
        <div className="m-row">
          <span className="m-title">休假</span>
          {this.currentTerm &&
            <Button type="primary" icon={<PlusOutlined />} size="small" className="m-btn"></Button>
          }
        </div>
      </div >      
    )
  }
}

export default Rest;