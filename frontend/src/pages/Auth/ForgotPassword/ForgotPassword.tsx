import React, { useCallback, useMemo } from 'react';

import { yupResolver } from '@hookform/resolvers/yup';
import { useForm } from 'react-hook-form';
import { useTranslation } from 'react-i18next';
import * as yup from 'yup';

import { ReactComponent as SustainTracker } from '../../../assets/logo-sustain-tracker.svg';
import Button from '../../../components/Button/Button';
import Input from '../../../components/Input/Input';

import {
  BackgroundLeft,
  CardInfo,
  Container,
  Content,
  ForgotPasswordCard,
  Form,
  Illustration,
  Inputs,
  SubTitle,
  Title,
} from './sForgotPassword';

type FormValues = {
  email: string;
};

const ForgotPassword: React.FC = () => {
  const { t } = useTranslation('auth');

  const schema = useMemo(
    () =>
      yup.object().shape({
        email: yup
          .string()
          .email(t('common.email-valid'))
          .required(t('common.email-required')),
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
      <ForgotPasswordCard>
        <SustainTracker />
        <CardInfo>{t('forgot-password.info')}</CardInfo>
        <Form onSubmit={handleSubmit(onSubmit)}>
          <Inputs>
            <Input
              name="email"
              label={`${t('common.email')}*`}
              placeholder={t('common.email-placeholder')}
              register={register}
              errors={errors}
            />
          </Inputs>
          <Button type="submit">{t('forgot-password.button')}</Button>
        </Form>
      </ForgotPasswordCard>
      <Content>
        <Title>{t('common.title')}</Title>
        <SubTitle>{t('common.subtitle')}</SubTitle>
        <Illustration src="illustrations/analytics-color.svg" alt="" />
      </Content>
    </Container>
  );
};

export default ForgotPassword;
