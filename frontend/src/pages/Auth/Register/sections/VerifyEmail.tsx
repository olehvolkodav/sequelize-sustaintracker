import React, { useCallback, useMemo } from 'react';

import { yupResolver } from '@hookform/resolvers/yup';
import { useForm } from 'react-hook-form';
import { useTranslation } from 'react-i18next';
import * as yup from 'yup';

import Button from '../../../../components/Button/Button';
import SplitInput from '../../../../components/SplitInput/SplitInput';
import theme from '../../../../styles/theme';

import {
  Form,
  Illustration,
  ResendButtonContainer,
  SectionIndicator,
  SectionIndicatorCircle,
  SectionIndicatorNameContainer,
  SectionIndicatorRectangle,
  SectionIndicatorSVGContainer,
  SplitInputContainer,
  SubTitle,
  Title,
} from './sSection';

type FormValues = {
  code: string;
};

interface VerifyEmailProps {
  onNext: (nextSection: string) => void;
}

const VerifyEmail: React.FC<VerifyEmailProps> = ({ onNext }) => {
  const { t } = useTranslation(['register', 'auth']);

  const schema = useMemo(
    () =>
      yup.object().shape({
        code: yup.string().required(),
      }),
    []
  );

  const { control, setValue, watch, handleSubmit } = useForm<FormValues>({
    resolver: yupResolver(schema),
    mode: 'onSubmit',
  });

  const watchCode = watch('code');

  const onSubmit = useCallback(
    async (data: FormValues) => {
      console.log('submit', data);
      onNext('company-data');
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

      <Illustration src="illustrations/mail.svg" alt="" width="40%" />
      <Title>{t('verification.validation-code')}</Title>
      <SubTitle>{t('verification.enter-code')}</SubTitle>

      <SplitInputContainer>
        <SplitInput
          name="code"
          inputNum={4}
          control={control}
          setValue={setValue}
        />
      </SplitInputContainer>

      <ResendButtonContainer>
        <button id="resend" type="button">
          {t('verification.resend-link')}
        </button>{' '}
        {t('verification.resend')}
      </ResendButtonContainer>

      <Button type="submit" disabled={watchCode?.length < 4}>
        {t('next-button')}
      </Button>
    </Form>
  );
};

export default VerifyEmail;
