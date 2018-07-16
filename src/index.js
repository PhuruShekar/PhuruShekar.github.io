//belonged in package.json as test
////"test": "react-scripts test --env=jsdom",

import React from 'react';
import ReactDOM from 'react-dom';
import App from './App';
//import registerServiceWorker from './registerServiceWorker';

ReactDOM.render(<App />, document.getElementById('root'));
registerServiceWorker();
