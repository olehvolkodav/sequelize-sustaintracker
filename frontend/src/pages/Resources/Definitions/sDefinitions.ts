import styled, { css } from 'styled-components';

interface ListProps {
  depth: number;
}

interface ListItemProps {
  $isExpanded?: boolean;
  depth: number;
}

const size = ['20px', '17px', '14px'];

export const Container = styled.div`
  font-weight: 700;
  padding: 1.875em 1.8em 6em 1.8em;

  .Input_Container {
    width: 360px;
    margin-top: 1em;
    margin-bottom: 4em;
  }

  .Highlighter_keyword {
    background-color: ${({ theme }) => theme.colors.primary};
  }
`;

export const List = styled.ul<ListProps>`
  list-style: none;
  padding: 0;
  margin-left: ${({ depth }) => (depth === 0 ? 0 : 1)}em;
  cursor: default;
`;

export const ListItem = styled.li<ListItemProps>`
  padding-left: 32px;
  margin-top: 1.2em;
  font-size: ${({ depth }) => (depth > 2 ? size[2] : size[depth])};
  font-weight: 700;
  cursor: pointer;
  color: #000;
  transition: color 0.3s;

  .Highlighter_keyword {
    transition: color 0s;
    color: #000;
  }

  + ul,
  + p {
    transition-property: visibility, max-height, opacity;
    transition-duration: 0s, 0s, 0.2s;
    ${({ $isExpanded }) =>
      $isExpanded
        ? css`
            visibity: visible;
            max-height: 10000px;
            opacity: 1;
            transition-delay: 0s, 0s, 0s;
          `
        : css`
            visibility: hidden;
            max-height: 0;
            opacity: 0;
            transition-delay: 0.2s, 0.1s, 0s;
          `}
  }

  &:hover {
    color: ${({ theme }) => theme.colors.primary};
  }

  ${({ $isExpanded, theme }) => css`
    &:before {
      color: ${$isExpanded ? theme.colors.primary : theme.colors.gray_2};
      content: ${$isExpanded ? "'▼'" : "'▶'"};
      display: inline-block;
      margin-left: -32px;
      width: 32px;
    }
  `}
`;

export const Value = styled.p`
  cursor: text;
  margin-left: 32px;
  margin-top: 0.4em;
  font-size: 14px;
  font-weight: 400;
`;
