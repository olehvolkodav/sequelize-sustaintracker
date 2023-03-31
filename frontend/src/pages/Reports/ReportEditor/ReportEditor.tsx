import React from 'react';

import { useTranslation } from 'react-i18next';
import { RouteComponentProps, useParams } from 'react-router-dom';

import { Container, Info, SaveButton, Title } from './sReportEditor';

interface RouteParams {
  reportId: string;
}

const ReportEditor: React.FC<RouteComponentProps> = () => {
  const { reportId } = useParams<RouteParams>();
  const { t } = useTranslation('reports');

  return (
    <Container>
      <Title>
        <span>{t('editor.title', { report: reportId })}</span>
        <SaveButton>{t('editor.save')}</SaveButton>
      </Title>
      <Info>{t('editor.info')}</Info>
    </Container>
  );
};

export default ReportEditor;
