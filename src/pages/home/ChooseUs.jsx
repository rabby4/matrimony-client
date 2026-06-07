import { Box, Card, CardContent, Container, Typography } from '@mui/material';
import { MdVerifiedUser } from 'react-icons/md';
import { FaHandHoldingHeart } from 'react-icons/fa';
import { GiDiamondRing } from 'react-icons/gi';
import SectionTitle from '../../shared/SectionTitle';
import { brand } from '../../theme/theme';

const features = [
    {
        id: 1,
        icon: <MdVerifiedUser />,
        title: 'Genuine Profiles',
        description: 'Every biodata is reviewed by our team, so you always connect with real, verified members.',
    },
    {
        id: 2,
        icon: <FaHandHoldingHeart />,
        title: 'Most Trusted',
        description: 'A safe and trusted matrimony platform with full privacy control over your personal information.',
    },
    {
        id: 3,
        icon: <GiDiamondRing />,
        title: '2000+ Marriages',
        description: 'Thousands of happy couples have already found their life partner through our platform.',
    },
];

const ChooseUs = () => {
    return (
        <Box sx={{ mt: '60px' }}>
            {/* dark band */}
            <Box sx={{ bgcolor: brand.dark, pt: '90px', pb: '170px' }}>
                <SectionTitle
                    light
                    subHeading={'#1 Matrimony'}
                    heading={'Why Choose Us'}
                    description={'We are more than a matchmaking site — we help families find the right person, the right way.'}
                />
            </Box>
            {/* feature cards overlapping the dark band */}
            <Container>
                <Box sx={{ mt: '-110px', display: 'flex', justifyContent: 'center', gap: 3, flexWrap: { xs: 'wrap', md: 'nowrap' } }}>
                    {features.map(feature => (
                        <Card key={feature.id} sx={{
                            maxWidth: 360, width: '100%',
                            py: '40px', px: '30px', textAlign: 'center',
                            borderRadius: '14px',
                            boxShadow: '0px 15px 40px 0px rgba(17,17,17,0.12)',
                            transition: 'transform .3s ease',
                            ':hover': { transform: 'translateY(-8px)' },
                        }}>
                            <Box sx={{
                                width: '74px', height: '74px', mx: 'auto',
                                borderRadius: '50%', display: 'flex', alignItems: 'center', justifyContent: 'center',
                                bgcolor: brand.cream, border: `1px dashed ${brand.primaryLight}`,
                                color: brand.secondary, fontSize: '32px',
                            }}>
                                {feature.icon}
                            </Box>
                            <CardContent>
                                <Typography gutterBottom sx={{ fontFamily: 'Playfair Display', fontSize: '20px', fontWeight: 700, color: brand.primary }}>
                                    {feature.title}
                                </Typography>
                                <Typography variant="body2" color="text.secondary" sx={{ lineHeight: 1.8 }}>
                                    {feature.description}
                                </Typography>
                            </CardContent>
                        </Card>
                    ))}
                </Box>
            </Container>
        </Box>
    );
};

export default ChooseUs;
