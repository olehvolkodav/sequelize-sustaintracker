import React, { useCallback, useMemo } from 'react';

import { yupResolver } from '@hookform/resolvers/yup';
import { useForm } from 'react-hook-form';
import { useTranslation } from 'react-i18next';
import { RouteComponentProps } from 'react-router-dom';
import * as yup from 'yup';

import Button from '../../../../components/Button/Button';
import DayPickerInput from '../../../../components/DayPickerInput/DayPickerInput';
import Input from '../../../../components/Input/Input';
import {
  datasetTypes,
  languages,
  years as yearsMock,
} from '../../../../mock/settings';
import { formatDayMonth } from '../../../../utils/string';

import { Container, DateRangeContainer, Form, Title } from './sNewDataset';

type FormValues = {
  name: string;
  language: string;
  type: string;
  year: string;
  start: string;
  end: string;
};

const NewDataset: React.FC<RouteComponentProps> = () => {
  const { t } = useTranslation('data-entry');

  const schema = useMemo(
    () =>
      yup.object().shape({
        name: yup.string().required(t('new.name-required')),
        language: yup.string().required(),
        type: yup.string(),
        year: yup.string().required(t('new.year-required')),
        start: yup.string().required(t('new.start-required')),
        end: yup.string().required(t('new.end-required')),
      }),
    [t]
  );

  const { handleSubmit, control, register, setValue, errors } =
    useForm<FormValues>({
      resolver: yupResolver(schema),
      mode: 'onSubmit',
      defaultValues: {
        language: languages[0].value,
        type: datasetTypes[0].value,
        year: yearsMock[0].value,
      },
    });

  const onSubmit = useCallback(async (data: FormValues) => {
    console.log('submit', data);
  }, []);

  return (
    <Container>
      <Title>{t('new.title')}</Title>
      <Form onSubmit={handleSubmit(onSubmit)}>
        <Input
          name="name"
          label={`${t('new.name')}*`}
          placeholder={t('new.name-placeholder')}
          register={register}
          errors={errors}
        />
        <Input
          inputType="select"
          name="language"
          label={`${t('new.language')}*`}
          placeholder={t('new.language-placeholder')}
          options={languages}
          control={control}
          setSelectValue={setValue}
          selectDefaultValue={languages[0]}
          errors={errors}
        />
        <Input
          inputType="select"
          name="type"
          label={`${t('new.type')}`}
          placeholder={t('new.type-placeholder')}
          options={datasetTypes}
          control={control}
          setSelectValue={setValue}
          selectDefaultValue={datasetTypes[0]}
          errors={errors}
          isDisabled
        />
        <Input
          inputType="select"
          name="year"
          label={`${t('new.year')}*`}
          placeholder={t('new.year-placeholder')}
          options={yearsMock}
          control={control}
          setSelectValue={setValue}
          selectDefaultValue={yearsMock[0]}
          errors={errors}
        />
        <DateRangeContainer>
          <DayPickerInput
            name="start"
            label={t('new.start')}
            placeholder={t('new.start-placeholder')}
            formatDate={(date: Date) => formatDayMonth(t, date)}
            control={control}
            setValue={setValue}
            errors={errors}
          />
          <DayPickerInput
            name="end"
            label={t('new.end')}
            placeholder={t('new.end-placeholder')}
            formatDate={(date) => formatDayMonth(t, date)}
            control={control}
            setValue={setValue}
            errors={errors}
          />
        </DateRangeContainer>
        <Button type="submit">{t('new.enter-button')}</Button>
      </Form>
    </Container>
  );
};

export default NewDataset;
