import { Avatar, Box, Button, Card, Chip, LinearProgress, Stack, Typography } from '@mui/material';
import { Link as RouterLink } from 'react-router-dom';
import { FaRegHeart, FaCrown, FaCheckCircle, FaHourglassHalf, FaSearch, FaUserEdit } from 'react-icons/fa';
import { MdConnectWithoutContact, MdOutlinePageview } from 'react-icons/md';
import useAuth from '../../../hooks/useAuth';
import useUser from '../../../hooks/useUser';
import useRequested from '../../../hooks/useRequested';
import { brand } from '../../../theme/theme';

// fields counted towards profile completion
const BIODATA_FIELDS = [
    'name', 'photo', 'gender', 'age', 'dof', 'height', 'weight', 'occupation', 'race',
    'fatherName', 'motherName', 'permanentDivision', 'presentDivision',
    'partnerAge', 'partnerHeight', 'partnerWeight', 'phone',
];

const StatCard = ({ icon, label, value, gradient, to, linkLabel }) => (
    <Card sx={{
        p: '22px', borderRadius: '16px',
        boxShadow: '0px 8px 30px 0px rgba(17,17,17,0.06)',
        transition: 'transform .25s ease',
        ':hover': { transform: 'translateY(-5px)' },
    }}>
        <Stack direction='row' spacing={2} alignItems='center'>
            <Box sx={{
                width: '52px', height: '52px', borderRadius: '14px', flexShrink: 0,
                display: 'flex', alignItems: 'center', justifyContent: 'center',
                background: gradient, color: '#fff', fontSize: '22px',
                boxShadow: '0px 8px 20px 0px rgba(17,17,17,0.15)',
            }}>
                {icon}
            </Box>
            <Box sx={{ minWidth: 0 }}>
                <Typography sx={{ fontFamily: 'Playfair Display', fontWeight: 700, fontSize: '24px', color: '#222', lineHeight: 1.2 }}>
                    {value}
                </Typography>
                <Typography noWrap sx={{ color: 'text.secondary', fontSize: '12.5px', mt: '2px' }}>
                    {label}
                </Typography>
            </Box>
        </Stack>
        {to && (
            <Button component={RouterLink} to={to} size='small' sx={{ mt: '12px', fontSize: '12px', p: '2px 12px', color: brand.secondary }}>
                {linkLabel} →
            </Button>
        )}
    </Card>
)

const SectionCard = ({ title, subtitle, action, children }) => (
    <Card sx={{ p: '25px', borderRadius: '16px', height: '100%', boxShadow: '0px 8px 30px 0px rgba(17,17,17,0.06)' }}>
        <Stack direction='row' justifyContent='space-between' alignItems='flex-start'>
            <Box>
                <Typography sx={{ fontFamily: 'Playfair Display', fontWeight: 700, fontSize: '19px', color: brand.primary }}>
                    {title}
                </Typography>
                {subtitle && (
                    <Typography sx={{ color: 'text.secondary', fontSize: '12.5px', mt: '2px' }}>
                        {subtitle}
                    </Typography>
                )}
            </Box>
            {action}
        </Stack>
        <Box sx={{ mt: '20px' }}>{children}</Box>
    </Card>
)

const InfoRow = ({ label, value }) => (
    <Stack direction='row' sx={{ py: '9px', borderBottom: '1px dashed #f0e8d5', '&:last-of-type': { borderBottom: 'none' } }}>
        <Typography sx={{ width: '45%', color: 'text.secondary', fontSize: '13.5px' }}>{label}</Typography>
        <Typography sx={{ fontWeight: 500, fontSize: '13.5px', color: '#333' }}>{value || '—'}</Typography>
    </Stack>
)

