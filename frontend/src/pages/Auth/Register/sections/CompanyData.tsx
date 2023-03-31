import React, { useCallback, useMemo } from 'react';

import { yupResolver } from '@hookform/resolvers/yup';
import { useFieldArray, useForm } from 'react-hook-form';
import { useTranslation } from 'react-i18next';
import * as yup from 'yup';

import { Plus } from '../../../../assets/icons';
import Button from '../../../../components/Button/Button';
import Input from '../../../../components/Input/Input';
import theme from '../../../../styles/theme';
import { countries, countryDialInCodes } from '../../../../utils/countries';

import {
  AddInputContainer,
  AddressInputContainer,
  FieldContainer,
  Form,
  PhoneInputContainer,
  SectionIndicator,
  SectionIndicatorCircle,
  SectionIndicatorNameContainer,
  SectionIndicatorRectangle,
  SectionIndicatorSVGContainer,
  Title,
} from './sSection';

interface Address {
  address: string;
  city: string;
  postalCode: string;
  region: string;
}

interface PhoneNumber {
  countryCode: string;
  number: string;
}

type FormValues = {
  country: string;
  businessRegistration?: string;
  entityName: string;
  tradingAs?: string;
  addresses: Address[];
  website?: string;
  phoneNumbers: PhoneNumber[];
};

interface CompanyDataProps {
  onNext: (nextSection: string) => void;
}

