import React from 'react';
import useRequested from '../../../hooks/useRequested';
import { Box, Button } from '@mui/material';
import DeleteIcon from '@mui/icons-material/Delete';
import { useTable } from 'react-table';

const ContactRequest = () => {
    const [allRequest, isAllLoading] = useRequested()
    const data = React.useMemo(() => allRequest || [], [allRequest])

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
                const user = data.find((user) => user._id === row.value);

                return (
                    <Box sx={{ textAlign: 'center', marginBottom: '15px', marginTop: '20px' }}>
                        {row?.status === 'Approve' ? 'Approved' : <Button variant="outlined">Approve</Button>}

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