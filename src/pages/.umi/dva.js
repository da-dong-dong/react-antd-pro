import dva from 'dva';
import { Component } from 'react';
import createLoading from 'dva-loading';
import history from '@tmp/history';

let app = null;

export function _onCreate() {
  const plugins = require('umi/_runtimePlugin');
  const runtimeDva = plugins.mergeConfig('dva');
  app = dva({
    history,
    
    ...(runtimeDva.config || {}),
    ...(window.g_useSSR ? { initialState: window.g_initialData } : {}),
  });
  
  app.use(createLoading());
  (runtimeDva.plugins || []).forEach(plugin => {
    app.use(plugin);
  });
  
  app.model({ namespace: 'catr', ...(require('E:/项目案例---------------------/8-开8/04-react/react07/src/models/catr.js').default) });
app.model({ namespace: 'login', ...(require('E:/项目案例---------------------/8-开8/04-react/react07/src/models/login.js').default) });
app.model({ namespace: 'goods', ...(require('E:/项目案例---------------------/8-开8/04-react/react07/src/pages/goods/models/goods.js').default) });
  return app;
}

export function getApp() {
  return app;
}

export class _DvaContainer extends Component {
  render() {
    const app = getApp();
    app.router(() => this.props.children);
    return app.start()();
  }
}
