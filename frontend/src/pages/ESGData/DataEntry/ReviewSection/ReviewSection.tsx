import React, { useCallback, useEffect, useMemo, useState } from 'react';

import { useTranslation } from 'react-i18next';
import { useHistory } from 'react-router-dom';

import Button from '../../../../components/Button/Button';
import Table from '../../../../components/Table/Table';
import { ColumnDefinitionType } from '../../../../components/Table/types';
import { QuestionnaireSection } from '../../../../hooks/useQuestionnaire';
import theme from '../../../../styles/theme';

import {
  ActionContainer,
  Container,
  Section,
  SectionHeader,
  VerificationStatus,
  VerificationStatusContainer,
} from './sReviewSection';

interface Value {
  year: string;
  value?: string;
}

interface TableValues {
  id: string;
  indicator: string;
  unit?: string;
  currentValue?: Value;
  status: string;
  actions: {
    isEditable: boolean;
    isApprovable: boolean;
  };
}

interface ReviewSectionProps {
  sections: QuestionnaireSection[];
}

const ReviewSection: React.FC<ReviewSectionProps> = ({ sections }) => {
  const { t } = useTranslation('data-entry');
  const history = useHistory();
  const [data, setData] = useState<TableValues[][]>([]);

  useEffect(() => {
    setData(
      sections.map((section) => {
        const questions = Object.values(section.questions);
        return questions.map((question) => ({
          id: question.id,
          indicator: question.indicator,
          unit: question?.unit,
          currentValue: {
            year: question.year,
            value: question.response?.answer,
          },
          status: 'pending',
          actions: {
            isEditable: true,
            isApprovable: true,
          },
        }));
      })
    );
  }, [sections]);

  const handleAction = useCallback(
    (action: 'edit' | 'approve', id: string) => {
      if (action === 'edit') {
        history.push({
          search: `?id=${id}`,
        });
      } else if (action === 'approve') {
        console.log(action, id);
      }
    },
    [history]
  );

  const columns: ColumnDefinitionType<TableValues, keyof TableValues>[] =
    useMemo(
      () => [
        {
          key: 'indicator',
          header: t('review.table.indicator'),
          width: '20%',
          isFirstColumn: true,
        },
        {
          key: 'unit',
          header: t('review.table.unit'),
          width: '10%',
          format: (value) => (!value ? '-' : value),
        },
        {
          key: 'currentValue',
          header: data[0]?.[0]?.currentValue?.year || '',
          width: '10%',
          customRender: (id, value) => <span>{(value as Value).value}</span>,
          highlightColumn: true,
          align: 'right',
        },
        {
          key: 'status',
          header: t('review.table.status'),
          width: '13%',
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
        {
          key: 'actions',
          header: t('review.table.actions'),
          width: '10%',
          customRender: (id, value) => (
            <ActionContainer>
              <button
                type="button"
                onClick={() => handleAction('approve', id)}
                disabled={!(value as { isApprovable: boolean }).isApprovable}
              >
                {t('review.table.approve')}
              </button>
              <button
                type="button"
                onClick={() => handleAction('edit', id)}
                disabled={!(value as { isEditable: boolean }).isEditable}
              >
                {t('review.table.edit')}
              </button>
            </ActionContainer>
          ),
        },
      ],
      [t, handleAction, data]
    );

  return (
    <Container>
      {sections.map((section, idx) => (
        <Section key={section.name}>
          <SectionHeader>
            {section.name}
            <Button>{t('review.approve')}</Button>
          </SectionHeader>
          <Table data={data[idx] || []} columns={columns} />
        </Section>
      ))}
    </Container>
  );
};

export default ReviewSection;
