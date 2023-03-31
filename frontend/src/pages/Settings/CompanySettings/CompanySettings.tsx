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

import { Plus } from '../../../assets/icons';
import Input from '../../../components/Input/Input';
import Table from '../../../components/Table/Table';
import { ColumnDefinitionType } from '../../../components/Table/types';
import {
  company as companyMock,
  dateFormats,
  decimalFormats,
  teamMembers as membersMock,
  symbols as symbolsMock,
} from '../../../mock/settings';
import { currencyService, languageService } from '../../../services';
import theme from '../../../styles/theme';

import InviteUserModal from './InviteMembersModal/InviteMembersModal';
import {
  AccessActionCell,
  AddMembersContainer,
  Container,
  Form,
  HiddenSubmit,
  SaveButton,
  SectionItem,
  SectionSelector,
  Separator,
  TableContainer,
  Title,
} from './sCompanySettings';

type Section = 'company' | 'team' | 'billing';
const sections: { item: Section; label: string }[] = [
  { item: 'company', label: 'company-settings' },
  { item: 'team', label: 'team-members' },
  { item: 'billing', label: 'billing' },
];

type FormValues = {
  language: string;
  currency: string;
  currencySymbol: string;
  decimalFormat: string;
  dateFormat: string;
};

interface Company {
  language: string;
  currency: string;
  currencySymbol: string;
}

interface Option {
  value: string;
  label: string;
}

interface TeamMember {
  id: string;
  name: string;
  email: string;
  role: string;
  hasAccess?: boolean;
}

const schema = yup.object().shape({
  language: yup.string(),
  currency: yup.string(),
  currencySymbol: yup.string(),
  decimalFormat: yup.string(),
  dateFormat: yup.string(),
});

