import React, { useCallback, useEffect, useMemo, useState } from 'react';

import { useTranslation } from 'react-i18next';
import { RouteComponentProps, useHistory, useLocation } from 'react-router-dom';

import { Clone, Edit, View } from '../../../../assets/icons/table';
import Button from '../../../../components/Button/Button';
import Table from '../../../../components/Table/Table';
import { ColumnDefinitionType } from '../../../../components/Table/types';
import Tooltip from '../../../../components/Tooltip/Tooltip';
import { useDataset } from '../../../../providers/dataset';
import theme from '../../../../styles/theme';
import { formatDate, formatDateRange } from '../../../../utils/string';

import {
  ActionButton,
  ActionContainer,
  Container,
  StatusBar,
  Title,
  VerificationStatus,
  VerificationStatusContainer,
} from './sMyData';

interface ESGEntry {
  id: string;
  name: string;
  type: string;
  fiscalYear: number; // not sure, might be string
  dateRange: string;
  approvalDate?: string;
  status: number;
  verificationStatus: string;
  actions: {
    isViewable: boolean;
    isEditable: boolean;
    isDuplicable: boolean;
  };
}

const MyData: React.FC<RouteComponentProps> = () => {
  const history = useHistory();
  const location = useLocation();
  const { t } = useTranslation('data-entry');
  const { datasets, fetchDatasets } = useDataset();
  const [esgEntries, setESGEntries] = useState<ESGEntry[]>([]);
  const [loadingDatasets, setLoadingDatasets] = useState(true);

  useEffect(() => {
    if (!datasets?.length) fetchDatasets();
  }, [datasets?.length, fetchDatasets]);

  useEffect(() => {
    if (datasets) {
      setESGEntries(
        datasets.map((data) => {
          return {
            ...data,
            dateRange: formatDateRange(
              t,
              data.dateRangeStart,
              data.dateRangeEnd
            ),
            startDate: formatDate(t, data.startDate),
            approvalDate: formatDate(t, data.approvalDate),
            actions: {
              isViewable: data.status !== 1,
              isEditable: data.verificationStatus !== 'verified',
              isDuplicable: data.status === 1,
            },
          };
        })
      );
    }
  }, [t, datasets]);

  useEffect(() => {
    if (esgEntries.length) {
      setLoadingDatasets(false);
    }
  }, [esgEntries.length]);

  const handleAction = useCallback(
    (action: 'view' | 'edit' | 'duplicate', id: string) => {
      if (action === 'edit') {
        history.push(`${location.pathname}/${id}`);
      }
    },
    [history, location.pathname]
  );

  const columns: ColumnDefinitionType<ESGEntry, keyof ESGEntry>[] = useMemo(
    () => [
      {
        key: 'name',
        header: t('table.columns.name'),
        width: '12%',
        isFirstColumn: true,
        isSortable: true,
      },
      {
        key: 'type',
        header: t('table.columns.type'),
        format: (value) => t(`table.type.${value}`) as string,
        width: '8%',
        isSortable: true,
      },
      {
        key: 'fiscalYear',
        header: t('table.columns.fiscal-year'),
        width: '8%',
        isSortable: true,
      },
      {
        key: 'dateRange',
        header: t('table.columns.date-range'),
        width: '12%',
        isSortable: true,
      },
      {
        key: 'status',
        header: t('table.columns.status'),
        width: '8%',
        isSortable: true,
        customRender: (id, value) => (
          <StatusBar
            color={value === 1 ? theme.colors.primary : theme.colors.yellow}
            width={`${(value as number) * 100}%`}
          >
            <div />
          </StatusBar>
        ),
      },
      {
        key: 'approvalDate',
        header: t('table.columns.approval-date'),
        width: '10%',
        isSortable: true,
      },
      {
        key: 'actions',
        header: t('table.columns.actions'),
        width: '10%',
        customRender: (id, value) => (
          <ActionContainer>
            <Tooltip
              text={t('table.view')}
              disabled={!(value as { isViewable: boolean }).isViewable}
            >
              <ActionButton
                type="button"
                disabled={!(value as { isViewable: boolean }).isViewable}
                onClick={() => handleAction('view', id)}
              >
                <View />
              </ActionButton>
            </Tooltip>
            <Tooltip
              text={t('table.edit')}
              disabled={!(value as { isEditable: boolean }).isEditable}
            >
              <ActionButton
                type="button"
                disabled={!(value as { isEditable: boolean }).isEditable}
                onClick={() => handleAction('edit', id)}
              >
                <Edit className="stroke" />
              </ActionButton>
            </Tooltip>
            <Tooltip
              text={t('table.duplicate')}
              disabled={!(value as { isDuplicable: boolean }).isDuplicable}
            >
              <ActionButton
                type="button"
                disabled={!(value as { isDuplicable: boolean }).isDuplicable}
                onClick={() => handleAction('duplicate', id)}
              >
                <Clone />
              </ActionButton>
            </Tooltip>
          </ActionContainer>
        ),
      },
      {
        key: 'verificationStatus',
        header: t('table.columns.third-party-verification'),
        width: '14%',
        customRender: (id, value) => (
          <VerificationStatusContainer>
            <VerificationStatus
              bgColor={(function f() {
                if (value === 'verified') return theme.colors.primary;
                if (value === 'pending') return theme.colors.yellow;
                return theme.colors.gray_5;
              })()}
              color={value === 'not-requested' ? theme.colors.gray_2 : '#fff'}
            >
              {t(`common:status.${value}`)}
            </VerificationStatus>
          </VerificationStatusContainer>
        ),
        align: 'center',
      },
    ],
    [t, handleAction]
  );

  return (
    <Container>
      <Title>{t('title')}</Title>
      <Button onClick={() => history.push(`${location.pathname}/new`)}>
        {t('new-button')}
      </Button>
      <Table data={esgEntries} columns={columns} loading={loadingDatasets} />
    </Container>
  );
};

export default MyData;
