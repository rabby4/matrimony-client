import { Avatar, Box, Button, Card, Chip, CircularProgress, Stack, Typography } from '@mui/material';
import { Link as RouterLink } from 'react-router-dom';
import { useQueryClient } from '@tanstack/react-query';
import { FaCrown, FaUserEdit, FaHourglassHalf, FaRulerVertical, FaWeight } from 'react-icons/fa';
import { MdCake, MdVerifiedUser } from 'react-icons/md';
import Swal from 'sweetalert2';
import useUser from '../../../hooks/useUser';
import useAxiosPublic from '../../../hooks/useAxiosPublic';
import { brand } from '../../../theme/theme';

const InfoRow = ({ label, value }) => (
    <Stack direction='row' sx={{ py: '11px', borderBottom: '1px dashed #f0e8d5', '&:last-of-type': { borderBottom: 'none' } }}>
        <Typography sx={{ width: { xs: '45%', sm: '40%' }, color: 'text.secondary', fontSize: '14px' }}>{label}</Typography>
        <Typography sx={{ fontWeight: 500, fontSize: '14px', color: '#333' }}>{value || '—'}</Typography>
    </Stack>
)

const SectionCard = ({ title, children }) => (
    <Card sx={{ p: '25px', borderRadius: '16px', boxShadow: '0px 8px 30px 0px rgba(17,17,17,0.06)' }}>
        <Typography sx={{ fontFamily: 'Playfair Display', fontWeight: 700, fontSize: '19px', color: brand.primary, mb: '10px' }}>
            {title}
        </Typography>
        {children}
    </Card>
)

const StatTile = ({ icon, label, value }) => (
    <Box sx={{
        flex: 1, textAlign: 'center', p: '16px 10px',
        border: '1px solid #f0e8d5', borderRadius: '12px', bgcolor: '#fffdf6',
    }}>
        <Box sx={{ color: brand.secondary, fontSize: '22px' }}>{icon}</Box>
        <Typography sx={{ color: 'text.secondary', fontSize: '11px', mt: '4px', textTransform: 'uppercase', letterSpacing: '1px' }}>{label}</Typography>
        <Typography sx={{ color: brand.primary, fontWeight: 600, fontSize: '15px', mt: '2px' }}>{value || '—'}</Typography>
    </Box>
)

