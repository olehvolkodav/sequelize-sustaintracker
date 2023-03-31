import React, { useCallback, useEffect, useMemo, useState } from 'react';

import { yupResolver } from '@hookform/resolvers/yup';
import { useForm } from 'react-hook-form';
import { useTranslation } from 'react-i18next';
import * as yup from 'yup';

import Button from '../../../../components/Button/Button';
import Checkbox from '../../../../components/Checkbox/Checkbox';
import Input from '../../../../components/Input/Input';
import RadioButtonGroup from '../../../../components/RadioButtonGroup/RadioButtonGroup';
import theme from '../../../../styles/theme';

import {
  Form,
  NameInputContainer,
  PasswordConditions,
  SectionIndicator,
  SectionIndicatorCircle,
  SectionIndicatorNameContainer,
  SectionIndicatorRectangle,
  SectionIndicatorSVGContainer,
  TCError,
  TermsAndConditionsContainer,
  Title,
} from './sSection';

type FormValues = {
  gender: string;
  firstName: string;
  lastName: string;
  email: string;
  job: string;
  password: string;
  passwordConfirmation: string;
  tc: boolean;
};

interface CreateAccountProps {
  onNext: (nextSection: string) => void;
}

const CreateAccount: React.FC<CreateAccountProps> = ({ onNext }) => {
  const { t } = useTranslation(['register', 'auth']);
  const [tcError, setTCError] = useState('');

  const schema = useMemo(
    () =>
      yup.object().shape({
        // TODO: is this required?
        gender: yup.string().nullable(),
        firstName: yup.string().required(t('create.first-name-required')),
        lastName: yup.string().required(t('create.last-name-required')),
        email: yup
          .string()
          .email(t('auth:common.email-valid'))
          .required(t('auth:common.email-required')),
        job: yup.string().required(t('create.job-required')),
        password: yup
          .string()
          .required(t('create.password-required'))
          .matches(
            /^(?=.*[a-z])(?=.*[A-Z])(?=.*[0-9])(?=.*[!@#$%^&*])(?=.{8,})/,
            t('create.password-condition')
          ),
        passwordConfirmation: yup
          .string()
          .oneOf([yup.ref('password'), null], t('create.password-match')),
        tc: yup.bool().oneOf([true, null], t('create.terms-required')),
      }),
    [t]
  );

  const { register, watch, handleSubmit, errors } = useForm<FormValues>({
    resolver: yupResolver(schema),
    mode: 'onSubmit',
  });

  useEffect(() => {
    setTCError(errors.tc?.message || '');
  }, [errors]);

  const onSubmit = useCallback(
    async (data: FormValues) => {
      console.log('submit', data);
      onNext('verify-email');
    },
    [onNext]
  );

  return (
    <Form onSubmit={handleSubmit(onSubmit)}>
      <SectionIndicator>
        <SectionIndicatorNameContainer>
          <span>{t('create.create-account')}</span>
          <span>{t('create.company-data')}</span>
        </SectionIndicatorNameContainer>
        <SectionIndicatorSVGContainer>
          <SectionIndicatorCircle
            color={theme.colors.primary}
            cx="50px"
            cy="26px"
          />
          <SectionIndicatorRectangle
            color={theme.colors.primary}
            x="57px"
            y="23px"
            width="calc(50% - 57px)"
            height="6px"
          />
          <SectionIndicatorRectangle
            color={theme.colors.gray_6}
            x="50%"
            y="23px"
            width="calc(50% - 57px)"
            height="6px"
          />
          <SectionIndicatorCircle
            color={theme.colors.gray_6}
            cx="calc(100% - 50px)"
            cy="26px"
          />
        </SectionIndicatorSVGContainer>
      </SectionIndicator>

      <Title>{t('create.title')}</Title>
      <RadioButtonGroup
        name="gender"
        options={[
          { value: 'mr', label: t('create.mr') },
          { value: 'ms', label: t('create.ms') },
          { value: 'mx', label: t('create.mx') },
        ]}
        register={register}
      />
      <NameInputContainer>
        <Input
          name="firstName"
          label={`${t('create.first-name')}*`}
          register={register}
          errors={errors}
        />
        <Input
          name="lastName"
          label={`${t('create.last-name')}*`}
          register={register}
          errors={errors}
        />
      </NameInputContainer>
      <Input
        name="email"
        label={`${t('auth:common.email')}*`}
        register={register}
        errors={errors}
      />
      <Input
        name="job"
        label={`${t('create.job')}*`}
        register={register}
        errors={errors}
      />
      <Input
        name="password"
        type="password"
        label={`${t('create.password')}*`}
        register={register}
        errors={errors}
        isPasswordInput
      />
      <Input
        name="passwordConfirmation"
        type="password"
        label={`${t('create.password-confirm')}*`}
        register={register}
        errors={errors}
        isPasswordInput
      />
      <PasswordConditions>
        {t('auth:new-password.condition')
          ?.split('\n')
          .map((condition) => (
            <li key={condition}>{condition}</li>
          ))}
      </PasswordConditions>
      <Checkbox name="tc" register={register} isChecked={watch('tc')}>
        <TermsAndConditionsContainer>
          {t('create.terms-0')}
          <a href="https://bit.ly/3xnBnm5" target="_blank" rel="noreferrer">
            {t('create.terms-link')}
          </a>
          {t('create.terms-1')}
          <a href="https://bit.ly/3xnBnm5" target="_blank" rel="noreferrer">
            {t('create.privacy-policy-link')}
          </a>
        </TermsAndConditionsContainer>
      </Checkbox>
      <TCError>{tcError}</TCError>

      <Button type="submit">{t('next-button')}</Button>
    </Form>
  );
};

export default CreateAccount;
