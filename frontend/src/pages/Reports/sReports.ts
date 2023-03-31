import styled, { css } from 'styled-components';

interface VerificationStatusProps {
  bgColor: string;
  color?: string;
}

export const Container = styled.div`
  font-weight: 700;
  padding: 1.875em 1.8em 0 1.8em;

  > * + * {
    margin-top: 2em;
  }
`;

export const Title = styled.div`
  font-size: 1.6rem;
`;

export const UserInfoDropdown = styled.div`
  z-index: 1;
  visibility: hidden;
  opacity: 0;
  position: absolute;
  transform: translateY(60%);
  width: fit-content;
  height: fit-content;
  padding: 0.6em 1em;
  font-weight: 400;
  font-size: 0.9rem;
  background-color: #fff;
  box-shadow: 0px 0px 4px 0px #00000040;
  text-align: center;

  transition-property: visibility, opacity;
  transition-delay: 0s, 0s;
  transition-duration: 0s, 0.1s;

  span {
    font-weight: 700;
  }

  > * + * {
    margin-top: 0.4em;
  }
`;

export const AvatarContainer = styled.div`
  border: 2px solid ${({ theme }) => theme.colors.primary};
  border-radius: 50%;
  width: 34px;
  height: 34px;
  margin-left: 1em;
  display: flex;
  align-items: center;
  justify-content: center;

  > img {
    height: 100%;
    width: 100%;
    border-radius: 50%;
  }

  &:hover ${UserInfoDropdown} {
    visibility: visible;
    opacity: 1;
  }
`;

export const VerificationStatus = styled.div<VerificationStatusProps>`
  height: 1.688em;
  width: 10em;
  background-color: ${({ bgColor }) => bgColor};
  border-radius: 0.85em;
  font-size: 14px;
  font-weight: 700;
  text-align: center;
  display: table-cell;
  vertical-align: middle;
  ${({ color }) =>
    color &&
    css`
      color: ${color};
    `};
`;

export const ActionsContainer = styled.div`
  display: flex;
  flex-direction: row;
  align-items: center;
  padding-right: 1.6em;

  > *,
  button,
  svg {
    width: 1.2em;
    height: 1.2em;
  }

  > * + * {
    margin-left: auto;
  }
`;

export const ActionButton = styled.button`
  border: none;
  background: none;

  > svg path {
    transition: fill 0.1s;
  }

  &:hover {
    > svg path {
      fill: ${({ theme }) => theme.colors.primary};
    }
  }
`;
