import { Box, Container, Typography } from '@mui/material';
import Card from '@mui/material/Card';
import CardContent from '@mui/material/CardContent';
import CardMedia from '@mui/material/CardMedia';
import { CardActionArea } from '@mui/material';

const ChooseUs = () => {
    return (
        <>
            <Box sx={{ textAlign: 'center', marginTop: '100px' }}>
                <Box>
                    <img style={{ width: '500px' }} src="https://rn53themes.net/themes/matrimo/images/icon/why-us-1.png" alt="" />
                </Box>
                <Box sx={{ backgroundColor: '#2a2c3c', py: '120px', mt: '-132px' }}>
                    <Typography variant='h4' color={'#ffb400'} sx={{ fontSize: { xs: '15px', sm: '25px' }, fontFamily: 'Playfair Display', }}> <span style={{ fontSize: '40px' }}>#1</span> MATRIMONY</Typography>
                    <Typography variant='h1' sx={{ fontSize: { xs: '40px', sm: '75px' }, fontFamily: 'Playfair Display', textTransform: 'capitalize', fontWeight: 700, background: 'linear-gradient(45deg, #00ff72, #66b5ff 80%)', backgroundClip: 'text', WebkitTextFillColor: 'transparent' }}> Why choose us</Typography>
                    <Typography variant='h5' color={'#fff'} sx={{ fontSize: { xs: '15px', sm: '20px' }, fontFamily: 'poppins', textTransform: 'capitalize', fontWeight: 400, mt: '15px' }}> Most trusted Matrimony Brand in the World.</Typography>
                </Box>
                <Container>
                    <Box>
                        <Card sx={{ maxWidth: 345, py: '50px', px: '40px' }}>
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

                    </Box>
                </Container>
            </Box>
        </>
    );
};

export default ChooseUs;