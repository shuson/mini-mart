import React from 'react';
import ReactDOM from 'react-dom';
import './index.css';
import RootRouter from './components/RootRouter';
import registerServiceWorker from './registerServiceWorker';

ReactDOM.render(<RootRouter />, document.getElementById('root'));
registerServiceWorker();
