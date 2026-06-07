import { useState } from 'react';
import { Link as RouterLink, useSearchParams } from 'react-router-dom';
import {
    Box, Button, Card, CardContent, Checkbox, Chip, Container, FormControl, Grid, InputLabel,
    ListItemText, MenuItem, OutlinedInput, Paper, Select, Skeleton, Slider, Stack, Tab, Tabs, TextField, Typography
} from '@mui/material';
import { FaCrown, FaMapMarkerAlt, FaBriefcase, FaRulerVertical, FaWeight, FaArrowRight, FaSearchMinus, FaFemale, FaMale, FaHeart } from 'react-icons/fa';
import useUser from '../../hooks/useUser';
import { brand } from '../../theme/theme';

const DIVISIONS = ['Dhaka', 'Chittagong', 'Barisal', 'Mymensingh', 'Rajshahi', 'Rangpur', 'Sylhet', 'Khulna'];
const AGE_MIN = 18;
const AGE_MAX = 70;

// "18 - 25" / "40+" (from the home page search) -> [18, 25] / [40, 70]
const parseAgeParam = (param) => {
    if (!param) return null;
    if (param.includes('+')) return [parseInt(param), AGE_MAX];
    const [lo, hi] = param.split('-').map(part => parseInt(part.trim()));
    if (Number.isFinite(lo) && Number.isFinite(hi)) return [lo, hi];
    return null;
};

// single fact cell inside the biodata card
const Fact = ({ icon, label, value }) => (
    <Stack direction='row' spacing={1} alignItems='center' sx={{ width: 'calc(50% - 6px)' }}>
        <Box sx={{ color: brand.secondary, fontSize: '13px', display: 'flex', flexShrink: 0 }}>{icon}</Box>
        <Box sx={{ minWidth: 0 }}>
            <Typography sx={{ fontSize: '10.5px', color: 'text.secondary', textTransform: 'uppercase', letterSpacing: '0.5px', lineHeight: 1.3 }}>
                {label}
            </Typography>
            <Typography noWrap sx={{ fontSize: '13px', fontWeight: 500, color: '#333', lineHeight: 1.4 }}>
                {value || '—'}
            </Typography>
        </Box>
    </Stack>
)

// richer biodata card: photo + name overlay, then a 2x2 fact grid from the API data
const BiodataCard = ({ user }) => (
    <Card sx={{
        borderRadius: '16px',
        overflow: 'hidden',
        height: '100%',
        display: 'flex',
        flexDirection: 'column',
        boxShadow: '0px 8px 30px 0px rgba(17,17,17,0.07)',
        transition: 'transform .3s ease, box-shadow .3s ease',
        ':hover': { transform: 'translateY(-8px)', boxShadow: '0px 18px 45px 0px rgba(17,17,17,0.15)' },
        ':hover img': { transform: 'scale(1.06)' },
    }}>
        <Box sx={{ position: 'relative', overflow: 'hidden' }}>
            <Box
                component='img'
                src={user?.photo}
                alt={user?.name}
                referrerPolicy="no-referrer"
                sx={{ width: '100%', height: '270px', objectFit: 'cover', display: 'block', bgcolor: brand.cream, transition: 'transform .5s ease' }}
            />
            {user?.premium && (
                <Chip
                    icon={<FaCrown style={{ color: '#fff', fontSize: '12px' }} />}
                    label='PREMIUM'
                    size='small'
                    sx={{
                        position: 'absolute', top: '14px', right: '14px',
                        bgcolor: brand.gold, color: '#fff', fontWeight: 700,
                        letterSpacing: '1px', fontSize: '10.5px', px: '5px',
                    }}
                />
            )}
            <Box sx={{
                position: 'absolute', left: 0, right: 0, bottom: 0,
                p: '40px 18px 12px',
                background: 'linear-gradient(180deg, rgba(17,17,17,0) 0%, rgba(17,17,17,0.85) 100%)',
            }}>
                <Typography noWrap sx={{ color: '#fff', fontFamily: 'Playfair Display', fontWeight: 700, fontSize: '20px', lineHeight: 1.25 }}>
                    {user?.name}
                </Typography>
                <Typography sx={{ color: 'rgba(255,255,255,0.85)', fontSize: '12.5px' }}>
                    {user?.age ? `${user.age} yrs` : ''}{user?.age ? ' • ' : ''}{user?.gender}
                </Typography>
            </Box>
        </Box>
        <CardContent sx={{ p: '16px 18px', display: 'flex', flexDirection: 'column', flexGrow: 1 }}>
            <Stack direction='row' flexWrap='wrap' useFlexGap sx={{ gap: '12px', mb: '16px' }}>
                <Fact icon={<FaBriefcase />} label='Occupation' value={user?.occupation} />
                <Fact icon={<FaMapMarkerAlt />} label='Division' value={user?.permanentDivision} />
                <Fact icon={<FaRulerVertical />} label='Height' value={user?.height} />
                <Fact icon={<FaWeight />} label='Weight' value={user?.weight} />
            </Stack>
            <Button
                component={RouterLink}
                to={`/details-bio-data/${user?._id}`}
                fullWidth
                variant='outlined'
                color='primary'
                size='small'
                endIcon={<FaArrowRight style={{ fontSize: '12px' }} />}
                sx={{ mt: 'auto', py: '7px', ':hover': { bgcolor: brand.primary, color: '#fff', borderColor: brand.primary } }}
            >
                View Profile
            </Button>
        </CardContent>
    </Card>
)

