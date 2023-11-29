import React from 'react';
import useUser from '../../../hooks/useUser';
import { Box, Button } from '@mui/material';
import { useTable } from 'react-table';
import Swal from 'sweetalert2';
import useAxiosPublic from '../../../hooks/useAxiosPublic';

const PremiumRequest = () => {
    const [, allUser, reload] = useUser()
    const axiosPublic = useAxiosPublic()
    console.log(allUser)
    const notPremium = allUser?.filter(singleUser => singleUser.premium === false)
    console.log(notPremium)

    const data = React.useMemo(() => notPremium || [], [notPremium])

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
                        {user?.premium === true ? 'Premium' : <Button onClick={() => handleUpdatePremium(row.value)} variant="outlined">Make Premium</Button>}

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

export default PremiumRequest;