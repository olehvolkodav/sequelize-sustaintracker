/* eslint-disable @typescript-eslint/no-empty-function, no-console, @typescript-eslint/no-explicit-any, @typescript-eslint/no-unused-vars */
import '@testing-library/jest-dom';

const t = (key: string, params?: Record<string, unknown>) => {
  if (key === 'key.with.params') {
    return `key.with.params.${params?.param}`;
  }
  return key;
};

jest.mock('react-i18next', () => {
  return {
    useTranslation: () => {
      return {
        t,
        i18n: {
          language: 'en',
          changeLanguage: jest
            .fn()
            .mockImplementation((lang: string) => console.log(lang)),
        },
      };
    },
    withTranslation: () => (Component: React.FC) => {
      Component.defaultProps = { ...Component.defaultProps, t };
      return Component;
    },
  };
});

const questions = {
  'q-id': {
    id: 'q-id',
    title: 'q-title',
    year: 'q-year',
  },
  'q-id-1': {
    id: 'q-id-1',
    title: 'q-title-1',
    year: 'q-year-1',
    isYesNoQuestion: true,
  },
};

const mockQuestionnaire = [{ name: 's-name', questions }];

const mockDatasets = [
  {
    id: 'd-id',
    name: 'd-name',
    type: 'annual',
    fiscalYear: 2021,
    dateRangeStart: new Date('2021-01-01').toISOString(),
    dateRangeEnd: new Date('2021-01-01').toISOString(),
    status: 1,
    verificationStatus: 'verified',
  },
];

jest.mock('./providers/dataset', () => {
  return {
    useDataset: () => ({
      datasets: mockDatasets,
      fetchDatasets: () => {},
    }),
  };
});

interface UseQuestionnaireProps {
  questionnaire: any[];
}

jest.mock('./hooks/useQuestionnaire', () => {
  return {
    __esModule: true,
    default: ({ questionnaire }: UseQuestionnaireProps) => ({
      getQuestion: async (s: number, q: string) =>
        mockQuestionnaire[s].questions[q as keyof typeof questions],
      setResponse: (s: number, q: string, r: any) => {},
    }),
  };
});