const CompanySettings: React.FC<RouteComponentProps> = () => {
  const { t } = useTranslation(['settings', 'common']);

  const hiddenSubmitRef = useRef<HTMLButtonElement>(null);
  const [selectedSection, setSelectedSection] = useState<Section>('company');
  const [company, setCompany] = useState<Company>();
  const [languages, setLanguages] = useState<Option[]>([]);
  const [currencies, setCurrencies] = useState<Option[]>([]);
  const [teamMembers, setTeamMembers] = useState<TeamMember[]>([]);
  const [showInviteMembersModal, setShowEnviteMembersModal] = useState(false);

  useEffect(() => {
    setCompany(companyMock);
  }, []);

  useEffect(() => {
    languageService.ListLanguages().then((response) => {
      if (response?.length) {
        setLanguages(
          response?.map((lang) => ({
            value: lang.identifier,
            label: lang.description,
          }))
        );
      }
    });
  }, []);

  useEffect(() => {
    currencyService.ListCurrencies().then((response) => {
      if (response?.length) {
        setCurrencies(
          response?.map((curr) => ({
            value: curr.identifier,
            label: `${curr.description} (${curr.symbol})`,
          }))
        );
      }
    });
  }, []);

  useEffect(() => setTeamMembers(membersMock), [t]);

  const { handleSubmit, control, setValue, errors, reset } =
    useForm<FormValues>({
      resolver: yupResolver(schema),
      mode: 'onSubmit',
    });

  useEffect(() => {
    if (company) {
      reset({
        language: company.language,
        currency: company.currency,
        currencySymbol: company.currencySymbol,
      });
    }
  }, [company, reset]);

  const onSubmit = useCallback(async (data: FormValues) => {
    console.log('submit', data);
  }, []);

  const handleSaveChanges = useCallback(() => {
    console.log('save changes click');
    if (hiddenSubmitRef) {
      hiddenSubmitRef.current?.click();
    }
  }, []);

  const columns: ColumnDefinitionType<TeamMember, keyof TeamMember>[] = useMemo(
    () => [
      {
        key: 'name',
        header: t('company-settings.team.table.name'),
        width: '26%',
        isFirstColumn: true,
      },
      {
        key: 'email',
        header: t('company-settings.team.table.email'),
        width: '34%',
      },
      {
        key: 'role',
        header: t('company-settings.team.table.role'),
        width: '20%',
        format: (value) => t(`common:roles.${value}`) as string,
      },
      {
        key: 'hasAccess',
        header: t('company-settings.team.table.actions'),
        customRender: (id, value) => (
          <>
            {value !== undefined && (
              <AccessActionCell
                color={
                  value === false
                    ? theme.colors.primary_1
                    : theme.colors.red_dark
                }
              >
                {value
                  ? `${t('company-settings.team.table.remove-access')}`
                  : `${t('company-settings.team.table.grant-access')}`}
              </AccessActionCell>
            )}
          </>
        ),
        width: '20%',
      },
    ],
    [t]
  );

  const renderSection = useCallback(() => {
    switch (selectedSection) {
      case 'company':
        return (
          <>
            {company && languages?.length && currencies?.length ? (
              <Form onSubmit={handleSubmit(onSubmit)}>
                <Input
                  inputType="select"
                  label={t('company-settings.company.language')}
                  placeholder={t(
                    'company-settings.company.language-placeholder'
                  )}
                  options={languages}
                  name="language"
                  control={control}
                  errors={errors}
                  setSelectValue={setValue}
                  selectDefaultValue={languages.find(
                    (option) => option.value === company.language
                  )}
                />
                <Input
                  inputType="select"
                  label={t('company-settings.company.currency')}
                  placeholder={t(
                    'company-settings.company.currency-placeholder'
                  )}
                  options={currencies}
                  name="currency"
                  control={control}
                  errors={errors}
                  setSelectValue={setValue}
                  selectDefaultValue={currencies.find(
                    (option) => option.value === company.currency
                  )}
                />
                <Input
                  inputType="select"
                  label={t('company-settings.company.currency-symbol')}
                  placeholder={t(
                    'company-settings.company.currency-symbol-placeholder'
                  )}
                  options={symbolsMock}
                  name="currencySymbol"
                  control={control}
                  errors={errors}
                  setSelectValue={setValue}
                  selectDefaultValue={symbolsMock.find(
                    (option) => option.value === company.currencySymbol
                  )}
                />
                <Input
                  inputType="select"
                  label={t('company-settings.company.decimal-format')}
                  placeholder={t(
                    'company-settings.company.decimal-format-placeholder'
                  )}
                  options={decimalFormats}
                  name="decimalFormat"
                  control={control}
                  errors={errors}
                  setSelectValue={setValue}
                  selectDefaultValue={decimalFormats[0]}
                />
                <Input
                  inputType="select"
                  label={t('company-settings.company.date-format')}
                  placeholder={t(
                    'company-settings.company.date-format-placeholder'
                  )}
                  options={dateFormats}
                  name="dateFormat"
                  control={control}
                  errors={errors}
                  setSelectValue={setValue}
                  selectDefaultValue={dateFormats[0]}
                />
                <HiddenSubmit type="submit" ref={hiddenSubmitRef} />
              </Form>
            ) : (
              <></>
            )}
          </>
        );

      case 'team':
        return (
          <>
            <TableContainer>
              <Table data={teamMembers} columns={columns} />
              <AddMembersContainer
                onClick={() => setShowEnviteMembersModal(true)}
              >
                <Plus />
                {t('company-settings.team.add-member')}
              </AddMembersContainer>
            </TableContainer>

            <InviteUserModal
              showModal={showInviteMembersModal}
              setShowModal={setShowEnviteMembersModal}
            />
          </>
        );

      case 'billing':
        return <p>billing</p>;
      default:
        return <></>;
    }
  }, [
    columns,
    company,
    control,
    currencies,
    errors,
    handleSubmit,
    languages,
    onSubmit,
    selectedSection,
    setValue,
    showInviteMembersModal,
    t,
    teamMembers,
  ]);

  return (
    <Container>
      <Title>
        <span>{t('company-settings.title')}</span>
        <SaveButton onClick={handleSaveChanges}>
          {t('company-settings.save')}
        </SaveButton>
      </Title>
      <Separator />
      <SectionSelector>
        {sections.map((section) => (
          <SectionItem
            key={section.item}
            $isSelected={section.item === selectedSection}
            onClick={() => setSelectedSection(section.item)}
          >
            {t(`company-settings.${section.label}`)}
          </SectionItem>
        ))}
      </SectionSelector>
      {renderSection()}
    </Container>
  );
};

export default CompanySettings;
