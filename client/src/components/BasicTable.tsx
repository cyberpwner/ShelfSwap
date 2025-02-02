import { Button, For, HStack, Input, Stack, Table, Text } from '@chakra-ui/react';
import {
  ColumnDef,
  flexRender,
  getCoreRowModel,
  getFilteredRowModel,
  getPaginationRowModel,
  getSortedRowModel,
  SortingState,
  useReactTable,
} from '@tanstack/react-table';
import { PaginationNextTrigger, PaginationPrevTrigger, PaginationRoot } from './ui/pagination';
import { useState } from 'react';
import { HiOutlineSortAscending, HiOutlineSortDescending } from 'react-icons/hi';
import { Field } from './ui/field';
import { LinkButton } from './ui/link-button';
interface Props<T> {
  data: T[];
  // eslint-disable-next-line @typescript-eslint/no-explicit-any
  columns: ColumnDef<T, any>[];
  pathnameToEdit: string;
}

function BasicTable<T>({ data, columns, pathnameToEdit }: Props<T>) {
  const [sorting, setSorting] = useState<SortingState>([]);
  const [filter, setFilter] = useState('');

  const table = useReactTable({
    data,
    columns,
    state: {
      sorting,
      globalFilter: filter,
    },
    onSortingChange: setSorting,
    onGlobalFilterChange: setFilter,
    getCoreRowModel: getCoreRowModel(),
    getPaginationRowModel: getPaginationRowModel(),
    getSortedRowModel: getSortedRowModel(),
    getFilteredRowModel: getFilteredRowModel(),
  });

  return (
    <Stack gap="4" placeItems="center" p="8" w="full">
      <Field w="1/3">
        <Input
          value={filter}
          onChange={(e) => setFilter(e.target.value)}
          placeholder="Filter..."
          letterSpacing="wider"
          type="search"
          id="filter"
          name="filter"
          minW="48"
        />
      </Field>

      <Table.ScrollArea
        borderWidth="1px"
        maxW={{ base: 'xs', sm: 'md', md: 'xl', lg: '3xl', xl: '4xl', '2xl': '5xl' }}
        maxH="1000px"
      >
        <Table.Root variant="outline" showColumnBorder stickyHeader interactive>
          <Table.Header>
            {table.getHeaderGroups().map((headerGroup) => (
              <Table.Row key={headerGroup.id}>
                {headerGroup.headers.map((header) => (
                  <Table.ColumnHeader key={header.id}>
                    <HStack
                      onClick={header.column.getToggleSortingHandler()}
                      cursor={header.column.getCanSort() ? 'pointer' : 'default'}
                    >
                      {flexRender(header.column.columnDef.header, header.getContext())}

                      {{
                        asc: <HiOutlineSortAscending />,
                        desc: <HiOutlineSortDescending />,
                      }[header.column.getIsSorted() as string] ?? null}
                    </HStack>
                  </Table.ColumnHeader>
                ))}

                <Table.ColumnHeader key={'edit'} />
              </Table.Row>
            ))}
          </Table.Header>

          <Table.Body>
            <For each={table.getRowModel().rows}>
              {(row) => (
                <Table.Row key={row.id}>
                  <For each={row.getVisibleCells()}>
                    {(cell) => (
                      <Table.Cell p="4" key={cell.id}>
                        {flexRender(cell.column.columnDef.cell, cell.getContext())}
                      </Table.Cell>
                    )}
                  </For>

                  <For each={[...new Array(row.getVisibleCells().length + 1)]}>
                    {(_cell, index) =>
                      index === row.getVisibleCells().length ? (
                        <Table.Cell maxW="96" p="4" key={'action'}>
                          <LinkButton to={`${pathnameToEdit}/${row.getValue('id')}`} size="sm">
                            Edit
                          </LinkButton>
                        </Table.Cell>
                      ) : null
                    }
                  </For>
                </Table.Row>
              )}
            </For>
          </Table.Body>
        </Table.Root>
      </Table.ScrollArea>

      <PaginationRoot count={data.length}>
        <HStack wrap="wrap">
          <Button disabled={!table.getCanPreviousPage()} onClick={() => table.setPageIndex(0)}>
            <Text>{'<<'}</Text>
          </Button>

          <PaginationPrevTrigger disabled={!table.getCanPreviousPage()} onClick={() => table.previousPage()} />
          <PaginationNextTrigger disabled={!table.getCanNextPage()} onClick={() => table.nextPage()} />

          <Button disabled={!table.getCanNextPage()} onClick={() => table.setPageIndex(table.getPageCount() - 1)}>
            <Text>{'>>'}</Text>
          </Button>
        </HStack>
      </PaginationRoot>
    </Stack>
  );
}

export default BasicTable;
