import React from 'react';
import ReactDOM from 'react-dom';
import { BrowserRouter as Router, Route, Switch } from 'react-router-dom';
import Overview from './Overview';
import './index.css';

const routes = [
  {
    path: '/',
    component: Overview,
    label: 'Overview',
  },
];

const Header = () => {

  return (
    <header>
      <a className="logo" href="https://github.com/neerajsamtani/codirector">
        codirector
      </a>
    </header>
  );
};

ReactDOM.render(
  <Router>
    <Header />
    <Switch>
      {routes.map((route) => (
        <Route exact path={route.path} render={() => <route.component />} key={route.path} />
      ))}
    </Switch>
  </Router>,
  document.getElementById('root')
);