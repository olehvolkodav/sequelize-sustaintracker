import React, { createContext, useCallback, useContext, useState } from 'react';

import { reports as reportsMock } from '../mock/reports';

import { Report } from './types';

interface ReportContextData {
  reports: Report[];
  fetchReports: () => Promise<void>;
}

const ReportContext = createContext<ReportContextData>({} as ReportContextData);

export const ReportProvider: React.FC = ({ children }) => {
  const [reports, setReports] = useState<Report[]>([]);

  const fetchReports = useCallback(async () => {
    // simulate API call
    setTimeout(() => setReports(reportsMock), 1000);
  }, []);

  return (
    <ReportContext.Provider
      value={{
        reports,
        fetchReports,
      }}
    >
      {children}
    </ReportContext.Provider>
  );
};

export function useReport(): ReportContextData {
  const context = useContext(ReportContext);
  if (!context) {
    throw new Error('useReport must be used within a ReportProvider');
  }
  return context;
}
