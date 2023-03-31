import { shade } from 'polished';
import styled, { css, keyframes } from 'styled-components';

interface TitleContainerProps {
  $bottomRadius: boolean;
}

interface GridItemProps {
  rs?: string; // row start
  re?: string; // row end
  cs?: string; // column start
  ce?: string; // column end
}

export const Container = styled.div`
  display: grid;
  grid-auto-columns: minmax(0, 1fr);
  grid-auto-flow: column;
  box-shadow: 0px 0px 12px 0px #0000001a;
  grid-gap: 0;
  border-radius: 8px;
  background: #fff;
  min-width: 750px;
`;

export const TitleContainer = styled.div<TitleContainerProps>`
  grid-row-start: 1;
  grid-column-start: 1;
  grid-column-end: 10;
  display: flex;
  flex-direction: row;
  align-items: center;
  height: 4em;
  padding: 0 1.8em;
  border-radius: 8px 8px
    ${({ $bottomRadius }) => ($bottomRadius ? '8px 8px' : '0 0')};
  background: ${({ theme }) => theme.colors.question_background};
  color: ${({ theme }) => theme.colors.primary_1};
  font-size: 16px;
  font-weight: 700;

  .Highlighter_keyword {
    color: #fff;
    background-color: ${({ theme }) => theme.colors.primary};
  }
`;

export const InteractionButton = styled.button`
  margin-left: auto;
  display: flex;
  flex-direction: row;
  align-items: center;
  justify-content: center;
  border: 1px solid ${({ theme }) => theme.colors.primary};
  color: ${({ theme }) => theme.colors.primary};
  border-radius: 8px;
  width: 9.625em;
  height: 1.938em;

  transition: background-color 0.3s;
  background-color: ${({ theme }) => theme.colors.question_background};
  &:hover {
    background-color: ${({ theme }) =>
      shade(0.08, theme.colors.question_background)};
  }

  > svg {
    margin-right: 0.4em;
  }
`;

const commonCss = ({ rs, re, cs, ce }: GridItemProps) => css`
  padding: 1.25em 1.8em 0 0;
  grid-row-start: ${rs};
  grid-row-end: ${re};
  grid-column-start: ${cs};
  grid-column-end: ${ce};
`;

export const Year = styled.div<GridItemProps>`
  grid-row-end: ${({ re }) => re};

  grid-row-start: 2;
  grid-column-start: 1;
  grid-column-end: 2;
  margin-right: 1em;
  display: flex;
  justify-content: center;
  align-items: center;
  border-right: 1px solid ${({ theme }) => theme.colors.question_background};
  font-size: 1.25rem;
  font-weight: 700;
  text-align: center;
`;

const spin = keyframes`
  from {
    transfrom: rotate(0deg);
  }
  to {
    transform: rotate(360deg);
  }
`;

export const LoaderContainer = styled.div<GridItemProps>`
  ${(props) => commonCss(props)}
  display: flex;
  flex-direction: row;
  align-items: center;
  justify-content: center;
  height: 242px;
`;

export const Loader = styled.div`
  border: 3px solid ${({ theme }) => theme.colors.gray_5};
  border-top: 4px solid ${({ theme }) => theme.colors.primary};
  border-radius: 50%;
  width: 40px;
  height: 40px;
  animation: ${spin} 1s linear infinite;
`;

export const Answer = styled.div<GridItemProps>`
  ${(props) => commonCss(props)}

  .Input_Container, .react-select__control {
    border: 1px solid #12a8fc;
    background: #ddefff;

    input {
      background: #ddefff;
      font-weight: 700;
    }

    &:hover {
      border: 1px solid #12a8fc;
    }
  }
`;

export const Unit = styled.div<GridItemProps>`
  ${(props) => commonCss(props)}

  input:disabled, .Input_Container {
    background: #fff !important;
  }
`;

export const DecliningReasons = styled.div<GridItemProps>`
  ${(props) => commonCss(props)}
`;

export const DecliningExplanation = styled.div<GridItemProps>`
  ${(props) => commonCss(props)}

  > p {
    margin-top: 8px;
    font-size: 0.75rem;
    font-weight: 400;
    text-align: justify;
    text-align-last: right;
    color: ${({ theme }) => theme.colors.gray_3};
  }
`;

export const Comments = styled.div<GridItemProps>`
  ${(props) => commonCss(props)}

  > p {
    margin-top: 8px;
    font-size: 0.75rem;
    font-weight: 400;
    text-align: justify;
    text-align-last: right;
    color: ${({ theme }) => theme.colors.gray_3};
  }
`;

export const Evidence = styled.div<GridItemProps>`
  ${(props) => commonCss(props)}

  margin-bottom: 1.25em;
`;

export const HiddenFileInput = styled.input`
  display: none;
`;

export const FileButtonContainer = styled.div`
  flex: 1;
  font-family: 'Open Sans', sans-serif;
`;

export const FileButtonTitle = styled.p`
  color: ${({ theme }) => theme.colors.gray_0};
  margin-bottom: 5px;
  font-weight: 400;
  font-size: 1rem;
`;

export const FileButton = styled.div`
  display: flex;
  align-items: center;
  justify-content: center;
  border: 1px solid #a2a2a2;
  background-color: ${({ theme }) => theme.colors.gray_6};
  color: ${({ theme }) => theme.colors.gray_2};
  font-weight: 700;
  min-height: 3.063em;
`;

export const FileButtonActionsContainer = styled.div`
  margin-top: 8px;
  display: flex;
  flex-direction: row;

  > button {
    text-decoration: underline;
    cursor: pointer;
    font-size: 0.75rem;
    font-weight: 400;
    border: none;
    background: none;
  }

  #upload {
    color: ${({ theme }) => theme.colors.primary};
  }

  #remove {
    margin-left: auto;
    color: ${({ theme }) => theme.colors.red};
  }
`;

export const InternalComments = styled.div<GridItemProps>`
  ${(props) => commonCss(props)}

  margin-bottom: 1.25em;
`;

export const FooterContainer = styled.div<GridItemProps>`
  ${(props) => commonCss(props)}

  grid-column-start: 1;
  grid-column-end: 10;
  display: flex;
  flex-direction: row;
  align-items: center;
  height: 3.25em;
  padding: 0.6em 2em;
  border-radius: 0 0 8px 8px;
  background: ${({ theme }) => theme.colors.question_background};
  color: #000;
  font-size: 16px;
  font-weight: 700;
`;

export const FooterSeparator = styled.div`
  width: 0;
  height: 100%;
  border-right: 1px solid ${({ theme }) => theme.colors.gray};
  margin: 0 2em;
`;

export const FooterPreviousDataItem = styled.span`
  .value {
    margin-left: 1rem;
    font-weight: 400;
  }
`;

export const CheckboxContainer = styled.div`
  margin-top: 8px;
  font-size: 0.75rem;
  font-weight: 400;
  color: ${({ theme }) => theme.colors.gray_0};
`;
