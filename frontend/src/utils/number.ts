interface Point {
  x: number;
  y: number;
}

export const polarToCartesianCoords = (
  center: Point,
  radius: number,
  angleDeg: number
): Point => {
  const angleRad = ((angleDeg - 90) * Math.PI) / 180.0;

  return {
    x: center.x + radius * Math.cos(angleRad),
    y: center.y + radius * Math.sin(angleRad),
  };
};
