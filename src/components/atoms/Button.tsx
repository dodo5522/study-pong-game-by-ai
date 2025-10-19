import React from 'react';
import { Button as MuiButton, ButtonProps as MuiButtonProps } from '@mui/material';

interface ButtonProps {
  children: React.ReactNode;
  onClick?: () => void;
  disabled?: boolean;
  variant?: MuiButtonProps['variant'];
  color?: MuiButtonProps['color'];
}

const Button: React.FC<ButtonProps> = ({
  children,
  onClick,
  disabled = false,
  variant = 'contained',
  color = 'primary',
  ...props
}) => {
  return (
    <MuiButton variant={variant} color={color} onClick={onClick} disabled={disabled} {...props}>
      {children}
    </MuiButton>
  );
};

export default Button;
