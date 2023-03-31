import React, { Suspense, lazy } from 'react';

import { BrowserRouter, Route, Switch } from 'react-router-dom';

const Routes: React.FC = () => {
  const ForgotPassword = lazy(
    () => import('../pages/Auth/ForgotPassword/ForgotPassword')
  );
  const Login = lazy(() => import('../pages/Auth/Login/Login'));
  const Register = lazy(() => import('../pages/Auth/Register/Register'));
  const Main = lazy(() => import('../pages/Main/Main'));

  return (
    <BrowserRouter>
      <Suspense fallback={<></>}>
        <Switch>
          <Route path="/login" component={Login} />
          <Route path="/forgot-password" component={ForgotPassword} />
          <Route path="/register" component={Register} />
          <Route path="/" component={Main} />
        </Switch>
      </Suspense>
    </BrowserRouter>
  );
};

export default Routes;
