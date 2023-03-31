import React from 'react';

import { useTranslation } from 'react-i18next';
import { RouteComponentProps, useHistory } from 'react-router-dom';

import Card from '../../components/Card/Card';
import { user as userMock } from '../../mock/user';

import { CardButton, Container, Content, Illustration, Title } from './sHome';

const Home: React.FC<RouteComponentProps> = () => {
  const history = useHistory();
  const { t } = useTranslation('home');

  return (
    <Container>
      <Title>{t('common:welcome', { firstName: userMock.firstName })}</Title>
      <Content>
        <Card title={t('esg-data')}>
          <Illustration src="illustrations/image-folder.svg" alt="" />
          <CardButton onClick={() => history.push('esg-data/entry')}>
            {t('goto-data')}
          </CardButton>
        </Card>

        <Card title={t('reports')}>
          <Illustration src="illustrations/reports.svg" alt="" />
          <CardButton onClick={() => history.push('reports/my-reports')}>
            {t('goto-reports')}
          </CardButton>
        </Card>

        <Card title={t('esg-analytics')}>
          <Illustration src="illustrations/analytics-gray.svg" alt="" />
          <CardButton>{t('goto-analytics')}</CardButton>
        </Card>
      </Content>
    </Container>
  );
};

export default Home;
