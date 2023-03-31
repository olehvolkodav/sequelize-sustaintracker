import {
  RenderResult,
  cleanup,
  fireEvent,
  render,
  screen,
  waitFor,
} from '@testing-library/react';
import { ThemeProvider } from 'styled-components';

import useQuestionnaire from '../../hooks/useQuestionnaire';
import theme from '../../styles/theme';

import Question from './Question';

const onInteraction = jest.fn();
let renderResult: RenderResult | null;

describe('question', () => {
  beforeEach(async () => {
    const { getQuestion, setResponse } = useQuestionnaire({
      questionnaire: [],
    });

    renderResult = render(
      <ThemeProvider theme={theme}>
        <Question
          sectionIdx={0}
          questionId="q-id"
          onInteraction={onInteraction}
          className="question"
          getQuestion={getQuestion}
          setResponse={setResponse}
        />
      </ThemeProvider>
    );

    // because of the asynchronous function loadQuestion() all tests have to
    // wait for it to be resolved
    await waitFor(() => {
      expect(screen.getByText('q-title')).toBeInTheDocument();
    });
  });

  afterEach(cleanup);

  test('tips button callback', () => {
    expect(onInteraction).not.toHaveBeenCalled();

    const tipsButton = screen.getByText('input.question.tips');
    expect(tipsButton?.innerHTML).toBe(
      '<svg>light-bulb.svg</svg>input.question.tips'
    );

    fireEvent.click(tipsButton);

    expect(onInteraction).toHaveBeenCalledTimes(1);
    expect(onInteraction.mock.calls[0][0]).toBe('q-id');
    expect(onInteraction.mock.calls[0][1]).toBe('tip');
  });

  test('trail button callback', () => {
    expect(onInteraction).not.toHaveBeenCalled();

    const trailButton = screen.getByText('input.question.audit-trail');
    expect(trailButton?.innerHTML).toBe('input.question.audit-trail');

    fireEvent.click(trailButton);

    expect(onInteraction).toHaveBeenCalledTimes(1);
    expect(onInteraction.mock.calls[0][0]).toBe('q-id');
    expect(onInteraction.mock.calls[0][1]).toBe('trail');
  });

  test('decline checkbox', () => {
    const valueInput = screen.getByPlaceholderText('-').closest('input');
    expect(valueInput).not.toBeDisabled(); // not to be not enabled

    const declineCheckbox = screen.getByText(
      'input.question.decline-to-answer'
    );
    fireEvent.click(declineCheckbox);

    expect(valueInput).toBeDisabled();

    fireEvent.click(declineCheckbox);
    expect(valueInput).not.toBeDisabled();
  });

  test('upload file button', async () => {
    // expect the 'no file' text
    expect(renderResult?.container).toHaveTextContent(
      'input.question.no-file-selected'
    );

    // don't expect the 'remove file' button
    expect(renderResult?.container).not.toHaveTextContent(
      'input.question.remove-file'
    );

    // simulate a file input
    const file = new File(['test file'], 'testfile.test');
    const fileInput = screen.getByTestId('hidden-file-input');
    fireEvent.change(fileInput, {
      target: { files: [file] },
    });

    // expect 'remove file' button
    expect(renderResult?.container).toHaveTextContent(
      'input.question.remove-file'
    );

    // expect the file name
    expect(renderResult?.container).toHaveTextContent('testfile.test');

    // remove file
    const removeFileButton = screen.getByText('input.question.remove-file');
    fireEvent.click(removeFileButton);

    // expect initial conditions
    expect(renderResult?.container).toHaveTextContent(
      'input.question.no-file-selected'
    );
    expect(renderResult?.container).not.toHaveTextContent(
      'input.question.remove-file'
    );
  });

  it('does not have select input', () => {
    expect(
      renderResult?.container.getElementsByClassName('react-select__control')
        .length
    ).toBe(0);
  });
});

describe('yes/no question', () => {
  beforeEach(async () => {
    const { getQuestion, setResponse } = useQuestionnaire({
      questionnaire: [],
    });

    renderResult = render(
      <ThemeProvider theme={theme}>
        <Question
          sectionIdx={0}
          questionId="q-id-1"
          onInteraction={onInteraction}
          className="question"
          getQuestion={getQuestion}
          setResponse={setResponse}
        />
      </ThemeProvider>
    );

    // because of the asynchronous function loadQuestion() all tests have to
    // wait for it to be resolved
    await waitFor(() => {
      expect(screen.getByText('q-title-1')).toBeInTheDocument();
    });
  });

  afterEach(cleanup);

  it('has select input', () => {
    expect(
      renderResult?.container.getElementsByClassName('react-select__control')
        .length
    ).toBe(1);
  });
});
