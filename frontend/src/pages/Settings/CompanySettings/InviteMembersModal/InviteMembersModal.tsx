import React, { useCallback, useMemo } from 'react';

import { yupResolver } from '@hookform/resolvers/yup';
import { useFieldArray, useForm } from 'react-hook-form';
import { useTranslation } from 'react-i18next';
import * as yup from 'yup';

import { Plus } from '../../../../assets/icons';
import Button from '../../../../components/Button/Button';
import Input from '../../../../components/Input/Input';
import Modal, { ModalProps } from '../../../../components/Modal/Modal';

import {
  AddMembersContainer,
  Form,
  InputContainer,
  UserFieldContainer,
} from './sInviteMembersModal';

interface User {
  email: string;
  role: string;
}

interface FormValues {
  users: User[];
}

const InviteUserModal: React.FC<ModalProps> = ({ showModal, setShowModal }) => {
  const { t } = useTranslation(['settings', 'common']);

  const roleOptions = useMemo(
    () => [
      {
        value: 'admin',
        label: t('common:roles.admin'),
      },
      {
        value: 'user',
        label: t('common:roles.user'),
      },
      {
        value: 'observer',
        label: t('common:roles.observer'),
      },
      {
        value: 'approver',
        label: t('common:roles.approver'),
      },
    ],
    [t]
  );

  const schema = useMemo(
    () =>
      yup.object().shape({
        users: yup.array().of(
          yup.object().shape({
            email: yup
              .string()
              .email(t('company-settings.team.modal.email-valid'))
              .required(t('company-settings.team.modal.email-required')),
            role: yup
              .string()
              .required(t('company-settings.team.modal.role-required')),
          })
        ),
      }),
    [t]
  );

  const { control, register, setValue, errors, handleSubmit } =
    useForm<FormValues>({
      resolver: yupResolver(schema),
      mode: 'onSubmit',
      defaultValues: {
        users: [
          {
            email: '',
            role: roleOptions[0].value,
          },
        ],
      },
    });

  const {
    fields: userFields,
    append: appendUser,
    remove: removeUser,
  } = useFieldArray<User>({
    control,
    name: 'users',
  });

  const onSubmit = useCallback((data: FormValues) => {
    console.log('submit', data);
  }, []);

  return (
    <Modal
      showModal={showModal}
      setShowModal={setShowModal}
      title={t('company-settings.team.modal.title')}
      subtitle={t('company-settings.team.modal.subtitle')}
      dimensions={{
        width: '48em',
        height: '45em',
        maxHeight: '90vh',
      }}
    >
      <Form onSubmit={handleSubmit(onSubmit)}>
        <InputContainer>
          {userFields.map((field, index) => (
            <UserFieldContainer key={field.id}>
              <Input
                name={`users[${index}].email`}
                label={t('company-settings.team.modal.email')}
                register={register}
                errors={errors}
                fieldArrayInfo={{
                  fieldArrayName: 'users',
                  index,
                  name: 'email',
                }}
              />

              <Input
                inputType="select"
                name={`users[${index}].role`}
                label={t('company-settings.team.modal.role')}
                options={roleOptions}
                selectDefaultValue={roleOptions[0]}
                control={control}
                setSelectValue={setValue}
                errors={errors}
                fieldArrayInfo={{
                  fieldArrayName: 'users',
                  index,
                  name: 'role',
                  defaultValue: roleOptions[0].value,
                }}
              />
            </UserFieldContainer>
          ))}
        </InputContainer>

        <AddMembersContainer
          onClick={() =>
            appendUser({
              email: '',
              role: roleOptions[0].value,
            })
          }
        >
          <Plus />
          {t('company-settings.team.add-member')}
        </AddMembersContainer>

        <Button type="submit">{t('company-settings.team.modal.button')}</Button>
      </Form>
    </Modal>
  );
};

export default InviteUserModal;
