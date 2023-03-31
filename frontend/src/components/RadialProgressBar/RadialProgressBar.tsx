import React, { useCallback, useEffect } from 'react';

import { polarToCartesianCoords } from '../../utils/number';

import { Center, Circle, Container, Label, Path } from './sRadialProgressBar';

interface RadialProgressBarProps {
  value: number;
}

const RadialProgressBar: React.FC<RadialProgressBarProps> = ({ value }) => {
  const describeArc = useCallback((angle) => {
    const radius = 25;
    const start = polarToCartesianCoords({ x: 29, y: 29 }, radius, angle);
    const end = polarToCartesianCoords({ x: 29, y: 29 }, radius, 0);

    const moreThanHalf = angle <= 180 ? '0' : '1';

    return [
      'M',
      start.x,
      start.y,
      'A',
      radius,
      radius,
      0,
      moreThanHalf,
      0,
      end.x,
      end.y,
    ].join(' ');
  }, []);

  useEffect(() => {
    let angle = (value * 360) / 100;
    if (angle === 360) angle = 359.9999;

    document.getElementById('value_arc')?.setAttribute('d', describeArc(angle));
  }, [value, describeArc]);

  return (
    <Container>
      <Circle cx="29" cy="29" r="29" />
      <Center cx="29" cy="29" r="20" />
      <Path id="value_arc" />
      <Label
        x="50%"
        y="30"
        dominantBaseline="middle"
        textAnchor="middle"
      >{`${value}%`}</Label>
    </Container>
  );
};

export default RadialProgressBar;
