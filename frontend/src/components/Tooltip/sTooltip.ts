import styled from 'styled-components';

export const Text = styled.span`
  z-index: 1;
  visibility: hidden;
  opacity: 0;
  position: absolute;
  top: 0;
  left: 50%;
  transform: translate(-50%, -140%);
  width: fit-content;
  height: fit-content;
  background-color: #212121;
  color: #fff;
  text-align: center;
  padding: 3px 9px;
  border-radius: 2px;

  transition: opacity 0.1s;

  &:after {
    content: '';
    position: absolute;
    top: 100%;
    left: 50%;
    margin-left: -5px;
    border-width: 5px;
    border-style: solid;
    border-color: #212121 transparent transparent transparent;
  }
`;

export const Container = styled.div`
  position: relative;

  &:hover ${Text} {
    visibility: visible;
    opacity: 1;
  }
`;
