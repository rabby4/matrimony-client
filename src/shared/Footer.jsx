import { Box, Container, Grid, Typography } from "@mui/material";
import FacebookIcon from '@mui/icons-material/Facebook';
import TwitterIcon from '@mui/icons-material/Twitter';
import YouTubeIcon from '@mui/icons-material/YouTube';
import InstagramIcon from '@mui/icons-material/Instagram';
import { Link } from "react-router-dom";


const Footer = () => {
    return (
        <>
            <Box sx={{ bgcolor: '#d3dde3', py: '100px' }}>
                <Container>
                    <Grid container justifyContent={'center'} spacing={2}>
                        <Grid item xs={12} sm={6} md={4} >
                            <Box sx={{ pr: '40px' }}>
                                <Typography color={'#667a86'} sx={{ fontSize: '18px', fontWeight: 600 }}>GET IN TOUCH</Typography>
                                <Box sx={{ mt: '40px' }}>
                                    <Typography color={'#667a86'} sx={{ fontSize: '16px' }}>Address: 3812 Lena Lane City Jackson Mississippi</Typography>
                                    <Typography color={'#667a86'} sx={{ fontSize: '16px', my: '10px' }}>Phone: +92 (8800) 68 - 8960</Typography>
                                    <Typography color={'#667a86'} sx={{ fontSize: '16px' }}>Email: info@example.com</Typography>
                                </Box>
                            </Box>
                        </Grid>
                        <Grid item xs={12} sm={6} md={4} sx={{ borderRight: { md: '1px solid #b9c6cf' }, borderLeft: '1px solid #b9c6cf' }} >
                            <Box sx={{ px: { md: '50px' }, my: { xs: '40px', md: '0px' } }}>
                                <Typography color={'#667a86'} sx={{ fontSize: '18px', fontWeight: 600 }}>HELP & SUPPORT</Typography>
                                <Box sx={{ mt: '40px' }}>
                                    <Typography color={'#667a86'} sx={{ fontSize: '16px' }}>About company</Typography>
                                    <Typography color={'#667a86'} sx={{ fontSize: '16px', my: '10px' }}>Testimonials</Typography>
                                    <Typography color={'#667a86'} sx={{ fontSize: '16px' }}>Contact us</Typography>
                                    <Typography color={'#667a86'} sx={{ fontSize: '16px' }}>FAQs</Typography>
                                </Box>
                            </Box>
                        </Grid>
                        <Grid item xs={12} sm={6} md={4}>
                            <Box sx={{ pl: { md: '50px' }, mt: { sm: '30px', md: '0px' } }}>
                                <Typography color={'#667a86'} sx={{ fontSize: '18px', fontWeight: 600 }}>SOCIAL MEDIA</Typography>
                                <Box sx={{ mt: '40px' }} display={'flex'} gap={2}>
                                    <FacebookIcon color="#1778f2"></FacebookIcon>
                                    <TwitterIcon></TwitterIcon>
                                    <YouTubeIcon></YouTubeIcon>
                                    <InstagramIcon></InstagramIcon>
                                </Box>
                            </Box>
                        </Grid>
                    </Grid>
                </Container>
            </Box>
            <Box sx={{ bgcolor: '#dbe5ea', py: '10px', textAlign: 'center' }}>
                <Typography>Copyright © 2023 <Link to={'/'}>Company.com</Link> All rights reserved.</Typography>
            </Box>
        </>
    );
};

export default Footer;