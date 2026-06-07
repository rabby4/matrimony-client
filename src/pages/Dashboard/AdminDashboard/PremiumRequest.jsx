import { useMemo } from 'react';
import {
    Avatar, Box, Button, Card, Chip, Stack, Table, TableBody, TableCell,
    TableContainer, TableHead, TableRow, Typography
} from '@mui/material';
import { FaCrown, FaCheckCircle } from 'react-icons/fa';
import Swal from 'sweetalert2';
import useUser from '../../../hooks/useUser';
import useAxiosPublic from '../../../hooks/useAxiosPublic';
import { brand } from '../../../theme/theme';

const headCellStyle = { fontWeight: 600, color: 'text.secondary', fontSize: '12px', letterSpacing: '0.5px', whiteSpace: 'nowrap' };

const PremiumRequest = () => {
    const [, allUser, reload] = useUser()
    const axiosPublic = useAxiosPublic()

    // premium === false marks a pending request (set when a member clicks
    // "Make Premium" on their biodata); premium === true means approved.
    const pendingRequests = useMemo(
        () => (allUser || []).filter(singleUser => singleUser.premium === false),
        [allUser]
    )
    const approvedCount = useMemo(
        () => (allUser || []).filter(singleUser => singleUser.premium === true).length,
        [allUser]
    )

    const handleApprove = (user) => {
        Swal.fire({
            title: `Approve ${user.name || user.email}?`,
            text: 'They will become a premium member and can view contact information directly.',
            icon: 'question',
            showCancelButton: true,
            confirmButtonColor: brand.secondary,
            confirmButtonText: 'Yes, approve',
        }).then(result => {
            if (!result.isConfirmed) return
            axiosPublic.patch(`/users/${user._id}`, { premium: true })
                .then(res => {
                    if (res.data.modifiedCount > 0) {
                        Swal.fire({ title: 'Approved!', text: `${user.name || 'The member'} is now premium.`, icon: 'success', timer: 1800, showConfirmButton: false });
                        reload()
                    }
                })
                .catch(() => Swal.fire({ icon: 'error', title: 'Oops...', text: 'Could not approve the request!' }))
        })
    }

    return (
        <Box>
            {/* page header */}
            <Stack direction={{ xs: 'column', sm: 'row' }} justifyContent='space-between' alignItems={{ xs: 'flex-start', sm: 'center' }} spacing={2} sx={{ mb: '24px' }}>
                <Box>
                    <Typography sx={{ fontFamily: 'Playfair Display', fontWeight: 700, fontSize: { xs: '22px', md: '26px' }, color: brand.primary }}>
                        Premium Requests
                    </Typography>
                    <Typography sx={{ color: 'text.secondary', fontSize: '13.5px', mt: '2px' }}>
                        Members waiting for premium approval
                    </Typography>
                </Box>
                <Stack direction='row' spacing={1.5}>
                    <Chip
                        icon={<FaCrown style={{ fontSize: '13px', color: '#a07400' }} />}
                        label={`${pendingRequests.length} Pending`}
                        sx={{ bgcolor: '#fff3d1', color: '#a07400', fontWeight: 700, fontSize: '12.5px' }}
                    />
                    <Chip
                        icon={<FaCheckCircle style={{ fontSize: '13px', color: '#1c7a4b' }} />}
                        label={`${approvedCount} Premium Members`}
                        sx={{ bgcolor: '#e3f7ec', color: '#1c7a4b', fontWeight: 700, fontSize: '12.5px' }}
                    />
                </Stack>
            </Stack>

            {/* requests table */}
            <Card sx={{ borderRadius: '16px', boxShadow: '0px 8px 30px 0px rgba(17,17,17,0.06)', overflow: 'hidden' }}>
                {pendingRequests.length === 0 ? (
                    <Box sx={{ textAlign: 'center', py: '70px', px: '20px' }}>
                        <FaCrown style={{ fontSize: '44px', color: brand.primaryLight }} />
                        <Typography sx={{ fontFamily: 'Playfair Display', fontWeight: 700, fontSize: '20px', color: brand.primary, mt: '16px' }}>
                            All caught up!
                        </Typography>
                        <Typography sx={{ color: 'text.secondary', fontSize: '14px', mt: '6px' }}>
                            There are no pending premium requests right now.
                        </Typography>
                    </Box>
                ) : (
                    <TableContainer>
                        <Table sx={{ minWidth: 700 }}>
                            <TableHead>
                                <TableRow sx={{ bgcolor: '#fbf8f0' }}>
                                    <TableCell sx={headCellStyle}>MEMBER</TableCell>
                                    <TableCell sx={headCellStyle}>BIODATA ID</TableCell>
                                    <TableCell sx={headCellStyle}>AGE</TableCell>
                                    <TableCell sx={headCellStyle}>DIVISION</TableCell>
                                    <TableCell sx={headCellStyle}>STATUS</TableCell>
                                    <TableCell sx={headCellStyle} align='right'>ACTION</TableCell>
                                </TableRow>
                            </TableHead>
                            <TableBody>
                                {pendingRequests.map(user => (
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
                                        <TableCell sx={{ fontSize: '13px', color: 'text.secondary' }}>
                                            {user._id?.slice(-6).toUpperCase()}
                                        </TableCell>
                                        <TableCell sx={{ fontSize: '13.5px' }}>{user.age ? `${user.age} yrs` : '—'}</TableCell>
                                        <TableCell sx={{ fontSize: '13.5px' }}>{user.permanentDivision || '—'}</TableCell>
                                        <TableCell>
                                            <Chip label='PENDING' size='small' sx={{ fontSize: '10.5px', fontWeight: 700, height: '22px', bgcolor: '#fff5dc', color: '#a07400' }} />
                                        </TableCell>
                                        <TableCell align='right'>
                                            <Button
                                                onClick={() => handleApprove(user)}
                                                size='small'
                                                variant='contained'
                                                color='secondary'
                                                startIcon={<FaCrown style={{ fontSize: '13px' }} />}
                                                sx={{ fontSize: '12px', whiteSpace: 'nowrap', px: '16px' }}
                                            >
                                                Approve Premium
                                            </Button>
                                        </TableCell>
                                    </TableRow>
                                ))}
                            </TableBody>
                        </Table>
                    </TableContainer>
                )}
            </Card>
        </Box>
    );
};

export default PremiumRequest;
