import { Box, Button, Chip, Container, Divider, Grid, Paper, Stack, Typography } from '@mui/material';
import { Link as RouterLink, useLoaderData, useParams } from 'react-router-dom';
import FavoriteBorderIcon from '@mui/icons-material/FavoriteBorder';
import SendIcon from '@mui/icons-material/Send';
import LockIcon from '@mui/icons-material/Lock';
import ArrowBackIcon from '@mui/icons-material/ArrowBack';
import { MdCake, MdOutlineLocationCity, MdPhoneInTalk } from 'react-icons/md';
import { FaRegEnvelope, FaCrown, FaRulerVertical, FaWeight, FaBriefcase, FaMapMarkerAlt } from 'react-icons/fa';
import Swal from 'sweetalert2';
import useAuth from '../../../hooks/useAuth';
import useUser from '../../../hooks/useUser';
import useAxiosPublic from '../../../hooks/useAxiosPublic';
import ProfileCard from '../../../shared/ProfileCard';
import { brand } from '../../../theme/theme';

// label/value row for the information tables
const InfoRow = ({ label, value }) => (
    <Stack direction='row' sx={{ py: '12px', borderBottom: '1px dashed #eee8d8' }}>
        <Typography sx={{ width: { xs: '45%', sm: '40%' }, color: 'text.secondary', fontSize: '14px' }}>{label}</Typography>
        <Typography sx={{ fontWeight: 500, fontSize: '14px', color: '#333' }}>{value || '—'}</Typography>
    </Stack>
)

// small stat tile under the profile name
const StatTile = ({ icon, label, value }) => (
    <Box sx={{
        flex: 1, minWidth: '140px', textAlign: 'center', p: '18px 10px',
        border: '1px solid #f0e8d5', borderRadius: '12px', bgcolor: '#fffdf6',
    }}>
        <Box sx={{ color: brand.secondary, fontSize: '26px' }}>{icon}</Box>
        <Typography sx={{ color: 'text.secondary', fontSize: '12px', mt: '4px', textTransform: 'uppercase', letterSpacing: '1px' }}>{label}</Typography>
        <Typography sx={{ color: brand.primary, fontWeight: 600, fontSize: '16px', mt: '2px' }}>{value || '—'}</Typography>
    </Box>
)

const SectionHeading = ({ children }) => (
    <Typography sx={{ color: brand.primary, fontSize: '24px', fontWeight: 700, fontFamily: "Playfair Display", mb: '5px' }}>
        {children}
    </Typography>
)

