import { Avatar, Box, Button, Card, Stack, Typography } from '@mui/material';
import { Link as RouterLink } from 'react-router-dom';
import { FaCrown, FaHeart, FaMapMarkerAlt, FaBriefcase } from 'react-icons/fa';
import useUser from '../../hooks/useUser';
import SectionTitle from '../../shared/SectionTitle';
import { brand } from '../../theme/theme';

// horizontal "shortlist" style card (matches the favourites page design)
const PremiumCard = ({ user }) => (
    <Card sx={{
        position: 'relative',
        borderRadius: '18px',
        p: '18px',
        display: 'flex',
        gap: '18px',
        height: '100%',
        overflow: 'hidden',
        border: '1px solid #f6efdd',
        boxShadow: '0px 8px 25px 0px rgba(17,17,17,0.05)',
        transition: 'transform .25s ease, box-shadow .25s ease',
        ':hover': { transform: 'translateY(-4px)', boxShadow: '0px 14px 35px 0px rgba(235,3,89,0.12)' },
    }}>
        {/* heart watermark */}
        <FaHeart style={{
            position: 'absolute', right: '-18px', bottom: '-22px',
            fontSize: '110px', color: 'rgba(235,3,89,0.05)', transform: 'rotate(-12deg)',
        }} />

        {/* photo with crown badge */}
        <Box sx={{ position: 'relative', flexShrink: 0 }}>
            <Avatar
                src={user?.photo}
                alt={user?.name}
                imgProps={{ referrerPolicy: 'no-referrer' }}
                variant='rounded'
                sx={{
                    width: 104, height: 124, borderRadius: '14px',
                    bgcolor: brand.cream, color: brand.primary, fontSize: '36px', fontWeight: 600,
                }}
            >
                {user?.name?.charAt(0)?.toUpperCase()}
            </Avatar>
            <Box sx={{
                position: 'absolute', top: '-8px', left: '-8px',
                width: '28px', height: '28px', borderRadius: '50%',
                bgcolor: brand.gold, display: 'flex', alignItems: 'center', justifyContent: 'center',
                border: '2px solid #fff', boxShadow: '0px 3px 8px 0px rgba(17,17,17,0.2)',
            }}>
                <FaCrown style={{ color: '#fff', fontSize: '12px' }} />
            </Box>
        </Box>

        {/* info */}
        <Box sx={{ minWidth: 0, flexGrow: 1, display: 'flex', flexDirection: 'column' }}>
            <Typography noWrap sx={{ fontFamily: 'Playfair Display', fontWeight: 700, fontSize: '18px', color: brand.primary }}>
                {user?.name}
            </Typography>
            <Typography sx={{ color: 'text.secondary', fontSize: '12.5px' }}>
                {user?.age ? `${user.age} yrs` : ''}{user?.age && user?.gender ? ' • ' : ''}{user?.gender}
            </Typography>

            <Stack spacing={0.6} sx={{ mt: '10px' }}>
                <Stack direction='row' spacing={1} alignItems='center'>
                    <FaBriefcase style={{ fontSize: '11px', color: brand.primaryLight, flexShrink: 0 }} />
                    <Typography noWrap sx={{ fontSize: '12.5px', color: '#555' }}>{user?.occupation || '—'}</Typography>
                </Stack>
                <Stack direction='row' spacing={1} alignItems='center'>
                    <FaMapMarkerAlt style={{ fontSize: '11px', color: brand.primaryLight, flexShrink: 0 }} />
                    <Typography noWrap sx={{ fontSize: '12.5px', color: '#555' }}>{user?.permanentDivision || '—'}</Typography>
                </Stack>
            </Stack>

            <Button
                component={RouterLink}
                to={`/details-bio-data/${user?._id}`}
                size='small'
                sx={{
                    mt: '16px', alignSelf: 'flex-start', px: '14px', py: '3px',
                    fontSize: '12.5px', color: brand.secondary, fontWeight: 600,
                    ':hover': { bgcolor: 'rgba(235,3,89,0.08)' },
                }}
            >
                View Full Profile →
            </Button>
        </Box>
    </Card>
)

const Premium = () => {
    const [, allUser] = useUser()

    const premiumMembers = (allUser || []).filter(singleUser => singleUser.premium === true)

    return (
        <Box sx={{ pt: '100px', pb: '90px' }}>
            <SectionTitle
                subHeading={'Premium'}
                heading={'Our Premium Members'}
                description={'Meet our verified premium members — handpicked profiles looking for their perfect life partner.'}
            />

            {/* grid view — same shortlist style as the favourites page */}
            <Box sx={{
                display: 'grid',
                gridTemplateColumns: { xs: '1fr', md: '1fr 1fr', lg: 'repeat(3, 1fr)' },
                gap: '20px',
                mt: '45px',
            }}>
                {premiumMembers.slice(0, 6).map(user => (
                    <PremiumCard key={user._id} user={user} />
                ))}
            </Box>

            <Box sx={{ textAlign: 'center', mt: '50px' }}>
                <Button
                    component={RouterLink}
                    to='/biodatas'
                    variant='contained'
                    color='secondary'
                    size='large'
                    sx={{ px: '45px', py: '12px' }}
                >
                    View All Profiles
                </Button>
            </Box>
        </Box>
    );
};

export default Premium;
