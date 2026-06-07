import { Box, Button, Card, Container, Grid, Stack, Typography } from '@mui/material';
import { Link as RouterLink } from 'react-router-dom';
import { MdVerifiedUser, MdOutlinePrivacyTip } from 'react-icons/md';
import { FaHandHoldingHeart, FaUserEdit, FaSearch, FaRegHeart, FaIdCard, FaCrown, FaCheckCircle } from 'react-icons/fa';
import SectionTitle from '../../shared/SectionTitle';
import SuccessCounter from '../home/SuccessCounter';
import CTA from '../home/CTA';
import { brand } from '../../theme/theme';

const values = [
    {
        id: 1,
        icon: <MdVerifiedUser />,
        title: 'Verified Profiles',
        description: 'Every biodata on the platform is reviewed before it appears in search results. Premium members go through an extra approval step by our admin team, so the crown badge actually means something.',
    },
    {
        id: 2,
        icon: <MdOutlinePrivacyTip />,
        title: 'Privacy First',
        description: 'Your email address and phone number are never shown publicly. Contact details are only shared after a paid contact request is approved, or with premium members — you stay in control.',
    },
    {
        id: 3,
        icon: <FaHandHoldingHeart />,
        title: 'Family at Heart',
        description: 'Marriage in our culture is a bond between families, not just two people. Biodatas include family details and partner expectations so both sides can make an informed, respectful decision.',
    },
];

const features = [
    {
        icon: <FaUserEdit />,
        title: 'Detailed Biodata',
        text: 'Create a complete profile — education, occupation, family, height, weight, division and what you expect in a partner.',
    },
    {
        icon: <FaSearch />,
        title: 'Smart Search',
        text: 'Filter brides and grooms by age range, gender and all eight divisions of Bangladesh to narrow down your match.',
    },
    {
        icon: <FaRegHeart />,
        title: 'Favourites List',
        text: 'Shortlist profiles you like and revisit them anytime from your personal dashboard.',
    },
    {
        icon: <FaIdCard />,
        title: 'Secure Contact Requests',
        text: 'Request contact information through a secure Stripe payment. An admin approves every request before details are shared.',
    },
    {
        icon: <FaCrown />,
        title: 'Premium Membership',
        text: 'Premium members see contact details directly and get featured on the home page for better visibility.',
    },
    {
        icon: <FaCheckCircle />,
        title: 'Admin Moderation',
        text: 'A dedicated admin team manages members, approves premium status and keeps the platform safe and genuine.',
    },
];

