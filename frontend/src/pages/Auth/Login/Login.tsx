import React, { useCallback, useMemo } from 'react';

import { yupResolver } from '@hookform/resolvers/yup';
import { useForm } from 'react-hook-form';
import { useTranslation } from 'react-i18next';
import { useHistory } from 'react-router-dom';
import * as yup from 'yup';

import { ReactComponent as SustainTracker } from '../../../assets/logo-sustain-tracker.svg';
import Button from '../../../components/Button/Button';
import Input from '../../../components/Input/Input';

import {
  BackgroundLeft,
  CardTitle,
  Container,
  Content,
  ForgotPassword,
  Form,
  Illustration,
  Inputs,
  LoginCard,
  RegisterButton,
  SubTitle,
  Title,
} from './sLogin';

type FormValues = {
  email: string;
  password: string;
};

const Login: React.FC = () => {
  const { t } = useTranslation('auth');
  const history = useHistory();

  const schema = useMemo(
    () =>
      yup.object().shape({
        email: yup
          .string()
          .email(t('common.email-valid'))
          .required(t('common.email-required')),
        password: yup.string().required(t('login.password-required')),
      }),
    [t]
  );

  const { register, handleSubmit, errors } = useForm<FormValues>({
    resolver: yupResolver(schema),
    mode: 'onSubmit',
  });

  const onSubmit = useCallback(async (data: FormValues) => {
    console.log('submit', data);
  }, []);

  return (
    <Container>
      <BackgroundLeft />
      <LoginCard>
        <SustainTracker />
        <CardTitle>{t('login.access')}</CardTitle>
        <Form onSubmit={handleSubmit(onSubmit)}>
          <Inputs>
            <Input
              name="email"
              label={`${t('common.email')}*`}
              placeholder={t('common.email-placeholder')}
              register={register}
              errors={errors}
            />
            <Input
              type="password"
              name="password"
              label={`${t('login.password')}*`}
              placeholder={t('login.password-placeholder')}
              register={register}
              errors={errors}
              isPasswordInput
            />
            <ForgotPassword onClick={() => history.push('forgot-password')}>
              {t('login.forgot')}
            </ForgotPassword>
          </Inputs>
          <Button type="submit">{t('login.button')}</Button>
        </Form>
        <RegisterButton onClick={() => history.push('register')}>
          {t('login.register')}
        </RegisterButton>
      </LoginCard>
      <Content>
        <Title>{t('common.title')}</Title>
        <SubTitle>{t('common.subtitle')}</SubTitle>
        <Illustration src="illustrations/analytics-color.svg" alt="" />
      </Content>
    </Container>
  );
};

export default Login;
