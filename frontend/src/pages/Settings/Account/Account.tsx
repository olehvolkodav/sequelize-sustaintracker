import React, {
  useCallback,
  useEffect,
  useMemo,
  useRef,
  useState,
} from 'react';

import { yupResolver } from '@hookform/resolvers/yup';
import { useForm } from 'react-hook-form';
import { useTranslation } from 'react-i18next';
import { RouteComponentProps } from 'react-router-dom';
import * as yup from 'yup';

import { Close as CloseIcon, CloudUpload } from '../../../assets/icons';
import Input from '../../../components/Input/Input';
import RadioButtonGroup from '../../../components/RadioButtonGroup/RadioButtonGroup';
import { languages } from '../../../mock/settings';
import { user as userMock } from '../../../mock/user';

import {
  Container,
  Form,
  FormContainer,
  HiddenInput,
  HiddenSubmit,
  ImageContainer,
  NameInputContainer,
  SaveButton,
  Title,
  ToggleChangePasswordContainer,
  UploadAvatarContainer,
} from './sAccount';

type FormValues = {
  avatar: FileList;
  gender: string;
  firstName: string;
  lastName: string;
  email: string;
  job: string;
  language: string;
  changePasswordEnabled: boolean;
  password: string;
  passwordConfirmation: string;
};

const Account: React.FC<RouteComponentProps> = () => {
  const { t } = useTranslation('settings', { keyPrefix: 'account' });
  const [changePasswordEnabled, setChangePasswordEnabled] = useState(false);
  const avatarInputRef = useRef<HTMLInputElement | null>(null);
  const hiddenSubmitRef = useRef<HTMLButtonElement>(null);

  const schema = useMemo(
    () =>
      yup.object().shape({
        avatar: yup.mixed(),
        gender: yup.string().nullable(),
        firstName: yup.string().required(t('first-name-required')),
        lastName: yup.string().required(t('last-name-required')),
        email: yup
          .string()
          .email(t('email-valid'))
          .required(t('email-required')),
        job: yup.string().required(t('job-required')),
        language: yup.string().required(t('language-required')),
        changePasswordEnabled: yup.boolean().required(),
        password: yup.string().when('changePasswordEnabled', {
          is: true,
          then: yup
            .string()
            .required(t('password-required'))
            .matches(
              /^(?=.*[a-z])(?=.*[A-Z])(?=.*[0-9])(?=.*[!@#$%^&*])(?=.{8,})/,
              t('password-condition')
            ),
        }),
        passwordConfirmation: yup
          .string()
          .oneOf([yup.ref('password'), null], t('password-match')),
      }),
    [t]
  );

  const { register, setValue, watch, control, handleSubmit, errors } =
    useForm<FormValues>({
      resolver: yupResolver(schema),
      mode: 'onSubmit',
      defaultValues: {
        language: languages[0].value,
        changePasswordEnabled: false,
      },
    });

  const watchAvatar = watch('avatar');

  useEffect(() => register('changePasswordEnabled'), [register]);

  const handleChangePassword = useCallback(() => {
    setChangePasswordEnabled((state) => {
      if (state) setValue('password', '');
      return !state;
    });
  }, [setValue]);

  useEffect(() => {
    setValue('changePasswordEnabled', changePasswordEnabled);
  }, [setValue, changePasswordEnabled]);

  const onSubmit = useCallback(async (data: FormValues) => {
    console.log('submit', data);
  }, []);

  const handleSaveChanges = useCallback(() => {
    console.log('save changes click');
    if (hiddenSubmitRef) {
      hiddenSubmitRef.current?.click();
    }
  }, []);

  return (
    <Container>
      <Title>
        <span>{t('title', { firstName: userMock.firstName })}</span>
        <SaveButton onClick={handleSaveChanges}>{t('save')}</SaveButton>
      </Title>
      <FormContainer>
        {watchAvatar?.length ? (
          <ImageContainer>
            <img src={URL.createObjectURL(watchAvatar[0])} alt="" />
            <CloseIcon id="close" onClick={() => setValue('avatar', null)} />
          </ImageContainer>
        ) : (
          <UploadAvatarContainer
            onClick={() => avatarInputRef?.current?.click()}
          >
            <CloudUpload />
            <span>{t('upload-photo')}</span>
          </UploadAvatarContainer>
        )}

        <Form onSubmit={handleSubmit(onSubmit)}>
          <HiddenInput
            name="avatar"
            type="file"
            accept="image/*"
            ref={(e) => {
              register(e);
              avatarInputRef.current = e;
            }}
          />
          <RadioButtonGroup
            name="gender"
            options={[
              { value: 'mr', label: t('mr') },
              { value: 'ms', label: t('ms') },
              { value: 'mx', label: t('mx') },
            ]}
            register={register}
          />
          <NameInputContainer>
            <Input
              name="firstName"
              label={`${t('first-name')}*`}
              register={register}
              errors={errors}
            />
            <Input
              name="lastName"
              label={`${t('last-name')}*`}
              register={register}
              errors={errors}
            />
          </NameInputContainer>
          <Input
            name="email"
            label={`${t('email')}*`}
            register={register}
            errors={errors}
          />
          <Input
            name="job"
            label={`${t('job')}*`}
            register={register}
            errors={errors}
          />
          <Input
            inputType="select"
            name="language"
            label={`${t('language')}*`}
            options={languages}
            control={control}
            setSelectValue={setValue}
            selectDefaultValue={languages[0]}
            errors={errors}
          />
          <Input
            name="password"
            type="password"
            label={`${t('password')}*`}
            register={register}
            placeholder="********"
            errors={errors}
            isDisabled={!changePasswordEnabled}
            isPasswordInput
          />
          {changePasswordEnabled && (
            <Input
              name="passwordConfirmation"
              type="password"
              label={`${t('password-confirm')}*`}
              register={register}
              errors={errors}
              isPasswordInput
            />
          )}
          <ToggleChangePasswordContainer
            onClick={handleChangePassword}
            $enabled={changePasswordEnabled}
          >
            {changePasswordEnabled
              ? t('cancel-change-password')
              : t('change-password')}
          </ToggleChangePasswordContainer>
          <HiddenSubmit ref={hiddenSubmitRef} />
        </Form>
      </FormContainer>
    </Container>
  );
};

export default Account;
