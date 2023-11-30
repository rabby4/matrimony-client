import { Box, Card, CardContent, Container, Typography } from '@mui/material';
import React from 'react';
import ChooseUs from '../home/ChooseUs';
import SuccessCounter from '../home/SuccessCounter';

const About = () => {
    return (
        <>

            <Box sx={{ textAlign: 'center', marginTop: '100px' }}>
                <Box sx={{ backgroundColor: '#2a2c3c', py: '200px', mt: '-132px' }}>
                    <Typography variant='h4' color={'#ffb400'} sx={{ fontSize: { xs: '15px', sm: '25px' }, fontFamily: 'Playfair Display', }}> <span style={{ fontSize: '40px' }}>#1</span> MATRIMONY</Typography>

                    <Typography variant='h1' sx={{ fontSize: { xs: '40px', sm: '75px' }, fontFamily: 'Playfair Display', textTransform: 'capitalize', fontWeight: 700, background: 'linear-gradient(45deg, #00ff72, #66b5ff 80%)', backgroundClip: 'text', WebkitTextFillColor: 'transparent' }}> Why choose us</Typography>

                    <Typography variant='h5' color={'#fff'} sx={{ fontSize: { xs: '15px', sm: '20px' }, fontFamily: 'poppins', textTransform: 'capitalize', fontWeight: 400, mt: '15px' }}> Most trusted Matrimony Brand in the World.</Typography>
                </Box>
                <Container>
                    <Box sx={{ mt: '-80px', justifyContent: 'center', flexWrap: { xs: 'wrap' } }} display={'flex'} gap={3}>
                        <Card sx={{ maxWidth: 345, py: '50px', px: '40px', boxShadow: '0px 0px 30px 0px #00000015', borderRadius: '8px', ":hover": { boxShadow: '0px 0px 50px 0px #00000030' } }}>
                            {/* <CardActionArea sx={{}}> */}
                            <img style={{ width: '50px' }} src="https://rn53themes.net/themes/matrimo/images/icon/prize.png" alt="" />
                            <CardContent>
                                <Typography gutterBottom variant="h5" component="div" color={'primary'} sx={{ fontSize: '18px', fontWeight: 600 }}>
                                    Genuine profiles
                                </Typography>
                                <Typography variant="body2" color="primary">
                                    Contact genuine profiles with 100% verified mobile
                                </Typography>
                            </CardContent>
                            {/* </CardActionArea> */}
                        </Card>
                        <Card sx={{ maxWidth: 345, py: '50px', px: '40px', boxShadow: '0px 0px 30px 0px #00000015', borderRadius: '8px', ":hover": { boxShadow: '0px 0px 50px 0px #00000030' } }}>
                            {/* <CardActionArea sx={{}}> */}
                            <img style={{ width: '50px' }} src="https://rn53themes.net/themes/matrimo/images/icon/trust.png" alt="" />
                            <CardContent>
                                <Typography gutterBottom variant="h5" component="div" color={'primary'} sx={{ fontSize: '18px', fontWeight: 600 }}>
                                    Most trusted
                                </Typography>
                                <Typography variant="body2" color="primary">
                                    The most trusted wedding matrimony brand lorem
                                </Typography>
                            </CardContent>
                            {/* </CardActionArea> */}
                        </Card>
                        <Card sx={{ maxWidth: 345, py: '50px', px: '40px', boxShadow: '0px 0px 30px 0px #00000015', borderRadius: '8px', ":hover": { boxShadow: '0px 0px 50px 0px #00000030' } }}>
                            {/* <CardActionArea sx={{}}> */}
                            <img style={{ width: '50px' }} src="https://rn53themes.net/themes/matrimo/images/icon/rings.png" alt="" />
                            <CardContent>
                                <Typography gutterBottom variant="h5" component="div" color={'primary'} sx={{ fontSize: '18px', fontWeight: 600 }}>
                                    2000+ weddings
                                </Typography>
                                <Typography variant="body2" color="primary">
                                    Lakhs of peoples have found their life partner
                                </Typography>
                            </CardContent>
                            {/* </CardActionArea> */}
                        </Card>
                    </Box>
                </Container>
            </Box>
            <Container>
                <SuccessCounter></SuccessCounter>
            </Container>

        </>
    );
};

export default About;