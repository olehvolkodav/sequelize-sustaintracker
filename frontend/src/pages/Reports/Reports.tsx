import React, { useCallback, useEffect, useMemo, useState } from 'react';

import { useTranslation } from 'react-i18next';
import { RouteComponentProps, useHistory, useLocation } from 'react-router-dom';

import { Clone, Download, Share, View } from '../../assets/icons/table';
import { ReactComponent as AvatarPlaceholder } from '../../assets/placeholder.svg';
import Button from '../../components/Button/Button';
import Table from '../../components/Table/Table';
import { ColumnDefinitionType } from '../../components/Table/types';
import Tooltip from '../../components/Tooltip/Tooltip';
import { users as usersMock } from '../../mock/users';
import { useReport } from '../../providers/report';
import theme from '../../styles/theme';
import { formatDate } from '../../utils/string';

import {
  ActionButton,
  ActionsContainer,
  AvatarContainer,
  Container,
  Title,
  UserInfoDropdown,
  VerificationStatus,
} from './sReports';

interface User {
  id: string;
  firstName: string;
  lastName: string;
  email: string;
  companyName: string;
  avatar?: string;
}

interface Report {
  id: string;
  name: string;
  type: string;
  model: string;
  year: string;
  approvalDate?: string;
  authorId?: string;
  verificationStatus?: string;
  user?: User;
  actions: string; // no data, only used to render the table column
}

const Reports: React.FC<RouteComponentProps> = () => {
  const history = useHistory();
  const location = useLocation();
  const { t } = useTranslation(['reports', 'common']);
  const { reports, fetchReports } = useReport();
  const [reportEntries, setReportEntries] = useState<Report[]>([]);
  const [loadingReports, setLoadingReports] = useState(true);

  useEffect(() => {
    if (!reports?.length) fetchReports();
  }, [reports?.length, fetchReports]);

  useEffect(() => {
    if (reports) {
      setReportEntries(
        reports.map((report) => {
          let user;
          if (report.authorId) {
            user = usersMock.find(
              (userMock) => userMock.id === report.authorId
            );
          }

          return {
            ...report,
            approvalDate:
              report.approvalDate &&
              formatDate(t, new Date(report.approvalDate)),
            actions: '',
            user,
          };
        })
      );
    }
  }, [t, reports]);

  useEffect(() => {
    if (reportEntries.length) {
      setLoadingReports(false);
    }
  }, [reportEntries.length]);

  const handleAction = useCallback((action: string) => {
    console.log('action', action);
  }, []);

  const columns: ColumnDefinitionType<Report, keyof Report>[] = useMemo(
    () => [
      {
        key: 'name',
        header: t('reports.table.columns.name'),
        width: '20%',
        isFirstColumn: true,
        isSortable: true,
      },
      {
        key: 'type',
        header: t('reports.table.columns.type'),
        format: (value) => t(`reports.table.types.${value}`) as string,
        width: '10%',
        isSortable: true,
      },
      {
        key: 'model',
        header: t('reports.table.columns.model'),
        width: '12.5%',
        isSortable: true,
      },
      {
        key: 'year',
        header: t('reports.table.columns.year'),
        width: '10%',
        isSortable: true,
      },
      {
        key: 'approvalDate',
        header: t('reports.table.columns.approval-date'),
        width: '12.5%',
        isSortable: true,
      },
      {
        key: 'user',
        header: t('reports.table.columns.author'),
        width: '10%',
        customRender: (id, value) => {
          const user = value as User;
          if (user)
            return (
              <AvatarContainer>
                {user?.avatar ? (
                  <img src={user.avatar} alt="" />
                ) : (
                  <AvatarPlaceholder />
                )}
                {user && (
                  <UserInfoDropdown>
                    <p>
                      {user.firstName} {user.lastName}
                    </p>
                    <p>{user.email}</p>
                    <p>{user.companyName}</p>
                  </UserInfoDropdown>
                )}
              </AvatarContainer>
            );
          return <></>;
        },
      },
      {
        key: 'verificationStatus',
        header: t('reports.table.columns.verified'),
        width: '15%',
        customRender: (id, value) => (
          <>
            {value !== undefined && (
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
            )}
          </>
        ),
      },
      {
        key: 'actions',
        header: t('reports.table.columns.actions'),
        width: '12.5%',
        customRender: () => (
          <ActionsContainer>
            <Tooltip text={t('reports.table.actions.view')}>
              <ActionButton type="button" onClick={() => handleAction('view')}>
                <View />
              </ActionButton>
            </Tooltip>
            <Tooltip text={t('reports.table.actions.share')}>
              <ActionButton type="button" onClick={() => handleAction('share')}>
                <Share />
              </ActionButton>
            </Tooltip>
            <Tooltip text={t('reports.table.actions.download')}>
              <ActionButton
                type="button"
                onClick={() => handleAction('download')}
              >
                <Download />
              </ActionButton>
            </Tooltip>
            <Tooltip text={t('reports.table.actions.clone')}>
              <ActionButton type="button" onClick={() => handleAction('clone')}>
                <Clone />
              </ActionButton>
            </Tooltip>
          </ActionsContainer>
        ),
      },
    ],
    [t, handleAction]
  );

  return (
    <Container>
      <Title>{t('reports.title')}</Title>
      <Button onClick={() => history.push(`${location.pathname}/new`)}>
        {t('reports.new-report-button')}
      </Button>
      <Table data={reportEntries} columns={columns} loading={loadingReports} />
    </Container>
  );
};

export default Reports;
