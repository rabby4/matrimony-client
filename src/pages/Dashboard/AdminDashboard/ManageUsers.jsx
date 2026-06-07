import { useMemo, useState } from 'react';
import {
    Avatar, Box, Button, Card, Chip, InputAdornment, MenuItem, Stack, Table, TableBody,
    TableCell, TableContainer, TableHead, TablePagination, TableRow, TextField, Typography
} from '@mui/material';
import SearchIcon from '@mui/icons-material/Search';
import { FaCrown, FaUserShield } from 'react-icons/fa';
import Swal from 'sweetalert2';
import useUser from '../../../hooks/useUser';
import useAxiosPublic from '../../../hooks/useAxiosPublic';
import { brand } from '../../../theme/theme';

const headCellStyle = { fontWeight: 600, color: 'text.secondary', fontSize: '12px', letterSpacing: '0.5px', whiteSpace: 'nowrap' };

const ManageUsers = () => {
    const [, allUser, reload] = useUser()
    const axiosPublic = useAxiosPublic()

    const [search, setSearch] = useState('')
    const [roleFilter, setRoleFilter] = useState('all')
    const [page, setPage] = useState(0)
    const [rowsPerPage, setRowsPerPage] = useState(10)

    const users = useMemo(() => {
        let list = allUser || []
        if (search.trim()) {
            const term = search.trim().toLowerCase()
            list = list.filter(user =>
                user.name?.toLowerCase().includes(term) || user.email?.toLowerCase().includes(term)
            )
        }
        if (roleFilter === 'admin') list = list.filter(user => user.role === 'admin')
        if (roleFilter === 'premium') list = list.filter(user => user.premium === true)
        if (roleFilter === 'member') list = list.filter(user => user.role !== 'admin' && user.premium !== true)
        return list
    }, [allUser, search, roleFilter])

    const pagedUsers = users.slice(page * rowsPerPage, page * rowsPerPage + rowsPerPage)

    const handleMakeAdmin = (user) => {
        Swal.fire({
            title: `Make ${user.name || user.email} an admin?`,
            text: 'Admins can manage users and approve requests.',
            icon: 'question',
            showCancelButton: true,
            confirmButtonColor: brand.secondary,
            confirmButtonText: 'Yes, make admin',
        }).then(result => {
            if (!result.isConfirmed) return
            axiosPublic.patch(`/users/admin/${user._id}`)
                .then(res => {
                    if (res.data.modifiedCount > 0) {
                        Swal.fire({ title: 'Done!', text: `${user.name || 'User'} is now an admin.`, icon: 'success', timer: 1800, showConfirmButton: false });
                        reload()
                    }
                })
                .catch(() => Swal.fire({ icon: 'error', title: 'Oops...', text: 'Could not update the user!' }))
        })
    }

    const handleMakePremium = (user) => {
        Swal.fire({
            title: `Make ${user.name || user.email} premium?`,
            text: 'Premium members can view contact information directly.',
            icon: 'question',
            showCancelButton: true,
            confirmButtonColor: brand.secondary,
            confirmButtonText: 'Yes, make premium',
        }).then(result => {
            if (!result.isConfirmed) return
            axiosPublic.patch(`/users/${user._id}`, { premium: true })
                .then(res => {
                    if (res.data.modifiedCount > 0) {
                        Swal.fire({ title: 'Done!', text: `${user.name || 'User'} is now a premium member.`, icon: 'success', timer: 1800, showConfirmButton: false });
                        reload()
                    }
                })
                .catch(() => Swal.fire({ icon: 'error', title: 'Oops...', text: 'Could not update the user!' }))
        })
    }

    return (
        <Box>
            {/* page header */}
            <Stack direction={{ xs: 'column', sm: 'row' }} justifyContent='space-between' alignItems={{ xs: 'flex-start', sm: 'center' }} spacing={2} sx={{ mb: '24px' }}>
                <Box>
                    <Typography sx={{ fontFamily: 'Playfair Display', fontWeight: 700, fontSize: { xs: '22px', md: '26px' }, color: brand.primary }}>
                        Manage Users
                    </Typography>
                    <Typography sx={{ color: 'text.secondary', fontSize: '13.5px', mt: '2px' }}>
                        {users.length} of {allUser?.length || 0} members shown
                    </Typography>
                </Box>
                <Stack direction={{ xs: 'column', sm: 'row' }} spacing={1.5} sx={{ width: { xs: '100%', sm: 'auto' } }}>
                    <TextField
                        size='small'
                        placeholder='Search name or email…'
                        value={search}
                        onChange={(e) => { setSearch(e.target.value); setPage(0); }}
                        InputProps={{
                            startAdornment: (
                                <InputAdornment position='start'>
                                    <SearchIcon fontSize='small' sx={{ color: 'text.secondary' }} />
                                </InputAdornment>
                            ),
                        }}
                        sx={{ minWidth: { sm: '260px' }, bgcolor: '#fff', borderRadius: '8px' }}
                    />
                    <TextField
                        select
                        size='small'
                        label='Filter'
                        value={roleFilter}
                        onChange={(e) => { setRoleFilter(e.target.value); setPage(0); }}
                        sx={{ minWidth: '140px', bgcolor: '#fff', borderRadius: '8px' }}
                    >
                        <MenuItem value='all'>All Users</MenuItem>
                        <MenuItem value='admin'>Admins</MenuItem>
                        <MenuItem value='premium'>Premium</MenuItem>
                        <MenuItem value='member'>Regular Members</MenuItem>
                    </TextField>
                </Stack>
            </Stack>

            {/* table */}
            <Card sx={{ borderRadius: '16px', boxShadow: '0px 8px 30px 0px rgba(17,17,17,0.06)', overflow: 'hidden' }}>
                <TableContainer>
                    <Table sx={{ minWidth: 700 }}>
                        <TableHead>
                            <TableRow sx={{ bgcolor: '#fbf8f0' }}>
                                <TableCell sx={headCellStyle}>USER</TableCell>
                                <TableCell sx={headCellStyle}>DIVISION</TableCell>
                                <TableCell sx={headCellStyle}>STATUS</TableCell>
                                <TableCell sx={headCellStyle} align='right'>ACTIONS</TableCell>
                            </TableRow>
                        </TableHead>
                        <TableBody>
                            {pagedUsers.map(user => (
                                <TableRow key={user._id} hover sx={{ '&:last-child td': { border: 0 } }}>
                                    <TableCell>
                                        <Stack direction='row' spacing={1.5} alignItems='center'>
                                            <Avatar
                                                src={user.photo}
                                                alt={user.name}
                                                imgProps={{ referrerPolicy: 'no-referrer' }}
                                                sx={{ width: 42, height: 42, bgcolor: brand.primaryLight, fontWeight: 600 }}
                                            >
                                                {user.name?.charAt(0)?.toUpperCase()}
                                            </Avatar>
                                            <Box sx={{ minWidth: 0 }}>
                                                <Typography noWrap sx={{ fontSize: '14px', fontWeight: 600 }}>{user.name || 'Unnamed'}</Typography>
                                                <Typography noWrap sx={{ fontSize: '12.5px', color: 'text.secondary' }}>{user.email}</Typography>
                                            </Box>
                                        </Stack>
                                    </TableCell>
                                    <TableCell sx={{ fontSize: '13.5px' }}>{user.permanentDivision || '—'}</TableCell>
                                    <TableCell>
                                        <Stack direction='row' spacing={1}>
                                            {user.role === 'admin' && (
                                                <Chip label='ADMIN' size='small' sx={{ fontSize: '10.5px', fontWeight: 700, height: '22px', bgcolor: '#ece4f7', color: '#6c3fb5' }} />
                                            )}
                                            {user.premium === true && (
                                                <Chip label='PREMIUM' size='small' sx={{ fontSize: '10.5px', fontWeight: 700, height: '22px', bgcolor: '#fff3d1', color: '#a07400' }} />
                                            )}
                                            {user.role !== 'admin' && user.premium !== true && (
                                                <Chip label='MEMBER' size='small' sx={{ fontSize: '10.5px', fontWeight: 700, height: '22px', bgcolor: '#eef1f4', color: '#5a6573' }} />
                                            )}
                                        </Stack>
                                    </TableCell>
                                    <TableCell align='right'>
                                        <Stack direction='row' spacing={1} justifyContent='flex-end'>
                                            {user.role !== 'admin' && (
                                                <Button
                                                    onClick={() => handleMakeAdmin(user)}
                                                    size='small'
                                                    variant='outlined'
                                                    startIcon={<FaUserShield style={{ fontSize: '13px' }} />}
                                                    sx={{ fontSize: '12px', whiteSpace: 'nowrap', ':hover': { bgcolor: brand.primary, color: '#fff', borderColor: brand.primary } }}
                                                >
                                                    Make Admin
                                                </Button>
                                            )}
                                            {user.premium !== true && (
                                                <Button
                                                    onClick={() => handleMakePremium(user)}
                                                    size='small'
                                                    variant='outlined'
                                                    color='secondary'
                                                    startIcon={<FaCrown style={{ fontSize: '13px' }} />}
                                                    sx={{ fontSize: '12px', whiteSpace: 'nowrap', ':hover': { bgcolor: brand.secondary, color: '#fff' } }}
                                                >
                                                    Make Premium
                                                </Button>
                                            )}
                                            {user.role === 'admin' && user.premium === true && (
                                                <Typography sx={{ fontSize: '12.5px', color: 'text.secondary' }}>—</Typography>
                                            )}
                                        </Stack>
                                    </TableCell>
                                </TableRow>
                            ))}
                            {pagedUsers.length === 0 && (
                                <TableRow>
                                    <TableCell colSpan={4} sx={{ textAlign: 'center', py: '50px' }}>
                                        <Typography sx={{ color: 'text.secondary', fontSize: '14px' }}>
                                            No users match your search.
                                        </Typography>
                                    </TableCell>
                                </TableRow>
                            )}
                        </TableBody>
                    </Table>
                </TableContainer>
                <TablePagination
                    component='div'
                    count={users.length}
                    page={page}
                    onPageChange={(e, newPage) => setPage(newPage)}
                    rowsPerPage={rowsPerPage}
                    onRowsPerPageChange={(e) => { setRowsPerPage(parseInt(e.target.value, 10)); setPage(0); }}
                    rowsPerPageOptions={[5, 10, 25]}
                />
            </Card>
        </Box>
    );
};

export default ManageUsers;
