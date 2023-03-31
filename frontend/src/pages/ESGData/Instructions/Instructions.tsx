import React from 'react';

import { useTranslation } from 'react-i18next';
import { RouteComponentProps } from 'react-router-dom';

import { Container, Title } from './sInstructions';

const Instructions: React.FC<RouteComponentProps> = () => {
  const { t } = useTranslation('data-entry');

  return (
    <Container>
      <Title>{t('instructions.title')}</Title>
    </Container>
  );
};

export default Instructions;