const ViewBioData = () => {
    const [userInfo] = useUser()
    const axiosPublic = useAxiosPublic()
    const queryClient = useQueryClient()

    const handleRequestPremium = () => {
        Swal.fire({
            title: 'Request premium membership?',
            text: 'An admin will review your request. Once approved, you can view contact information directly.',
            icon: 'question',
            showCancelButton: true,
            confirmButtonColor: brand.secondary,
            confirmButtonText: 'Yes, request premium',
        }).then(async (result) => {
            if (!result.isConfirmed) return
            try {
                // premium: false marks the request as pending admin approval
                const res = await axiosPublic.patch(`/users/${userInfo?._id}`, { premium: false })
                if (res.data.modifiedCount > 0) {
                    Swal.fire({ title: 'Request sent!', text: 'Please wait for admin approval.', icon: 'success', timer: 2000, showConfirmButton: false });
                    queryClient.invalidateQueries({ queryKey: ['user'] })
                    queryClient.invalidateQueries({ queryKey: ['users'] })
                }
            } catch {
                Swal.fire({ icon: 'error', title: 'Oops...', text: 'Could not send the request, please try again!' })
            }
        })
    }

    if (!userInfo) {
        return (
            <Card sx={{ p: '80px', borderRadius: '16px', textAlign: 'center', boxShadow: '0px 8px 30px 0px rgba(17,17,17,0.06)' }}>
                <CircularProgress color='secondary' />
                <Typography sx={{ color: 'text.secondary', fontSize: '13.5px', mt: '15px' }}>Loading your biodata…</Typography>
            </Card>
        )
    }

    const hasBiodata = !!userInfo.gender

    return (
        <Box>
            {/* page header */}
            <Stack direction={{ xs: 'column', sm: 'row' }} justifyContent='space-between' alignItems={{ xs: 'flex-start', sm: 'center' }} spacing={2} sx={{ mb: '24px' }}>
                <Box>
                    <Typography sx={{ fontFamily: 'Playfair Display', fontWeight: 700, fontSize: { xs: '22px', md: '26px' }, color: brand.primary }}>
                        View Bio Data
                    </Typography>
                    <Typography sx={{ color: 'text.secondary', fontSize: '13.5px', mt: '2px' }}>
                        This is how your information is stored on the platform.
                    </Typography>
                </Box>
                <Button
                    component={RouterLink}
                    to='/dashboard/edit-bio-data'
                    variant='contained'
                    color='secondary'
                    startIcon={<FaUserEdit style={{ fontSize: '14px' }} />}
                    sx={{ px: '25px', flexShrink: 0 }}
                >
                    Edit Bio Data
                </Button>
            </Stack>

            {!hasBiodata ? (
                /* empty state — biodata not created yet */
                <Card sx={{ p: '70px 30px', borderRadius: '16px', textAlign: 'center', boxShadow: '0px 8px 30px 0px rgba(17,17,17,0.06)' }}>
                    <MdVerifiedUser style={{ fontSize: '48px', color: brand.primaryLight }} />
                    <Typography sx={{ fontFamily: 'Playfair Display', fontWeight: 700, fontSize: '22px', color: brand.primary, mt: '16px' }}>
                        You haven&apos;t created your biodata yet
                    </Typography>
                    <Typography sx={{ color: 'text.secondary', fontSize: '14px', mt: '8px', mb: '25px', maxWidth: '420px', mx: 'auto' }}>
                        A complete biodata is how other members find you. It only takes a few minutes to fill in.
                    </Typography>
                    <Button component={RouterLink} to='/dashboard/edit-bio-data' variant='contained' color='secondary' sx={{ px: '35px' }}>
                        Create My Biodata
                    </Button>
                </Card>
            ) : (
                <Box sx={{ display: 'grid', gridTemplateColumns: { xs: '1fr', lg: '5fr 7fr' }, gap: '24px', alignItems: 'start' }}>
                    {/* left: photo + membership */}
                    <Card sx={{ borderRadius: '16px', overflow: 'hidden', boxShadow: '0px 8px 30px 0px rgba(17,17,17,0.06)', position: { lg: 'sticky' }, top: { lg: '90px' } }}>
                        <Box sx={{ position: 'relative', height: '380px', bgcolor: brand.cream, overflow: 'hidden' }}>
                            {userInfo.photo ? (
                                <>
                                    {/* blurred backdrop fills the box; the full image sits on top uncropped */}
                                    <Box sx={{
                                        position: 'absolute', inset: 0,
                                        backgroundImage: `url(${userInfo.photo})`,
                                        backgroundSize: 'cover', backgroundPosition: 'center',
                                        filter: 'blur(22px)', transform: 'scale(1.15)', opacity: 0.5,
                                    }} />
                                    <Box
                                        component='img'
                                        src={userInfo.photo}
                                        alt={userInfo.name}
                                        referrerPolicy='no-referrer'
                                        sx={{ position: 'relative', width: '100%', height: '100%', objectFit: 'contain', display: 'block' }}
                                    />
                                </>
                            ) : (
                                <Box sx={{ height: '100%', display: 'flex', alignItems: 'center', justifyContent: 'center', fontSize: '90px', fontWeight: 600, color: brand.primary, fontFamily: 'Poppins' }}>
                                    {userInfo.name?.charAt(0)?.toUpperCase()}
                                </Box>
                            )}
                            <Box sx={{
                                position: 'absolute', left: 0, right: 0, bottom: 0,
                                p: '45px 22px 16px',
                                background: 'linear-gradient(180deg, rgba(17,17,17,0) 0%, rgba(17,17,17,0.8) 100%)',
                            }}>
                                <Typography sx={{ color: '#fff', fontFamily: 'Playfair Display', fontWeight: 700, fontSize: '24px' }}>
                                    {userInfo.name}
                                </Typography>
                                <Typography sx={{ color: 'rgba(255,255,255,0.85)', fontSize: '13px' }}>
                                    Biodata ID: {userInfo._id?.slice(-6).toUpperCase()}
                                </Typography>
                            </Box>
                        </Box>
                        <Box sx={{ p: '22px' }}>
                            {/* membership status + action */}
                            {userInfo.premium === true ? (
                                <Stack spacing={1.5} alignItems='center'>
                                    <Chip
                                        icon={<FaCrown style={{ color: '#fff', fontSize: '13px' }} />}
                                        label='PREMIUM MEMBER'
                                        sx={{ bgcolor: brand.gold, color: '#fff', fontWeight: 700, letterSpacing: '1px', px: '8px' }}
                                    />
                                    <Typography sx={{ fontSize: '12.5px', color: 'text.secondary', textAlign: 'center' }}>
                                        You can view contact information of any member directly.
                                    </Typography>
                                </Stack>
                            ) : userInfo.premium === false ? (
                                <Stack spacing={1.5} alignItems='center'>
                                    <Chip
                                        icon={<FaHourglassHalf style={{ color: '#a07400', fontSize: '12px' }} />}
                                        label='PREMIUM REQUEST PENDING'
                                        sx={{ bgcolor: '#fff3d1', color: '#a07400', fontWeight: 700, letterSpacing: '0.5px', px: '8px' }}
                                    />
                                    <Typography sx={{ fontSize: '12.5px', color: 'text.secondary', textAlign: 'center' }}>
                                        Your request is awaiting admin approval.
                                    </Typography>
                                </Stack>
                            ) : (
                                <Stack spacing={1.5}>
                                    <Button
                                        onClick={handleRequestPremium}
                                        fullWidth
                                        variant='contained'
                                        color='secondary'
                                        startIcon={<FaCrown style={{ fontSize: '14px' }} />}
                                        sx={{ py: '11px' }}
                                    >
                                        Request Premium Membership
                                    </Button>
                                    <Typography sx={{ fontSize: '12px', color: 'text.secondary', textAlign: 'center' }}>
                                        Premium members see contact info without sending paid requests.
                                    </Typography>
                                </Stack>
                            )}
                        </Box>
                    </Card>

                    {/* right: details */}
                    <Stack spacing={3}>
                        <SectionCard title='Personal Information'>
                            <InfoRow label='Full Name' value={userInfo.name} />
                            <InfoRow label='Email' value={userInfo.email} />
                            <InfoRow label='Phone' value={userInfo.phone} />
                            <InfoRow label='Gender' value={userInfo.gender} />
                            <InfoRow label='Date of Birth' value={userInfo.dof} />
                            <InfoRow label='Age' value={userInfo.age && `${userInfo.age} years`} />
                            <InfoRow label='Height' value={userInfo.height && `${userInfo.height} cm`} />
                            <InfoRow label='Weight' value={userInfo.weight && `${userInfo.weight} kg`} />
                            <InfoRow label='Complexion' value={userInfo.race} />
                            <InfoRow label='Occupation' value={userInfo.occupation} />
                        </SectionCard>

                        <SectionCard title='Family & Location'>
                            <InfoRow label="Father's Name" value={userInfo.fatherName} />
                            <InfoRow label="Mother's Name" value={userInfo.motherName} />
                            <InfoRow label='Present Division' value={userInfo.presentDivision} />
                            <InfoRow label='Permanent Division' value={userInfo.permanentDivision} />
                        </SectionCard>

                        <SectionCard title='Expected Partner'>
                            <Stack direction={{ xs: 'column', sm: 'row' }} spacing={2}>
                                <StatTile icon={<MdCake />} label='Age' value={userInfo.partnerAge && `${userInfo.partnerAge} yrs`} />
                                <StatTile icon={<FaRulerVertical />} label='Height' value={userInfo.partnerHeight && `${userInfo.partnerHeight} cm`} />
                                <StatTile icon={<FaWeight />} label='Weight' value={userInfo.partnerWeight && `${userInfo.partnerWeight} kg`} />
                            </Stack>
                        </SectionCard>
                    </Stack>
                </Box>
            )}
        </Box>
    );
};

export default ViewBioData;
