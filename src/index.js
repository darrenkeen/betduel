import React from 'react';
import ReactDOM from 'react-dom';
import './index.css';
import App from './App';

/*
- React Single Page App
- Client side rendered
  - SSR with next.js or express etc
- React DOM
  - Virtual DOM that lives in the main DOM
  - Its quicker to manipulate than the actual DOM since it all lives in react memory and not on screen.
    You can then make changes to it, batch it up then present in 1 go
*/

ReactDOM.render(
  <React.StrictMode>
    <App />
  </React.StrictMode>,
  document.getElementById('root')
);
