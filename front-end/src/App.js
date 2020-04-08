import React, { Fragment } from 'react';
import { Divider } from 'antd';
import Term from './app/term';
import Rest from './app/rest';

function App() {
  return (
    <Fragment>
      <Term />
      <Divider />
      <Rest />
    </Fragment>
  );
}

export default App;
