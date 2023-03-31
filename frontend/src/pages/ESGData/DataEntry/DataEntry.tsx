import React, {
  useCallback,
  useEffect,
  useMemo,
  useReducer,
  useRef,
  useState,
} from 'react';

import { Index } from 'flexsearch';
import { useTranslation } from 'react-i18next';
import ReactMarkdown from 'react-markdown';
import { RouteComponentProps, useLocation, useParams } from 'react-router-dom';

import { LightBulb } from '../../../assets/icons';
import Button from '../../../components/Button/Button';
import Input from '../../../components/Input/Input';
import Question, {
  InteractionType as QuestionInteractionType,
} from '../../../components/Question/Question';
import RadialProgressBar from '../../../components/RadialProgressBar/RadialProgressBar';
import useQuestionnaire from '../../../hooks/useQuestionnaire';
import { data as dataMock } from '../../../mock/data';
import { questionnaire as questionnaireMock } from '../../../mock/questions';
import { useNavBar } from '../../../providers/navbar';

import AuditTrailModal from './AuditTrailModal/AuditTrailModal';
import ReviewSection from './ReviewSection/ReviewSection';
import {
  Container,
  Content,
  Footer,
  Info,
  ProgressBar,
  ProgressBarContainer,
  QuestionsContainer,
  QuestionsSubgrid,
  SaveButton,
  Section,
  SectionContainer,
  SectionInfoContainer,
  SectionInfoTitle,
  Tip,
  TipContainer,
  Title,
  TitleSeparator,
} from './sDataEntry';

interface RouteParams {
  dataId: string;
}

interface Dataset {
  id: string;
  name: string;
}

interface Question {
  id: string;
  title: string;
  indicator: string;
  year: string;
  tip?: string;
  previousData?: {
    year: string;
    value: string;
  }[];
  isYesNoQuestion?: boolean;
}

interface QuestionnaireSection {
  name: string;
  questions: Question[];
}

interface Tip {
  id: string;
  content: string;
}

const index = new Index();

interface SectionReducerState {
  previous: number;
  current: number;
  appearFrom?: 'left' | 'right';
}

interface SectionReducerAction {
  type?: 'RESET_ANIMATION';
  value?: number;
}

const sectionReducer = (
  state: SectionReducerState,
  action: SectionReducerAction
): SectionReducerState => {
  const { value, type } = action;

  if (type === 'RESET_ANIMATION') {
    return {
      ...state,
      appearFrom: undefined,
    };
  }

  if (value === undefined) return state;

  let appearFrom: 'left' | 'right' | undefined;
  if (value > state.current) appearFrom = 'right';
  if (value < state.current) appearFrom = 'left';

  return {
    previous: state.current,
    current: value,
    appearFrom,
  };
};

