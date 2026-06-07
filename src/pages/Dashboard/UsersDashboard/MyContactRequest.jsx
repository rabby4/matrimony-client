import { useMemo } from 'react';
import {
    Box, Button, Card, Chip, CircularProgress, Stack, Table, TableBody, TableCell,
    TableContainer, TableHead, TableRow, Typography
} from '@mui/material';
import { Link as RouterLink } from 'react-router-dom';
import DeleteOutlineIcon from '@mui/icons-material/DeleteOutline';
import LockIcon from '@mui/icons-material/Lock';
import { FaCheckCircle, FaHourglassHalf, FaRegEnvelope } from 'react-icons/fa';
import { MdConnectWithoutContact, MdPhoneInTalk } from 'react-icons/md';
import Swal from 'sweetalert2';
import useRequested from '../../../hooks/useRequested';
import useAxiosPublic from '../../../hooks/useAxiosPublic';
import { brand } from '../../../theme/theme';

const headCellStyle = { fontWeight: 600, color: 'text.secondary', fontSize: '12px', letterSpacing: '0.5px', whiteSpace: 'nowrap' };

const MyContactRequest = () => {
    const axiosPublic = useAxiosPublic()
    const [, , userData, refresh] = useRequested()

    const requests = useMemo(() => userData || [], [userData])
    const approvedCount = requests.filter(request => request.status === 'Approved').length
    const pendingCount = requests.length - approvedCount

    const handleDelete = (request) => {
        Swal.fire({
            title: 'Cancel this contact request?',
            text: `Your request for ${request.name || 'this member'}'s contact information will be removed.`,
            icon: 'warning',
            showCancelButton: true,
            confirmButtonColor: '#d33',
            confirmButtonText: 'Yes, cancel it',
            cancelButtonText: 'Keep it',
        }).then((result) => {
            if (!result.isConfirmed) return
            axiosPublic.delete(`/payments/${request._id}`)
                .then(res => {
                    if (res.data.deletedCount > 0) {
                        Swal.fire({ title: 'Removed!', text: 'The contact request has been cancelled.', icon: 'success', timer: 1600, showConfirmButton: false });
                        refresh()
                    }
                })
                .catch(() => Swal.fire({ icon: 'error', title: 'Oops...', text: 'Could not cancel the request!' }))
        });
    }

    if (!userData) {
        return (
            <Card sx={{ p: '80px', borderRadius: '16px', textAlign: 'center', boxShadow: '0px 8px 30px 0px rgba(17,17,17,0.06)' }}>
                <CircularProgress color='secondary' />
                <Typography sx={{ color: 'text.secondary', fontSize: '13.5px', mt: '15px' }}>Loading your requests…</Typography>
            </Card>
        )
    }

    return (
        <Box>
            {/* page header */}
            <Stack direction={{ xs: 'column', sm: 'row' }} justifyContent='space-between' alignItems={{ xs: 'flex-start', sm: 'center' }} spacing={2} sx={{ mb: '24px' }}>
                <Box>
                    <Typography sx={{ fontFamily: 'Playfair Display', fontWeight: 700, fontSize: { xs: '22px', md: '26px' }, color: brand.primary }}>
                        My Contact Requests
                    </Typography>
                    <Typography sx={{ color: 'text.secondary', fontSize: '13.5px', mt: '2px' }}>
                        Contact information unlocks once an admin approves your request.
                    </Typography>
                </Box>
                {requests.length > 0 && (
                    <Stack direction='row' spacing={1.5}>
                        <Chip
                            icon={<FaHourglassHalf style={{ fontSize: '12px', color: '#a07400' }} />}
                            label={`${pendingCount} Pending`}
                            sx={{ bgcolor: '#fff3d1', color: '#a07400', fontWeight: 700, fontSize: '12.5px' }}
                        />
                        <Chip
                            icon={<FaCheckCircle style={{ fontSize: '13px', color: '#1c7a4b' }} />}
                            label={`${approvedCount} Approved`}
                            sx={{ bgcolor: '#e3f7ec', color: '#1c7a4b', fontWeight: 700, fontSize: '12.5px' }}
                        />
                    </Stack>
                )}
            </Stack>

            <Card sx={{ borderRadius: '16px', boxShadow: '0px 8px 30px 0px rgba(17,17,17,0.06)', overflow: 'hidden' }}>
                {requests.length === 0 ? (
                    <Box sx={{ textAlign: 'center', py: '70px', px: '20px' }}>
                        <MdConnectWithoutContact style={{ fontSize: '48px', color: brand.primaryLight }} />
                        <Typography sx={{ fontFamily: 'Playfair Display', fontWeight: 700, fontSize: '20px', color: brand.primary, mt: '16px' }}>
                            No contact requests yet
                        </Typography>
                        <Typography sx={{ color: 'text.secondary', fontSize: '14px', mt: '6px', mb: '25px' }}>
                            Found someone interesting? Send a contact request from their profile.
                        </Typography>
                        <Button component={RouterLink} to='/biodatas' variant='contained' color='secondary' sx={{ px: '35px' }}>
                            Browse Profiles
                        </Button>
                    </Box>
                ) : (
                    <TableContainer>
                        <Table sx={{ minWidth: 720 }}>
                            <TableHead>
                                <TableRow sx={{ bgcolor: '#fbf8f0' }}>
                                    <TableCell sx={headCellStyle}>REQUESTED PROFILE</TableCell>
                                    <TableCell sx={headCellStyle}>CONTACT INFORMATION</TableCell>
                                    <TableCell sx={headCellStyle}>AMOUNT</TableCell>
                                    <TableCell sx={headCellStyle}>STATUS</TableCell>
                                    <TableCell sx={headCellStyle} align='right'>ACTION</TableCell>
                                </TableRow>
                            </TableHead>
                            <TableBody>
                                {requests.map(request => (
                                    <TableRow key={request._id} hover sx={{ '&:last-child td': { border: 0 } }}>
                                        <TableCell>
                                            <Typography sx={{ fontSize: '14px', fontWeight: 600 }}>{request.name || 'Member'}</Typography>
                                            <Typography
                                                component={RouterLink}
                                                to={`/details-bio-data/${request.bioDataId}`}
                                                sx={{ fontSize: '12px', color: brand.secondary, textDecoration: 'none', ':hover': { textDecoration: 'underline' } }}
                                            >
                                                Biodata: {request.bioDataId?.slice(-6).toUpperCase()} →
                                            </Typography>
                                        </TableCell>
                                        <TableCell>
                                            {request.status === 'Approved' ? (
                                                <Stack spacing={0.5}>
                                                    <Stack direction='row' spacing={1} alignItems='center'>
                                                        <FaRegEnvelope style={{ fontSize: '12px', color: brand.secondary }} />
                                                        <Typography sx={{ fontSize: '13px' }}>{request.email || '—'}</Typography>
                                                    </Stack>
                                                    <Stack direction='row' spacing={1} alignItems='center'>
                                                        <MdPhoneInTalk style={{ fontSize: '14px', color: brand.secondary }} />
                                                        <Typography sx={{ fontSize: '13px' }}>{request.phone || '—'}</Typography>
                                                    </Stack>
                                                </Stack>
                                            ) : (
                                                <Stack direction='row' spacing={1} alignItems='center'>
                                                    <LockIcon sx={{ fontSize: '15px', color: brand.primaryLight }} />
                                                    <Typography sx={{ fontSize: '12.5px', color: 'text.secondary', fontStyle: 'italic' }}>
                                                        Visible after approval
                                                    </Typography>
                                                </Stack>
                                            )}
                                        </TableCell>
                                        <TableCell sx={{ fontSize: '13.5px', fontWeight: 600 }}>${request.price}</TableCell>
                                        <TableCell>
                                            <Chip
                                                label={request.status === 'Approved' ? 'APPROVED' : 'PENDING'}
                                                size='small'
                                                sx={{
                                                    fontSize: '10.5px', fontWeight: 700, height: '22px',
                                                    bgcolor: request.status === 'Approved' ? '#e3f7ec' : '#fff5dc',
                                                    color: request.status === 'Approved' ? '#1c7a4b' : '#a07400',
                                                }}
                                            />
                                        </TableCell>
                                        <TableCell align='right'>
                                            <Button
                                                onClick={() => handleDelete(request)}
                                                size='small'
                                                variant='outlined'
                                                color='error'
                                                startIcon={<DeleteOutlineIcon sx={{ fontSize: '16px' }} />}
                                                sx={{ fontSize: '12px', whiteSpace: 'nowrap' }}
                                            >
                                                {request.status === 'Approved' ? 'Remove' : 'Cancel'}
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

export default MyContactRequest;
