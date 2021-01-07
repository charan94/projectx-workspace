import React from 'react';
import { Redirect, Route, Switch } from 'react-router-dom';
import LoginPage from './components/auth/LoginPage';
import DashboardPage from './components/dashboard/DashboardPage';
import Forbidden from './components/shared/Forbidden';
import NotFound from './components/shared/NotFound';

export function App() {
  return (
    <div className="App">
      <Switch>
        <Route path="/login">
          <LoginPage />
        </Route>
        <Route path="/401">
          <Forbidden />
        </Route>
        <Route path="/404">
          <NotFound />
        </Route>
        <Route exact path="/">
          <Redirect to={{ pathname: '/login' }} />
        </Route>
        <Route path="/dashboard">
          <DashboardPage />
        </Route>
      </Switch>
    </div>
  );
}
export default App;
