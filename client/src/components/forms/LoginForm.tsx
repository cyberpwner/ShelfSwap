import { Box, BoxProps, Input, Spinner, VStack } from '@chakra-ui/react';
import { Field } from '../ui/field';
import { z } from 'zod';
import { Dispatch, SetStateAction, useState } from 'react';
import { useForm } from 'react-hook-form';
import { zodResolver } from '@hookform/resolvers/zod';
import { loginSchema } from '@/schemas/user.schemas';
import { IUser } from '@/types/user.types';
import FormButton from '../buttons/FormButton';
import { PasswordInput } from '../ui/password-input';
import { useNavigate } from 'react-router';
import { axiosInstance } from '@/api/api';
import { isAxiosError } from 'axios';
import { toaster, Toaster } from '../ui/toaster';
import { useAuth } from '@/contexts/AuthContext/useAuth';

interface FormProps extends BoxProps {
  setIsShowRegister: Dispatch<SetStateAction<boolean>>;
}

type LoginData = z.infer<typeof loginSchema>;

interface LoginResponse {
  user: IUser;
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

interface BackendValidationError {
  username?: string;
  email?: string;
  password?: string;
  root?: string;
}

async function sendLoginRequest(formData: LoginData): Promise<LoginResponse | ErrorResponse> {
  try {
    const response = await axiosInstance.post<LoginResponse>('/users/login', formData, {
      headers: {
        'Content-Type': 'application/json',
      },
    });

    return response.data;
  } catch (error) {
    if (isAxiosError(error)) {
      return error.response?.data;
    }

    return {
      error: 'Something went wrong.',
    };
  }
}

function LoginForm({ setIsShowRegister, ...rest }: FormProps) {
  const navigate = useNavigate();
  const [backendErrors, setBackendErrors] = useState<BackendValidationError>({});
  const {
    register,
    handleSubmit,
    reset,
    formState: { errors, isSubmitting, isLoading },
  } = useForm<LoginData>({
    resolver: zodResolver(loginSchema),
  });
  const { setUser } = useAuth();

  const onSubmit = handleSubmit(async (formData) => {
    const data = await sendLoginRequest(formData);

    if (!data) {
      const errorMsg = 'Failed to login. Try again later.';

      setBackendErrors({ root: errorMsg });

      // show error in toast message
      toaster.create({
        type: 'error',
        title: 'Oops',
        description: errorMsg,
      });

      return;
    }

    if (isErrorResponse(data)) {
      if (data.error) {
        setBackendErrors({ root: data.error });

        // show error in toast message
        toaster.create({
          type: 'error',
          title: 'Oops',
          description: data.error,
        });
      }

      if (data.errors?.formErrors) {
        const errorMsg = data.errors?.formErrors?.join(', ');
        setBackendErrors({ root: errorMsg });

        // show error in toast message
        toaster.create({
          type: 'error',
          title: 'Error',
          description: errorMsg,
        });
      }

      if (data.errors && Object.keys(data?.errors).length > 0) {
        // each entry is an array => ['key', 'value']
        const aux: BackendValidationError = {};

        outerLoop: for (const entry of Object.entries(data.errors.fieldErrors)) {
          const fieldErrors = entry[1].join(', ');
          const fieldName = entry[0];

          switch (fieldName) {
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

    const user = data.user;

    reset();
    setBackendErrors({});
    setUser({ id: user.id, username: user.username, role: user.role });
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
              w="full"
              letterSpacing="wide"
              transition="all"
              _dark={{
                color: 'gray.100',
                bg: 'gray.900',
                _focus: { borderColor: 'gray.200' },
                _selection: { bg: 'gray.500' },
              }}
              css={{ '--focus-color': 'var(--primary-purple)' }}
              placeholder="juan@mail.com"
              {...register('email')}
              required={true}
              variant="flushed"
            />

            {backendErrors.email && <small>{backendErrors.email}</small>}
          </Field>

          <Field label="Password" invalid={!!errors.password} errorText={errors.password?.message}>
            <PasswordInput
              color="gray.700"
              outline="none"
              bg="var(--subtle-purple)"
              p="6"
              w="full"
              letterSpacing="wide"
              transition="all"
              _dark={{
                color: 'gray.100',
                bg: 'gray.900',
                _focus: { borderColor: 'gray.200' },
                _selection: { bg: 'gray.500' },
              }}
              css={{ '--focus-color': 'var(--primary-purple)' }}
              placeholder="P@ssw0rd!"
              {...register('password')}
              required={true}
              variant="flushed"
            />

            {backendErrors.password && <small>{backendErrors.password}</small>}
          </Field>

          {/* root form errors to be shown in toaster */}
          <Toaster />
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
