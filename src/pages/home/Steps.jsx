import { Box, Card, Grid, Typography } from '@mui/material';
import { FaUserPlus, FaSearch, FaRegHeart, FaIdCard, FaComments } from 'react-icons/fa';
import { GiDiamondRing } from 'react-icons/gi';
import SectionTitle from '../../shared/SectionTitle';
import { brand } from '../../theme/theme';

const steps = [
    {
        number: '01',
        icon: <FaUserPlus />,
        label: 'Register',
        description: 'Create your free account and build your biodata with photos and partner preferences.',
    },
    {
        number: '02',
        icon: <FaSearch />,
        label: 'Find Your Match',
        description: 'Browse thousands of verified profiles and filter by age, division and preference.',
    },
    {
        number: '03',
        icon: <FaRegHeart />,
        label: 'Add to Favourites',
        description: 'Shortlist the profiles you like and keep them saved in your personal dashboard.',
    },
    {
        number: '04',
        icon: <FaIdCard />,
        label: 'Request Contact Info',
        description: 'Found someone special? Request their contact information securely through the platform.',
    },
    {
        number: '05',
        icon: <FaComments />,
        label: 'Start Conversation',
        description: 'Connect directly, talk with families and get to know each other better.',
    },
    {
        number: '06',
        icon: <GiDiamondRing />,
        label: 'Getting Married',
        description: 'Tie the knot and share your success story to inspire thousands of others.',
    },
];

const Steps = () => {
    return (
        <Box sx={{ py: '90px' }}>
            <SectionTitle
                subHeading={'Simple Process'}
                heading={'How It Works'}
                description={'Your journey to a happy marriage in six simple steps.'}
            />
            <Grid container spacing={4} sx={{ mt: '20px' }}>
                {steps.map((step) => (
                    <Grid item key={step.number} xs={12} sm={6} md={4}>
                        <Card sx={{
                            position: 'relative',
                            height: '100%',
                            p: '35px 30px',
                            borderRadius: '14px',
                            boxShadow: '0px 10px 35px 0px rgba(17,17,17,0.07)',
                            overflow: 'hidden',
                            transition: 'transform .3s ease, box-shadow .3s ease',
                            ':hover': { transform: 'translateY(-6px)', boxShadow: '0px 18px 45px 0px rgba(17,17,17,0.13)' },
                        }}>
                            {/* watermark number */}
                            <Typography sx={{
                                position: 'absolute', top: '5px', right: '18px',
                                fontFamily: 'Playfair Display', fontWeight: 700, fontSize: '72px',
                                color: brand.cream, lineHeight: 1, userSelect: 'none',
                            }}>
                                {step.number}
                            </Typography>
                            <Box sx={{ color: brand.secondary, fontSize: '34px', mb: '18px' }}>
                                {step.icon}
                            </Box>
                            <Typography sx={{ fontFamily: 'Playfair Display', fontWeight: 700, fontSize: '20px', color: brand.primary, mb: '10px' }}>
                                {step.label}
                            </Typography>
                            <Typography variant='body2' color='text.secondary' sx={{ lineHeight: 1.8 }}>
                                {step.description}
                            </Typography>
                        </Card>
                    </Grid>
                ))}
            </Grid>
        </Box>
    );
};

export default Steps;
