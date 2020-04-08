import React from 'react';
import ReactDOM from 'react-dom';
import { configure } from 'mobx';
import { ConfigProvider } from 'antd';
import zhCN from 'antd/es/locale/zh_CN';
import 'moment/locale/zh-cn';
import App from './App';

configure({ enforceActions: 'observed' })

ReactDOM.render(
  <ConfigProvider locale={zhCN}>
    <App />
  </ConfigProvider>,
  document.getElementById('root')
);
