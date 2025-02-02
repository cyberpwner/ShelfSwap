import { Box, createListCollection, Input, Spinner, VStack } from '@chakra-ui/react';
import { zodResolver } from '@hookform/resolvers/zod';
import { useState } from 'react';
import { Controller, useForm } from 'react-hook-form';
import { z } from 'zod';
import { Field } from '../ui/field';
import { createUserSchema } from '@/schemas/user.schemas';
import FormButton from '../buttons/FormButton';
import { PasswordInput } from '../ui/password-input';
import { axiosInstance } from '@/api/api';
import { IUser, UserRole } from '@/types/user.types';
import { useNavigate } from 'react-router';
import { AxiosError } from 'axios';
import { toaster, Toaster } from '../ui/toaster';
import { SelectContent, SelectItem, SelectRoot, SelectTrigger, SelectValueText } from '../ui/select';

interface CreateUserResponse {
  user?: IUser;
}

interface ErrorResponse {
  errors?: {
    fieldErrors: {
      username?: string[];
      email?: string[];
      password?: string[];
      role?: string[];
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
  role?: string;
  root?: string;
}

type CreateUserData = z.infer<typeof createUserSchema>;

async function sendCreateUserRequest(
  formData: CreateUserData,
): Promise<CreateUserResponse | ErrorResponse | undefined> {
  try {
    const res = await axiosInstance.post<CreateUserResponse>(
      '/users/create',
      {
        ...formData,
      },
      {
        headers: {
          'Content-Type': 'application/json',
        },
      },
    );

    const data: { user?: IUser } = res.data;
    return data;
  } catch (error) {
    if (error instanceof AxiosError) {
      return error.response?.data;
    }
  }
}

function CreateUserForm({ ...rest }) {
  const navigate = useNavigate();
  const [backendErrors, setBackendErrors] = useState<BackendValidationError>({});
  const {
    register,
    handleSubmit,
    reset,
    control,
    formState: { errors, isSubmitting, isLoading },
  } = useForm<CreateUserData>({
    resolver: zodResolver(createUserSchema),
  });

  const onSubmit = handleSubmit(async (formData) => {
    const data = await sendCreateUserRequest(formData);

    if (!data) {
      const errorMsg = 'Failed to createUser. Try again later.';

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
            case 'username':
              aux['username'] = fieldErrors;
              continue outerLoop;
            case 'email':
              aux['email'] = fieldErrors;
              continue outerLoop;
            case 'password':
              aux['password'] = fieldErrors;
              continue outerLoop;
            case 'role':
              aux['role'] = fieldErrors;
              continue outerLoop;
          }
        }

        setBackendErrors((prev) => ({ ...prev, ...aux }));
      }

      return;
    }

    reset();
    setBackendErrors({});
    navigate('/dashboard');
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
              _dark={{
                color: 'gray.100',
                bg: 'gray.900',
                _focus: { borderColor: 'gray.200' },
                _selection: { bg: 'gray.500' },
              }}
              css={{ '--focus-color': 'var(--primary-purple)' }}
              placeholder="your.username"
              _placeholder={{ color: 'gray.500' }}
              transition="all"
              required={true}
              {...register('username')}
              variant="flushed"
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
              _dark={{
                color: 'gray.100',
                bg: 'gray.900',
                _focus: { borderColor: 'gray.200' },
                _selection: { bg: 'gray.500' },
              }}
              css={{ '--focus-color': 'var(--primary-purple)' }}
              transition="all"
              placeholder="juan@mail.com"
              required={true}
              {...register('email')}
              variant="flushed"
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
              _dark={{
                color: 'gray.100',
                bg: 'gray.900',
                _focus: { borderColor: 'gray.200' },
                _selection: { bg: 'gray.500' },
              }}
              css={{ '--focus-color': 'var(--primary-purple)' }}
              transition="all"
              placeholder="P@ssw0rd!"
              {...register('password')}
              required={true}
              variant="flushed"
            />

            {backendErrors.password && <small>{backendErrors.password}</small>}
          </Field>

          <Field label="Role" invalid={!!errors.role} errorText={errors.role?.message}>
            <Controller
              control={control}
              name="role"
              render={({ field }) => (
                <SelectRoot
                  name={field.name}
                  value={field.value as unknown as string[]}
                  onValueChange={({ value }) => field.onChange(value ? value[0] : undefined)}
                  onInteractOutside={() => field.onBlur()}
                  collection={roles}
                >
                  <SelectTrigger>
                    <SelectValueText placeholder="Select role" />
                  </SelectTrigger>
                  <SelectContent>
                    {roles.items.map((role) => (
                      <SelectItem cursor="pointer" item={role} key={role.value}>
                        {role.label}
                      </SelectItem>
                    ))}
                  </SelectContent>
                </SelectRoot>
              )}
            />
          </Field>

          <Toaster />
        </VStack>

        <VStack w="full" gap="2">
          <FormButton
            type="submit"
            p="6"
            w="full"
            disabled={isSubmitting || isLoading}
            _dark={{ bg: 'var(--primary-purple)', color: 'white', _hover: { bg: 'var(--primary-purple)/90' } }}
          >
            {isLoading || isSubmitting ? <Spinner /> : 'Create user'}
          </FormButton>
        </VStack>
      </VStack>
    </Box>
  );
}

const roles = createListCollection({
  items: [
    { label: 'User', value: UserRole.USER as string },
    { label: 'Admin', value: UserRole.ADMIN as string },
  ],
});

export default CreateUserForm;
