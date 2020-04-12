import React, { Component } from 'react';
import { Button, Cascader, message, Spin } from 'antd';
import { PlusOutlined, EditOutlined } from '@ant-design/icons';
import TermDialog from '../../component/termDialog';
import moment from 'moment';
import './index.less';
import HttpUtil from '../../util/HttpUtil';
import ApiUtil from '../../util/ApiUtil';
import { TERM_OPTION } from '../../constant/data';

class Term extends Component {
  constructor(props) {
    super(props);
    this.state = {
      currentTerm: '',
      editTerm: null,
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
  handleTermDialogClose = (term) => {
    this.getData();
    console.log('add:', term);
  }

  //点击添加学期
  showTermDialog = (term) => {
    //console.log('show term box', term);
    if(term === undefined) {
      term = null;
    }
    this.setState({
      isAddTerm: true,
      editTerm: term
    })
  }

  //选择学期
  onChange = (value) => {
    //console.log('选择学期', value[0], value[1]);
    let select = {}
    select['tyear'] = value[0];
    select['torder'] = parseInt(value[1]);
    let term = JSON.stringify(select);
    let url = ApiUtil.API_GET_TERM_DATE + encodeURI(term);
    this.setState({
      loading: true
    })
    HttpUtil.get(url)
      .then(
        re => {
          let term = re.term[0];
          //2018-02-20T16:00:00.000Z 处理时区，转换
          // console.log('get', moment(term.sdate).format("YYYY-MM-DD"));
          term.sdate = moment(term.sdate).format("YYYY-MM-DD");
          term.edate = moment(term.edate).format("YYYY-MM-DD");
          this.setState({
            currentTerm: term,
            loading: false
          })
        }
      ).catch (error => {
      // message.error('数据被外星人劫持了...');
        this.setState({
          currentTerm: '',
          loading: false
        })
    })
  }

  render() {
    return (
      <div className="g-term">
        <Spin spinning={this.state.loading} size="large" delay={500}>
          <div className="m-term">
            <div className="m-row">
              <span className="m-title">当前学期</span>
              <Button type="primary" icon={<PlusOutlined />} size="small" className="m-btn" onClick={() => this.showTermDialog()}></Button>
            </div>
            <Cascader
              placeholder="请选择当前学期"
              defaultValue={['2019-2020学年', '2018-2019学年']}
              options={this.state.options}
              onChange={this.onChange}
            />
          </div>
          {this.state.currentTerm &&
            <div className="m-row column" onClick={() => this.showTermDialog(this.state.currentTerm)}>
            <p className="m-date">{this.state.currentTerm.sdate} - {this.state.currentTerm.edate}</p>
              <EditOutlined />
            </div>
          }
          <TermDialog 
            visible = {this.state.isAddTerm}
            editTerm={this.state.editTerm}
            afterClose={() => this.setState({ isAddTerm: false })}
            onDialogConfirm={this.handleTermDialogClose}
          />
        </Spin>
      </div>
    )
  }
}

export default Term;