import React from 'react';

import { useTranslation } from 'react-i18next';

import Button from '../../../../components/Button/Button';

import { Illustration, Title, WelcomeContainer } from './sSection';

interface WelcomeProps {
  onNext: (nextSection: string) => void;
}

const Welcome: React.FC<WelcomeProps> = ({ onNext }) => {
  const { t } = useTranslation('register');

  return (
    <WelcomeContainer>
      <Illustration src="illustrations/welcome.svg" alt="" width="60%" />
      <Title>{t('welcome.account-created')}</Title>
      <Button onClick={() => onNext('')}>{t('welcome.get-started')}</Button>
    </WelcomeContainer>
  );
};

export default Welcome;
