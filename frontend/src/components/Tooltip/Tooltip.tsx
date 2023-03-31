import React from 'react';

import { Container, Text } from './sTooltip';

interface TooltipProps {
  text: string;
  disabled?: boolean;
}

const Tooltip: React.FC<TooltipProps> = ({
  text,
  disabled = false,
  children,
}) => {
  return (
    <Container>
      {children}
      {!disabled && <Text>{text}</Text>}
    </Container>
  );
};

export default Tooltip;
