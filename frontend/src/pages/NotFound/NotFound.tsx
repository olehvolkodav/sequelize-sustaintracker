import React from 'react';

import { useTranslation } from 'react-i18next';
import { RouteComponentProps } from 'react-router-dom';

import { Container, Title } from './sNotFound';

const Home: React.FC<RouteComponentProps> = () => {
  const { t } = useTranslation('common');

  return (
    <Container>
      <Title>{t('not-found')}</Title>
    </Container>
  );
};

export default Home;
