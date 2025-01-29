import { Box, BoxProps, Input, Spinner, VStack } from '@chakra-ui/react';
import { zodResolver } from '@hookform/resolvers/zod';
import { Dispatch, SetStateAction, useState } from 'react';
import { useForm } from 'react-hook-form';
import { z } from 'zod';
import { Field } from '../ui/field';
import { registerSchema } from '@/schemas/user.schemas';
import FormButton from '../buttons/FormButton';
import { PasswordInput } from '../ui/password-input';
import { API_BASE_URL } from '@/constants/api.constants';
import { User } from '@/types/user.types';
import { useNavigate } from 'react-router';

async function sendLoginRequest(formData: RegisterData) {
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

interface FormProps extends BoxProps {
  setIsShowRegister: Dispatch<SetStateAction<boolean>>;
}

type RegisterData = z.infer<typeof registerSchema>;

function RegisterForm({ setIsShowRegister, ...rest }: FormProps) {
  const navigate = useNavigate();
  const [error, setError] = useState('');
  const {
    register,
    handleSubmit,
    reset,
    formState: { errors, isSubmitting, isLoading },
  } = useForm<RegisterData>({
    resolver: zodResolver(registerSchema),
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
    <Box as="form" onSubmit={onSubmit} {...rest}>
      <VStack w="full" gap="16">
        <VStack w="full" gap="6">
          <Field label="Username" invalid={!!errors.username} errorText={errors.username?.message}>
            <Input
              letterSpacing="wide"
              color="gray.700"
              type="text"
              outline="none"
              bg="var(--subtle-purple)"
              autoFocus
              p="6"
              w="full"
              {...register('username')}
              placeholder="your.username"
              _placeholder={{ color: 'gray.500' }}
            />
          </Field>

          <Field label="Email" invalid={!!errors.email} errorText={errors.email?.message}>
            <Input
              letterSpacing="wide"
              color="gray.700"
              type="email"
              outline="none"
              bg="var(--subtle-purple)"
              p="6"
              w="full"
              placeholder="juan@mail.com"
              {...register('email')}
            />
          </Field>

          <Field label="Password" invalid={!!errors.password} errorText={errors.password?.message}>
            <PasswordInput
              letterSpacing="wide"
              color="gray.700"
              type="password"
              outline="none"
              bg="var(--subtle-purple)"
              p="6"
              w="full"
              {...register('password')}
              placeholder="P@ssw0rd!"
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
            type="submit"
            p="6"
            w="full"
            disabled={isSubmitting || isLoading}
            _dark={{ bg: 'var(--primary-purple)', color: 'white', _hover: { bg: 'var(--primary-purple)/90' } }}
          >
            {isLoading || isSubmitting ? <Spinner /> : 'Register'}
          </FormButton>

          <FormButton
            handleClick={() => setIsShowRegister((prev: boolean) => !prev)}
            p="6"
            w="full"
            disabled={isSubmitting || isLoading}
            _dark={{ bg: 'var(--primary-purple)', color: 'white', _hover: { bg: 'var(--primary-purple)/90' } }}
          >
            Login
          </FormButton>
        </VStack>
      </VStack>
    </Box>
  );
}

export default RegisterForm;
