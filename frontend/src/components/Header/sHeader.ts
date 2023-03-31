import { shade } from 'polished';
import styled from 'styled-components';

interface DropDownContainerProps {
  $isActive: boolean;
}

interface SearchInputProps {
  $show: boolean;
}

interface SearchDropdownProps {
  $show: boolean;
}

interface LanguageDropdownProps {
  $isActive: boolean;
}

export const Container = styled.div`
  display: flex;
  flex-direction: row;
  width: 100%;
  height: 4.6em;
  background-color: ${({ theme }) => theme.colors.header_background};
  border-bottom: 1px solid ${({ theme }) => theme.colors.gray_5};
`;

export const LeftContent = styled.div`
  display: flex;
  align-items: center;

  > svg {
    margin-left: 26px;
  }

  > h5 {
    margin-left: 13px;
    font-size: 1rem;
    font-weight: 700;
  }
`;

export const SearchButton = styled.button`
  margin-left: 40px;
  position: relative;
  border: none;
  background: none;
`;

export const SearchInputContainer = styled.div<SearchInputProps>`
  .Input_Container {
    width: ${({ $show }) => ($show ? '300px' : '0')};
    padding: ${({ $show }) => ($show ? '' : '0')};
    border: ${({ $show }) => ($show ? '' : '0')};
    margin-left: ${({ $show }) => ($show ? '1.5em' : '0')};
    transition-property: width, padding, border, margin-left;
    transition-duration: 0.3s;
  }
`;

export const SearchDropdown = styled.div<SearchDropdownProps>`
  display: ${({ $show }) => !$show && 'none'};
  cursor: default;
  position: absolute;
  top: 3em;
  left: 2em;
  max-height: 30vh;
  width: 400px;
  padding: 16px;
  background: #fff;
  box-shadow: 0px 0px 4px 0px #00000040;
  border-radius: 8px;
  overflow: auto;
  text-align: left;
  color: ${({ theme }) => theme.colors.gray_1};

  > * + * {
    margin-top: 12px;
  }
`;

export const SearchResult = styled.div`
  cursor: pointer;
  &:hover {
    color: ${({ theme }) => theme.colors.primary};
  }
`;

export const LanguageSelector = styled.button`
  margin-left: 40px;
  cursor: pointer;
  display: flex;
  flex-direction: row;
  align-items: center;
  position: relative;
  background: none;
  border: none;
  font-weight: 400;

  > svg {
    margin-left: 0.6em;
  }
`;

export const LanguageDropdown = styled.div<LanguageDropdownProps>`
  visibility: ${({ $isActive }) => ($isActive ? 'visible' : 'hidden')};
  opacity: ${({ $isActive }) => ($isActive ? '1' : '0')};
  transition-property: opacity, visibility;
  transition-duration: 0.3s, 0s;
  transition-delay: ${({ $isActive }) => ($isActive ? '0s 0s' : '0s, 0.3s')};
  position: absolute;
  left: -24%;
  top: 3em;
  min-width: 3em;
  background-color: #fff;
  box-shadow: 0px 0px 4px 0px #00000040;
  z-index: 1;
  text-align: left;
  padding: 16px 0 16px 0;
  cursor: default;

  & > * + * {
    margin-top: 13px;
  }
`;

export const Divider = styled.div`
  width: 1px;
  height: 46px;
  background-color: #777777;
`;

export const NameContainer = styled.div`
  display: flex;
  flex-direction: column;
  align-items: center;
  margin-left: 22px;

  > p {
    color: ${({ theme }) => theme.colors.gray_1};
    font-size: 14px;
    font-weight: 700;
  }
`;

export const AvatarContainer = styled.div`
  border: 2px solid ${({ theme }) => theme.colors.primary};
  border-radius: 50%;
  width: 46px;
  height: 46px;
  margin-left: 1em;
  display: flex;
  align-items: center;
  justify-content: center;
`;

export const DropDownButton = styled.button`
  width: 40px;
  height: 40px;
  border: none;
  background: none;
  position: relative;
  display: inline-block;
`;

export const DropDownContainer = styled.div<DropDownContainerProps>`
  visibility: ${({ $isActive }) => ($isActive ? 'visible' : 'hidden')};
  opacity: ${({ $isActive }) => ($isActive ? '1' : '0')};
  transition-property: opacity, visibility;
  transition-duration: 0.3s, 0s;
  transition-delay: ${({ $isActive }) => ($isActive ? '0s 0s' : '0s, 0.3s')};
  position: absolute;
  left: -12em;
  top: 3em;
  min-width: 13.4em;
  background-color: #fff;
  box-shadow: 0px 0px 4px 0px #00000040;
  z-index: 1;
  text-align: left;
  padding: 16px 0 16px 0;
  cursor: default;

  #logout {
    color: ${({ theme }) => theme.colors.primary};
    transition: color 0.2s;
  }

  #logout:hover {
    color: ${({ theme }) => shade(0.2, theme.colors.primary)};
  }

  & > * + * {
    margin-top: 13px;
  }
`;

export const DropDownItem = styled.div`
  cursor: pointer;
  font-weight: 400;
  font-size: 1em;
  padding: 0 16px 0 16px;
  color: ${({ theme }) => theme.colors.gray_0};
  transition: color 0.2s;

  &:hover {
    color: ${({ theme }) => theme.colors.primary};
  }
`;

export const DropDownDivider = styled.div`
  height: 1px;
  width: 100%;
  background-color: ${({ theme }) => theme.colors.gray_5};
`;

export const RightContent = styled.div`
  display: flex;
  align-items: center;
  margin-left: auto;
  margin-right: 8px;

  #upgrade-button {
    width: 14.625em;
    height: 2.125em;
  }

  > ${Divider} {
    margin-left: 40px;
  }

  > ${DropDownButton} {
    margin-left: 5px;
  }
`;
