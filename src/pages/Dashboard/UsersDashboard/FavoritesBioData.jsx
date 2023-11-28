import React from 'react';
import { Box, Button } from '@mui/material';
import { useTable } from 'react-table';
import { QueryClient, useMutation, useQuery, useQueryClient } from '@tanstack/react-query';
import useAuth from '../../../hooks/useAuth';
import useAxiosPublic from '../../../hooks/useAxiosPublic';
import useUser from '../../../hooks/useUser';
import Swal from 'sweetalert2';


const FavoritesBioData = () => {
    const { user } = useAuth()
    const [, , favUserInfo, refetch] = useUser()
    const axiosPublic = useAxiosPublic()


    const handleDelete = (id) => {
        Swal.fire({
            title: "Are you sure?",
            text: "You won't be able to revert this!",
            icon: "warning",
            showCancelButton: true,
            confirmButtonColor: "#3085d6",
            cancelButtonColor: "#d33",
            confirmButtonText: "Yes, delete it!"
        }).then((result) => {
            if (result.isConfirmed) {
                axiosPublic.delete(`/favorites/${id}`)
                    .then(res => {
                        if (res.data.deletedCount > 0) {
                            Swal.fire({
                                title: "Deleted!",
                                text: "Your file has been deleted.",
                                icon: "success"
                            });
                            refetch()
                        }
                    })

            }
        });


    }

    const data = React.useMemo(() => favUserInfo || [], [favUserInfo])

    const columns = React.useMemo(() => [
        {
            Header: 'Name',
            accessor: "name"
        },
        {
            Header: 'Permanent Address',
            accessor: "permanentDivision"
        },
        {
            Header: 'Occupation',
            accessor: "occupation"
        },
        {
            Header: 'Action',
            accessor: '_id',
            Cell: (row) => (
                <Box>
                    <Button onClick={() => handleDelete(row.value)}>Delete</Button>
                </Box>
            ),
        }
    ], []);


    const { getTableProps, getTableBodyProps, headerGroups, rows, prepareRow } = useTable({ columns, data })
    if (!favUserInfo) return 'loadding...'
    return (
        <>
            <Box>
                <table {...getTableProps()} width={'100%'} style={{ textAlign: 'left' }}>
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

export default FavoritesBioData;