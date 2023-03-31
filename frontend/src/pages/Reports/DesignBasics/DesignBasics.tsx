import React, { useCallback, useEffect, useRef } from 'react';

import { yupResolver } from '@hookform/resolvers/yup';
import { useForm } from 'react-hook-form';
import { useTranslation } from 'react-i18next';
import { RouteComponentProps } from 'react-router-dom';
import * as yup from 'yup';

import {
  Close as CloseIcon,
  Upload as UploadIcon,
} from '../../../assets/icons';
import Button from '../../../components/Button/Button';
import ColorPicker from '../../../components/ColorPicker/ColorPicker';
import RadioButtonGroup from '../../../components/RadioButtonGroup/RadioButtonGroup';
import { getProminentColor } from '../../../utils/color';

import {
  Container,
  Form,
  HexInput,
  HexInputContainer,
  HexInputPreview,
  HiddenInput,
  ImageContainer,
  Info,
  ManualColorInputContainer,
  PreviewContainer,
  PreviewItem,
  SettingContainer,
  Title,
  UploadLogoContainer,
} from './sDesignBasics';

type FormValues = {
  logo: FileList;
  color: string;
  style: string;
};

const schema = yup.object().shape({
  logo: yup.mixed(),
  color: yup.string(),
  style: yup.string(),
});

const DesignBasics: React.FC<RouteComponentProps> = () => {
  const { t } = useTranslation(['reports', 'common']);
  const logoInputRef = useRef<HTMLInputElement | null>(null);

  const { register, handleSubmit, setValue, watch } = useForm<FormValues>({
    resolver: yupResolver(schema),
    mode: 'onSubmit',
    defaultValues: {
      color: '#EA775A',
      style: 'standard',
    },
  });

  const watchLogo = watch('logo');
  const watchColor = watch('color');
  const watchStyle = watch('style');

  useEffect(() => {
    async function setProminentColor() {
      const prominent = await getProminentColor(
        URL.createObjectURL(watchLogo[0]),
        { format: 'hex' }
      );
      setValue(
        'color',
        typeof prominent === 'string' ? prominent : (prominent as string[])[0]
      );
    }

    if (watchLogo?.length) {
      setProminentColor();
    }
  }, [watchLogo, watchLogo?.length, setValue]);

  const onSubmit = useCallback((data: FormValues) => {
    console.log('submit', data);
  }, []);

  return (
    <Container>
      <Title>{t('design-basics.title')}</Title>
      <Info>{t('design-basics.subtitle')}</Info>

      <Form onSubmit={handleSubmit(onSubmit)}>
        <SettingContainer>
          <div>
            <HiddenInput
              name="logo"
              type="file"
              accept="image/*"
              ref={(e) => {
                register(e);
                logoInputRef.current = e;
              }}
            />
            <span>{t('design-basics.upload-logo')}</span>
            {watchLogo?.length ? (
              <ImageContainer>
                <img src={URL.createObjectURL(watchLogo[0])} alt="" />
                <CloseIcon id="close" onClick={() => setValue('logo', null)} />
              </ImageContainer>
            ) : (
              <UploadLogoContainer
                onClick={() => logoInputRef?.current?.click()}
              >
                <UploadIcon />
                <span>{t('design-basics.upload-logo-text')}</span>
                <span id="subtext">
                  {t('design-basics.upload-logo-text-2')}
                </span>
              </UploadLogoContainer>
            )}
          </div>

          <div>
            <span>{t('design-basics.company-color')}</span>
            <ColorPicker
              color={watchColor}
              onChange={(color) => setValue('color', color.toUpperCase())}
            />
            <span id="color-code">{t('design-basics.color-code')}</span>
            <ManualColorInputContainer>
              {t('design-basics.hex')}
              <HexInputContainer>
                <HexInputPreview color={watchColor} />
                <HexInput
                  name="color"
                  value={watchColor.toUpperCase()}
                  onChange={(e) => setValue('color', e.target.value)}
                  maxLength={7}
                  ref={register}
                />
              </HexInputContainer>
            </ManualColorInputContainer>
          </div>
        </SettingContainer>

        <Info>{t('design-basics.available-styles')}</Info>
        <RadioButtonGroup
          name="style"
          options={[
            { value: 'standard', label: t('design-basics.standard') },
            { value: 'traditional', label: t('design-basics.traditional') },
            { value: 'green', label: t('design-basics.green') },
          ]}
          defaultOption="standard"
          register={register}
        />
        <PreviewContainer>
          <PreviewItem $isSelected={watchStyle === 'standard'}>
            <img src="slides/standard.png" alt="" />
          </PreviewItem>

          <PreviewItem $isSelected={watchStyle === 'traditional'}>
            <img src="slides/traditional.png" alt="" width="60%" />
          </PreviewItem>

          <PreviewItem $isSelected={watchStyle === 'green'}>
            <img src="slides/green.png" alt="" />
          </PreviewItem>
        </PreviewContainer>

        <Button type="submit">{t('design-basics.continue')}</Button>
      </Form>
    </Container>
  );
};

export default DesignBasics;
