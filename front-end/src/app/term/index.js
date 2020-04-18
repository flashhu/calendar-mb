import React, { Component } from 'react'
import { inject, observer } from 'mobx-react'
import { computed } from 'mobx'
import { Button, Cascader, message, Spin } from 'antd'
import { PlusOutlined, EditOutlined } from '@ant-design/icons'
import TermDialog from '../../component/termDialog'
import './index.less'
import HttpUtil from '../../util/HttpUtil'
import ApiUtil from '../../util/ApiUtil'

@inject('calendarStore')
@observer
class Term extends Component {
  constructor(props) {
    super(props);
    this.state = {
      casValue: '',
      isAddTerm: true,
      isShowDialog: false,
      loading: true,
      options: []
    }
  }

  @computed
  get currentTerm() {
    return this.props.calendarStore.currentTerm;
  }

  getData() {
    HttpUtil.get(ApiUtil.API_GET_TERM)
      .then(
        re => {
          if(re.isSuccess) {
            this.setState({
              options: re.options,
              loading: false
            })
          }else {
            message.error(re.message);
            this.setState({
              loading: false
            })
          }
        }
      ).catch(error => {
        message.error('数据被外星人劫持了...');
        this.setState({
          loading: false
        })
      })
  }

  componentDidMount() {
    this.getData();
  }
 
  //修改 新增学期
  handleTermDialogClose = (term) => {
    this.getData();
    if(!term) {
      this.props.calendarStore.setCurrentTerm('');
      this.setState({
        casValue: ''
      })
    }else {
      this.props.calendarStore.setCurrentTerm(term);
    }
  }

  //点击添加学期
  showTermDialog = (term) => {
    let tag = term ? false : true;
    this.setState({
      isShowDialog: true,
      isAddTerm: tag
    })
  }

  //选择学期
  onChange = (value) => {
    let select = {}
    select['tyear'] = value[0];
    select['torder'] = parseInt(value[1]);
    let term = JSON.stringify(select);
    this.setState({
      loading: true,
      casValue: value
    })
    
    this.props.calendarStore.changeCurrent(term);

    setTimeout(() => {
      this.setState({
        loading: false
      })
    }, 100);
  }

  render() {
    const { loading, options, isAddTerm, isShowDialog, casValue } = this.state;

    return (
      <div className="g-term">
        <Spin spinning={loading} size="large" delay={500}>
          <div className="m-term">
            <div className="m-row">
              <span className="m-title">当前学期</span>
              <Button type="primary" icon={<PlusOutlined />} size="small" className="m-btn" onClick={() => this.showTermDialog()}></Button>
            </div>
            <Cascader
              placeholder="请选择当前学期"
              loadData = {this.loadData}
              options={options}
              onChange={this.onChange}
              value={casValue}
            />
          </div>
          {this.currentTerm &&
            <div className="m-row column" onClick={() => this.showTermDialog(this.currentTerm)}>
            <p className="m-date">{this.currentTerm.sdate} - {this.currentTerm.edate}</p>
              <EditOutlined />
            </div>
          }
          <TermDialog 
            visible = {isShowDialog}
            editTerm={isAddTerm ? null : this.currentTerm}
            afterClose={() => this.setState({ isShowDialog: false })}
            onDialogConfirm={this.handleTermDialogClose}
          />
        </Spin>
      </div>
    )
  }
}

export default Term;