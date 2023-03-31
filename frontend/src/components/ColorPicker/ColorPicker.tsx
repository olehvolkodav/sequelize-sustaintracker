import React from 'react';

import { HexColorPicker } from 'react-colorful';

import { ColorPickerContainer } from './sColorPicker';

interface ColorPickerProps {
  color: string;
  onChange: (newColor: string) => void;
}

const ColorPicker: React.FC<ColorPickerProps> = ({ color, onChange }) => {
  return (
    <ColorPickerContainer>
      <HexColorPicker color={color} onChange={onChange} />
    </ColorPickerContainer>
  );
};

export default ColorPicker;
