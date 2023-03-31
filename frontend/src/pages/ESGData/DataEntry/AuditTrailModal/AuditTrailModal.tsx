import React, { useEffect, useMemo, useState } from 'react';

import { useTranslation } from 'react-i18next';

import Button from '../../../../components/Button/Button';
import Modal, { ModalProps } from '../../../../components/Modal/Modal';
import Table from '../../../../components/Table/Table';
import { ColumnDefinitionType } from '../../../../components/Table/types';
import { audits as auditsMock } from '../../../../mock/data';
import { formatDateTime } from '../../../../utils/string';

import { Container } from './sAuditTrailModal';

interface AuditEntry {
  id: string;
  date: string;
  user: string;
  dataset: string;
  question: string;
  initialResponse: string | number;
  revisedResponse: string | number;
}

interface AuditTrailModalProps extends ModalProps {
  id: string;
}

const AuditTrailModal: React.FC<AuditTrailModalProps> = ({
  id,
  showModal,
  setShowModal,
}) => {
  const { t } = useTranslation('data-entry');
  const [auditEntries, setAuditEntries] = useState<AuditEntry[]>([]);

  useEffect(() => setAuditEntries(auditsMock), []);

  const columns: ColumnDefinitionType<AuditEntry, keyof AuditEntry>[] = useMemo(
    () => [
      {
        key: 'date',
        header: t('input.trail.table.date'),
        width: '18%',
        isFirstColumn: true,
        format: (value) => formatDateTime(t, new Date(value)),
      },
      {
        key: 'user',
        header: t('input.trail.table.user'),
        width: '12%',
      },
      {
        key: 'dataset',
        header: t('input.trail.table.dataset'),
        width: '14%',
      },
      {
        key: 'question',
        header: t('input.trail.table.question'),
        width: '36%',
      },
      {
        key: 'initialResponse',
        header: t('input.trail.table.initial-response'),
        width: '10%',
      },
      {
        key: 'revisedResponse',
        header: t('input.trail.table.revised-response'),
        width: '10%',
      },
    ],
    [t]
  );

  return (
    <Modal
      showModal={showModal}
      setShowModal={setShowModal}
      title={t('input.trail.title')}
      dimensions={{
        width: '80em',
        height: '40em',
        maxHeight: '90vh',
      }}
    >
      <Container>
        <Table id="audit-table" data={auditEntries} columns={columns} />
        <Button onClick={() => setShowModal(false)}>
          {t('input.trail.button')}
        </Button>
      </Container>
    </Modal>
  );
};

export default AuditTrailModal;