const About = () => {
    return (
        <Box sx={{ mt: '90px' }}>
            {/* banner */}
            <Box sx={{ bgcolor: brand.dark, py: { xs: '55px', md: '75px' }, textAlign: 'center', position: 'relative', overflow: 'hidden' }}>
                <Box sx={{ position: 'absolute', width: '420px', height: '420px', borderRadius: '50%', bgcolor: 'rgba(235,3,89,0.14)', filter: 'blur(110px)', top: '-180px', left: '-120px' }} />
                <Box sx={{ position: 'absolute', width: '420px', height: '420px', borderRadius: '50%', bgcolor: 'rgba(255,180,0,0.12)', filter: 'blur(110px)', bottom: '-180px', right: '-120px' }} />
                <Container sx={{ position: 'relative' }}>
                    <Typography variant='h4' sx={{ color: brand.gold }}>About Us</Typography>
                    <Typography variant='h2' sx={{ color: '#fff', mt: '8px' }}>Helping Hearts Find Home</Typography>
                    <Typography sx={{ color: 'rgba(255,255,255,0.7)', mt: '14px', fontSize: '15px', maxWidth: '560px', mx: 'auto' }}>
                        A trusted matrimony platform built for Bangladeshi families — honest profiles, real privacy, and marriages that begin the right way.
                    </Typography>
                </Container>
            </Box>

            {/* our story */}
            <Container sx={{ py: { xs: '60px', md: '90px' } }}>
                <Grid container spacing={6} alignItems='center'>
                    <Grid item xs={12} md={6}>
                        <Box sx={{ position: 'relative' }}>
                            <Box
                                component='img'
                                src='https://images.unsplash.com/photo-1529634597503-139d3726fed5?auto=format&fit=crop&w=900&q=80'
                                alt='Happy couple'
                                sx={{ width: '100%', borderRadius: '16px', display: 'block', boxShadow: '0px 20px 50px 0px rgba(17,17,17,0.15)' }}
                            />
                            {/* floating badge */}
                            <Card sx={{ position: 'absolute', bottom: '-25px', right: { xs: '10px', md: '-25px' }, p: '18px 25px', borderRadius: '14px', boxShadow: '0px 15px 40px 0px rgba(17,17,17,0.18)' }}>
                                <Typography sx={{ fontFamily: 'Playfair Display', fontWeight: 700, fontSize: '26px', color: brand.secondary, lineHeight: 1 }}>
                                    2000+
                                </Typography>
                                <Typography sx={{ fontSize: '12px', color: 'text.secondary', textTransform: 'uppercase', letterSpacing: '1px' }}>
                                    Happy Marriages
                                </Typography>
                            </Card>
                        </Box>
                    </Grid>
                    <Grid item xs={12} md={6}>
                        <Typography variant='h4'>Our Story</Typography>
                        <Typography variant='h2' sx={{ mt: '8px', fontSize: { xs: '26px', md: '36px' } }}>
                            Marriage is a journey.<br />We help it begin well.
                        </Typography>
                        <Typography sx={{ color: 'text.secondary', fontSize: '15px', lineHeight: 2, mt: '20px' }}>
                            Matrimony started with a simple observation: finding a life partner online shouldn&apos;t
                            mean endless fake profiles and zero privacy. Families deserve a place where every
                            biodata is genuine, where personal details stay protected, and where the process
                            respects the way marriages actually happen in Bangladesh — with families involved
                            from the very first conversation.
                        </Typography>
                        <Typography sx={{ color: 'text.secondary', fontSize: '15px', lineHeight: 2, mt: '15px' }}>
                            Today, members from all eight divisions of the country use the platform to create
                            detailed biodatas, search for compatible partners, and connect securely. Contact
                            information is never public — it&apos;s shared only through approved requests, so
                            every introduction starts with consent.
                        </Typography>
                        <Button component={RouterLink} to='/biodatas' variant='contained' color='secondary' size='large' sx={{ mt: '30px', px: '40px' }}>
                            Explore Profiles
                        </Button>
                    </Grid>
                </Grid>
            </Container>

            {/* values */}
            <Box sx={{ bgcolor: brand.cream, py: { xs: '60px', md: '80px' } }}>
                <SectionTitle
                    subHeading={'What We Stand For'}
                    heading={'Our Values'}
                />
                <Container>
                    <Grid container spacing={4} sx={{ mt: '10px' }} justifyContent='center'>
                        {values.map(value => (
                            <Grid item key={value.id} xs={12} sm={6} md={4}>
                                <Card sx={{
                                    height: '100%', p: '35px 30px', textAlign: 'center', borderRadius: '16px',
                                    boxShadow: '0px 10px 35px 0px rgba(17,17,17,0.07)',
                                    transition: 'transform .3s ease',
                                    ':hover': { transform: 'translateY(-8px)' },
                                }}>
                                    <Box sx={{
                                        width: '70px', height: '70px', mx: 'auto', borderRadius: '50%',
                                        display: 'flex', alignItems: 'center', justifyContent: 'center',
                                        bgcolor: '#fff', border: `1px dashed ${brand.primaryLight}`,
                                        color: brand.secondary, fontSize: '30px',
                                    }}>
                                        {value.icon}
                                    </Box>
                                    <Typography sx={{ fontFamily: 'Playfair Display', fontWeight: 700, fontSize: '20px', color: brand.primary, mt: '20px' }}>
                                        {value.title}
                                    </Typography>
                                    <Typography variant='body2' color='text.secondary' sx={{ lineHeight: 1.9, mt: '12px' }}>
                                        {value.description}
                                    </Typography>
                                </Card>
                            </Grid>
                        ))}
                    </Grid>
                </Container>
            </Box>

            {/* what you get + live stats */}
            <Container sx={{ py: { xs: '60px', md: '90px' } }}>
                <SectionTitle
                    subHeading={'The Platform'}
                    heading={'What You Get'}
                    description={'Everything on this platform exists for one purpose — helping you reach the right person, safely.'}
                />
                <Grid container spacing={4} sx={{ mt: '10px' }}>
                    {features.map((feature, index) => (
                        <Grid item key={index} xs={12} sm={6} md={4}>
                            <Stack direction='row' spacing={2.5} alignItems='flex-start'>
                                <Box sx={{
                                    width: '52px', height: '52px', flexShrink: 0, borderRadius: '12px',
                                    display: 'flex', alignItems: 'center', justifyContent: 'center',
                                    bgcolor: brand.cream, color: brand.secondary, fontSize: '22px',
                                }}>
                                    {feature.icon}
                                </Box>
                                <Box>
                                    <Typography sx={{ fontWeight: 600, fontSize: '16px', color: brand.primary }}>
                                        {feature.title}
                                    </Typography>
                                    <Typography variant='body2' color='text.secondary' sx={{ lineHeight: 1.8, mt: '6px' }}>
                                        {feature.text}
                                    </Typography>
                                </Box>
                            </Stack>
                        </Grid>
                    ))}
                </Grid>

                {/* live numbers from the database */}
                <Box sx={{ mt: '70px' }}>
                    <SuccessCounter />
                </Box>
            </Container>

            {/* call to action */}
            <CTA />
        </Box>
    );
};

export default About;
