import React from 'react';
import useUser from '../../../hooks/useUser';
import { Box, Button } from '@mui/material';
import { useTable } from 'react-table';
import { useQuery } from '@tanstack/react-query';
import useAuth from '../../../hooks/useAuth';
import useAxiosPublic from '../../../hooks/useAxiosPublic';


const FavoritesBioData = () => {
    const { user } = useAuth()
    const axiosPublic = useAxiosPublic()
    const { data: favUserInfo } = useQuery({
        queryKey: ['favUser'],
        queryFn: async () => {
            const res = await axiosPublic.get(`/favorites/${user.email}`);
            return res.data;
        },
    })
    console.log(favUserInfo)
    // const data = React.useMemo(() => favUserInfo || [], [favUserInfo])

    // const columns = React.useMemo(() => [
    //     {
    //         Header: 'Name',
    //         accessor: "name"
    //     },
    //     {
    //         Header: 'Bio Data Id',
    //         accessor: "_id"
    //     },
    //     {
    //         Header: 'Permanent Address',
    //         accessor: "permanentDivision"
    //     },
    //     {
    //         Header: 'Occupation',
    //         accessor: "occupation"
    //     },
    //     {
    //         Header: 'Action',
    //         accessor: '_id',
    //         Cell: (row) => (
    //             <Box>
    //                 <Button>Delete</Button>
    //                 {/* onClick={() => handleDelete(row.value)} */}
    //             </Box>
    //         ),
    //     }
    // ], []);

    // const { getTableProps, getTableBodyProps, headerGroups, rows, prepareRow } = useTable({ columns, data })
    // console.log('headerGroups', headerGroups);
    // console.log('rows', rows);
    return (
        <>
            <Box>
                {/* <table {...getTableProps()} className="">
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
                </table> */}
            </Box>
        </>
    );
};

export default FavoritesBioData;