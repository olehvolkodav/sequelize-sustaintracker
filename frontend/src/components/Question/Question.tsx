import React, { useCallback, useEffect, useRef, useState } from 'react';

import { useForm } from 'react-hook-form';
import { useTranslation } from 'react-i18next';

import { LightBulb } from '../../assets/icons';
import { GetQuestion, SetResponse } from '../../hooks/useQuestionnaire';
import Checkbox from '../Checkbox/Checkbox';
import Highlighter from '../Highlighter/Highlighter';
import Input from '../Input/Input';
import Loader from '../Loader/Loader';

import {
  Answer,
  CheckboxContainer,
  Comments,
  Container,
  DecliningExplanation,
  DecliningReasons,
  Evidence,
  FileButton,
  FileButtonActionsContainer,
  FileButtonContainer,
  FileButtonTitle,
  FooterContainer,
  FooterPreviousDataItem,
  FooterSeparator,
  HiddenFileInput,
  InteractionButton,
  InternalComments,
  LoaderContainer,
  TitleContainer,
  Unit,
  Year,
} from './sQuestion';

export type InteractionType = 'tip' | 'trail';

interface YesNoInputProps {
  isDisabled: boolean;
  onChange: (value: string) => void;
}

const YesNoInput: React.FC<YesNoInputProps> = ({ isDisabled, onChange }) => {
  const { t } = useTranslation('data-entry');

  const yesNoOptions = [
    { value: 'y', label: t('input.question.yes') },
    { value: 'n', label: t('input.question.no') },
  ];

  const { control, setValue, watch } = useForm<{ yesNoAnswer: string | null }>({
    defaultValues: {
      yesNoAnswer: null,
    },
  });

  const watchValue = watch('yesNoAnswer');

  useEffect(() => onChange(watchValue ?? ''), [onChange, watchValue]);

  // clear the value when the 'Decline to answer' checkbox is ticked
  useEffect(() => {
    if (isDisabled) {
      setValue('yesNoAnswer', null);
    }
  }, [isDisabled, setValue]);

  return (
    <Input
      inputType="select"
      name="yesNoAnswer"
      label={t('input.question.response')}
      placeholder=""
      options={yesNoOptions}
      selectDefaultValue={null}
      control={control}
      setSelectValue={setValue}
      isDisabled={isDisabled}
      isClearable
    />
  );
};

interface DecliningReasonsInputProps {
  onChange: (value: string) => void;
}

const DecliningReasonsInput: React.FC<DecliningReasonsInputProps> = ({
  onChange,
}) => {
  const { t } = useTranslation('data-entry');

  const options = [
    { value: 'not-applicable', label: t('input.question.not-applicable') },
    { value: 'confidential', label: t('input.question.confidential') },
    { value: 'prohibition', label: t('input.question.prohibition') },
    { value: 'unavailable', label: t('input.question.unavailable') },
  ];

  const { control, setValue, watch } = useForm<{ reason: string | null }>({
    defaultValues: {
      reason: null,
    },
  });

  const watchValue = watch('reason');

  useEffect(() => onChange(watchValue ?? ''), [onChange, watchValue]);

  return (
    <Input
      inputType="select"
      name="reason"
      label={t('input.question.reasons-for-declining')}
      placeholder=""
      options={options}
      selectDefaultValue={null}
      control={control}
      setSelectValue={setValue}
      isClearable
    />
  );
};

interface IQuestion {
  id: string;
  title: string;
  year: string;
  unit?: string;
  previousData?: {
    year: string;
    value: string;
  }[];
  isYesNoQuestion?: boolean;
}

interface QuestionProps {
  sectionIdx: number;
  questionId: string;
  onInteraction: (id: string, type: InteractionType) => void;
  className: string;
  getQuestion: GetQuestion;
  setResponse: SetResponse;
  highlight?: string;
  inSearch?: boolean | null;
}