const CardSkeleton = () => (
    <Card sx={{ borderRadius: '16px', overflow: 'hidden' }}>
        <Skeleton variant='rectangular' height={270} />
        <CardContent>
            <Skeleton width='65%' height={28} />
            <Skeleton width='90%' />
            <Skeleton width='80%' />
            <Skeleton variant='rounded' height={34} sx={{ mt: '12px', borderRadius: '50px' }} />
        </CardContent>
    </Card>
)

const AllBioData = () => {
    const [, allUser] = useUser()
    const [searchParams] = useSearchParams()
    const isLoading = !allUser

    // preset filters from the home page search card
    const [tab, setTab] = useState(() => searchParams.get('gender') || 'all')
    const [divisions, setDivisions] = useState(() => {
        const d = searchParams.get('division')
        return d ? [d] : []
    })
    const [ageRange, setAgeRange] = useState(() => parseAgeParam(searchParams.get('age')) || [AGE_MIN, AGE_MAX])
    const [sortOrder, setSortOrder] = useState('default')

    // only show completed biodata (skip admin/bare accounts without a profile)
    const profiles = (allUser || []).filter(item => item.gender && item.photo)

    const brideCount = profiles.filter(item => item.gender === 'Female').length
    const groomCount = profiles.filter(item => item.gender === 'Male').length
    const premiumCount = profiles.filter(item => item.premium === true).length

    const ageActive = ageRange[0] > AGE_MIN || ageRange[1] < AGE_MAX
    const filterActive = tab !== 'all' || divisions.length > 0 || ageActive

    const clearFilters = () => {
        setTab('all')
        setDivisions([])
        setAgeRange([AGE_MIN, AGE_MAX])
        setSortOrder('default')
    }

    const filteredData = profiles.filter(item => {
        const tabOk = tab === 'all'
            || (tab === 'premium' && item.premium === true)
            || item.gender === tab
        const divisionOk = divisions.length === 0 || divisions.includes(item.permanentDivision)
        const age = parseInt(item.age)
        const ageOk = !ageActive || (Number.isFinite(age) && age >= ageRange[0] && age <= ageRange[1])
        return tabOk && divisionOk && ageOk
    })

    const sortedData = sortOrder === 'default'
        ? filteredData
        : [...filteredData].sort((a, b) => sortOrder === 'asc'
            ? parseInt(a.age) - parseInt(b.age)
            : parseInt(b.age) - parseInt(a.age))

    return (
        <Box sx={{ mt: '90px' }}>
            {/* dark hero banner with live stats */}
            <Box sx={{
                bgcolor: brand.dark,
                py: { xs: '55px', md: '75px' },
                textAlign: 'center',
                position: 'relative',
                overflow: 'hidden',
            }}>
                {/* decorative blurred glows */}
                <Box sx={{ position: 'absolute', width: '420px', height: '420px', borderRadius: '50%', bgcolor: 'rgba(235,3,89,0.14)', filter: 'blur(110px)', top: '-180px', left: '-120px' }} />
                <Box sx={{ position: 'absolute', width: '420px', height: '420px', borderRadius: '50%', bgcolor: 'rgba(255,180,0,0.12)', filter: 'blur(110px)', bottom: '-180px', right: '-120px' }} />
                <Container sx={{ position: 'relative' }}>
                    <Typography variant='h4' sx={{ color: brand.gold }}>Browse Profiles</Typography>
                    <Typography variant='h2' sx={{ color: '#fff', mt: '8px' }}>Find Your Match</Typography>
                    <Typography sx={{ color: 'rgba(255,255,255,0.7)', mt: '14px', fontSize: '15px', maxWidth: '540px', mx: 'auto' }}>
                        Every profile is verified by our team. Filter by age, division and preference to discover the one made for you.
                    </Typography>
                    <Stack direction='row' spacing={{ xs: 1, sm: 2 }} justifyContent='center' sx={{ mt: '30px', flexWrap: 'wrap', gap: '10px' }}>
                        <Chip icon={<FaFemale style={{ color: brand.gold, fontSize: '14px' }} />} label={`${brideCount} Brides`} sx={{ bgcolor: 'rgba(255,255,255,0.08)', color: '#fff', fontWeight: 600, px: '8px', py: '18px', fontSize: '13px' }} />
                        <Chip icon={<FaMale style={{ color: brand.gold, fontSize: '14px' }} />} label={`${groomCount} Grooms`} sx={{ bgcolor: 'rgba(255,255,255,0.08)', color: '#fff', fontWeight: 600, px: '8px', py: '18px', fontSize: '13px' }} />
                        <Chip icon={<FaCrown style={{ color: brand.gold, fontSize: '14px' }} />} label={`${premiumCount} Premium`} sx={{ bgcolor: 'rgba(255,255,255,0.08)', color: '#fff', fontWeight: 600, px: '8px', py: '18px', fontSize: '13px' }} />
                    </Stack>
                </Container>
            </Box>

            {/* sticky filter bar */}
            <Paper square elevation={0} sx={{
                position: 'sticky', top: '90px', zIndex: 40,
                bgcolor: 'rgba(255,255,255,0.96)', backdropFilter: 'blur(8px)',
                borderBottom: '1px solid #f0e8d5',
                boxShadow: '0px 8px 25px 0px rgba(17,17,17,0.05)',
            }}>
                <Container>
                    <Stack
                        direction={{ xs: 'column', lg: 'row' }}
                        alignItems={{ xs: 'stretch', lg: 'center' }}
                        justifyContent='space-between'
                        spacing={2}
                        sx={{ py: '14px' }}
                    >
                        <Tabs
                            value={tab}
                            onChange={(e, value) => setTab(value)}
                            variant='scrollable'
                            allowScrollButtonsMobile
                            TabIndicatorProps={{ sx: { bgcolor: brand.secondary, height: '3px', borderRadius: '3px' } }}
                            sx={{
                                minHeight: '42px',
                                '& .MuiTab-root': { textTransform: 'none', fontWeight: 600, fontSize: '14px', minHeight: '42px', color: 'text.secondary' },
                                '& .Mui-selected': { color: `${brand.secondary} !important` },
                            }}
                        >
                            <Tab value='all' label={`All (${profiles.length})`} />
                            <Tab value='Female' label={`Brides (${brideCount})`} />
                            <Tab value='Male' label={`Grooms (${groomCount})`} />
                            <Tab value='premium' icon={<FaCrown style={{ fontSize: '13px' }} />} iconPosition='start' label={`Premium (${premiumCount})`} />
                        </Tabs>

                        <Stack direction={{ xs: 'column', sm: 'row' }} spacing={2} alignItems={{ xs: 'stretch', sm: 'center' }}>
                            <FormControl size='small' sx={{ minWidth: '170px' }}>
                                <InputLabel id='division-filter'>Division</InputLabel>
                                <Select
                                    labelId='division-filter'
                                    multiple
                                    value={divisions}
                                    onChange={(e) => setDivisions(typeof e.target.value === 'string' ? e.target.value.split(',') : e.target.value)}
                                    input={<OutlinedInput label='Division' />}
                                    renderValue={(selected) => selected.join(', ')}
                                >
                                    {DIVISIONS.map((division) => (
                                        <MenuItem key={division} value={division} dense>
                                            <Checkbox size='small' checked={divisions.includes(division)} sx={{ color: brand.primaryLight, '&.Mui-checked': { color: brand.secondary }, py: 0 }} />
                                            <ListItemText primary={division} primaryTypographyProps={{ fontSize: '14px' }} />
                                        </MenuItem>
                                    ))}
                                </Select>
                            </FormControl>

                            <Box sx={{ width: { xs: '100%', sm: '190px' }, px: '10px' }}>
                                <Typography sx={{ fontSize: '11px', color: 'text.secondary', lineHeight: 1 }}>
                                    Age: {ageRange[0]}–{ageRange[1] === AGE_MAX ? `${AGE_MAX}+` : ageRange[1]}
                                </Typography>
                                <Slider
                                    value={ageRange}
                                    onChange={(e, value) => setAgeRange(value)}
                                    valueLabelDisplay="auto"
                                    min={AGE_MIN}
                                    max={AGE_MAX}
                                    size='small'
                                    color='secondary'
                                    sx={{ py: '8px' }}
                                />
                            </Box>

                            <TextField
                                select
                                size='small'
                                label='Sort'
                                value={sortOrder}
                                onChange={(e) => setSortOrder(e.target.value)}
                                sx={{ minWidth: '150px' }}
                            >
                                <MenuItem value='default'>Default</MenuItem>
                                <MenuItem value='asc'>Age: low → high</MenuItem>
                                <MenuItem value='desc'>Age: high → low</MenuItem>
                            </TextField>

                            {filterActive && (
                                <Button onClick={clearFilters} color='secondary' size='small' sx={{ flexShrink: 0 }}>
                                    Clear
                                </Button>
                            )}
                        </Stack>
                    </Stack>
                </Container>
            </Paper>

            {/* results */}
            <Box sx={{ bgcolor: '#fffdf6', minHeight: '50vh' }}>
                <Container sx={{ py: '45px' }}>
                    <Typography sx={{ color: 'text.secondary', fontSize: '14px', mb: '25px' }}>
                        {isLoading ? 'Loading profiles…' : <>Showing <Box component='span' sx={{ color: brand.secondary, fontWeight: 600 }}>{sortedData.length}</Box> profile{sortedData.length !== 1 && 's'}</>}
                    </Typography>

                    {isLoading ? (
                        <Grid container spacing={3}>
                            {Array.from({ length: 8 }).map((_, index) => (
                                <Grid item key={index} xs={12} sm={6} md={4} lg={3}>
                                    <CardSkeleton />
                                </Grid>
                            ))}
                        </Grid>
                    ) : sortedData.length === 0 ? (
                        <Paper sx={{ p: '70px 30px', textAlign: 'center', borderRadius: '16px', boxShadow: '0px 10px 40px 0px rgba(17,17,17,0.06)' }}>
                            <FaSearchMinus style={{ fontSize: '44px', color: brand.primaryLight }} />
                            <Typography sx={{ fontFamily: 'Playfair Display', fontWeight: 700, fontSize: '22px', color: brand.primary, mt: '18px' }}>
                                No profiles match your filters
                            </Typography>
                            <Typography sx={{ color: 'text.secondary', fontSize: '14px', mt: '8px', mb: '25px' }}>
                                Try widening the age range or removing some filters.
                            </Typography>
                            <Button onClick={clearFilters} variant='contained' color='secondary' sx={{ px: '35px' }}>
                                Clear Filters
                            </Button>
                        </Paper>
                    ) : (
                        <Grid container spacing={3}>
                            {sortedData.map(user => (
                                <Grid item key={user._id} xs={12} sm={6} md={4} lg={3}>
                                    <BiodataCard user={user} />
                                </Grid>
                            ))}
                        </Grid>
                    )}

                    {/* bottom CTA strip */}
                    {!isLoading && sortedData.length > 0 && (
                        <Paper sx={{
                            mt: '60px', p: { xs: '30px', md: '40px 50px' }, borderRadius: '16px',
                            background: `linear-gradient(90deg, ${brand.dark} 0%, #3a3d52 100%)`,
                            display: 'flex', alignItems: 'center', justifyContent: 'space-between',
                            flexWrap: 'wrap', gap: '20px',
                        }}>
                            <Box>
                                <Typography sx={{ color: '#fff', fontFamily: 'Playfair Display', fontWeight: 700, fontSize: { xs: '20px', md: '24px' } }}>
                                    Didn&apos;t find the one yet? <FaHeart style={{ color: brand.secondary, fontSize: '18px' }} />
                                </Typography>
                                <Typography sx={{ color: 'rgba(255,255,255,0.65)', fontSize: '14px', mt: '5px' }}>
                                    Create your biodata and let your perfect match find you instead.
                                </Typography>
                            </Box>
                            <Button component={RouterLink} to='/register' variant='contained' color='secondary' size='large' sx={{ px: '38px', flexShrink: 0 }}>
                                Create My Biodata
                            </Button>
                        </Paper>
                    )}
                </Container>
            </Box>
        </Box>
    );
};

export default AllBioData;
