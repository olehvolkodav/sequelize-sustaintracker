import React, { ButtonHTMLAttributes } from 'react';

import { Container } from './sButton';

type ButtonProps = ButtonHTMLAttributes<HTMLButtonElement> & {
  loading?: boolean;
};

const Button: React.FC<ButtonProps> = ({ loading, children, ...rest }) => {
  return (
    <Container type="button" {...rest}>
      {loading ? <div className="loader" /> : <>{children}</>}
    </Container>
  );
};

export default Button;
