import { render, unmountComponentAtNode } from 'react-dom';
import { act } from 'react-dom/test-utils';

import Tooltip from './Tooltip';

let container: HTMLDivElement | null = null;

beforeEach(() => {
  container = document.createElement('div');
  document.body.appendChild(container);
});

afterEach(() => {
  unmountComponentAtNode(container as Element);
  container?.remove();
  container = null;
});

test('renders', () => {
  act(() => {
    render(<Tooltip text="" />, container);
  });
});

test('renders text', () => {
  act(() => {
    render(<Tooltip text="result" />, container);
  });
  const tooltip = container?.querySelector('div');
  expect(tooltip?.textContent).toBe('result');
});

test('renders children', () => {
  act(() => {
    render(
      <Tooltip text="text">
        <p>child</p>
      </Tooltip>,
      container
    );
  });
  const child = container?.querySelector('p');
  expect(child?.textContent).toBe('child');
});