const UsersDashboard = () => {
    const { user } = useAuth()
    const [userInfo, , , favUserInfo] = useUser()
    const [, , myRequests] = useRequested()

    const requests = myRequests || []
    const approvedRequests = requests.filter(request => request.status === 'Approved')
    const pendingRequests = requests.length - approvedRequests.length

    // profile completion
    const filledFields = BIODATA_FIELDS.filter(field => userInfo?.[field])
    const completion = Math.round((filledFields.length / BIODATA_FIELDS.length) * 100)
    const missingFields = BIODATA_FIELDS.filter(field => !userInfo?.[field])

    const membership = userInfo?.premium === true
        ? { label: 'Premium', color: brand.gold, hint: 'You can view contact info directly' }
        : userInfo?.premium === false
            ? { label: 'Pending', color: '#ffb400', hint: 'Premium request awaiting approval' }
            : { label: 'Standard', color: '#9aa4af', hint: 'Request premium from your biodata' }

    const recentRequests = [...requests].slice(-4).reverse()

    return (
        <Box>
            {/* welcome header */}
            <Stack direction={{ xs: 'column', sm: 'row' }} justifyContent='space-between' alignItems={{ xs: 'flex-start', sm: 'center' }} spacing={2} sx={{ mb: '28px' }}>
                <Box>
                    <Typography sx={{ fontFamily: 'Playfair Display', fontWeight: 700, fontSize: { xs: '24px', md: '30px' }, color: brand.primary }}>
                        Welcome back, {userInfo?.name?.split(' ')[0] || user?.displayName?.split(' ')[0] || 'Member'} 👋
                    </Typography>
                    <Typography sx={{ color: 'text.secondary', fontSize: '14px', mt: '4px' }}>
                        Here&apos;s your matrimony journey at a glance.
                    </Typography>
                </Box>
                <Button
                    component={RouterLink}
                    to='/biodatas'
                    variant='contained'
                    color='secondary'
                    startIcon={<FaSearch style={{ fontSize: '14px' }} />}
                    sx={{ px: '25px', flexShrink: 0 }}
                >
                    Browse Profiles
                </Button>
            </Stack>

            {/* stat cards */}
            <Box sx={{
                display: 'grid',
                gridTemplateColumns: { xs: '1fr', sm: '1fr 1fr', lg: 'repeat(4, 1fr)' },
                gap: '24px',
            }}>
                <StatCard
                    icon={<FaRegHeart />}
                    label='My Favourites'
                    value={favUserInfo?.length || 0}
                    gradient='linear-gradient(135deg, #b80345 0%, #ff5e94 100%)'
                    to='/dashboard/favorites-bio-data'
                    linkLabel='View list'
                />
                <StatCard
                    icon={<MdConnectWithoutContact />}
                    label='Contact Requests'
                    value={requests.length}
                    gradient='linear-gradient(135deg, #2b5db8 0%, #5b8def 100%)'
                    to='/dashboard/my-contact-request'
                    linkLabel='See requests'
                />
                <StatCard
                    icon={<FaCheckCircle />}
                    label='Approved Contacts'
                    value={approvedRequests.length}
                    gradient='linear-gradient(135deg, #1c7a4b 0%, #3fcb82 100%)'
                    to='/dashboard/my-contact-request'
                    linkLabel='View details'
                />
                <Card sx={{ p: '22px', borderRadius: '16px', boxShadow: '0px 8px 30px 0px rgba(17,17,17,0.06)' }}>
                    <Stack direction='row' spacing={2} alignItems='center'>
                        <Box sx={{
                            width: '52px', height: '52px', borderRadius: '14px', flexShrink: 0,
                            display: 'flex', alignItems: 'center', justifyContent: 'center',
                            background: 'linear-gradient(135deg, #c98a00 0%, #ffc83d 100%)', color: '#fff', fontSize: '22px',
                            boxShadow: '0px 8px 20px 0px rgba(17,17,17,0.15)',
                        }}>
                            <FaCrown />
                        </Box>
                        <Box sx={{ minWidth: 0 }}>
                            <Typography sx={{ fontFamily: 'Playfair Display', fontWeight: 700, fontSize: '22px', color: '#222', lineHeight: 1.2 }}>
                                {membership.label}
                            </Typography>
                            <Typography sx={{ color: 'text.secondary', fontSize: '12.5px', mt: '2px' }}>
                                Membership
                            </Typography>
                        </Box>
                    </Stack>
                    <Typography sx={{ fontSize: '12px', color: 'text.secondary', mt: '12px' }}>
                        {membership.hint}
                    </Typography>
                </Card>
            </Box>

            {/* main row: biodata snapshot + recent requests */}
            <Box sx={{
                display: 'grid',
                gridTemplateColumns: { xs: '1fr', lg: '7fr 5fr' },
                gap: '24px',
                mt: '24px',
            }}>
                {/* biodata snapshot + completion */}
                <Box>
                    <SectionCard
                        title='My Biodata'
                        subtitle={userInfo?._id ? `Biodata ID: ${userInfo._id.slice(-6).toUpperCase()}` : ''}
                        action={
                            <Stack direction='row' spacing={1}>
                                <Button component={RouterLink} to='/dashboard/view-bio-data' size='small' variant='outlined' startIcon={<MdOutlinePageview />} sx={{ fontSize: '12px' }}>
                                    View
                                </Button>
                                <Button component={RouterLink} to='/dashboard/edit-bio-data' size='small' variant='contained' color='secondary' startIcon={<FaUserEdit style={{ fontSize: '12px' }} />} sx={{ fontSize: '12px' }}>
                                    Edit
                                </Button>
                            </Stack>
                        }
                    >
                        {/* completion meter */}
                        <Box sx={{ mb: '22px' }}>
                            <Stack direction='row' justifyContent='space-between' sx={{ mb: '6px' }}>
                                <Typography sx={{ fontSize: '13px', fontWeight: 600, color: brand.primary }}>
                                    Profile completion
                                </Typography>
                                <Typography sx={{ fontSize: '13px', fontWeight: 700, color: completion === 100 ? '#1c7a4b' : brand.secondary }}>
                                    {completion}%
                                </Typography>
                            </Stack>
                            <LinearProgress
                                variant='determinate'
                                value={completion}
                                sx={{
                                    height: '10px', borderRadius: '5px', bgcolor: '#f3eee0',
                                    '& .MuiLinearProgress-bar': {
                                        borderRadius: '5px',
                                        background: completion === 100
                                            ? 'linear-gradient(90deg, #1c7a4b, #3fcb82)'
                                            : 'linear-gradient(90deg, #c48c46, #eb0359)',
                                    },
                                }}
                            />
                            <Typography sx={{ fontSize: '12px', color: 'text.secondary', mt: '8px' }}>
                                {completion === 100
                                    ? '🎉 Your biodata is complete — it looks great in search results!'
                                    : `Complete your biodata to appear in more searches. Missing: ${missingFields.slice(0, 4).map(field => field.replace(/([A-Z])/g, ' $1').toLowerCase()).join(', ')}${missingFields.length > 4 ? ` +${missingFields.length - 4} more` : ''}.`}
                            </Typography>
                        </Box>

                        <Stack direction={{ xs: 'column', sm: 'row' }} spacing={3}>
                            <Avatar
                                src={userInfo?.photo}
                                alt={userInfo?.name}
                                imgProps={{ referrerPolicy: 'no-referrer' }}
                                variant='rounded'
                                sx={{ width: 120, height: 120, borderRadius: '14px', bgcolor: brand.cream, color: brand.primary, fontSize: '42px', fontWeight: 600 }}
                            >
                                {userInfo?.name?.charAt(0)?.toUpperCase()}
                            </Avatar>
                            <Box sx={{ flexGrow: 1 }}>
                                <InfoRow label='Name' value={userInfo?.name} />
                                <InfoRow label='Age' value={userInfo?.age && `${userInfo.age} years`} />
                                <InfoRow label='Occupation' value={userInfo?.occupation} />
                                <InfoRow label='Division' value={userInfo?.permanentDivision} />
                            </Box>
                        </Stack>
                    </SectionCard>
                </Box>

                {/* recent contact requests */}
                <Box>
                    <SectionCard title='My Contact Requests' subtitle='Your latest requests'>
                        {recentRequests.length === 0 ? (
                            <Box sx={{ textAlign: 'center', py: '30px' }}>
                                <MdConnectWithoutContact style={{ fontSize: '40px', color: brand.primaryLight }} />
                                <Typography sx={{ color: 'text.secondary', fontSize: '13.5px', mt: '12px' }}>
                                    You haven&apos;t requested any contact information yet.
                                </Typography>
                                <Button component={RouterLink} to='/biodatas' size='small' variant='outlined' color='secondary' sx={{ mt: '15px', px: '20px' }}>
                                    Find Someone Special
                                </Button>
                            </Box>
                        ) : (
                            <Stack spacing={2}>
                                {recentRequests.map(request => (
                                    <Stack key={request._id} direction='row' spacing={1.5} alignItems='center'>
                                        <Box sx={{
                                            width: '38px', height: '38px', borderRadius: '10px', flexShrink: 0,
                                            display: 'flex', alignItems: 'center', justifyContent: 'center',
                                            bgcolor: request.status === 'Approved' ? '#e3f7ec' : '#fff5dc',
                                            color: request.status === 'Approved' ? '#1c7a4b' : '#a07400',
                                            fontSize: '16px',
                                        }}>
                                            {request.status === 'Approved' ? <FaCheckCircle /> : <FaHourglassHalf />}
                                        </Box>
                                        <Box sx={{ minWidth: 0, flexGrow: 1 }}>
                                            <Typography noWrap sx={{ fontSize: '14px', fontWeight: 600 }}>{request.name || 'Member'}</Typography>
                                            <Typography sx={{ fontSize: '12px', color: 'text.secondary' }}>${request.price}</Typography>
                                        </Box>
                                        <Chip
                                            label={request.status === 'Approved' ? 'APPROVED' : 'PENDING'}
                                            size='small'
                                            sx={{
                                                fontSize: '10px', fontWeight: 700, height: '20px',
                                                bgcolor: request.status === 'Approved' ? '#e3f7ec' : '#fff5dc',
                                                color: request.status === 'Approved' ? '#1c7a4b' : '#a07400',
                                            }}
                                        />
                                    </Stack>
                                ))}
                                <Button component={RouterLink} to='/dashboard/my-contact-request' size='small' sx={{ alignSelf: 'flex-start', fontSize: '12px', color: brand.secondary }}>
                                    View all requests →
                                </Button>
                            </Stack>
                        )}
                        {pendingRequests > 0 && recentRequests.length > 0 && (
                            <Typography sx={{ fontSize: '12px', color: 'text.secondary', mt: '15px' }}>
                                ⏳ {pendingRequests} request{pendingRequests > 1 ? 's' : ''} awaiting admin approval.
                            </Typography>
                        )}
                    </SectionCard>
                </Box>
            </Box>
        </Box>
    );
};

export default UsersDashboard;
