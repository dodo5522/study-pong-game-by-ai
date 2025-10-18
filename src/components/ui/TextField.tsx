import React from 'react';
import { TextField as MuiTextField, TextFieldProps as MuiTextFieldProps } from '@mui/material';

interface TextFieldProps {
  value: string;
  onChange: (event: React.ChangeEvent<HTMLInputElement>) => void;
  placeholder?: string;
  disabled?: boolean;
  label?: string;
  variant?: MuiTextFieldProps['variant'];
}

const TextField: React.FC<TextFieldProps> = ({
  value,
  onChange,
  placeholder,
  disabled = false,
  label,
  variant = 'outlined',
  ...props
}) => {
  return (
    <MuiTextField
      value={value}
      onChange={onChange}
      placeholder={placeholder}
      disabled={disabled}
      label={label}
      variant={variant}
      {...props}
    />
  );
};

export default TextField;