const DataEntry: React.FC<RouteComponentProps> = () => {
  const questionParam = new URLSearchParams(useLocation().search).get('id');

  const { dataId } = useParams<RouteParams>();
  const { t } = useTranslation('data-entry');
  const { width: navBarWidth } = useNavBar();
  const [dataset, setDataset] = useState<Dataset>();
  const [questionnaire, setQuestionnaire] = useState<QuestionnaireSection[]>(
    []
  );

  const [search, setSearch] = useState<string>('');
  const [results, setResults] = useState<string[]>([]);

  const [sectionCounter, sectionCounterDispatch] = useReducer(sectionReducer, {
    previous: 0,
    current: 0,
  });

  const [questionComponents, setQuestionComponents] = useState<JSX.Element[]>();
  const [tipContainerOffset, setTipContainerOffset] = useState<number>();
  const [displayedTip, setDisplayedTip] = useState<Tip | null>(null);
  const [auditTrailId, setAuditTrailId] = useState<string>('');
  const [showAuditTrailModal, setShowAuditTrailModal] = useState(false);

  const contentRef = useRef<HTMLDivElement>(null);
  const tipContainerRef = useRef<HTMLDivElement>(null);

  // set the dataset according to the dataId
  useEffect(() => {
    setDataset(dataMock.find((item) => item.id === dataId));
  }, [dataId]);

  // fetch the questionnaire relative to the dataset
  useEffect(() => {
    setQuestionnaire(questionnaireMock);
  }, []);

  const {
    sections,
    getQuestion,
    setResponse,
    globalProgress,
    sectionProgress,
  } = useQuestionnaire({
    questionnaire,
  });

  const jumpTo: { section: number; question: string } | null = useMemo(() => {
    if (questionParam) {
      console.log(questionParam);
    }
    return null;
  }, [questionParam]);

  // updates the section counter
  const handleSectionChange = useCallback((idx: number) => {
    sectionCounterDispatch({ value: idx });
    setDisplayedTip(null);
  }, []);

  const handleNextButtonClick = useCallback(() => {
    handleSectionChange(sectionCounter.current + 1);
    const refBounds = contentRef.current?.getBoundingClientRect();
    if (refBounds && refBounds.bottom < window.innerHeight)
      contentRef.current?.scrollIntoView({ behavior: 'auto' });
  }, [sectionCounter, handleSectionChange]);

  // sets the tip and opens the Audit Trail modal
  const handleQuestionInteraction = useCallback(
    (id: string, type: QuestionInteractionType) => {
      if (type === 'tip') {
        setDisplayedTip((state) => {
          if (state && state.id === id) return null;
          const question = sections[sectionCounter.current].questions[id];
          if (!question?.tip) return null;
          return {
            id: question.id,
            content: question.tip,
          };
        });
      } else if (type === 'trail') {
        setAuditTrailId(id);
        setShowAuditTrailModal(true);
      }
    },
    [sections, sectionCounter]
  );

  // sets the question components when the questions change
  useEffect(() => {
    const resultContains = (value: string) => {
      if (search.length === 0) return true;
      if (results.length === 0) return null;
      return results.includes(value);
    };

    const result = sections.map((section, idx) => (
      <React.Fragment key="questions">
        {Object.keys(section.questions).map((id) => (
          <Question
            key={id}
            sectionIdx={idx}
            questionId={id}
            onInteraction={handleQuestionInteraction}
            getQuestion={getQuestion}
            setResponse={setResponse}
            className="question"
            highlight={search}
            inSearch={resultContains(id)}
          />
        ))}
      </React.Fragment>
    ));
    setQuestionComponents(result);
  }, [
    handleQuestionInteraction,
    sections,
    getQuestion,
    setResponse,
    search,
    results,
  ]);

  const questionsSection = useMemo(() => {
    return questionComponents && questionComponents[sectionCounter.current];
  }, [questionComponents, sectionCounter]);

  // reset the appearFrom animation on a timeout
  useEffect(() => {
    if (sectionCounter.appearFrom !== undefined) {
      setTimeout(
        () => sectionCounterDispatch({ type: 'RESET_ANIMATION' }),
        300
      );
    }
  }, [sectionCounter.appearFrom]);

  // populate the search index
  useEffect(() => {
    questionnaire.forEach((section) =>
      section.questions.forEach((question) =>
        index.addAsync(question.id, question.title)
      )
    );
  }, [questionnaire]);

  useEffect(() => {
    setResults(index.search(search) as string[]);
  }, [search]);

  const handleScroll = useCallback(() => {
    if (tipContainerRef.current) {
      const { top } = tipContainerRef.current.getBoundingClientRect();
      setTipContainerOffset(top < 0 ? 0 : top);
    }
  }, []);

  useEffect(() => {
    window.addEventListener('scroll', handleScroll);
    return () => window.removeEventListener('scroll', handleScroll);
  }, [handleScroll]);

  return (
    <Container>
      <Title>
        <span>
          {t(
            sectionCounter.current === sections.length
              ? 'input.review-title'
              : 'input.title',
            { dataset: dataset?.name || '' }
          )}
        </span>
        <ProgressBarContainer>
          <span>{`${globalProgress}% ${t('input.completed')}`}</span>
          <ProgressBar width={`${globalProgress}%`}>
            <div />
          </ProgressBar>
        </ProgressBarContainer>
        <TitleSeparator />
        <SaveButton>{t('input.save-button')}</SaveButton>
      </Title>
      <Info>
        <p>{t('input.desc')}</p>
      </Info>

      <Content ref={contentRef}>
        <SectionContainer>
          {sections.map((section, idx) => (
            <Section
              key={section.name}
              $isActive={
                section.name === sections[sectionCounter.current]?.name
              }
              onClick={() => handleSectionChange(idx)}
            >
              {section.name}
            </Section>
          ))}
          <Section
            $isActive={sectionCounter.current === sections.length}
            onClick={() => handleSectionChange(sections.length)}
          >
            {t('review.section')}
          </Section>
        </SectionContainer>

        {sectionCounter.current === sections.length ? (
          <ReviewSection sections={sections} />
        ) : (
          <QuestionsSubgrid>
            <QuestionsContainer appearFrom={sectionCounter.appearFrom}>
              <SectionInfoContainer>
                <SectionInfoTitle>
                  {sections[sectionCounter?.current]?.name}
                </SectionInfoTitle>
                <RadialProgressBar
                  value={Math.floor(sectionProgress[sectionCounter.current])}
                />
                <Input
                  inputType="search"
                  placeholder={t('input.search')}
                  value={search}
                  setValue={setSearch}
                  isClearable
                />
              </SectionInfoContainer>
              {questionsSection}
            </QuestionsContainer>

            <TipContainer ref={tipContainerRef}>
              <Tip topOffset={tipContainerOffset}>
                <p>{t('input.tips.tips')}</p>
                {displayedTip ? (
                  <ReactMarkdown>{displayedTip.content}</ReactMarkdown>
                ) : (
                  <p>
                    {`${t('input.tips.info-0')} `}
                    <LightBulb />
                    {` ${t('input.tips.info-1')}`}
                  </p>
                )}
              </Tip>
            </TipContainer>
          </QuestionsSubgrid>
        )}
      </Content>

      {sectionCounter.current !== sections.length && (
        <Footer marginLeft={navBarWidth}>
          <Button onClick={handleNextButtonClick}>
            {t('input.next-button')}
          </Button>
        </Footer>
      )}

      <AuditTrailModal
        id={auditTrailId}
        showModal={showAuditTrailModal}
        setShowModal={setShowAuditTrailModal}
      />
    </Container>
  );
};

export default DataEntry;
