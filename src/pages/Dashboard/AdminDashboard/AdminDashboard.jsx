import { Avatar, Box, Card, Chip, LinearProgress, Stack, Table, TableBody, TableCell, TableHead, TableRow, Typography } from '@mui/material';
import CountUp from 'react-countup';
import { FaUsers, FaFemale, FaDollarSign, FaCrown } from "react-icons/fa";
import { FaUserTie } from "react-icons/fa6";
import useAuth from '../../../hooks/useAuth';
import useUser from '../../../hooks/useUser';
import useRequested from '../../../hooks/useRequested';
import { brand } from '../../../theme/theme';

const DIVISIONS = ['Dhaka', 'Chittagong', 'Barisal', 'Mymensingh', 'Rajshahi', 'Rangpur', 'Sylhet', 'Khulna'];

const MALE_COLOR = '#5b8def';
const FEMALE_COLOR = '#eb0359';

// stat card with gradient icon tile and animated number
const StatCard = ({ icon, label, value, gradient, prefix = '' }) => (
    <Card sx={{
        p: '22px', borderRadius: '16px', height: '100%',
        boxShadow: '0px 8px 30px 0px rgba(17,17,17,0.06)',
        transition: 'transform .25s ease',
        ':hover': { transform: 'translateY(-5px)' },
    }}>
        <Stack direction='row' spacing={2} alignItems='center'>
            <Box sx={{
                width: '54px', height: '54px', borderRadius: '14px', flexShrink: 0,
                display: 'flex', alignItems: 'center', justifyContent: 'center',
                background: gradient, color: '#fff', fontSize: '24px',
                boxShadow: '0px 8px 20px 0px rgba(17,17,17,0.15)',
            }}>
                {icon}
            </Box>
            <Box>
                <Typography sx={{ fontFamily: 'Playfair Display', fontWeight: 700, fontSize: '26px', color: '#222', lineHeight: 1.2 }}>
                    {prefix}<CountUp end={value || 0} duration={2} separator=',' />
                </Typography>
                <Typography sx={{ color: 'text.secondary', fontSize: '12.5px', mt: '2px' }}>
                    {label}
                </Typography>
            </Box>
        </Stack>
    </Card>
)

const SectionCard = ({ title, subtitle, children }) => (
    <Card sx={{ p: '25px', borderRadius: '16px', height: '100%', boxShadow: '0px 8px 30px 0px rgba(17,17,17,0.06)' }}>
        <Typography sx={{ fontFamily: 'Playfair Display', fontWeight: 700, fontSize: '19px', color: brand.primary }}>
            {title}
        </Typography>
        {subtitle && (
            <Typography sx={{ color: 'text.secondary', fontSize: '12.5px', mt: '2px' }}>
                {subtitle}
            </Typography>
        )}
        <Box sx={{ mt: '20px' }}>{children}</Box>
    </Card>
)