const DetailsBioData = () => {
    const { user } = useAuth()
    const [userInfo] = useUser()
    const allUsers = useLoaderData()
    const { id } = useParams()
    const singleUser = allUsers.find(item => item._id === id)
    const axiosPublic = useAxiosPublic()

    if (!singleUser) {
        return (
            <Container sx={{ mt: '150px', mb: '100px', textAlign: 'center' }}>
                <Typography variant='h2'>Profile not found</Typography>
                <Button component={RouterLink} to='/biodatas' variant='contained' color='secondary' sx={{ mt: '30px', px: '40px' }}>
                    Browse All Profiles
                </Button>
            </Container>
        )
    }

    // contact info is visible to premium members and to the profile owner
    const isOwnProfile = user?.email === singleUser.email
    const canSeeContact = userInfo?.premium === true || isOwnProfile

    const handleFavorite = () => {
        const favData = { ...singleUser, userEmail: user?.email }
        axiosPublic.post('/favorites', favData)
            .then(res => {
                if (res.data.acknowledged) {
                    Swal.fire({
                        position: "center",
                        icon: "success",
                        title: "Added to your favourites",
                        showConfirmButton: false,
                        timer: 1500
                    });
                }
            })
            .catch(() => {
                Swal.fire({ icon: "error", title: "Oops...", text: "Could not add to favourites!" });
            })
    }

    // similar profiles: same gender, other people, complete biodata
    const similarProfiles = allUsers
        .filter(item => item._id !== id && item.gender === singleUser.gender && item.photo)
        .sort((a, b) => (a.permanentDivision === singleUser.permanentDivision ? -1 : 0) - (b.permanentDivision === singleUser.permanentDivision ? -1 : 0))
        .slice(0, 4)

    return (
        <Box sx={{ mt: '90px' }}>
            {/* page banner */}
            <Box sx={{ bgcolor: brand.cream, py: '35px', borderBottom: '1px solid #f0e8d5' }}>
                <Container>
                    <Stack direction='row' justifyContent='space-between' alignItems='center'>
                        <Typography sx={{ fontFamily: 'Playfair Display', fontWeight: 700, fontSize: { xs: '22px', md: '28px' }, color: brand.primary }}>
                            Profile Details
                        </Typography>
                        <Button component={RouterLink} to='/biodatas' startIcon={<ArrowBackIcon />} sx={{ color: brand.primary }}>
                            All Bio Data&apos;s
                        </Button>
                    </Stack>
                </Container>
            </Box>

            <Container sx={{ py: '50px' }}>
                <Grid container spacing={5}>
                    {/* left: photo + actions */}
                    <Grid item xs={12} md={5}>
                        <Box sx={{ position: 'sticky', top: '110px' }}>
                            <Paper sx={{ borderRadius: '16px', overflow: 'hidden', boxShadow: '0px 15px 50px 0px rgba(17,17,17,0.12)' }}>
                                <Box sx={{ position: 'relative', height: { xs: '380px', md: '460px' }, bgcolor: brand.cream, overflow: 'hidden' }}>
                                    {/* blurred backdrop fills the box; the full image sits on top uncropped */}
                                    <Box sx={{
                                        position: 'absolute', inset: 0,
                                        backgroundImage: `url(${singleUser.photo})`,
                                        backgroundSize: 'cover', backgroundPosition: 'center',
                                        filter: 'blur(22px)', transform: 'scale(1.15)', opacity: 0.5,
                                    }} />
                                    <Box
                                        component='img'
                                        src={singleUser.photo}
                                        alt={singleUser.name}
                                        referrerPolicy="no-referrer"
                                        sx={{ position: 'relative', width: '100%', height: '100%', objectFit: 'contain', display: 'block' }}
                                    />
                                    {singleUser.premium && (
                                        <Chip
                                            icon={<FaCrown style={{ color: '#fff', fontSize: '13px' }} />}
                                            label='PREMIUM'
                                            size='small'
                                            sx={{
                                                position: 'absolute', top: '18px', right: '18px',
                                                bgcolor: brand.gold, color: '#fff', fontWeight: 700,
                                                letterSpacing: '1px', fontSize: '11px', px: '6px',
                                            }}
                                        />
                                    )}
                                    <Box sx={{
                                        position: 'absolute', left: 0, right: 0, bottom: 0,
                                        p: '50px 25px 18px',
                                        background: 'linear-gradient(180deg, rgba(17,17,17,0) 0%, rgba(17,17,17,0.85) 100%)',
                                    }}>
                                        <Typography sx={{ color: '#fff', fontFamily: 'Playfair Display', fontWeight: 700, fontSize: '26px' }}>
                                            {singleUser.name}
                                        </Typography>
                                        <Typography sx={{ color: 'rgba(255,255,255,0.85)', fontSize: '14px' }}>
                                            Biodata ID: {singleUser._id?.slice(-6).toUpperCase()}
                                        </Typography>
                                    </Box>
                                </Box>
                                <Box sx={{ p: '25px' }}>
                                    <Stack spacing={1.5}>
                                        <Button
                                            component={RouterLink}
                                            to={`/checkout/${singleUser._id}`}
                                            variant="contained"
                                            color='secondary'
                                            size='large'
                                            endIcon={<SendIcon />}
                                            fullWidth
                                            sx={{ py: '12px' }}
                                        >
                                            Send Contact Request
                                        </Button>
                                        <Button
                                            onClick={handleFavorite}
                                            variant="outlined"
                                            color='primary'
                                            size='large'
                                            startIcon={<FavoriteBorderIcon />}
                                            fullWidth
                                            sx={{ py: '12px', ':hover': { bgcolor: brand.primary, color: '#fff' } }}
                                        >
                                            Add to Favourites
                                        </Button>
                                    </Stack>
                                </Box>
                            </Paper>
                        </Box>
                    </Grid>

                    {/* right: details */}
                    <Grid item xs={12} md={7}>
                        <Typography variant='h2'>{singleUser.name}</Typography>
                        <Stack direction='row' spacing={1} flexWrap='wrap' useFlexGap sx={{ mt: '15px' }}>
                            {singleUser.occupation && <Chip icon={<FaBriefcase style={{ fontSize: '12px', color: brand.primary }} />} label={singleUser.occupation} size='small' variant='outlined' sx={{ borderColor: brand.primaryLight, color: brand.primary }} />}
                            {singleUser.permanentDivision && <Chip icon={<FaMapMarkerAlt style={{ fontSize: '12px', color: brand.primary }} />} label={singleUser.permanentDivision} size='small' variant='outlined' sx={{ borderColor: brand.primaryLight, color: brand.primary }} />}
                            {singleUser.race && <Chip label={singleUser.race} size='small' variant='outlined' sx={{ borderColor: brand.primaryLight, color: brand.primary }} />}
                        </Stack>

                        {/* quick stats */}
                        <Stack direction='row' spacing={2} sx={{ mt: '30px', flexWrap: { xs: 'wrap', sm: 'nowrap' }, gap: { xs: '12px', sm: 0 } }}>
                            <StatTile icon={<MdOutlineLocationCity />} label='Division' value={singleUser.permanentDivision} />
                            <StatTile icon={<MdCake />} label='Date of Birth' value={singleUser.dof} />
                            <StatTile icon={<FaRulerVertical />} label='Height' value={singleUser.height && `${singleUser.height}`} />
                        </Stack>

                        {/* about */}
                        <Box sx={{ mt: '40px' }}>
                            <SectionHeading>About</SectionHeading>
                            <Typography sx={{ color: 'text.secondary', fontSize: '14.5px', lineHeight: 1.9, mt: '10px' }}>
                                {singleUser.name} is a {singleUser.age ? `${singleUser.age}-year-old ` : ''}
                                {singleUser.occupation ? `${singleUser.occupation.toLowerCase()} ` : 'member '}
                                from {singleUser.permanentDivision || 'Bangladesh'}
                                {singleUser.presentDivision && singleUser.presentDivision !== singleUser.permanentDivision ? `, currently living in ${singleUser.presentDivision}` : ''}.
                                {' '}Looking for a life partner
                                {singleUser.partnerAge ? ` around ${singleUser.partnerAge} years of age` : ''}.
                                Send a contact request to get in touch and take the first step.
                            </Typography>
                        </Box>

                        {/* personal information */}
                        <Box sx={{ mt: '40px' }}>
                            <SectionHeading>Personal Information</SectionHeading>
                            <Paper sx={{ p: '10px 25px', mt: '15px', borderRadius: '12px', boxShadow: '0px 8px 30px 0px rgba(17,17,17,0.06)' }}>
                                <InfoRow label='Full Name' value={singleUser.name} />
                                <InfoRow label='Gender' value={singleUser.gender} />
                                <InfoRow label='Age' value={singleUser.age && `${singleUser.age} years`} />
                                <InfoRow label='Date of Birth' value={singleUser.dof} />
                                <InfoRow label='Height' value={singleUser.height} />
                                <InfoRow label='Weight' value={singleUser.weight} />
                                <InfoRow label='Race' value={singleUser.race} />
                                <InfoRow label='Occupation' value={singleUser.occupation} />
                                <InfoRow label="Father's Name" value={singleUser.fatherName} />
                                <InfoRow label="Mother's Name" value={singleUser.motherName} />
                                <InfoRow label='Permanent Division' value={singleUser.permanentDivision} />
                                <Box sx={{ '& > div': { borderBottom: 'none' } }}>
                                    <InfoRow label='Present Division' value={singleUser.presentDivision} />
                                </Box>
                            </Paper>
                        </Box>

                        {/* partner expectation */}
                        <Box sx={{ mt: '40px' }}>
                            <SectionHeading>Expected Partner</SectionHeading>
                            <Stack direction='row' spacing={2} sx={{ mt: '15px', flexWrap: { xs: 'wrap', sm: 'nowrap' }, gap: { xs: '12px', sm: 0 } }}>
                                <StatTile icon={<MdCake />} label='Age' value={singleUser.partnerAge && `${singleUser.partnerAge} yrs`} />
                                <StatTile icon={<FaRulerVertical />} label='Height' value={singleUser.partnerHeight} />
                                <StatTile icon={<FaWeight />} label='Weight' value={singleUser.partnerWeight} />
                            </Stack>
                        </Box>

                        {/* contact information */}
                        <Box sx={{ mt: '40px' }}>
                            <SectionHeading>Contact Information</SectionHeading>
                            {canSeeContact ? (
                                <Paper sx={{ p: '25px', mt: '15px', borderRadius: '12px', boxShadow: '0px 8px 30px 0px rgba(17,17,17,0.06)' }}>
                                    <Stack spacing={2}>
                                        <Stack direction={'row'} spacing={2} alignItems='center'>
                                            <Box sx={{ color: brand.secondary, fontSize: '20px', display: 'flex' }}><FaRegEnvelope /></Box>
                                            <Typography sx={{ fontSize: '15px' }}><strong>Email:</strong> {singleUser.email || '—'}</Typography>
                                        </Stack>
                                        <Stack direction={'row'} spacing={2} alignItems='center'>
                                            <Box sx={{ color: brand.secondary, fontSize: '22px', display: 'flex' }}><MdPhoneInTalk /></Box>
                                            <Typography sx={{ fontSize: '15px' }}><strong>Phone:</strong> {singleUser.phone || '—'}</Typography>
                                        </Stack>
                                    </Stack>
                                </Paper>
                            ) : (
                                <Paper sx={{ p: '30px 25px', mt: '15px', borderRadius: '12px', textAlign: 'center', border: `1px dashed ${brand.primaryLight}`, bgcolor: '#fffdf6', boxShadow: 'none' }}>
                                    <LockIcon sx={{ fontSize: '36px', color: brand.primaryLight }} />
                                    <Typography sx={{ fontWeight: 600, color: brand.primary, mt: '8px' }}>
                                        Contact details are locked
                                    </Typography>
                                    <Typography sx={{ color: 'text.secondary', fontSize: '13.5px', mt: '6px', mb: '20px' }}>
                                        Become a premium member or send a contact request to view {singleUser.gender === 'Female' ? 'her' : 'his'} email & phone number.
                                    </Typography>
                                    <Button component={RouterLink} to={`/checkout/${singleUser._id}`} variant="contained" color='secondary' endIcon={<SendIcon />} sx={{ px: '30px' }}>
                                        Send Contact Request
                                    </Button>
                                </Paper>
                            )}
                        </Box>
                    </Grid>
                </Grid>

                {/* similar profiles */}
                {similarProfiles.length > 0 && (
                    <Box sx={{ mt: '80px' }}>
                        <Divider sx={{ mb: '50px' }} />
                        <Typography variant='h4' sx={{ textAlign: 'center' }}>You may also like</Typography>
                        <Typography variant='h2' sx={{ textAlign: 'center', mt: '8px', mb: '40px' }}>Similar Profiles</Typography>
                        <Grid container spacing={3}>
                            {similarProfiles.map(profile => (
                                <Grid item key={profile._id} xs={12} sm={6} md={3}>
                                    <ProfileCard user={profile} imgHeight={230} />
                                </Grid>
                            ))}
                        </Grid>
                    </Box>
                )}
            </Container>
        </Box>
    );
};

export default DetailsBioData;
