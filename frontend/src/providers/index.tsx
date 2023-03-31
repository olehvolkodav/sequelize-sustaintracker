import React from 'react';

import { DatasetProvider } from './dataset';
import { NavBarProvider } from './navbar';
import { ReportProvider } from './report';

const AppContext: React.FC = ({ children }) => (
  <NavBarProvider>
    <DatasetProvider>
      <ReportProvider>{children}</ReportProvider>
    </DatasetProvider>
  </NavBarProvider>
);

export default AppContext;
