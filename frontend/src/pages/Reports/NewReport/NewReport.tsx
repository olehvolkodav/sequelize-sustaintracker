import React, { useCallback, useMemo } from 'react';

import { yupResolver } from '@hookform/resolvers/yup';
import { useForm } from 'react-hook-form';
import { useTranslation } from 'react-i18next';
import { RouteComponentProps } from 'react-router-dom';
import * as yup from 'yup';

import Button from '../../../components/Button/Button';
import Input from '../../../components/Input/Input';
import {
  esgDatasetOptions as datasetOptionsMock,
  datasetTypes as datasetTypesMock,
  models as modelsMock,
  years as yearsMock,
} from '../../../mock/settings';

import { Container, Form, Title } from './sNewReport';

type FormValues = {
  name: string;
  type: string;
  model: string;
  year: string;
  dataset: string;
};

const NewReport: React.FC<RouteComponentProps> = () => {
  const { t } = useTranslation('reports');

  const schema = useMemo(
    () =>
      yup.object().shape({
        name: yup.string().required(t('new.name-required')),
        type: yup.string().required(t('new.type-required')),
        model: yup.string().required(t('new.model-required')),
        year: yup.string().required(t('new.year-required')),
        dataset: yup.string().required(t('new.dataset-required')),
      }),
    [t]
  );

  const { handleSubmit, control, register, setValue, errors } =
    useForm<FormValues>({
      resolver: yupResolver(schema),
      mode: 'onSubmit',
      defaultValues: {
        type: datasetTypesMock[0].value,
        model: modelsMock[0].value,
        year: yearsMock[0].value,
        dataset: datasetTypesMock[0].value,
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
          register={register}
          errors={errors}
        />
        <Input
          inputType="select"
          name="type"
          label={`${t('new.type')}*`}
          options={datasetTypesMock}
          control={control}
          setSelectValue={setValue}
          selectDefaultValue={datasetTypesMock[0]}
          errors={errors}
          isDisabled
        />
        <Input
          inputType="select"
          name="model"
          label={`${t('new.model')}`}
          options={modelsMock}
          control={control}
          setSelectValue={setValue}
          selectDefaultValue={modelsMock[0]}
          errors={errors}
          isDisabled
        />
        <Input
          inputType="select"
          name="year"
          label={`${t('new.year')}*`}
          options={yearsMock}
          control={control}
          setSelectValue={setValue}
          selectDefaultValue={yearsMock[0]}
          errors={errors}
        />
        <Input
          inputType="select"
          name="dataset"
          label={`${t('new.dataset')}*`}
          options={datasetOptionsMock}
          control={control}
          setSelectValue={setValue}
          selectDefaultValue={datasetOptionsMock[0]}
          errors={errors}
        />
        <Button type="submit">{t('new.continue')}</Button>
      </Form>
    </Container>
  );
};

export default NewReport;
