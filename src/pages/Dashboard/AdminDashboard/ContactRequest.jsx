import { useMemo, useState } from 'react';
import {
    Avatar, Box, Button, Card, Chip, MenuItem, Stack, Table, TableBody, TableCell,
    TableContainer, TableHead, TableRow, TextField, Typography
} from '@mui/material';
import { FaCheckCircle, FaHourglassHalf, FaDollarSign } from 'react-icons/fa';
import { MdConnectWithoutContact } from 'react-icons/md';
import Swal from 'sweetalert2';
import useRequested from '../../../hooks/useRequested';
import useAxiosSecure from '../../../hooks/useAxiosSecure';
import { brand } from '../../../theme/theme';

const headCellStyle = { fontWeight: 600, color: 'text.secondary', fontSize: '12px', letterSpacing: '0.5px', whiteSpace: 'nowrap' };

const ContactRequest = () => {
    const [allRequest, refetch] = useRequested()
    const axiosSecure = useAxiosSecure()
    const [statusFilter, setStatusFilter] = useState('all')

    const requests = useMemo(() => allRequest || [], [allRequest])
    const approvedCount = requests.filter(request => request.status === 'Approved').length
    const pendingCount = requests.length - approvedCount
    const revenue = requests.reduce((total, item) => total + (item.price || 0), 0)

    const visibleRequests = useMemo(() => {
        if (statusFilter === 'approved') return requests.filter(request => request.status === 'Approved')
        if (statusFilter === 'pending') return requests.filter(request => request.status !== 'Approved')
        return requests
    }, [requests, statusFilter])

    const handleApprove = (request) => {
        Swal.fire({
            title: `Approve this contact request?`,
            text: `${request.requesterName || request.requesterEmail} will get access to ${request.name || 'the member'}'s contact information.`,
            icon: 'question',
            showCancelButton: true,
            confirmButtonColor: brand.secondary,
            confirmButtonText: 'Yes, approve',
        }).then(result => {
            if (!result.isConfirmed) return
            axiosSecure.patch(`/payment/${request._id}`, { status: 'Approved' })
                .then(res => {
                    if (res.data.modifiedCount > 0) {
                        Swal.fire({ title: 'Approved!', text: 'The contact request has been approved.', icon: 'success', timer: 1800, showConfirmButton: false });
                        refetch()
                    }
                })
                .catch(() => Swal.fire({ icon: 'error', title: 'Oops...', text: 'Could not approve the request!' }))
        })
    }

    return (
        <Box>
            {/* page header */}
            <Stack direction={{ xs: 'column', md: 'row' }} justifyContent='space-between' alignItems={{ xs: 'flex-start', md: 'center' }} spacing={2} sx={{ mb: '24px' }}>
                <Box>
                    <Typography sx={{ fontFamily: 'Playfair Display', fontWeight: 700, fontSize: { xs: '22px', md: '26px' }, color: brand.primary }}>
                        Contact Requests
                    </Typography>
                    <Typography sx={{ color: 'text.secondary', fontSize: '13.5px', mt: '2px' }}>
                        Paid requests for member contact information
                    </Typography>
                </Box>
                <Stack direction='row' spacing={1.5} flexWrap='wrap' useFlexGap alignItems='center'>
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
                    <Chip
                        icon={<FaDollarSign style={{ fontSize: '13px', color: '#1c5d7a' }} />}
                        label={`$${revenue} Revenue`}
                        sx={{ bgcolor: '#e1f0f7', color: '#1c5d7a', fontWeight: 700, fontSize: '12.5px' }}
                    />
                    <TextField
                        select
                        size='small'
                        label='Status'
                        value={statusFilter}
                        onChange={(e) => setStatusFilter(e.target.value)}
                        sx={{ minWidth: '130px', bgcolor: '#fff', borderRadius: '8px' }}
                    >
                        <MenuItem value='all'>All</MenuItem>
                        <MenuItem value='pending'>Pending</MenuItem>
                        <MenuItem value='approved'>Approved</MenuItem>
                    </TextField>
                </Stack>
            </Stack>

            {/* requests table */}
            <Card sx={{ borderRadius: '16px', boxShadow: '0px 8px 30px 0px rgba(17,17,17,0.06)', overflow: 'hidden' }}>
                {visibleRequests.length === 0 ? (
                    <Box sx={{ textAlign: 'center', py: '70px', px: '20px' }}>
                        <MdConnectWithoutContact style={{ fontSize: '48px', color: brand.primaryLight }} />
                        <Typography sx={{ fontFamily: 'Playfair Display', fontWeight: 700, fontSize: '20px', color: brand.primary, mt: '16px' }}>
                            {statusFilter === 'all' ? 'No contact requests yet' : `No ${statusFilter} requests`}
                        </Typography>
                        <Typography sx={{ color: 'text.secondary', fontSize: '14px', mt: '6px' }}>
                            {statusFilter === 'all'
                                ? 'When members pay to request contact information, it will show up here.'
                                : 'Try switching the status filter.'}
                        </Typography>
                    </Box>
                ) : (
                    <TableContainer>
                        <Table sx={{ minWidth: 750 }}>
                            <TableHead>
                                <TableRow sx={{ bgcolor: '#fbf8f0' }}>
                                    <TableCell sx={headCellStyle}>REQUESTER</TableCell>
                                    <TableCell sx={headCellStyle}>REQUESTED PROFILE</TableCell>
                                    <TableCell sx={headCellStyle}>BIODATA ID</TableCell>
                                    <TableCell sx={headCellStyle}>AMOUNT</TableCell>
                                    <TableCell sx={headCellStyle}>STATUS</TableCell>
                                    <TableCell sx={headCellStyle} align='right'>ACTION</TableCell>
                                </TableRow>
                            </TableHead>
                            <TableBody>
                                {visibleRequests.map(request => (
                                    <TableRow key={request._id} hover sx={{ '&:last-child td': { border: 0 } }}>
                                        <TableCell>
                                            <Stack direction='row' spacing={1.5} alignItems='center'>
                                                <Avatar sx={{ width: 38, height: 38, bgcolor: brand.primaryLight, fontWeight: 600, fontSize: '15px' }}>
                                                    {(request.requesterName || request.requesterEmail || '?').charAt(0).toUpperCase()}
                                                </Avatar>
                                                <Box sx={{ minWidth: 0 }}>
                                                    <Typography noWrap sx={{ fontSize: '14px', fontWeight: 600 }}>
                                                        {request.requesterName || 'Unnamed'}
                                                    </Typography>
                                                    <Typography noWrap sx={{ fontSize: '12.5px', color: 'text.secondary' }}>
                                                        {request.requesterEmail}
                                                    </Typography>
                                                </Box>
                                            </Stack>
                                        </TableCell>
                                        <TableCell sx={{ fontSize: '13.5px', fontWeight: 500 }}>{request.name || '—'}</TableCell>
                                        <TableCell sx={{ fontSize: '13px', color: 'text.secondary' }}>
                                            {request.bioDataId?.slice(-6).toUpperCase() || '—'}
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
                                            {request.status === 'Approved' ? (
                                                <Typography sx={{ fontSize: '12.5px', color: '#1c7a4b', fontWeight: 600 }}>
                                                    ✓ Done
                                                </Typography>
                                            ) : (
                                                <Button
                                                    onClick={() => handleApprove(request)}
                                                    size='small'
                                                    variant='contained'
                                                    color='secondary'
                                                    startIcon={<FaCheckCircle style={{ fontSize: '12px' }} />}
                                                    sx={{ fontSize: '12px', whiteSpace: 'nowrap', px: '16px' }}
                                                >
                                                    Approve
                                                </Button>
                                            )}
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

export default ContactRequest;
