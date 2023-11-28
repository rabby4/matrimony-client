import React from 'react';
import useUser from '../../../hooks/useUser';
import { Box, Button } from '@mui/material';
import { useTable } from 'react-table';
import DeleteIcon from '@mui/icons-material/Delete';

const ManageUsers = () => {
    const [, allUser] = useUser()
    console.log(allUser)
    const data = React.useMemo(() => allUser || [], [allUser])

    const columns = React.useMemo(() => [
        {
            Header: 'Name',
            accessor: "name"
        },
        {
            Header: 'Email',
            accessor: "email"
        },
        {
            Header: 'Action',
            accessor: '_id',
            Cell: (row) => {
                const user = data.find((user) => user._id === row.value);

                return (
                    <Box display={'flex'} sx={{ justifyContent: 'space-between', textAlign: 'center', marginBottom: '15px' }}>
                        {user?.role === 'admin' ? 'Admin' : <Button variant="outlined" startIcon={<DeleteIcon />}>Make Admin</Button>}
                        <Button variant="outlined" startIcon={<DeleteIcon />}>
                            Delete
                        </Button>
                        {/* onClick={() => handleDelete(row.original?._id)} */}
                    </Box>
                );
            },

        }
    ], [data]);

    const { getTableProps, getTableBodyProps, headerGroups, rows, prepareRow } = useTable({ columns, data })
    return (
        <>
            <Box>
                <table {...getTableProps()} width={'100%'}>
                    <thead className="">
                        {headerGroups?.map((headerGroup) => (
                            <tr key={headerGroup.id} {...headerGroup.getFooterGroupProps()}>
                                {headerGroup?.headers?.map((column) => (
                                    <th key={column.id} {...column.getHeaderProps()} className="">
                                        {column?.render('Header')}
                                    </th>
                                ))}
                            </tr>
                        ))}
                    </thead>
                    <tbody {...getTableBodyProps()}>
                        {rows?.map((row) => {
                            prepareRow(row)
                            return (
                                <tr key={row?.id} {...row?.getRowProps()}>
                                    {row?.cells?.map((cell) => (
                                        <td key={cell?.id} {...cell?.getCellProps()} className="">
                                            {cell?.render('Cell')}
                                        </td>
                                    ))}
                                </tr>
                            )
                        })}
                    </tbody>
                </table>
            </Box>
        </>
    );
};

export default ManageUsers;