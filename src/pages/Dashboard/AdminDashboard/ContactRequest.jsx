import React from 'react';
import useRequested from '../../../hooks/useRequested';
import { Box, Button } from '@mui/material';
import DeleteIcon from '@mui/icons-material/Delete';
import { useTable } from 'react-table';

const ContactRequest = () => {
    const [allRequest, isAllLoading] = useRequested()
    console.log(allRequest,)
    const data = React.useMemo(() => allRequest || [], [allRequest])

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
            Header: 'Bio Data ID',
            accessor: '_id'
        },
        {
            Header: 'Action',
            accessor: 'status',
            Cell: (row) => {
                const user = data.find((user) => user._id === row.value);

                return (
                    <Box display={'flex'} sx={{ justifyContent: 'space-between', textAlign: 'center', marginBottom: '15px' }}>
                        {row?.status === 'Approve' ? 'Approved' : <Button variant="outlined" startIcon={<DeleteIcon />}>Approve</Button>}

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

export default ContactRequest;