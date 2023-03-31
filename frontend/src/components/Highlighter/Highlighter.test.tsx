import { RenderResult, cleanup, render, screen } from '@testing-library/react';

import Highlighter from './Highlighter';

let renderResult: RenderResult | null;

describe('highlighter', () => {
  afterEach(cleanup);

  const runTest = (text: string, keyword: string, expected: string) => {
    renderResult = render(<Highlighter text={text} keyword={keyword} />);
    expect(renderResult?.container).toHaveTextContent(expected);
  };

  test('renders', () => {
    runTest('', '', '');
  });

  test("doesn't wrap empty keyword", () => {
    runTest('sample text test abcde', '', 'sample text test abcde');
  });

  test('wraps keyword', () => {
    runTest('sample text test abcde', 'sample', 'sample text test abcde');
    expect(screen.getByText('sample').className).toBe('Highlighter_keyword');
    expect(screen.getByText('text test abcde').className).not.toBe(
      'Highlighter_keyword'
    );
  });

  test('wraps multiple instances of keyword', () => {
    runTest('sample text test sample', 'sample', 'sample text test sample');
    screen.getAllByText('sample').forEach((elem) => {
      expect(elem.className).toBe('Highlighter_keyword');
    });
    expect(screen.getByText('text test').className).not.toBe(
      'Highlighter_keyword'
    );
  });
});
