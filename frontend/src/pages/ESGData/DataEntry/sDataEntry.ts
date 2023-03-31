import styled, { css, keyframes } from 'styled-components';

import Button from '../../../components/Button/Button';

interface ProgressBarProps {
  width: string;
}

interface SectionProps {
  $isActive: boolean;
}

interface QuestionsContainerProps {
  appearFrom?: string;
}

interface TipProps {
  topOffset?: number;
}

interface FooterProps {
  marginLeft: string;
}

export const Container = styled.div`
  font-weight: 700;
  padding: 1.875em 1.8em 0 1.8em;

  .question + .question {
    margin-top: 2em;
  }
`;

export const Title = styled.div`
  font-size: 1.6rem;
  display: flex;
  flex-direction: row;
  align-items: center;
`;

export const ProgressBarContainer = styled.div`
  width: 14.6em;
  margin-left: auto;
  display: flex;
  flex-direction: column;
  font-size: 0.75rem;
  font-weight: 400;
`;

export const ProgressBar = styled.div<ProgressBarProps>`
  background-color: ${({ theme }) => theme.colors.gray_5};
  height: 1em;
  border-radius: 0.5em;
  width: 14.6em;
  margin-top: 3px;

  > div {
    height: 100%;
    border-radius: 0.5em;
    background-color: ${({ theme }) => theme.colors.primary};
    width: ${({ width }) => width};
  }
`;

export const TitleSeparator = styled.div`
  height: 0.75em;
  margin-left: 1em;
  width: 0;
  border-right: 1px solid ${({ theme }) => theme.colors.gray_5};
`;

export const SaveButton = styled(Button)`
  margin-left: 1em;
  width: 14.6em;
`;

export const Info = styled.div`
  margin: 2em 0 2em 0;
  font-size: 16px;
  font-weight: 700;
  white-space: break-spaces;
`;

export const Content = styled.div`
  display: grid;
  margin-bottom: 8.2em;
`;

export const SectionContainer = styled.div`
  width: 100%;
  display: flex;
  flex-direction: row;
  grid-row-start: 1;
  height: 6em;
  padding: 0 2em;
  border-top: 1px solid ${({ theme }) => theme.colors.gray_5};
  border-bottom: 1px solid ${({ theme }) => theme.colors.gray_5};
  align-items: center;

  > * + * {
    margin-left: auto;
  }
`;

export const Section = styled.div<SectionProps>`
  cursor: pointer;
  color: ${(props) =>
    props.$isActive ? props.theme.colors.primary : props.theme.colors.gray_0};
  font-size: 16px;
  font-weight: 400;
  border-bottom: 4px solid ${({ theme }) => theme.colors.secondary_light};
  padding-bottom: 0.4em;
  transition-property: border-bottom, color;
  transition-duration: 0.2s, 0.2s;

  &:hover {
    border-bottom: 4px solid ${({ theme }) => theme.colors.gray_5};
  }

  ${(props) =>
    props.$isActive &&
    css`
      border-bottom: 4px solid ${props.theme.colors.primary} !important;
    `}
`;

const appearFromLeft = keyframes`
  from {
    opacity: 0;
    transform: translateX(-100px);
  }
  to {
    opacity: 1;
    transform: translateX(0);
  }
`;

const appearFromRight = keyframes`
  from {
    opacity: 0;
    transform: translateX(100px);
  }
  to {
    opacity: 1;
    transform: translateX(0);
  }
`;

export const QuestionsSubgrid = styled.div`
  grid-row-start: 2;

  display: grid;
  grid-auto-columns: minmax(0, 1fr);
  grid-auto-flow: column;
  grid-gap: 0;
`;

export const QuestionsContainer = styled.div<QuestionsContainerProps>`
  grid-column-start: 1;
  grid-column-end: 4;
  margin-right: 1.2em;

  ${({ appearFrom }) => {
    if (appearFrom === 'left')
      return css`
        animation: ${appearFromLeft} 0.4s;
      `;
    if (appearFrom === 'right')
      return css`
        animation: ${appearFromRight} 0.4s;
      `;
    return css`
      animation: none;
    `;
  }};
`;

export const SectionInfoContainer = styled.div`
  display: flex;
  flex-direction: row;
  align-items: center;
  padding: 1em 0;
  margin: 0.8em 0;
  background-color: ${({ theme }) => theme.colors.secondary_light};
  position: sticky;
  top: 0;

  transform: translateX(-15px);
  padding: 5px 15px;
  width: calc(100% + 30px);
  z-index: 2;

  div:last-child {
    width: 350px;
    margin-left: auto;
  }
`;

export const SectionInfoTitle = styled.span`
  font-size: 1.3rem;
  font-weight: 700;
  color: ${({ theme }) => theme.colors.primary};
  margin-right: 1em;
`;

export const TipContainer = styled.div`
  grid-column-start: 4;
  border-left: 1px solid ${({ theme }) => theme.colors.gray_5};
  padding: 1.8em 0 1.8em 1.5em;
`;

export const Tip = styled.div<TipProps>`
  position: sticky;
  top: 1.8em;
  padding-right: 1.8em;
  font-weight: 400;
  max-height: calc(
    100vh - 70px - 50.4px - ${({ topOffset }) => topOffset || '0'}px
  );
  overflow: auto;

  p:first-child {
    font-weight: 700;
    font-size: 1.25rem;
    margin-bottom: 1em;
  }

  font-size: 14px;
  font-weight: 400;
  white-space: break-spaces;

  strong {
    color: #000;
    font-weight: 700;
  }

  img {
    max-width: 100%;
  }
`;

export const Footer = styled.div<FooterProps>`
  position: fixed;
  bottom: 0;
  width: 100%;
  left: 0;
  height: 5em;
  padding-left: ${({ marginLeft }) => marginLeft};
  transition: padding-left 0.2s ease-in-out;
  display: flex;
  align-items: center;
  justify-content: center;
  background: ${({ theme }) => theme.colors.secondary_light};
  border-top: 1px solid ${({ theme }) => theme.colors.gray_5};
`;
