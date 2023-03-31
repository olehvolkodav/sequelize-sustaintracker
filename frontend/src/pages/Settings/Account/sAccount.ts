import styled from 'styled-components';

import Button from '../../../components/Button/Button';

interface ToggleChangePasswordContainerProps {
  $enabled: boolean;
}

export const Container = styled.div`
  font-weight: 700;
  padding: 1.875em 1.8em 0 1.8em;
`;

export const Title = styled.div`
  font-size: 1.6rem;
  display: flex;
  flex-direction: row;
`;

export const SaveButton = styled(Button)`
  margin-left: auto;
  width: 14.6em;
`;

export const FormContainer = styled.div`
  display: flex;
  flex-direction: row;
  padding: 3.125em 20% 0 20%;
  width: 100%;

  > div {
    margin-right: 2em;
  }
`;

export const HiddenInput = styled.input`
  display: none;
`;

export const UploadAvatarContainer = styled.div`
  cursor: pointer;
  border-radius: 8px;
  background: ${({ theme }) => theme.colors.gray_6};
  min-width: 234px;
  width: 234px;
  height: 234px;
  display: flex;
  flex-direction: column;
  align-items: center;

  > svg {
    margin-top: auto;
  }

  span {
    font-size: 14px;
    font-weight: 700;
    margin-top: 1em;
    margin-bottom: 4em;
    color: ${({ theme }) => theme.colors.gray_0};
  }
`;

export const ImageContainer = styled.div`
  position: relative;
  display: inline-block;
  cursor: default;
  min-width: 234px;
  width: 234px;
  height: 234px;

  > img {
    max-width: 234px;
    max-height: 234px;
    border-radius: 8px;
    filter: brightness(100%);
    transition: all 0.3s;
  }

  #close {
    width: 20px;
    height: 20px;
    position: absolute;
    top: 16px;
    right: 16px;
    opacity: 0;
    transition: opacity 0.3s;

    > path {
      fill: ${({ theme }) => theme.colors.red_dark};
    }

    &:hover {
      cursor: pointer;
    }
  }

  &:hover img {
    filter: brightness(70%);
  }

  &:hover #close {
    opacity: 1;
  }
`;

export const Form = styled.form`
  display: flex;
  flex-direction: column;
  width: 100%;

  > div {
    width: 100%;
  }
`;

export const NameInputContainer = styled.div`
  display: flex;
  flex-direction: row;

  > div:first-child {
    margin-right: 1em;
  }

  > div:last-child {
    margin-left: 0.3em;
  }
`;

export const ToggleChangePasswordContainer = styled.div<ToggleChangePasswordContainerProps>`
  text-decoration: underline;
  color: ${({ $enabled, theme }) =>
    $enabled ? theme.colors.red : theme.colors.primary};
  font-weight: 700;
  font-size: 1rem;
  margin-bottom: 2em;
  cursor: pointer;
  width: fit-content;
  font-size: 0.875rem;
`;

export const HiddenSubmit = styled.button`
  display: none;
`;
