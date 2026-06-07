import { Box, Button, Card, CardContent, Chip, Stack, Typography } from '@mui/material';
import { Link as RouterLink } from 'react-router-dom';
import { FaCrown, FaMapMarkerAlt, FaBriefcase, FaArrowRight } from 'react-icons/fa';
import { brand } from '../theme/theme';

/**
 * Biodata profile card used on the home page (premium members),
 * the listing page and the "similar profiles" section.
 */
const ProfileCard = ({ user, imgHeight = 300 }) => {
    return (
        <Card sx={{
            borderRadius: '14px',
            overflow: 'hidden',
            height: '100%',
            display: 'flex',
            flexDirection: 'column',
            boxShadow: '0px 10px 40px 0px rgba(17,17,17,0.08)',
            transition: 'transform .3s ease, box-shadow .3s ease',
            ':hover': { transform: 'translateY(-8px)', boxShadow: '0px 20px 50px 0px rgba(17,17,17,0.16)' },
        }}>
            <Box sx={{ position: 'relative' }}>
                <Box
                    component='img'
                    src={user?.photo}
                    alt={user?.name}
                    referrerPolicy="no-referrer"
                    sx={{ width: '100%', height: `${imgHeight}px`, objectFit: 'cover', display: 'block', bgcolor: brand.cream }}
                />
                {user?.premium && (
                    <Chip
                        icon={<FaCrown style={{ color: '#fff', fontSize: '13px' }} />}
                        label='PREMIUM'
                        size='small'
                        sx={{
                            position: 'absolute', top: '15px', right: '15px',
                            bgcolor: brand.gold, color: '#fff', fontWeight: 700,
                            letterSpacing: '1px', fontSize: '11px', px: '6px',
                        }}
                    />
                )}
                {/* bottom gradient with name */}
                <Box sx={{
                    position: 'absolute', left: 0, right: 0, bottom: 0,
                    p: '40px 20px 14px',
                    background: 'linear-gradient(180deg, rgba(17,17,17,0) 0%, rgba(17,17,17,0.8) 100%)',
                }}>
                    <Typography sx={{ color: '#fff', fontFamily: 'Playfair Display', fontWeight: 700, fontSize: '21px', lineHeight: 1.2 }}>
                        {user?.name}
                    </Typography>
                    <Typography sx={{ color: 'rgba(255,255,255,0.85)', fontSize: '13px' }}>
                        {user?.age ? `${user.age} yrs` : ''}{user?.age && user?.gender ? ' • ' : ''}{user?.gender}
                    </Typography>
                </Box>
            </Box>
            <CardContent sx={{ p: '18px', display: 'flex', flexDirection: 'column', flexGrow: 1 }}>
                <Stack direction='row' spacing={1} flexWrap='wrap' useFlexGap sx={{ mb: '16px' }}>
                    {user?.occupation && (
                        <Chip icon={<FaBriefcase style={{ fontSize: '12px', color: brand.primary }} />} label={user.occupation} size='small' variant='outlined' sx={{ borderColor: brand.primaryLight, color: brand.primary }} />
                    )}
                    {user?.permanentDivision && (
                        <Chip icon={<FaMapMarkerAlt style={{ fontSize: '12px', color: brand.primary }} />} label={user.permanentDivision} size='small' variant='outlined' sx={{ borderColor: brand.primaryLight, color: brand.primary }} />
                    )}
                </Stack>
                <Button
                    component={RouterLink}
                    to={`/details-bio-data/${user?._id}`}
                    fullWidth
                    variant='outlined'
                    color='primary'
                    endIcon={<FaArrowRight style={{ fontSize: '13px' }} />}
                    sx={{ mt: 'auto', ':hover': { bgcolor: brand.primary, color: '#fff', borderColor: brand.primary } }}
                >
                    View Profile
                </Button>
            </CardContent>
        </Card>
    );
};

export default ProfileCard;
