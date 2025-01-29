import { Box, BoxProps, Input, Spinner, VStack } from '@chakra-ui/react';
import { Field } from '../ui/field';
import { z } from 'zod';
import { Dispatch, SetStateAction, useState } from 'react';
import { useForm } from 'react-hook-form';
import { zodResolver } from '@hookform/resolvers/zod';
import { loginSchema } from '@/schemas/user.schemas';
import { User } from '@/types/user.types';
import FormButton from '../buttons/FormButton';
import { PasswordInput } from '../ui/password-input';
import { useNavigate } from 'react-router';
import { API_BASE_URL } from '@/constants/api.constants';

interface FormProps extends BoxProps {
  setIsShowRegister: Dispatch<SetStateAction<boolean>>;
}

type LoginData = z.infer<typeof loginSchema>;

async function sendLoginRequest(formData: LoginData) {
  const res = await fetch(`${API_BASE_URL}/users/login`, {
    method: 'POST',
    headers: {
      'Content-type': 'application/json',
    },
    body: JSON.stringify(formData),
  });

  const data: { user?: User; message: string } = await res.json();
  return data;
}

function LoginForm({ setIsShowRegister, ...rest }: FormProps) {
  const navigate = useNavigate();
  const [error, setError] = useState('');
  const {
    register,
    handleSubmit,
    reset,
    formState: { errors, isSubmitting, isLoading },
  } = useForm<LoginData>({
    resolver: zodResolver(loginSchema),
  });

  const onSubmit = handleSubmit(async (data) => {
    const res = await sendLoginRequest(data);

    if (!res?.user) {
      setError(res.message);
      return;
    }

    reset();
    setError('');
    navigate('/');
  });

  return (
    <Box as="form" onSubmit={onSubmit} {...rest} letterSpacing="wider">
      <VStack w="full" gap="16">
        <VStack w="full" gap="6">
          <Field label="Email" invalid={!!errors.email} errorText={errors.email?.message}>
            <Input
              color="gray.700"
              outline="none"
              bg="var(--subtle-purple)"
              autoFocus
              p="6"
              transition="all"
              w="full"
              letterSpacing="wide"
              placeholder="juan@mail.com"
              {...register('email')}
            />
          </Field>

          <Field label="Password" invalid={!!errors.password} errorText={errors.password?.message}>
            <PasswordInput
              color="gray.700"
              outline="none"
              bg="var(--subtle-purple)"
              letterSpacing="wide"
              p="6"
              w="full"
              placeholder="P@ssw0rd!"
              {...register('password')}
              transition="all"
            />
          </Field>

          {error && (
            <Box asChild className="errorBox" color="red">
              <small> {error} </small>
            </Box>
          )}
        </VStack>

        <VStack w="full" gap="2">
          <FormButton
            p="6"
            w="full"
            type="submit"
            disabled={isSubmitting || isLoading}
            _dark={{ bg: 'var(--primary-purple)', color: 'white', _hover: { bg: 'var(--primary-purple)/90' } }}
            transition="all"
          >
            {isLoading || isSubmitting ? <Spinner /> : 'Login'}
          </FormButton>

          <FormButton
            handleClick={() => setIsShowRegister((prev: boolean) => !prev)}
            disabled={isSubmitting || isLoading}
            p="6"
            w="full"
            _dark={{ bg: 'var(--primary-purple)', color: 'white', _hover: { bg: 'var(--primary-purple)/90' } }}
            transition="all"
          >
            Register
          </FormButton>
        </VStack>
      </VStack>
    </Box>
  );
}

export default LoginForm;