const CompanyData: React.FC<CompanyDataProps> = ({ onNext }) => {
  const { t } = useTranslation(['register', 'auth', 'common']);

  const countryOptions = useMemo(
    () =>
      countries.map((code) => ({
        value: code,
        label: t(`common:countries.${code}`),
      })),
    [t]
  );

  const countryDialInOptions = useMemo(
    () =>
      countries
        .map((code) => ({
          value: String(countryDialInCodes[code]),
          label: String(countryDialInCodes[code]),
        }))
        .filter((option) => option.label !== 'undefined'),
    []
  );

  const defaultCountryDialInOption = useMemo(
    () => countryDialInOptions[0],
    [countryDialInOptions]
  );

  const schema = useMemo(
    () =>
      yup.object().shape({
        country: yup.string().required(t('entity.country-required')),
        businessRegistration: yup.string(),
        entityName: yup.string().required(t('entity.entity-name-required')),
        tradingAs: yup.string(),
        addresses: yup
          .array()
          .min(1, t('entity.address-min'))
          .required(t('entity.address-min'))
          .of(
            yup.object().shape({
              address: yup.string().required(t('entity.address-required')),
              city: yup.string().required(t('entity.city-required')),
              postalCode: yup
                .string()
                .required(t('entity.postal-code-required')),
              region: yup.string().required(t('entity.region-required')),
            })
          ),
        website: yup.string(),
        phoneNumbers: yup.array().of(
          yup.object().shape({
            countryCode: yup.string(),
            number: yup.string(),
          })
        ),
      }),
    [t]
  );

  const { control, register, setValue, watch, errors, handleSubmit } =
    useForm<FormValues>({
      resolver: yupResolver(schema),
      mode: 'onSubmit',
      defaultValues: {
        addresses: [
          {
            address: '',
            city: '',
            postalCode: '',
            region: '',
          },
        ],
        phoneNumbers: [
          {
            countryCode: defaultCountryDialInOption?.value,
            number: '',
          },
        ],
      },
    });

  const watchAddresses = watch('addresses');
  const watchPhoneNumbers = watch('phoneNumbers');

  const {
    fields: addressFields,
    append: appendAddress,
    remove: removeAddress,
  } = useFieldArray<Address>({
    control,
    name: 'addresses',
  });

  const {
    fields: phoneNumberFields,
    append: appendPhoneNumber,
    remove: removePhoneNumber,
  } = useFieldArray<PhoneNumber>({
    control,
    name: 'phoneNumbers',
  });

  const onSubmit = useCallback(
    async (data: FormValues) => {
      console.log('submit', data);
      onNext('welcome');
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
            color={theme.colors.primary}
            x="50%"
            y="23px"
            width="calc(50% - 57px)"
            height="6px"
          />
          <SectionIndicatorCircle
            color={theme.colors.primary}
            cx="calc(100% - 50px)"
            cy="26px"
          />
        </SectionIndicatorSVGContainer>
      </SectionIndicator>

      <Title>{t('entity.entity-info')}</Title>

      <Input
        inputType="select"
        name="country"
        label={`${t('entity.country')}*`}
        options={countryOptions}
        control={control}
        setSelectValue={setValue}
        errors={errors}
      />
      <Input
        name="businessRegistration"
        label={t('entity.registration-number')}
        register={register}
        errors={errors}
      />
      <Input
        name="entityName"
        label={`${t('entity.entity-name')}*`}
        register={register}
        errors={errors}
      />
      <Input
        name="tradingAs"
        label={t('entity.trading-as')}
        register={register}
        errors={errors}
      />

      {addressFields.map((field, index) => (
        <FieldContainer key={field.id} $showBorder={watchAddresses.length > 1}>
          <Input
            name={`addresses[${index}].address`}
            label={`${t('entity.address')}*`}
            register={register}
            errors={errors}
            fieldArrayInfo={{
              fieldArrayName: 'addresses',
              index,
              name: 'address',
            }}
          />

          <AddressInputContainer>
            <Input
              name={`addresses[${index}].city`}
              label={`${t('entity.city')}*`}
              register={register}
              errors={errors}
              fieldArrayInfo={{
                fieldArrayName: 'addresses',
                index,
                name: 'city',
              }}
            />
            <Input
              name={`addresses[${index}].postalCode`}
              label={`${t('entity.postal-code')}*`}
              register={register}
              errors={errors}
              fieldArrayInfo={{
                fieldArrayName: 'addresses',
                index,
                name: 'postalCode',
              }}
            />
            <Input
              name={`addresses[${index}].region`}
              label={`${t('entity.region')}*`}
              register={register}
              errors={errors}
              fieldArrayInfo={{
                fieldArrayName: 'addresses',
                index,
                name: 'region',
              }}
            />
          </AddressInputContainer>
          <button type="button" onClick={() => removeAddress(index)}>
            {t('entity.remove-address')}
          </button>
        </FieldContainer>
      ))}

      <AddInputContainer
        onClick={() =>
          appendAddress({
            address: '',
            city: '',
            postalCode: '',
            region: '',
          })
        }
      >
        <Plus />
        {t('entity.add-address')}
      </AddInputContainer>

      <Input
        name="website"
        label={t('entity.website')}
        register={register}
        errors={errors}
      />

      {phoneNumberFields.map((field, index) => (
        <FieldContainer
          key={field.id}
          $showBorder={watchPhoneNumbers.length > 1}
        >
          <PhoneInputContainer>
            <Input
              inputType="select"
              name={`phoneNumbers[${index}].countryCode`}
              label={t('entity.country-code')}
              options={countryDialInOptions}
              selectDefaultValue={defaultCountryDialInOption}
              control={control}
              setSelectValue={setValue}
              errors={errors}
              fieldArrayInfo={{
                fieldArrayName: 'phoneNumbers',
                index,
                name: 'countryCode',
              }}
            />
            <Input
              name={`phoneNumbers[${index}].number`}
              label={t('entity.phone-number')}
              register={register}
              errors={errors}
              fieldArrayInfo={{
                fieldArrayName: 'phoneNumbers',
                index,
                name: 'number',
              }}
            />
          </PhoneInputContainer>
          <button type="button" onClick={() => removePhoneNumber(index)}>
            {t('entity.remove-phone')}
          </button>
        </FieldContainer>
      ))}

      <AddInputContainer
        onClick={() =>
          appendPhoneNumber({
            countryCode: defaultCountryDialInOption?.value,
            number: '',
          })
        }
      >
        <Plus />
        {t('entity.add-phone')}
      </AddInputContainer>

      <Button type="submit">{t('next-button')}</Button>
    </Form>
  );
};

export default CompanyData;
