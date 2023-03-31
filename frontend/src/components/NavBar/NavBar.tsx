import React, { useCallback, useEffect, useMemo, useState } from 'react';

import { useTranslation } from 'react-i18next';
import { useHistory, useLocation } from 'react-router-dom';

import { ArrowLeft, ChevronRight } from '../../assets/icons';
import { ReactComponent as Logo } from '../../assets/logo.svg';
import { ReactComponent as SustainTracker } from '../../assets/sustain-tracker.svg';
import { INavBarRoute, IRoute } from '../../pages/Main/mainRoutes';
import { useNavBar } from '../../providers/navbar';

import {
  CollapseButton,
  Container,
  DropDownSubMenu,
  DropDownSubMenuItem,
  LogoContainer,
  MainPageTitle,
  MainPageTitleContainer,
  PagesList,
  SubMenuContainer,
  SubMenuItem,
} from './sNavBar';

interface NavBarProps {
  routes: INavBarRoute[];
}

const NavBar: React.FC<NavBarProps> = ({ routes }) => {
  const history = useHistory();
  const location = useLocation();
  const { t } = useTranslation('common');
  const { width, isCollapsed, toggleIsCollapsed } = useNavBar();
  const [selectedKey, setSelectedKey] = useState<string>();

  const handlePageClick = useCallback(
    (key: string) =>
      setSelectedKey((state) => (state === key ? undefined : key)),
    []
  );

  useEffect(() => {
    if (!isCollapsed) {
      setSelectedKey(undefined);
    }
  }, [isCollapsed]);

  const pathRoot = useMemo(
    () => `/${location.pathname.split('/')[1]}`,
    [location.pathname]
  );

  // expanded navbar submenu
  const renderSubMenu = useCallback(
    (childRoutes: IRoute[]) => {
      return (
        <SubMenuContainer>
          {childRoutes.map((child) => (
            <SubMenuItem
              key={child.key}
              $isSelected={location.pathname === child.path}
              onClick={() => history.push(child.path)}
            >
              {`•    ${t(`navbar.${child.key}`)}`}
            </SubMenuItem>
          ))}
        </SubMenuContainer>
      );
    },
    [location.pathname, history, t]
  );

  // collapsed navbar submenu
  const renderDropDownSubMenu = useCallback(
    (childRoutes: IRoute[]) => {
      return (
        <DropDownSubMenu>
          {childRoutes.map((child) => (
            <DropDownSubMenuItem
              key={child.key}
              onClick={() => history.push(child.path)}
            >
              {`•    ${t(`navbar.${child.key}`)}`}
            </DropDownSubMenuItem>
          ))}
        </DropDownSubMenu>
      );
    },
    [history, t]
  );

  return (
    <Container $isCollapsed={isCollapsed} width={width}>
      <LogoContainer>
        <Logo id="logo" />
        <SustainTracker id="st" />
      </LogoContainer>
      <PagesList>
        {routes.map((route) => {
          const selected = pathRoot === route.path;
          const isSubDivided = route?.childRoutes !== undefined;
          return (
            <React.Fragment key={route.key}>
              <MainPageTitleContainer
                $hideText={isCollapsed}
                onClick={() => {
                  if (isSubDivided) {
                    handlePageClick(route.key);
                  } else {
                    setSelectedKey(undefined);
                    history.push(route.path);
                  }
                }}
                $showSubMenu={selectedKey === route.key}
              >
                {isCollapsed && isSubDivided && (
                  <>{renderDropDownSubMenu(route?.childRoutes || [])}</>
                )}
                <route.icon className="route-icon" />
                <MainPageTitle $isSelected={selected && !isSubDivided}>
                  {t(`navbar.${route.key}`)}
                </MainPageTitle>
                {isSubDivided && <ChevronRight className="chevron" />}
              </MainPageTitleContainer>
              {!isCollapsed && selectedKey === route.key && isSubDivided && (
                <>{renderSubMenu(route?.childRoutes || [])}</>
              )}
            </React.Fragment>
          );
        })}
      </PagesList>
      <CollapseButton type="button" onClick={toggleIsCollapsed}>
        <ArrowLeft />
      </CollapseButton>
    </Container>
  );
};

export default NavBar;