const AdminDashboard = () => {
    const { user } = useAuth()
    const [, allUser] = useUser()
    const [allRequest] = useRequested()

    const profiles = allUser || []
    const requests = allRequest || []

    const maleCount = profiles.filter(bio => bio.gender === 'Male').length
    const femaleCount = profiles.filter(bio => bio.gender === 'Female').length
    const premiumCount = profiles.filter(bio => bio.premium === true).length
    const revenue = requests.reduce((total, item) => total + (item.price || 0), 0)

    // gender donut (CSS conic-gradient — no chart library needed)
    const genderTotal = maleCount + femaleCount
    const malePct = genderTotal ? Math.round((maleCount / genderTotal) * 100) : 50

    // members per division, highest first
    const divisionStats = DIVISIONS
        .map(name => ({ name, count: profiles.filter(u => u.permanentDivision === name).length }))
        .filter(d => d.count > 0)
        .sort((a, b) => b.count - a.count)
    const divisionMax = divisionStats[0]?.count || 1

    // contact request status
    const approvedCount = requests.filter(r => r.status === 'Approved').length
    const pendingCount = requests.length - approvedCount

    // latest activity
    const recentRequests = [...requests].slice(-5).reverse()
    const recentMembers = [...profiles].slice(-5).reverse()

    const stats = [
        { label: 'Total Bio Data', value: profiles.length, icon: <FaUsers />, gradient: 'linear-gradient(135deg, #66451c 0%, #c48c46 100%)' },
        { label: 'Male Bio Data', value: maleCount, icon: <FaUserTie />, gradient: 'linear-gradient(135deg, #2b5db8 0%, #5b8def 100%)' },
        { label: 'Female Bio Data', value: femaleCount, icon: <FaFemale />, gradient: 'linear-gradient(135deg, #b80345 0%, #ff5e94 100%)' },
        { label: 'Premium Members', value: premiumCount, icon: <FaCrown />, gradient: 'linear-gradient(135deg, #c98a00 0%, #ffc83d 100%)' },
        { label: 'Total Revenue', value: revenue, icon: <FaDollarSign />, gradient: 'linear-gradient(135deg, #1c7a4b 0%, #3fcb82 100%)', prefix: '$' },
    ]

    return (
        <Box>
            {/* welcome header */}
            <Box sx={{ mb: '28px' }}>
                <Typography sx={{ fontFamily: 'Playfair Display', fontWeight: 700, fontSize: { xs: '24px', md: '30px' }, color: brand.primary }}>
                    Welcome back, {user?.displayName?.split(' ')[0] || 'Admin'} 👋
                </Typography>
                <Typography sx={{ color: 'text.secondary', fontSize: '14px', mt: '4px' }}>
                    Here&apos;s what&apos;s happening on the platform right now.
                </Typography>
            </Box>

            {/* stat cards */}
            <Box sx={{
                display: 'grid',
                gridTemplateColumns: { xs: '1fr', sm: '1fr 1fr', md: 'repeat(3, 1fr)', xl: 'repeat(5, 1fr)' },
                gap: '24px',
            }}>
                {stats.map(stat => (
                    <StatCard key={stat.label} {...stat} />
                ))}
            </Box>

            {/* charts row */}
            <Box sx={{
                display: 'grid',
                gridTemplateColumns: { xs: '1fr', md: 'repeat(3, 1fr)' },
                gap: '24px',
                mt: '24px',
            }}>
                {/* gender ratio donut */}
                <Box>
                    <SectionCard title='Gender Ratio' subtitle='Completed biodatas by gender'>
                        <Stack alignItems='center' spacing={2.5}>
                            <Box sx={{
                                width: '170px', height: '170px', borderRadius: '50%',
                                background: `conic-gradient(${MALE_COLOR} 0% ${malePct}%, ${FEMALE_COLOR} ${malePct}% 100%)`,
                                display: 'flex', alignItems: 'center', justifyContent: 'center',
                            }}>
                                <Box sx={{
                                    width: '118px', height: '118px', borderRadius: '50%', bgcolor: '#fff',
                                    display: 'flex', flexDirection: 'column', alignItems: 'center', justifyContent: 'center',
                                }}>
                                    <Typography sx={{ fontFamily: 'Playfair Display', fontWeight: 700, fontSize: '26px', color: '#222', lineHeight: 1 }}>
                                        {genderTotal}
                                    </Typography>
                                    <Typography sx={{ color: 'text.secondary', fontSize: '11px', mt: '4px' }}>
                                        PROFILES
                                    </Typography>
                                </Box>
                            </Box>
                            <Stack direction='row' spacing={3}>
                                <Stack direction='row' spacing={1} alignItems='center'>
                                    <Box sx={{ width: '10px', height: '10px', borderRadius: '3px', bgcolor: MALE_COLOR }} />
                                    <Typography sx={{ fontSize: '13px', color: 'text.secondary' }}>Male — <b>{maleCount}</b></Typography>
                                </Stack>
                                <Stack direction='row' spacing={1} alignItems='center'>
                                    <Box sx={{ width: '10px', height: '10px', borderRadius: '3px', bgcolor: FEMALE_COLOR }} />
                                    <Typography sx={{ fontSize: '13px', color: 'text.secondary' }}>Female — <b>{femaleCount}</b></Typography>
                                </Stack>
                            </Stack>
                        </Stack>
                    </SectionCard>
                </Box>

                {/* members by division */}
                <Box>
                    <SectionCard title='Members by Division' subtitle='Where your members come from'>
                        <Stack spacing={2}>
                            {divisionStats.length === 0 && (
                                <Typography sx={{ color: 'text.secondary', fontSize: '13px' }}>No division data yet.</Typography>
                            )}
                            {divisionStats.map(division => (
                                <Box key={division.name}>
                                    <Stack direction='row' justifyContent='space-between' sx={{ mb: '5px' }}>
                                        <Typography sx={{ fontSize: '13px', fontWeight: 500 }}>{division.name}</Typography>
                                        <Typography sx={{ fontSize: '13px', color: 'text.secondary' }}>{division.count}</Typography>
                                    </Stack>
                                    <LinearProgress
                                        variant='determinate'
                                        value={(division.count / divisionMax) * 100}
                                        sx={{
                                            height: '8px', borderRadius: '4px', bgcolor: '#f3eee0',
                                            '& .MuiLinearProgress-bar': { borderRadius: '4px', background: 'linear-gradient(90deg, #c48c46, #eb0359)' },
                                        }}
                                    />
                                </Box>
                            ))}
                        </Stack>
                    </SectionCard>
                </Box>

                {/* contact request status */}
                <Box>
                    <SectionCard title='Contact Requests' subtitle='Approval pipeline at a glance'>
                        <Stack spacing={2.5}>
                            <Box sx={{ textAlign: 'center', py: '8px' }}>
                                <Typography sx={{ fontFamily: 'Playfair Display', fontWeight: 700, fontSize: '40px', color: brand.primary, lineHeight: 1 }}>
                                    {requests.length}
                                </Typography>
                                <Typography sx={{ color: 'text.secondary', fontSize: '12px', mt: '6px', textTransform: 'uppercase', letterSpacing: '1px' }}>
                                    Total Requests
                                </Typography>
                            </Box>
                            <Box>
                                <Stack direction='row' justifyContent='space-between' sx={{ mb: '5px' }}>
                                    <Typography sx={{ fontSize: '13px', fontWeight: 500 }}>✅ Approved</Typography>
                                    <Typography sx={{ fontSize: '13px', color: 'text.secondary' }}>{approvedCount}</Typography>
                                </Stack>
                                <LinearProgress
                                    variant='determinate'
                                    value={requests.length ? (approvedCount / requests.length) * 100 : 0}
                                    sx={{ height: '8px', borderRadius: '4px', bgcolor: '#f3eee0', '& .MuiLinearProgress-bar': { borderRadius: '4px', bgcolor: '#3fcb82' } }}
                                />
                            </Box>
                            <Box>
                                <Stack direction='row' justifyContent='space-between' sx={{ mb: '5px' }}>
                                    <Typography sx={{ fontSize: '13px', fontWeight: 500 }}>⏳ Pending</Typography>
                                    <Typography sx={{ fontSize: '13px', color: 'text.secondary' }}>{pendingCount}</Typography>
                                </Stack>
                                <LinearProgress
                                    variant='determinate'
                                    value={requests.length ? (pendingCount / requests.length) * 100 : 0}
                                    sx={{ height: '8px', borderRadius: '4px', bgcolor: '#f3eee0', '& .MuiLinearProgress-bar': { borderRadius: '4px', bgcolor: '#ffb400' } }}
                                />
                            </Box>
                            <Typography sx={{ fontSize: '12.5px', color: 'text.secondary', textAlign: 'center', pt: '5px' }}>
                                💰 Lifetime revenue: <b style={{ color: brand.primary }}>${revenue}</b>
                            </Typography>
                        </Stack>
                    </SectionCard>
                </Box>
            </Box>

            {/* activity row — minWidth 0 on children lets the table scroll
                inside its card instead of widening the page on mobile */}
            <Box sx={{
                display: 'grid',
                gridTemplateColumns: { xs: '1fr', lg: '7fr 5fr' },
                gap: '24px',
                mt: '24px',
                '& > *': { minWidth: 0 },
            }}>
                {/* recent contact requests */}
                <Box>
                    <SectionCard title='Recent Contact Requests' subtitle='Latest 5 requests on the platform'>
                        {recentRequests.length === 0 ? (
                            <Typography sx={{ color: 'text.secondary', fontSize: '13px' }}>No contact requests yet.</Typography>
                        ) : (
                            <Box sx={{ overflowX: 'auto' }}>
                                <Table size='small'>
                                    <TableHead>
                                        <TableRow>
                                            <TableCell sx={{ fontWeight: 600, color: 'text.secondary', fontSize: '12px' }}>REQUESTER</TableCell>
                                            <TableCell sx={{ fontWeight: 600, color: 'text.secondary', fontSize: '12px' }}>REQUESTED PROFILE</TableCell>
                                            <TableCell sx={{ fontWeight: 600, color: 'text.secondary', fontSize: '12px' }}>AMOUNT</TableCell>
                                            <TableCell sx={{ fontWeight: 600, color: 'text.secondary', fontSize: '12px' }}>STATUS</TableCell>
                                        </TableRow>
                                    </TableHead>
                                    <TableBody>
                                        {recentRequests.map((request) => (
                                            <TableRow key={request._id} sx={{ '&:last-child td': { border: 0 } }}>
                                                <TableCell sx={{ fontSize: '13.5px' }}>{request.requesterName || request.requesterEmail}</TableCell>
                                                <TableCell sx={{ fontSize: '13.5px' }}>{request.name}</TableCell>
                                                <TableCell sx={{ fontSize: '13.5px', fontWeight: 600 }}>${request.price}</TableCell>
                                                <TableCell>
                                                    <Chip
                                                        label={request.status || 'Pending'}
                                                        size='small'
                                                        sx={{
                                                            fontSize: '11px', fontWeight: 700, height: '22px',
                                                            bgcolor: request.status === 'Approved' ? '#e3f7ec' : '#fff5dc',
                                                            color: request.status === 'Approved' ? '#1c7a4b' : '#a07400',
                                                        }}
                                                    />
                                                </TableCell>
                                            </TableRow>
                                        ))}
                                    </TableBody>
                                </Table>
                            </Box>
                        )}
                    </SectionCard>
                </Box>

                {/* newest members */}
                <Box>
                    <SectionCard title='Newest Members' subtitle='Latest 5 registrations'>
                        <Stack spacing={2}>
                            {recentMembers.map((member) => (
                                <Stack key={member._id} direction='row' spacing={1.5} alignItems='center'>
                                    <Avatar
                                        src={member.photo}
                                        alt={member.name}
                                        imgProps={{ referrerPolicy: 'no-referrer' }}
                                        sx={{ width: 40, height: 40, bgcolor: brand.primaryLight, fontSize: '16px', fontWeight: 600 }}
                                    >
                                        {member.name?.charAt(0)?.toUpperCase()}
                                    </Avatar>
                                    <Box sx={{ minWidth: 0, flexGrow: 1 }}>
                                        <Typography noWrap sx={{ fontSize: '14px', fontWeight: 600 }}>{member.name || 'Unnamed'}</Typography>
                                        <Typography noWrap sx={{ fontSize: '12px', color: 'text.secondary' }}>
                                            {member.permanentDivision || member.email}
                                        </Typography>
                                    </Box>
                                    {member.role === 'admin' ? (
                                        <Chip label='ADMIN' size='small' sx={{ fontSize: '10px', fontWeight: 700, height: '20px', bgcolor: '#ece4f7', color: '#6c3fb5' }} />
                                    ) : member.premium ? (
                                        <Chip label='PREMIUM' size='small' sx={{ fontSize: '10px', fontWeight: 700, height: '20px', bgcolor: '#fff3d1', color: '#a07400' }} />
                                    ) : null}
                                </Stack>
                            ))}
                        </Stack>
                    </SectionCard>
                </Box>
            </Box>
        </Box>
    );
};

export default AdminDashboard;
