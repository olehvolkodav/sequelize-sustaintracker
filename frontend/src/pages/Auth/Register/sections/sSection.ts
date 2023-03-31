import styled, { css } from 'styled-components';

interface SectionIndicatorCircleProps {
  color: string;
  cx: string;
  cy: string;
}

interface SectionIndicatorRectangleProps {
  color: string;
  width: string;
  height: string;
  x: string;
  y: string;
}

interface FieldContainerProps {
  $showBorder: boolean;
}

interface IllustrationProps {
  width: string;
}

export const Form = styled.form`
  width: 100%;
  display: flex;
  flex-direction: column;
  padding-top: 2.6em;

  > button {
    margin-top: 2em;
    margin-bottom: 2em;
    align-self: center;
  }
`;

export const SectionIndicator = styled.div`
  width: 80%;
  display: flex;
  flex-direction: column;
  align-items: center;
  font-size: 1rem;
  font-weight: 700;
  align-self: center;
`;

export const SectionIndicatorNameContainer = styled.div`
  display: flex;
  flex-direction: row;
  align-items: center;
  width: 100%;

  > span + span {
    margin-left: auto;
  }
`;

export const SectionIndicatorSVGContainer = styled.svg`
  display: flex;
  flex-direction: row;
  align-items: center;
  width: 100%;
  height: 70px;
`;

export const SectionIndicatorCircle = styled.circle<SectionIndicatorCircleProps>`
  fill: ${({ color }) => color};
  cx: ${({ cx }) => cx};
  cy: ${({ cy }) => cy};
  r: 8px;
`;

export const SectionIndicatorRectangle = styled.rect<SectionIndicatorRectangleProps>`
  fill: ${({ color }) => color};
  width: ${({ width }) => width};
  height: ${({ height }) => height};
  x: ${({ x }) => x};
  y: ${({ y }) => y};
`;

export const Title = styled.p`
  font-size: 1.25rem;
  font-weight: 700;
  color: ${({ theme }) => theme.colors.gray_0};
  text-align: center;
  margin-bottom: 1.6em;
`;

export const SubTitle = styled.p`
  font-size: 1rem;
  font-weight: 400;
  color: ${({ theme }) => theme.colors.gray_0};
  text-align: center;
  margin-bottom: 2em;
`;

export const NameInputContainer = styled.div`
  display: flex;
  flex-direction: row;

  > div:first-child {
    margin-right: 0.3em;
  }

  > div:last-child {
    margin-left: 0.3em;
  }
`;

export const PasswordConditions = styled.ul`
  color: ${({ theme }) => theme.colors.gray_2};
  font-size: 12px;
  list-style-position: inside;
  padding-bottom: 1.2em;
  border-bottom: 1px solid ${({ theme }) => theme.colors.gray_5};
  margin-bottom: 1.2em;
`;

export const TermsAndConditionsContainer = styled.div`
  display: flex;
  flex-direction: row;
  align-items: center;
  white-space: break-spaces;

  > label {
    margin-right: 0.6em;
  }

  > a {
    color: ${({ theme }) => theme.colors.primary};
    text-decoration: underline;
    cursor: pointer;
  }
`;

export const TCError = styled.div`
  min-height: 2em;
  font-weight: 400;
  font-size: 0.75rem;
  color: ${({ theme }) => theme.colors.red};
`;

export const Illustration = styled.img<IllustrationProps>`
  width: 40%;
  width: ${({ width }) => width};
  align-self: center;
  margin-bottom: 2em;
`;

export const SplitInputContainer = styled.div`
  align-self: center;
`;

export const ResendButtonContainer = styled.div`
  align-self: center;
  margin-top: 2em;
  font-size: 0.875rem;
  font-weight: 400;

  #resend {
    font-size: 0.875rem;
    color: ${({ theme }) => theme.colors.primary};
    text-decoration: underline;
    background: none;
    border: none;
  }
`;

export const FieldContainer = styled.div<FieldContainerProps>`
  ${({ $showBorder, theme }) =>
    $showBorder &&
    css`
      border: 1px solid ${theme.colors.gray_5};
      padding: 1em;
      margin-bottom: 1em;
      border-radius: 8px;
    `}

  > button {
    display: ${({ $showBorder }) => ($showBorder ? 'initial' : 'none')};
    border: none;
    background: none;
    color: ${({ theme }) => theme.colors.red};
    text-decoration: underline;
    font-weight: 700;
    font-size: 1rem;
  }
`;

export const AddressInputContainer = styled.div`
  display: flex;
  flex-direction: row;

  > * + * {
    margin-left: 2em;
  }
`;

export const AddInputContainer = styled.div`
  display: flex;
  flex-direction: row;
  align-items: center;
  text-decoration: underline;
  color: ${({ theme }) => theme.colors.primary};
  font-weight: 700;
  font-size: 1rem;
  margin-bottom: 2em;
  cursor: pointer;
  width: fit-content;

  > svg {
    margin-right: 0.6em;
  }
`;

export const PhoneInputContainer = styled.div`
  display: flex;
  flex-direction: row;

  > * + * {
    margin-left: 2em;
  }
`;

export const WelcomeContainer = styled.div`
  width: 100%;
  display: flex;
  flex-direction: column;
  padding-top: 2.6em;

  > button {
    margin-top: 2em;
    margin-bottom: 2em;
    align-self: center;
  }
`;
