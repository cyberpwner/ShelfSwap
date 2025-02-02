import { Button, Container, Editable, Grid, Heading, HStack, List, Stack, VStack } from '@chakra-ui/react';
import { useState } from 'react';
import { IUser, UserRole } from '@/types/user.types';
import { Link, useNavigate } from 'react-router';
import { TUpdateUser, updateUserSchema } from '@/schemas/user.schemas';
import { ZodError } from 'zod';
import { axiosInstance } from '@/api/api';
import { toaster } from '../ui/toaster';
import ConfirmPopup from '../ConfirmPopup';

interface Props {
  data: IUser;
}

// eslint-disable-next-line @typescript-eslint/no-explicit-any
function filterEmptyStrings<T extends Record<string, any>>(obj: T): T {
  return Object.fromEntries(Object.entries(obj).filter(([, value]) => value !== '')) as T;
}

async function deleteUser(id: string) {
  const res = await axiosInstance.delete<IUser>(`/users/${id}`);

  return res.data;
}

function EditUserForm({ data }: Props) {
  const [username, setUsername] = useState(data.username);
  const [email, setEmail] = useState(data.email);
  const [role, setRole] = useState(data.role);
  const [bio, setBio] = useState(data.bio ?? '');
  const [avatarUrl, setAvatarUrl] = useState(data.avatarUrl ?? '');
  const [errors, setErrors] = useState('');
  const navigate = useNavigate();

  async function saveChanges() {
    try {
      const updatedData = updateUserSchema.parse({ username, email, role, bio, avatarUrl });

      const filtered = filterEmptyStrings<TUpdateUser>(updatedData);

      await axiosInstance.put<Partial<IUser>>(
        `/users/${data.id}`,
        {
          ...filtered,
        },
        {
          headers: {
            'Content-Type': 'application/json',
          },
        },
      );

      navigate('/dashboard');
    } catch (error) {
      if (error instanceof ZodError) {
        setErrors(error.message);
      } else {
        setErrors('Failed to update user');
      }
    } finally {
      toaster.create({
        type: 'error',
        title: 'Error',
        description: errors,
      });
    }
  }

  return (
    <Stack minH="100vh" gap="24">
      <Grid placeItems="center" color="white" as="header" h="48" bg="blue.800">
        <Container>
          <Heading mx="auto" w="fit-content">
            <Link to="/dashboard">Dashboard</Link>
          </Heading>
        </Container>
      </Grid>

      <Container>
        <VStack mx="auto" w="fit-content">
          <HStack gap="12" p="8">
            <Stack>
              <List.Root gap="9">
                <List.Item fontWeight="semibold">Username:</List.Item>
                <List.Item fontWeight="semibold">Email</List.Item>
                <List.Item fontWeight="semibold">Role</List.Item>
                <List.Item fontWeight="semibold">Bio</List.Item>
                <List.Item fontWeight="semibold">AvatarUrl</List.Item>
              </List.Root>
            </Stack>

            <Stack>
              <Editable.Root
                value={username}
                onValueChange={(e) => setUsername(e.value)}
                placeholder="Edit username"
                activationMode="dblclick"
                bg="blue.subtle"
                p="2"
                rounded="md"
              >
                <Editable.Preview />
                <Editable.Input />
              </Editable.Root>

              <Editable.Root
                value={email}
                onValueChange={(e) => setEmail(e.value)}
                placeholder="Edit email"
                activationMode="dblclick"
                bg="blue.subtle"
                p="2"
                rounded="md"
              >
                <Editable.Preview />
                <Editable.Input />
              </Editable.Root>

              <Editable.Root
                value={role}
                onValueChange={(e) => setRole(e.value as UserRole)}
                placeholder="Edit role"
                activationMode="dblclick"
                bg="blue.subtle"
                p="2"
                rounded="md"
              >
                <Editable.Preview />
                <Editable.Input />
              </Editable.Root>

              <Editable.Root
                value={bio ?? ''}
                onValueChange={(e) => setBio(e.value)}
                placeholder="Edit bio"
                activationMode="dblclick"
                bg="blue.subtle"
                p="2"
                rounded="md"
              >
                <Editable.Preview />
                <Editable.Input />
              </Editable.Root>

              <Editable.Root
                value={avatarUrl ?? ''}
                onValueChange={(e) => setAvatarUrl(e.value)}
                placeholder="Edit avatarUrl"
                activationMode="dblclick"
                bg="blue.subtle"
                p="2"
                rounded="md"
              >
                <Editable.Preview />
                <Editable.Input />
              </Editable.Root>
            </Stack>
          </HStack>

          <HStack>
            <Button onClick={async () => await saveChanges()} size="md">
              Save changes
            </Button>
            {/* <Button colorPalette="red" onClick={async () => await deleteUser(data.id)}>
              Delete User
            </Button> */}
            <ConfirmPopup
              onClick={async () => {
                await deleteUser(data.id);
                navigate('/dashboard');
              }}
            />
          </HStack>
        </VStack>
      </Container>
    </Stack>
  );
}

export default EditUserForm;
