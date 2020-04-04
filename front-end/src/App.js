import React from 'react';
import Term from './app/term';
import { ConfigProvider } from 'antd';
import zhCN from 'antd/es/locale/zh_CN';
import 'moment/locale/zh-cn'

function App() {
  return (
    <ConfigProvider locale={zhCN}>
      <Term />
    </ConfigProvider>
  );
}

export default App;
