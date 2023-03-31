import { useCallback, useEffect, useMemo, useState } from 'react';

import { arrayToObjectBy } from '../utils/object';

interface Question {
  id: string;
  title: string;
  indicator: string;
  unit?: string;
  year: string;
  tip?: string;
  isYesNoQuestion?: boolean;
  previousData?: {
    year: string;
    value: string;
  }[];
}

interface Response {
  answer: string;
  comments: string;
  internalComments: string;
  isDisabled: boolean;
  disabledReasons: string;
  explanation: string;
  isConfidential: boolean;
  file: File | null;
}

interface QuestionWithResponse extends Question {
  response?: Response;
}

export interface QuestionnaireSection {
  name: string;
  questions: Record<string, QuestionWithResponse>;
}

interface QuestionnaireProps {
  questionnaire: {
    name: string;
    questions: Question[];
  }[];
}

export type GetQuestion = (
  section: number,
  questionId: string
) => Promise<QuestionWithResponse>;

export type SetResponse = (
  section: number,
  questionId: string,
  response: Response
) => Promise<void>;

interface Result {
  sections: QuestionnaireSection[];
  getQuestion: GetQuestion;
  setResponse: SetResponse;
  globalProgress: number;
  sectionProgress: number[];
}

const useQuestionnaire = ({ questionnaire }: QuestionnaireProps): Result => {
  const [sections, setSections] = useState<QuestionnaireSection[]>([]);

  useEffect(() => {
    if (questionnaire) {
      setSections(
        questionnaire.map((section) => ({
          name: section.name,
          questions: arrayToObjectBy(section.questions, 'id'),
        }))
      );
    }
  }, [questionnaire]);

  const getQuestion = useCallback(
    async (sectionIdx: number, questionId: string) => {
      await new Promise((resolve) => setTimeout(resolve, 500));
      return sections[sectionIdx].questions[questionId];
    },
    [sections]
  );

  const setResponse = useCallback(
    async (sectionIdx: number, questionId: string, response: Response) => {
      setSections((state) =>
        state.map((section, idx) => {
          if (idx === sectionIdx) {
            const { questions } = section;
            questions[questionId].response = response;
            return {
              ...section,
              questions,
            };
          }
          return section;
        })
      );
    },
    []
  );

  const { globalProgress, sectionProgress } = useMemo(() => {
    let totalAnswered = 0;
    let totalQuestions = 0;
    const sectionProgress = sections.map((section) => {
      const questions = Object.values(section.questions);
      let sum = 0;
      questions.forEach((question) => {
        if (
          question.response &&
          (question.response.answer !== '' || question.response.isDisabled)
        ) {
          sum += 1;
        }
      });
      totalAnswered += sum;
      totalQuestions += questions.length;
      return (sum / questions.length) * 100;
    });

    return {
      globalProgress: (totalAnswered / totalQuestions) * 100,
      sectionProgress,
    };
  }, [sections]);

  return {
    sections,
    getQuestion,
    setResponse,
    globalProgress,
    sectionProgress,
  };
};

export default useQuestionnaire;
