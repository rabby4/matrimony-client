import React from 'react';
import useUser from '../../../hooks/useUser';
import { Box, Button, Typography } from '@mui/material';
import { useTable } from 'react-table';
import useAxiosPublic from '../../../hooks/useAxiosPublic';
import Swal from 'sweetalert2';

const ManageUsers = () => {
    const [, allUser, reload] = useUser()
    const axiosPublic = useAxiosPublic()
    console.log(allUser)
    const data = React.useMemo(() => allUser || [], [allUser])

    const handleUpdatePremium = (id) => {
        axiosPublic.patch(`/users/${id}`, { premium: true })
            .then(res => {
                console.log(res.data)
                if (res.data.modifiedCount > 0) {
                    Swal.fire({
                        title: "Confirm!",
                        text: "User successfully make Premium member!",
                        icon: "success"
                    });
                    reload()
                }
            })
    }
    const handleMakeAdmin = (id) => {
        axiosPublic.patch(`/users/admin/${id}`)
            .then(res => {
                console.log(res.data)
                if (res.data.modifiedCount > 0) {
                    Swal.fire({
                        title: "Confirm!",
                        text: "User successfully make Premium member!",
                        icon: "success"
                    });
                    reload()
                }
            })
    }

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
                    <Box display={'flex'} sx={{ justifyContent: 'space-between', marginBottom: '15px' }}>
                        {user?.role === 'admin' ? <Typography>Admin</Typography> : <Button onClick={() => handleMakeAdmin(row.value)} variant="outlined">Make Admin</Button>}
                        {user?.premium === true ? <Typography sx={{ textAlign: 'right' }}>Premium</Typography> : <Button onClick={() => handleUpdatePremium(row.value)} variant="outlined">
                            Make Premium
                        </Button>}
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