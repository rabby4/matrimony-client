import { Box, Button } from '@mui/material';
import React from 'react';
import useRequested from '../../../hooks/useRequested';
import { useTable } from 'react-table';
import Swal from 'sweetalert2';
import useAxiosPublic from '../../../hooks/useAxiosPublic';

const MyContactRequest = () => {
    const axiosPublic = useAxiosPublic()
    const [, userData, refresh] = useRequested()

    const handleDelete = (id) => {
        Swal.fire({
            title: "Are you sure?",
            text: "You want to delete your favorite person!",
            icon: "warning",
            showCancelButton: true,
            confirmButtonColor: "#3085d6",
            cancelButtonColor: "#d33",
            confirmButtonText: "Yes, delete it!"
        }).then((result) => {
            if (result.isConfirmed) {
                axiosPublic.delete(`/payments/${id}`)
                    .then(res => {
                        if (res.data.deletedCount > 0) {
                            Swal.fire({
                                title: "Deleted!",
                                text: "Your favorite person has been deleted.",
                                icon: "success"
                            });
                            refresh()
                        }
                    })
            }
        });
    }
    const data = React.useMemo(() => userData || [], [userData])
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
            Header: 'Number',
            accessor: 'phone'
        },
        {
            Header: 'Status',
            accessor: 'status'
            // const user = data.find((user) => user._id === row.value);
            // {row?.status === 'Approve' ? 'Approved' : <Button on variant="outlined">Delete</Button>}

        },
        {
            Header: 'Action',
            accessor: '_id',
            Cell: (row) => (
                <Box>
                    <Button onClick={() => handleDelete(row.value)} variant="outlined">Delete</Button>
                </Box>
            ),

        }
    ], [data]);

    const { getTableProps, getTableBodyProps, headerGroups, rows, prepareRow } = useTable({ columns, data })


    return (
        <>
            <Box>
                <table {...getTableProps()} width={'100%'}>
                    <thead style={{ textAlign: 'left' }}>
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

export default MyContactRequest;