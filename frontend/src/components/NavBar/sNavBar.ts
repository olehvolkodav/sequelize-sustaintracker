import styled, { css } from 'styled-components';

interface ContainerProps {
  width: string;
  $isCollapsed: boolean;
}

interface MainPageTitleContainerProps {
  $hideText: boolean;
  $showSubMenu: boolean;
}

interface MainPageTitleProps {
  $isSelected: boolean;
}

interface SubMenuItemProps {
  $isSelected: boolean;
}

const collapseAnimationTime = '0.2s';

export const CollapseButton = styled.button`
  position: relative;
  bottom: 2em;
  margin-left: auto;
  margin-right: 1.6em;
  background: none;
  border: none;
`;

export const DropDownSubMenu = styled.div`
  cursor: initial;
  position: absolute;
  margin: 0 !important;
  left: 3.1em;
  top: 0;
  padding: 0.85em 2em 0.85em 1.6em;
  width: max-content;
  border-radius: 4px;
  color: ${({ theme }) => theme.colors.gray_6};
  background-color: ${({ theme }) => theme.colors.primary_1};
  z-index: 2;

  visibility: hidden;
  opacity: 0;
  transition-property: visibility, opacity;
  transition-delay: 0.6s, 0.4s;
  transition-duration: 0s, 0.2s;

  & > * + * {
    margin-top: 0.8em;
  }
`;

export const DropDownSubMenuItem = styled.div`
  transition: color 0.2s;
  cursor: pointer;
  white-space: break-spaces;

  &:hover {
    color: ${({ theme }) => theme.colors.primary};
  }
`;

export const Container = styled.div<ContainerProps>`
  position: fixed;
  display: flex;
  flex-direction: column;
  will-change: width;
  width: ${({ width }) => width};
  transition: width ${collapseAnimationTime} ease-in-out;
  min-height: 100%;
  background-color: ${({ theme }) => theme.colors.secondary};
  user-select: none;
  font-weight: 400;
  font-size: 0.875rem;

  #logo {
    position: absolute;
    width: 2.6em;
    height: 2.6em;
    left: 0.2em;
  }

  #st {
    position: absolute;
    left: 20%;
    visibility: ${({ $isCollapsed }) =>
      $isCollapsed ? 'collapse' : 'visible'};
    width: ${({ $isCollapsed }) => ($isCollapsed ? '0' : '74%')};
    opacity: ${({ $isCollapsed }) => ($isCollapsed ? '0' : '1')};
    transition-property: position, visibility, height, opacity, transform;
    transition-delay: ${({ $isCollapsed }) =>
      $isCollapsed
        ? '0s, 0s, 0s, 0s, 0s'
        : `${collapseAnimationTime}, ${collapseAnimationTime}, ${collapseAnimationTime}, ${collapseAnimationTime}, 0s`};
    transition-duration: 0s, 0s, 0s, ${collapseAnimationTime},
      ${collapseAnimationTime};
  }

  > ${CollapseButton} {
    transition-property: transform;
    transition-delay: ${collapseAnimationTime};
    ${({ $isCollapsed }) =>
      $isCollapsed &&
      css`
        transform: rotate(180deg);
      `};
  }
`;

export const LogoContainer = styled.div`
  display: flex;
  flex-direction: row;
  align-items: center;
  position: relative;
  margin: 0px 0 34px 0.6em;
  height: 4.6em;
`;

export const PagesList = styled.div`
  flex: 1;

  & > * + * {
    margin-top: 6px;
  }
`;

export const MainPageTitle = styled.p<MainPageTitleProps>`
  color: ${({ theme }) => theme.colors.gray_6};
  margin-left: 20%;

  ${(props) =>
    props.$isSelected &&
    css`
      color: ${props.theme.colors.primary};
    `};
`;

export const MainPageTitleContainer = styled.div<MainPageTitleContainerProps>`
  display: flex;
  align-items: center;
  cursor: pointer;
  margin-left: 0.6em;
  position: relative;
  height: 2.95em;

  svg.route-icon {
    position: absolute;
    height: 2.95em;
    width: 2.95em;
    padding: 0.76em;
    border-radius: 7px;
    transition: background-color 0.2s;
  }

  ${(props) =>
    props.$hideText &&
    css`
      width: min-content;

      &:hover svg.route-icon {
        background-color: ${props.theme.colors.primary_1};
      }
    `};

  ${MainPageTitle}, .chevron {
    position: ${({ $hideText }) => ($hideText ? 'absolute' : 'relative')};
    visibility: ${({ $hideText }) => ($hideText ? 'collapse' : 'visible')};
    height: ${({ $hideText }) => ($hideText ? '0' : '1.35em')};
    opacity: ${({ $hideText }) => ($hideText ? '0' : '1')};
    transition-property: position, visibility, height, opacity, transform, color;
    transition-delay: ${({ $hideText }) =>
      $hideText
        ? '0s, 0s, 0s, 0s, 0s, 0.2s'
        : `${collapseAnimationTime}, ${collapseAnimationTime}, ${collapseAnimationTime}, ${collapseAnimationTime}, 0s, 0s`};
    transition-duration: 0s, 0s, 0s, ${collapseAnimationTime},
      ${collapseAnimationTime}, 0.2s;
  }

  > svg.chevron {
    align-self: center;
    margin-left: auto;
    margin-right: 1.8em;

    ${({ $showSubMenu }) =>
      $showSubMenu &&
      css`
        transform: rotate(90deg);
      `};
  }

  &:hover ${MainPageTitle} {
    color: ${({ theme }) => theme.colors.primary};
  }

  &:hover ${DropDownSubMenu} {
    visibility: visible;
    opacity: 1;
    transition-property: visibility, opacity;
    transition-delay: 0s, 0s;
    transition-duration: 0s, 0s;
  }
`;

export const SubMenuContainer = styled.div`
  margin-top: 0;
  display: flex;
  flex-direction: column;
  cursor: pointer;

  & > * + * {
    margin-top: 12px;
  }
`;

export const SubMenuItem = styled.div<SubMenuItemProps>`
  color: ${({ theme }) => theme.colors.gray_6};
  margin-left: 24%;
  transition: color 0.3s;
  white-space: break-spaces;

  ${(props) =>
    props.$isSelected &&
    css`
      color: ${props.theme.colors.primary};
    `};

  &:hover {
    color: ${({ theme }) => theme.colors.primary};
  }
`;
