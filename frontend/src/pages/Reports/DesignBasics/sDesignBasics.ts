import styled from 'styled-components';

interface HexInputPreviewProps {
  color: string;
}

interface PreviewItemProps {
  $isSelected: boolean;
}

export const Container = styled.div`
  font-weight: 700;
  padding: 1.875em 1.8em 0 1.8em;

  > * + * {
    margin-top: 2em;
  }

  .radio-button-group_label {
    width: 25%;
    max-width: 300px;
    min-width: 220px;
  }
`;

export const Title = styled.div`
  font-size: 1.6rem;
`;

export const Info = styled.div`
  margin: 2em 0 2em 0;
  font-size: 18px;
  font-weight: 700;
  white-space: break-spaces;
`;

export const Form = styled.form`
  display: flex;
  flex-direction: column;

  > button {
    margin-top: 4em;
    margin-bottom: 5em;
    align-self: center;
  }
`;

export const SettingContainer = styled.div`
  font-size: 16px;
  display: flex;
  flex-direction: row;
  margin-bottom: 3em;

  > div {
    display: flex;
    flex-direction: column;
  }

  > div > span {
    margin-bottom: 1em;
  }

  > div + div {
    border-left: 1px solid ${({ theme }) => theme.colors.gray_5};
    margin-left: 3em;
    padding-left: 3em;
  }

  #color-code {
    margin-top: 1em;
  }
`;

export const UploadLogoContainer = styled.div`
  cursor: pointer;
  border: 1px solid ${({ theme }) => theme.colors.gray_5};
  border-radius: 8px;
  background: #fff;
  width: 392px;
  height: 300px;
  display: flex;
  flex-direction: column;
  align-items: center;

  > svg {
    margin-top: auto;
  }

  span {
    font-size: 14px;
    font-weight: 400;
    margin-top: 1em;
  }

  #subtext {
    font-weight: 700;
    color: ${({ theme }) => theme.colors.gray_4};
    margin-bottom: 6em;
  }
`;

export const HiddenInput = styled.input`
  display: none;
`;

export const ImageContainer = styled.div`
  position: relative;
  display: inline-block;
  cursor: default;

  > img {
    max-width: 392px;
    max-height: 300px;
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

export const ManualColorInputContainer = styled.div`
  display: flex;
  flex-direction: row;
  align-items: center;
  font-size: 14px;
`;

export const HexInputContainer = styled.div`
  display: flex;
  flex-direction: row;
  align-items: center;
  border: 1px solid ${({ theme }) => theme.colors.gray_4};
  height: 40px;
  margin-left: 2em;
`;

export const HexInputPreview = styled.div<HexInputPreviewProps>`
  width: 32px;
  height: 32px;
  margin: 4px;
  border-radius: 4px;
  background-color: ${({ color }) => color};
`;

export const HexInput = styled.input`
  border: none;
  background: none;
  width: 70px;
  margin-left: 0.6em;
`;

export const PreviewContainer = styled.div`
  display: flex;
  flex-direction: row;

  > * + * {
    margin-left: 5em;
  }
`;

export const PreviewItem = styled.div<PreviewItemProps>`
  width: 25%;
  max-width: 300px;
  min-width: 220px;

  > img {
    width: 100%;
    border: 4px solid
      ${({ $isSelected, theme }) =>
        $isSelected ? theme.colors.primary : theme.colors.gray_5};
  }
`;
