import { useUserList } from '@/hooks/useUserList/useUserList';
import BasicTable from '../BasicTable';
import CustomSpinner from '../CustomSpinner';
import { createColumnHelper } from '@tanstack/react-table';
import { IUser } from '@/types/user.types';
import { DateTime } from 'luxon';

const columnHelper = createColumnHelper<IUser>();

const columns = [
  columnHelper.accessor('id', {
    header: 'ID',
  }),
  columnHelper.accessor('username', {
    header: 'Username',
  }),
  columnHelper.accessor('email', {
    header: 'Email',
  }),
  columnHelper.accessor('role', {
    header: 'Role',
  }),
  columnHelper.accessor('createdAt', {
    header: 'CreatedAt',
    cell: (date) => DateTime.fromISO(date.getValue().toString()).toFormat('dd LLL yyyy'),
  }),
  columnHelper.accessor('bio', {
    header: 'Bio',
  }),
  columnHelper.accessor('avatarUrl', {
    header: 'AvatarUrl',
  }),
];

function UserListTable() {
  const { isPending, isError, data } = useUserList();

  if (isPending) {
    return <CustomSpinner />;
  }

  if (isError) {
    return null;
  }

  return <BasicTable<IUser> data={data.data} columns={columns} pathnameToEdit="users" />;
}

export default UserListTable;