const Question: React.FC<QuestionProps> = ({
  sectionIdx,
  questionId,
  onInteraction,
  className,
  getQuestion,
  setResponse,
  highlight = '',
  inSearch = true,
}) => {
  const { t } = useTranslation('data-entry');

  const [isExpanded, setExpanded] = useState(true);

  useEffect(() => {
    if (inSearch !== null) setExpanded(inSearch);
  }, [inSearch]);

  const [question, setQuestion] = useState<IQuestion>();
  const [answer, setAnswer] = useState<string>('');
  const [comments, setComments] = useState<string>('');
  const [internalComments, setInternalComments] = useState<string>('');
  const [isDisabled, setDisabled] = useState(false);
  const [disabledReasons, setDisabledReasons] = useState<string>('');
  const [explanation, setExplanation] = useState<string>('');
  const [isConfidential, setConfidential] = useState(false);
  const [file, setFile] = useState<File | null>(null);

  const fileInputRef = useRef<HTMLInputElement>(null);

  useEffect(() => {
    async function loadQuestion() {
      const questionData = await getQuestion(sectionIdx, questionId);
      setQuestion(questionData);
      if (questionData?.response) {
        const { response } = questionData;
        setAnswer(response.answer);
        setComments(response.comments);
        setInternalComments(response.internalComments);
        setDisabled(response.isDisabled);
        setDisabledReasons(response.disabledReasons);
        setExplanation(response.explanation);
        setConfidential(response.isConfidential);
        setFile(response.file);
      }
    }

    if (!question) loadQuestion();
  }, [getQuestion, question, questionId, sectionIdx]);

  useEffect(() => {
    if (question) {
      setResponse(sectionIdx, questionId, {
        answer,
        comments,
        internalComments,
        isDisabled,
        disabledReasons,
        explanation,
        isConfidential,
        file,
      });
    }
  }, [
    answer,
    comments,
    disabledReasons,
    explanation,
    file,
    internalComments,
    isConfidential,
    isDisabled,
    question,
    questionId,
    sectionIdx,
    setResponse,
  ]);

  const handleDeclineCheckbox = useCallback((e) => {
    setDisabled(e.target.checked);
  }, []);

  // clear the values when the 'Decline to answer' checkbox is ticked
  useEffect(() => {
    if (isDisabled) {
      setAnswer('');
    }
  }, [isDisabled]);

  const handleConfidentialCheckbox = useCallback((e) => {
    setConfidential(e.target.checked);
  }, []);

  const handleFileChange = useCallback(
    (e: React.ChangeEvent<HTMLInputElement>) => {
      setFile(e.target.files?.length ? e.target.files[0] : null);
    },
    []
  );

  return (
    <Container className={className}>
      <TitleContainer $bottomRadius={!isExpanded}>
        {question && (
          <>
            <Highlighter text={question?.title} keyword={highlight} />
            {isExpanded && (
              <InteractionButton
                onClick={() => onInteraction(question.id, 'tip')}
              >
                <LightBulb />
                {t('input.question.tips')}
              </InteractionButton>
            )}
          </>
        )}
      </TitleContainer>

      {isExpanded && (
        <>
          <Year re={isDisabled ? '5' : '4'}>{question?.year}</Year>

          {question ? (
            <>
              {question.isYesNoQuestion ? (
                <Answer rs="2" cs="2" ce="6">
                  <YesNoInput isDisabled={isDisabled} onChange={setAnswer} />
                  <CheckboxContainer>
                    <Checkbox
                      isChecked={isDisabled}
                      onChange={handleDeclineCheckbox}
                    >
                      {t('input.question.decline-to-answer')}
                    </Checkbox>
                  </CheckboxContainer>
                </Answer>
              ) : (
                <>
                  <Answer rs="2" cs="2" ce="4">
                    <Input
                      name={`${question.id}-answer`}
                      label={t('input.question.response')}
                      placeholder="-"
                      value={answer}
                      setValue={setAnswer}
                      isDisabled={isDisabled}
                    />
                    <CheckboxContainer>
                      <Checkbox
                        isChecked={isDisabled}
                        onChange={handleDeclineCheckbox}
                      >
                        {t('input.question.decline-to-answer')}
                      </Checkbox>
                    </CheckboxContainer>
                  </Answer>

                  <Unit rs="2" cs="4" ce="6">
                    <Input
                      name={`${question.id}-unit`}
                      label={t('input.question.unit')}
                      value={question?.unit}
                      isDisabled
                    />
                  </Unit>
                </>
              )}

              <Comments rs="2" cs="6" ce="10">
                <Input
                  name={`${question.id}-comments`}
                  label={t('input.question.comments')}
                  placeholder={t('input.question.max-chars')}
                  value={comments}
                  setValue={setComments}
                />
                <p>{t('input.question.max-chars')}</p>
              </Comments>

              {isDisabled && (
                <>
                  <DecliningReasons rs="3" cs="2" ce="6">
                    <DecliningReasonsInput onChange={setDisabledReasons} />
                  </DecliningReasons>

                  <DecliningExplanation rs="3" cs="6" ce="10">
                    <Input
                      name={`${question.id}-explanation`}
                      label={t('input.question.explanation')}
                      placeholder={t('input.question.max-chars')}
                      value={explanation}
                      setValue={setExplanation}
                    />
                    <p>{t('input.question.max-chars')}</p>
                  </DecliningExplanation>
                </>
              )}

              <Evidence rs={isDisabled ? '4' : '3'} cs="2" ce="6">
                <FileButtonContainer>
                  <HiddenFileInput
                    type="file"
                    ref={fileInputRef}
                    onChange={(e) => handleFileChange(e)}
                    data-testid="hidden-file-input"
                  />
                  <FileButtonTitle>
                    {t('input.question.evidence')}
                  </FileButtonTitle>
                  <FileButton>
                    {file?.name || t('input.question.no-file-selected')}
                  </FileButton>
                  <FileButtonActionsContainer>
                    <button
                      type="button"
                      id="upload"
                      onClick={() => fileInputRef?.current?.click()}
                    >
                      {t('input.question.upload-file')}
                    </button>
                    {file && (
                      <button
                        type="button"
                        id="remove"
                        onClick={() => setFile(null)}
                      >
                        {t('input.question.remove-file')}
                      </button>
                    )}
                  </FileButtonActionsContainer>
                </FileButtonContainer>
              </Evidence>

              <InternalComments rs={isDisabled ? '4' : '3'} cs="6" ce="10">
                <Input
                  name={`${question.id}-internal-comments`}
                  label={t('input.question.internal-comments')}
                  placeholder={t('input.question.max-chars')}
                  value={internalComments}
                  setValue={setInternalComments}
                />
                <CheckboxContainer>
                  <Checkbox
                    isChecked={isConfidential}
                    onChange={handleConfidentialCheckbox}
                  >
                    {t('input.question.confidential-data')}
                  </Checkbox>
                </CheckboxContainer>
              </InternalComments>
            </>
          ) : (
            <LoaderContainer rs="2" cs="2" re="3" ce="10">
              <Loader />
            </LoaderContainer>
          )}

          <FooterContainer rs={isDisabled ? '5' : '4'}>
            {question && (
              <>
                {t('input.question.prev-data')}
                <FooterSeparator />
                {question?.previousData &&
                  question.previousData.map((item) => (
                    <React.Fragment key={item.year}>
                      <FooterPreviousDataItem>
                        {item.year}:{' '}
                        <span className="value">
                          {item.value.length ? item.value : '-'}
                        </span>
                      </FooterPreviousDataItem>
                      <FooterSeparator />
                    </React.Fragment>
                  ))}
                <InteractionButton
                  onClick={() => onInteraction(question.id, 'trail')}
                >
                  {t('input.question.audit-trail')}
                </InteractionButton>
              </>
            )}
          </FooterContainer>
        </>
      )}
    </Container>
  );
};

export default Question;
