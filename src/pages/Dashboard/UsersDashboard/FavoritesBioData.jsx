import { useMemo } from 'react';
import { Box, Button, Card, CircularProgress, Stack, Tooltip, Typography, IconButton, Avatar } from '@mui/material';
import { Link as RouterLink } from 'react-router-dom';
import { FaRegHeart, FaHeart, FaMapMarkerAlt, FaBriefcase, FaCrown } from 'react-icons/fa';
import Swal from 'sweetalert2';
import useUser from '../../../hooks/useUser';
import useAxiosPublic from '../../../hooks/useAxiosPublic';
import { brand } from '../../../theme/theme';

const FavoritesBioData = () => {
    const [, allUser, , favUserInfo, refetch] = useUser()
    const axiosPublic = useAxiosPublic()

    const favorites = useMemo(() => favUserInfo || [], [favUserInfo])

    // a favorite stores a copy of the biodata without its original _id —
    // recover it by email so "View Profile" can link to the live profile
    const findOriginalId = (favorite) =>
        (allUser || []).find(member => member.email === favorite.email)?._id

    const handleDelete = (favorite) => {
        Swal.fire({
            title: `Remove ${favorite.name || 'this member'}?`,
            text: 'They will be removed from your favourites list.',
            icon: 'warning',
            showCancelButton: true,
            confirmButtonColor: '#d33',
            confirmButtonText: 'Yes, remove',
            cancelButtonText: 'Keep',
        }).then((result) => {
            if (!result.isConfirmed) return
            axiosPublic.delete(`/favorites/${favorite._id}`)
                .then(res => {
                    if (res.data.deletedCount > 0) {
                        Swal.fire({ title: 'Removed!', text: `${favorite.name || 'The member'} was removed from your favourites.`, icon: 'success', timer: 1600, showConfirmButton: false });
                        refetch()
                    }
                })
                .catch(() => Swal.fire({ icon: 'error', title: 'Oops...', text: 'Could not remove the favourite!' }))
        });
    }

    if (!favUserInfo) {
        return (
            <Card sx={{ p: '80px', borderRadius: '16px', textAlign: 'center', boxShadow: '0px 8px 30px 0px rgba(17,17,17,0.06)' }}>
                <CircularProgress color='secondary' />
                <Typography sx={{ color: 'text.secondary', fontSize: '13.5px', mt: '15px' }}>Loading your favourites…</Typography>
            </Card>
        )
    }

    return (
        <Box>
            {/* page header */}
            <Stack direction={{ xs: 'column', sm: 'row' }} justifyContent='space-between' alignItems={{ xs: 'flex-start', sm: 'center' }} spacing={2} sx={{ mb: '24px' }}>
                <Box>
                    <Typography sx={{ fontFamily: 'Playfair Display', fontWeight: 700, fontSize: { xs: '22px', md: '26px' }, color: brand.primary }}>
                        My Favourites
                    </Typography>
                    <Typography sx={{ color: 'text.secondary', fontSize: '13.5px', mt: '2px' }}>
                        {favorites.length} profile{favorites.length !== 1 && 's'} you&apos;ve shortlisted
                    </Typography>
                </Box>
                <Button
                    component={RouterLink}
                    to='/biodatas'
                    variant='outlined'
                    color='secondary'
                    sx={{ px: '22px', flexShrink: 0 }}
                >
                    Find More Profiles
                </Button>
            </Stack>

            {favorites.length === 0 ? (
                <Card sx={{ p: '70px 30px', borderRadius: '16px', textAlign: 'center', boxShadow: '0px 8px 30px 0px rgba(17,17,17,0.06)' }}>
                    <FaRegHeart style={{ fontSize: '48px', color: brand.primaryLight }} />
                    <Typography sx={{ fontFamily: 'Playfair Display', fontWeight: 700, fontSize: '20px', color: brand.primary, mt: '16px' }}>
                        Your favourites list is empty
                    </Typography>
                    <Typography sx={{ color: 'text.secondary', fontSize: '14px', mt: '6px', mb: '25px', maxWidth: '400px', mx: 'auto' }}>
                        Tap &quot;Add to Favourites&quot; on any profile you like and it will be saved here for later.
                    </Typography>
                    <Button component={RouterLink} to='/biodatas' variant='contained' color='secondary' sx={{ px: '35px' }}>
                        Browse Profiles
                    </Button>
                </Card>
            ) : (
                <Box sx={{
                    display: 'grid',
                    gridTemplateColumns: { xs: '1fr', md: '1fr 1fr', xl: 'repeat(3, 1fr)' },
                    gap: '20px',
                }}>
                    {favorites.map(favorite => {
                        const originalId = findOriginalId(favorite)
                        return (
                            <Card key={favorite._id} sx={{
                                position: 'relative',
                                borderRadius: '18px',
                                p: '18px',
                                display: 'flex',
                                gap: '18px',
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

                                {/* photo */}
                                <Box sx={{ position: 'relative', flexShrink: 0 }}>
                                    <Avatar
                                        src={favorite.photo}
                                        alt={favorite.name}
                                        imgProps={{ referrerPolicy: 'no-referrer' }}
                                        variant='rounded'
                                        sx={{
                                            width: 104, height: 124, borderRadius: '14px',
                                            bgcolor: brand.cream, color: brand.primary, fontSize: '36px', fontWeight: 600,
                                        }}
                                    >
                                        {favorite.name?.charAt(0)?.toUpperCase()}
                                    </Avatar>
                                    {favorite.premium && (
                                        <Box sx={{
                                            position: 'absolute', top: '-8px', left: '-8px',
                                            width: '28px', height: '28px', borderRadius: '50%',
                                            bgcolor: brand.gold, display: 'flex', alignItems: 'center', justifyContent: 'center',
                                            border: '2px solid #fff', boxShadow: '0px 3px 8px 0px rgba(17,17,17,0.2)',
                                        }}>
                                            <FaCrown style={{ color: '#fff', fontSize: '12px' }} />
                                        </Box>
                                    )}
                                </Box>

                                {/* info */}
                                <Box sx={{ minWidth: 0, flexGrow: 1, display: 'flex', flexDirection: 'column' }}>
                                    <Stack direction='row' justifyContent='space-between' alignItems='flex-start'>
                                        <Box sx={{ minWidth: 0 }}>
                                            <Typography noWrap sx={{ fontFamily: 'Playfair Display', fontWeight: 700, fontSize: '18px', color: brand.primary }}>
                                                {favorite.name}
                                            </Typography>
                                            <Typography sx={{ color: 'text.secondary', fontSize: '12.5px' }}>
                                                {favorite.age ? `${favorite.age} yrs` : ''}{favorite.age && favorite.gender ? ' • ' : ''}{favorite.gender}
                                            </Typography>
                                        </Box>
                                        <Tooltip title='Remove from favourites'>
                                            <IconButton
                                                onClick={() => handleDelete(favorite)}
                                                size='small'
                                                sx={{
                                                    color: brand.secondary, bgcolor: 'rgba(235,3,89,0.08)',
                                                    ':hover': { bgcolor: brand.secondary, color: '#fff' },
                                                }}
                                                aria-label='Remove from favourites'
                                            >
                                                <FaHeart style={{ fontSize: '15px' }} />
                                            </IconButton>
                                        </Tooltip>
                                    </Stack>

                                    <Stack spacing={0.6} sx={{ mt: '10px' }}>
                                        <Stack direction='row' spacing={1} alignItems='center'>
                                            <FaBriefcase style={{ fontSize: '11px', color: brand.primaryLight, flexShrink: 0 }} />
                                            <Typography noWrap sx={{ fontSize: '12.5px', color: '#555' }}>{favorite.occupation || '—'}</Typography>
                                        </Stack>
                                        <Stack direction='row' spacing={1} alignItems='center'>
                                            <FaMapMarkerAlt style={{ fontSize: '11px', color: brand.primaryLight, flexShrink: 0 }} />
                                            <Typography noWrap sx={{ fontSize: '12.5px', color: '#555' }}>{favorite.permanentDivision || '—'}</Typography>
                                        </Stack>
                                    </Stack>

                                    {originalId && (
                                        <Button
                                            component={RouterLink}
                                            to={`/details-bio-data/${originalId}`}
                                            size='small'
                                            sx={{
                                                mt: 'auto', alignSelf: 'flex-start', px: '14px', py: '3px',
                                                fontSize: '12.5px', color: brand.secondary, fontWeight: 600,
                                                ':hover': { bgcolor: 'rgba(235,3,89,0.08)' },
                                            }}
                                        >
                                            View Full Profile →
                                        </Button>
                                    )}
                                </Box>
                            </Card>
                        )
                    })}
                </Box>
            )}
        </Box>
    );
};

export default FavoritesBioData;
