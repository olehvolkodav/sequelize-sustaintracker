import React, { lazy } from 'react';

import { RouteComponentProps } from 'react-router-dom';

import {
  AnalyticsIcon,
  DataIcon,
  DataRoomIcon,
  HomeIcon,
  ReportsIcon,
  ResourcesIcon,
  VerificationIcon,
} from '../../assets/icons/navbar';

export interface IRoute {
  key: string;
  path: string;
  render?: (routeProps: RouteComponentProps) => React.ReactNode;
  searchable: boolean;
}

export interface INavBarRoute extends IRoute {
  icon: React.FunctionComponent<React.SVGProps<SVGSVGElement>>;
  childRoutes?: IRoute[];
}

const Home = lazy(() => import('../Home/Home'));
const MyData = lazy(() => import('../ESGData/DataEntry/MyData/MyData'));
const Instructions = lazy(() => import('../ESGData/Instructions/Instructions'));
const DataEntry = lazy(() => import('../ESGData/DataEntry/DataEntry'));
const NewDataset = lazy(
  () => import('../ESGData/DataEntry/NewDataset/NewDataset')
);

const ReportEditor = lazy(() => import('../Reports/ReportEditor/ReportEditor'));
const DesignBasics = lazy(() => import('../Reports/DesignBasics/DesignBasics'));
const Reports = lazy(() => import('../Reports/Reports'));
const NewReport = lazy(() => import('../Reports/NewReport/NewReport'));

const ExternalResources = lazy(
  () => import('../Resources/ExternalResources/ExternalResources')
);
const Definitions = lazy(() => import('../Resources/Definitions/Definitions'));

const Account = lazy(() => import('../Settings/Account/Account'));
const CompanySettings = lazy(
  () => import('../Settings/CompanySettings/CompanySettings')
);

export const navbarRoutes: INavBarRoute[] = [
  {
    key: 'home',
    path: '/home',
    icon: HomeIcon,
    render: (routeProps: RouteComponentProps) => <Home {...routeProps} />,
    searchable: true,
  },
  {
    key: 'esg-data',
    path: '/esg-data',
    icon: DataIcon,
    searchable: false,
    childRoutes: [
      {
        key: 'instructions',
        path: '/esg-data/instructions',
        render: (routeProps: RouteComponentProps) => (
          <Instructions {...routeProps} />
        ),
        searchable: true,
      },
      {
        key: 'data-entry',
        path: '/esg-data/entry',
        render: (routeProps: RouteComponentProps) => <MyData {...routeProps} />,
        searchable: true,
      },
    ],
  },
  {
    key: 'esg-analytics',
    path: '/esg-analytics',
    icon: AnalyticsIcon,
    searchable: true,
  },
  {
    key: 'reports',
    path: '/reports',
    icon: ReportsIcon,
    searchable: false,
    childRoutes: [
      {
        key: 'report-editor',
        path: '/reports/editor',
        render: (routeProps: RouteComponentProps) => (
          <ReportEditor {...routeProps} />
        ),
        searchable: true,
      },
      {
        key: 'design-basics',
        path: '/reports/design-basics',
        render: (routeProps: RouteComponentProps) => (
          <DesignBasics {...routeProps} />
        ),
        searchable: true,
      },
      {
        key: 'sub-reports',
        path: '/reports/my-reports',
        render: (routeProps: RouteComponentProps) => (
          <Reports {...routeProps} />
        ),
        searchable: true,
      },
      {
        key: 'examples',
        path: '/reports/examples',
        searchable: true,
      },
    ],
  },
  {
    key: 'data-room',
    path: '/data-room',
    icon: DataRoomIcon,
    searchable: true,
  },
  {
    key: 'verification',
    path: '/verification',
    icon: VerificationIcon,
    searchable: true,
  },
  {
    key: 'resources',
    path: '/resources',
    icon: ResourcesIcon,
    searchable: false,
    childRoutes: [
      {
        key: 'help',
        path: '/resources/help',
        searchable: true,
      },
      {
        key: 'external',
        path: '/resources/external',
        render: (routeProps: RouteComponentProps) => (
          <ExternalResources {...routeProps} />
        ),
        searchable: true,
      },
      {
        key: 'definitions',
        path: '/resources/definitions',
        render: (routeProps: RouteComponentProps) => (
          <Definitions {...routeProps} />
        ),
        searchable: true,
      },
      {
        key: 'policies',
        path: '/resources/policies',
        searchable: true,
      },
    ],
  },
];

// routes not in the navbar
export const extraRoutes: IRoute[] = [
  {
    key: 'account',
    path: '/account',
    render: (routeProps: RouteComponentProps) => <Account {...routeProps} />,
    searchable: true,
  },
  {
    key: 'company-profile',
    path: '/company-profile',
    searchable: true,
  },
  {
    key: 'company-settings',
    path: '/company-settings',
    render: (routeProps: RouteComponentProps) => (
      <CompanySettings {...routeProps} />
    ),
    searchable: true,
  },
  {
    key: 'new-dataset',
    path: '/esg-data/entry/new',
    render: (routeProps: RouteComponentProps) => <NewDataset {...routeProps} />,
    searchable: true,
  },
  {
    key: 'new-report',
    path: '/reports/my-reports/new',
    render: (routeProps: RouteComponentProps) => <NewReport {...routeProps} />,
    searchable: true,
  },
  {
    key: 'input',
    path: '/esg-data/entry/:dataId',
    render: (routeProps: RouteComponentProps) => <DataEntry {...routeProps} />,
    searchable: false,
  },
];
