import styled from 'styled-components';

export const ColorPickerContainer = styled.div`
  .react-colorful {
    width: 300px;
    height: 220px;
  }

  .react-colorful__pointer {
    width: 20px;
    height: 20px;
    border: 4px solid #fff;
  }

  .react-colorful__saturation,
  .react-colorful__last-control {
    border-radius: 0;
    border-bottom: 0;
  }

  .react-colorful__hue {
    height: 8px;
    border-radius: 4px;
    margin-top: 1em;
  }

  .react-colorful__hue-pointer {
    width: 12px;
    height: 24px;
    border-radius: 6px;
    box-shadow: 0px 1px 2px 0px #00000026;
    border: 3px solid #fff;
  }
`;
