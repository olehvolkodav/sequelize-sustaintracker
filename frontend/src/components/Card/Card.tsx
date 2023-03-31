import React from 'react';

import { CardHeader, Container } from './sCard';

interface GridConfig {
  rStart?: number;
  rEnd?: number;
  cStart?: number;
  cEnd?: number;
}

interface CardProps {
  title?: string;
  gridConfig?: GridConfig;
}

const Card: React.FC<CardProps> = ({ title, gridConfig, children }) => {
  return (
    <Container gridConfig={gridConfig}>
      <CardHeader>{title}</CardHeader>
      {children}
    </Container>
  );
};

export default Card;
