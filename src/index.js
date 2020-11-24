import React from 'react';
import ReactDOM from 'react-dom';
import { BrowserRouter as Router } from 'react-router-dom';
import App from './components/App'
import './index.css';

// const routes = [
//   {
//     path: '/',
//     component: Overview,
//     label: 'Overview',
//   },
// ];

ReactDOM.render(
  <Router>
    <App />
    {/* <Switch>
      {routes.map((route) => (
        <Route exact path={route.path} render={() => <route.component />} key={route.path} />
      ))}
    </Switch> */}
  </Router>,
  document.getElementById('root')
);