import React, { Component } from 'react';
import { Button, Cascader, message, Spin } from 'antd';
import { PlusOutlined } from '@ant-design/icons';
import TermDialog from '../../component/termDialog';
import 'antd/dist/antd.css';
import '../../less/global.less';
import './index.less';
import HttpUtil from '../../util/HttpUtil';
import ApiUtil from '../../util/ApiUtil';
import { TERM_OPTION } from '../../constant/data';

class Term extends Component {
  constructor(props) {
    super(props);
    this.state = {
      currYear: '',
      currTerm: '',
      isAddTerm: false,
      loading: true,
      options: []
    }
  }

  getData() {
    HttpUtil.get(ApiUtil.API_GET_TERM)
      .then(
        re => {
          if(re.isSuccess) {
            let terms = re.terms;
            let options = [];
            for(let i = 0;i < terms.length;i ++){
              let item = {};
              item['value'] = terms[i].tyear;
              item['label'] = terms[i].tyear + '学年';
              item['children'] = [];
              item['children'].push(TERM_OPTION[terms[i].torder-1]);
              if (terms[i].torder === 1) {
                if (terms[i].tyear === terms[i+1].tyear) {
                  item['children'].push(TERM_OPTION[terms[i].torder]);
                  i ++;
                }
              }
              options.push(item);
            }
            this.setState({
              options: options,
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
  handleTermDialogClose = () => {
    this.getData();
    console.log('add');
  }

  //点击添加学期
  showTermDialog = () => {
    // console.log('show term box');
    this.setState({
      isAddTerm: true
    })
  }

  //选择学期
  onChange = (value) => {
    console.log('选择学期', value);
  }

  render() {
    return (
      <div className="g-term">
        <Spin spinning={this.state.loading} size="large" delay={500}>
          <div className="m-term">
            <div className="m-row">
              <span className="m-title">当前学期</span>
              <Button type="primary" icon={<PlusOutlined />} size="small" className="m-btn" onClick={this.showTermDialog}></Button>
            </div>
            <Cascader
              placeholder="请选择当前学期"
              defaultValue={['2019-2020学年', '2018-2019学年']}
              options={this.state.options}
              onChange={this.onChange}
            />
          </div>
          <TermDialog 
            visible = {this.state.isAddTerm}
            afterClose={() => this.setState({ isAddTerm: false })}
            onDialogConfirm={this.handleTermDialogClose}
          />
        </Spin>
      </div>
    )
  }
}

export default Term;