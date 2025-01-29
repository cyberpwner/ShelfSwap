import { Box, BoxProps, Input, Spinner, VStack } from '@chakra-ui/react';
import { zodResolver } from '@hookform/resolvers/zod';
import { Dispatch, SetStateAction, useState } from 'react';
import { useForm } from 'react-hook-form';
import { z } from 'zod';
import { Field } from '../ui/field';
import { registerSchema } from '@/schemas/user.schemas';
import FormButton from '../buttons/FormButton';
import { PasswordInput } from '../ui/password-input';
import { axiosInstance } from '@/constants/api.constants';
import { User } from '@/types/user.types';
import { useNavigate } from 'react-router';
import { AxiosError } from 'axios';

interface RegisterResponse {
  user?: User;
  message: string;
}

interface ErrorResponse {
  errors?: {
    fieldErrors: {
      username?: string[];
      email?: string[];
      passwordConfirmation?: string[];
      password?: string[];
    };
    formErrors: string[];
  };
  error?: string;
}

// eslint-disable-next-line @typescript-eslint/no-explicit-any
function isErrorResponse(data: any): data is ErrorResponse {
  return !!data.errors || !!data.error;
}

interface FormProps extends BoxProps {
  setIsShowRegister: Dispatch<SetStateAction<boolean>>;
}

interface BackendValidationError {
  username?: string;
  email?: string;
  password?: string;
  root?: string;
}

type RegisterData = z.infer<typeof registerSchema>;

async function sendRegisterRequest(formData: RegisterData): Promise<RegisterResponse | ErrorResponse | undefined> {
  try {
    const res = await axiosInstance.post(
      '/users/register',
      {
        ...formData,
        // TODO: remove confirm password from api, or add it to client (either the solution below should be be temporary)
        passwordConfirmation: formData.password,
        // TODO: !!![SECURITY ISSUE]!!! a user could potentially create an admin account.
        // default all accounts created on the API to user.
        role: 'user',
      },
      {
        headers: {
          'Content-Type': 'application/json',
        },
      },
    );

    const data: { user?: User; message: string } = res.data;
    return data;
  } catch (error) {
    if (error instanceof AxiosError) {
      return error.response?.data;
    }
  }
}

function RegisterForm({ setIsShowRegister, ...rest }: FormProps) {
  const navigate = useNavigate();
  const [backendErrors, setBackendErrors] = useState<BackendValidationError>({});
  const {
    register,
    handleSubmit,
    reset,
    formState: { errors, isSubmitting, isLoading },
  } = useForm<RegisterData>({
    resolver: zodResolver(registerSchema),
  });

  const onSubmit = handleSubmit(async (formData) => {
    const data = await sendRegisterRequest(formData);

    if (!data) {
      setBackendErrors({ root: 'Failed to register. Try again later.' });
      return;
    }

    if (isErrorResponse(data)) {
      if (data.error) {
        setBackendErrors({ root: data.error });
      }

      if (data.errors?.formErrors) {
        setBackendErrors({ root: data.errors?.formErrors?.join(', ') });
      }

      if (data.errors && Object.keys(data?.errors).length > 0) {
        // each entry is an array => ['key', 'value']
        const aux: BackendValidationError = {};

        outerLoop: for (const entry of Object.entries(data.errors.fieldErrors)) {
          const fieldErrors = entry[1].join(', ');
          const fieldName = entry[0];

          switch (fieldName) {
            case 'username':
              aux['username'] = fieldErrors;
              continue outerLoop;
            case 'email':
              aux['email'] = fieldErrors;
              continue outerLoop;
            case 'password':
              aux['password'] = fieldErrors;
              continue outerLoop;
          }
        }

        setBackendErrors((prev) => ({ ...prev, ...aux }));
      }

      return;
    }

    reset();
    setBackendErrors({});
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
              placeholder="your.username"
              _placeholder={{ color: 'gray.500' }}
              required={true}
              {...register('username')}
            />

            {backendErrors.username && <small>{backendErrors.username}</small>}
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
              required={true}
              {...register('email')}
            />

            {backendErrors.email && <small>{backendErrors.email}</small>}
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
              required={true}
              placeholder="P@ssw0rd!"
            />

            {backendErrors.password && <small>{backendErrors.password}</small>}
          </Field>

          {backendErrors.root && (
            <Box asChild className="errorBox" color="red">
              <small>{backendErrors.root}</small>
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
