import React, { useCallback, useMemo } from 'react';

import { useTranslation } from 'react-i18next';
import { useHistory, useLocation } from 'react-router-dom';

import { ReactComponent as Logo } from '../../../assets/logo-sustain-tracker.svg';

import CompanyDataSection from './sections/CompanyData';
import CreateAccountSection from './sections/CreateAccount';
import VerifyEmailSection from './sections/VerifyEmail';
import WelcomeSection from './sections/Welcome';
import { CancelButton, Card, Container, Content } from './sRegister';

const Register: React.FC = () => {
  const { t } = useTranslation(['register', 'auth']);
  const history = useHistory();
  const sectionState = new URLSearchParams(useLocation().search).get('section');

  const handleSectionChange = useCallback(
    (nextSection: string) => {
      history.push({
        pathname: 'register',
        search: `?section=${nextSection}`,
      });
    },
    [history]
  );

  const section = useMemo(() => {
    switch (sectionState) {
      case 'verify-email':
        return <VerifyEmailSection onNext={handleSectionChange} />;
      case 'company-data':
        return <CompanyDataSection onNext={handleSectionChange} />;
      case 'welcome':
        return <WelcomeSection onNext={handleSectionChange} />;
      default:
        return <CreateAccountSection onNext={handleSectionChange} />;
    }
  }, [handleSectionChange, sectionState]);

  return (
    <Container>
      <Logo />
      <Content>
        <CancelButton onClick={() => history.push('login')}>
          {t('cancel')}
        </CancelButton>
        <Card>{section}</Card>
      </Content>
    </Container>
  );
};

export default Register;
