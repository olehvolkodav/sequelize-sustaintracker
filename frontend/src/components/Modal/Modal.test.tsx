import { cleanup, fireEvent, render, screen } from '@testing-library/react';
import { ThemeProvider } from 'styled-components';

import theme from '../../styles/theme';

import Modal from './Modal';

describe('modal', () => {
  afterEach(cleanup);

  const setShowModal = jest.fn();

  test('renders', () => {
    render(
      <ThemeProvider theme={theme}>
        <Modal showModal setShowModal={setShowModal} />
      </ThemeProvider>
    );
  });

  test('hides', () => {
    render(
      <ThemeProvider theme={theme}>
        <Modal
          showModal={false}
          setShowModal={setShowModal}
          title="title"
          subtitle="subtitle"
        />
      </ThemeProvider>
    );

    expect(screen.queryByText('title')).toBe(null);
  });

  test('shows', () => {
    render(
      <ThemeProvider theme={theme}>
        <Modal
          showModal
          setShowModal={setShowModal}
          title="modal title"
          subtitle="modal subtitle"
        />
      </ThemeProvider>
    );

    const headings = screen.getAllByRole('heading');
    expect(headings.length).toBe(2);
    expect(headings[0]).toHaveTextContent('modal title');
    expect(headings[1]).toHaveTextContent('modal subtitle');
  });

  test('close button', () => {
    render(
      <ThemeProvider theme={theme}>
        <Modal
          showModal
          setShowModal={setShowModal}
          title="modal title"
          subtitle="modal subtitle"
        />
      </ThemeProvider>
    );

    const closeModalButton = screen.getByRole('button');
    fireEvent.click(closeModalButton);

    expect(setShowModal).toHaveBeenCalledTimes(1);
    expect(setShowModal.mock.calls[0][0]).toBe(false);
  });
});
