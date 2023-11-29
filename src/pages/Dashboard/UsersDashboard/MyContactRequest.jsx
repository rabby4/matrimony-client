import { Box, Button } from '@mui/material';
import React from 'react';
import useRequested from '../../../hooks/useRequested';
import { useTable } from 'react-table';

const MyContactRequest = () => {
    const [, userData, isAllLoading] = useRequested()

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
        },
        {
            Header: 'Action',
            accessor: '_id',
            Cell: (row) => {
                const user = data.find((user) => user._id === row.value);

                return (
                    <Box sx={{ marginBottom: '15px', marginTop: '20px' }}>
                        {row?.status === 'Approve' ? 'Approved' : <Button variant="outlined">Delete</Button>}

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