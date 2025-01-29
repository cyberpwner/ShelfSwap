import { Button, ButtonProps } from '@chakra-ui/react';

interface Props extends ButtonProps {
  children: React.ReactNode | string;
  disabled: boolean;
  type?: 'button' | 'submit' | 'reset';
  handleClick?: () => void;
}

function FormButton({ children, disabled, type = 'button', handleClick, ...rest }: Props) {
  return (
    <Button {...rest} type={type} onClick={handleClick || undefined} disabled={disabled}>
      {children}
    </Button>
  );
}

export default FormButton;
