import React, { Suspense, useMemo } from 'react';

import { Route, Switch } from 'react-router-dom';

import Header from '../../components/Header/Header';
import NavBar from '../../components/NavBar/NavBar';
import { user as userMock } from '../../mock/user';
import { useNavBar } from '../../providers/navbar';
import NotFound from '../NotFound/NotFound';

import { IRoute, extraRoutes, navbarRoutes } from './mainRoutes';
import { Container, Content } from './sMain';

const Main: React.FC = () => {
  const { width } = useNavBar();

  const routes = useMemo(() => {
    const children = navbarRoutes
      .filter((route) => route.childRoutes?.length)
      .map((route) => route.childRoutes)
      .flat();
    return extraRoutes.concat(navbarRoutes).concat(children as IRoute[]);
  }, []);

  return (
    <Container>
      <Content margin={width}>
        <Suspense fallback={<></>}>
          <Header
            user={userMock}
            routes={routes.filter((route) => route.searchable)}
          />
        </Suspense>
        <Suspense fallback={<></>}>
          <Switch>
            {routes.map((route) => (
              <Route
                exact
                path={route.path}
                key={route.path}
                render={route?.render}
              />
            ))}
            <Route component={NotFound} />
          </Switch>
        </Suspense>
      </Content>
      <Suspense fallback={<></>}>
        <NavBar routes={navbarRoutes} />
      </Suspense>
    </Container>
  );
};

export default Main;
