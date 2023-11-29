import React from 'react';
import useRequested from '../../../hooks/useRequested';
import { Box, Button, Typography } from '@mui/material';
import { useTable } from 'react-table';
import useAxiosSecure from '../../../hooks/useAxiosSecure';
import Swal from 'sweetalert2';

const ContactRequest = () => {
    const [allRequest, isAllLoading] = useRequested()
    const axiosSecure = useAxiosSecure()
    const data = React.useMemo(() => allRequest || [], [allRequest])

    const handleUpdate = (id) => {
        axiosSecure.patch(`/payment/${id}`, { status: 'Approved' })
            .then(res => {
                console.log(res.data)
                if (res.data.modifiedCount > 0) {
                    Swal.fire({
                        position: "center",
                        icon: "success",
                        title: "Your work has been saved",
                        showConfirmButton: false,
                        timer: 1500
                    });
                }
                isAllLoading()
            })
    }

    const columns = React.useMemo(() => [
        {
            Header: 'Name',
            accessor: "requesterName"
        },
        {
            Header: 'Email',
            accessor: "requesterEmail"
        },
        {
            Header: 'Bio Data ID',
            accessor: 'requesterBioId'
        },
        {
            Header: 'Approve Request',
            accessor: '_id',
            Cell: (row) => {
                // console.log(row.data)
                const user = data.find((user) => user._id === row.value);

                return (
                    <Box sx={{ marginBottom: '15px', marginTop: '20px' }}>
                        {user?.status === 'Approved' ? <Typography>Approved</Typography> : <Button onClick={() => handleUpdate(row.value)} variant="outlined">Approve</Button>}

                        {/* onClick={() => handleDelete(row.original?._id)} */}
                    </Box>
                );
            },

        }
    ], []);

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

export default ContactRequest;