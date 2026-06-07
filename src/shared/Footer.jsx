import { Box, Container, Grid, IconButton, Stack, Typography } from "@mui/material";
import FacebookIcon from '@mui/icons-material/Facebook';
import TwitterIcon from '@mui/icons-material/Twitter';
import YouTubeIcon from '@mui/icons-material/YouTube';
import InstagramIcon from '@mui/icons-material/Instagram';
import { Link as RouterLink } from "react-router-dom";
import { FaMapMarkerAlt, FaPhoneAlt, FaEnvelope } from "react-icons/fa";
import Logo from "./Logo";
import { brand } from "../theme/theme";

const quickLinks = [
    { label: 'Home', path: '/' },
    { label: "Bio Data's", path: '/biodatas' },
    { label: 'About Us', path: '/about' },
    { label: 'Contact', path: '/contact' },
];

const helpLinks = [
    { label: 'Login', path: '/login' },
    { label: 'Register', path: '/register' },
    { label: 'Dashboard', path: '/dashboard/user-dashboard' },
    { label: 'Help & Support', path: '/contact' },
];

const linkStyle = {
    color: 'rgba(255,255,255,0.65)',
    fontSize: '14px',
    textDecoration: 'none',
    transition: 'color .2s ease',
};

const Footer = () => {
    return (
        <>
            <Box sx={{ bgcolor: brand.dark, pt: '80px', pb: '60px' }}>
                <Container>
                    <Grid container spacing={5}>
                        {/* brand */}
                        <Grid item xs={12} md={4}>
                            <Logo light />
                            <Typography sx={{ color: 'rgba(255,255,255,0.65)', fontSize: '14px', lineHeight: 1.9, mt: '22px', pr: { md: '30px' } }}>
                                Trusted by thousands of brides & grooms for a successful marriage.
                                Create your biodata today and start the journey to your happily ever after.
                            </Typography>
                            <Stack direction='row' spacing={1} sx={{ mt: '20px' }}>
                                {[<FacebookIcon key='fb' />, <TwitterIcon key='tw' />, <YouTubeIcon key='yt' />, <InstagramIcon key='ig' />].map((icon, i) => (
                                    <IconButton key={i} size='small' sx={{
                                        color: '#fff', bgcolor: 'rgba(255,255,255,0.08)',
                                        ':hover': { bgcolor: brand.secondary },
                                    }}>
                                        {icon}
                                    </IconButton>
                                ))}
                            </Stack>
                        </Grid>

                        {/* quick links */}
                        <Grid item xs={6} sm={6} md={2.5}>
                            <Typography sx={{ color: '#fff', fontSize: '17px', fontWeight: 600, fontFamily: 'Playfair Display', mb: '22px' }}>
                                Quick Links
                            </Typography>
                            <Stack spacing={1.5}>
                                {quickLinks.map(link => (
                                    <Typography key={link.label} component={RouterLink} to={link.path} sx={{ ...linkStyle, ':hover': { color: brand.gold } }}>
                                        {link.label}
                                    </Typography>
                                ))}
                            </Stack>
                        </Grid>

                        {/* help */}
                        <Grid item xs={6} sm={6} md={2.5}>
                            <Typography sx={{ color: '#fff', fontSize: '17px', fontWeight: 600, fontFamily: 'Playfair Display', mb: '22px' }}>
                                Members
                            </Typography>
                            <Stack spacing={1.5}>
                                {helpLinks.map(link => (
                                    <Typography key={link.label} component={RouterLink} to={link.path} sx={{ ...linkStyle, ':hover': { color: brand.gold } }}>
                                        {link.label}
                                    </Typography>
                                ))}
                            </Stack>
                        </Grid>

                        {/* contact */}
                        <Grid item xs={12} sm={12} md={3}>
                            <Typography sx={{ color: '#fff', fontSize: '17px', fontWeight: 600, fontFamily: 'Playfair Display', mb: '22px' }}>
                                Get In Touch
                            </Typography>
                            <Stack spacing={2}>
                                <Stack direction='row' spacing={1.5} alignItems='center'>
                                    <FaMapMarkerAlt style={{ color: brand.gold }} />
                                    <Typography sx={{ color: 'rgba(255,255,255,0.65)', fontSize: '14px' }}>
                                        Mirpur, Dhaka, Bangladesh
                                    </Typography>
                                </Stack>
                                <Stack direction='row' spacing={1.5} alignItems='center'>
                                    <FaPhoneAlt style={{ color: brand.gold }} />
                                    <Typography sx={{ color: 'rgba(255,255,255,0.65)', fontSize: '14px' }}>
                                        +880 1700 000 000
                                    </Typography>
                                </Stack>
                                <Stack direction='row' spacing={1.5} alignItems='center'>
                                    <FaEnvelope style={{ color: brand.gold }} />
                                    <Typography sx={{ color: 'rgba(255,255,255,0.65)', fontSize: '14px' }}>
                                        support@matrimony.com
                                    </Typography>
                                </Stack>
                            </Stack>
                        </Grid>
                    </Grid>
                </Container>
            </Box>
            <Box sx={{ bgcolor: brand.darker, py: '18px', textAlign: 'center' }}>
                <Typography sx={{ color: 'rgba(255,255,255,0.55)', fontSize: '13px' }}>
                    Copyright © {new Date().getFullYear()} <Box component={RouterLink} to='/' sx={{ color: brand.gold, textDecoration: 'none' }}>Matrimony</Box> — All rights reserved.
                </Typography>
            </Box>
        </>
    );
};

export default Footer;
