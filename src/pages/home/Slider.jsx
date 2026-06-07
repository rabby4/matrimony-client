import { Swiper, SwiperSlide } from 'swiper/react';

// Import Swiper styles
import 'swiper/css';
import 'swiper/css/pagination';
import 'swiper/css/effect-fade';

// import required modules
import { Autoplay, EffectFade } from 'swiper/modules';
import { Box, Button, Stack, Typography } from '@mui/material';
import { Link as RouterLink } from 'react-router-dom';
import { brand } from '../../theme/theme';

const slides = [
    {
        image: 'https://images.unsplash.com/photo-1519741497674-611481863552?auto=format&fit=crop&w=1920&q=80',
    },
    {
        image: 'https://images.unsplash.com/photo-1606800052052-a08af7148866?auto=format&fit=crop&w=1920&q=80',
    },
];

const Slider = () => {
    return (
        <Swiper
            spaceBetween={0}
            centeredSlides={true}
            effect="fade"
            autoplay={{
                delay: 4500,
                disableOnInteraction: false,
            }}
            modules={[Autoplay, EffectFade]}
            className="mySwiper"
        >
            {slides.map((slide, index) => (
                <SwiperSlide key={index} style={{ overflow: 'hidden' }}>
                    <Box
                        className='ken-burns-effect'
                        sx={{
                            backgroundImage: `url(${slide.image})`,
                            minHeight: { xs: '560px', md: '700px' },
                            backgroundSize: 'cover',
                            backgroundPosition: 'center',
                        }}
                    >
                        {/* dark overlay for readability */}
                        <Box sx={{
                            position: 'absolute', inset: 0,
                            background: 'linear-gradient(180deg, rgba(17,17,17,0.55) 0%, rgba(17,17,17,0.35) 50%, rgba(17,17,17,0.65) 100%)',
                        }} />
                        <Box className='item-center' sx={{ position: 'relative', zIndex: 10, textAlign: 'center', px: '20px', minHeight: { xs: '560px', md: '700px' } }}>
                            <Typography variant='h4' sx={{ color: brand.gold, fontSize: { xs: '14px', sm: '20px' }, letterSpacing: '3px' }}>
                                #1 Matrimony
                            </Typography>

                            <Typography variant='h1' sx={{ color: '#fff', fontSize: { xs: '34px', sm: '56px', md: '72px' }, textTransform: 'capitalize', lineHeight: 1.15, mt: '15px' }}>
                                find your <Box component='span' sx={{ color: brand.secondary, fontStyle: 'italic' }}>right match</Box> here
                            </Typography>

                            <Typography sx={{ color: 'rgba(255,255,255,0.85)', fontSize: { xs: '14px', sm: '18px' }, fontFamily: 'Poppins', fontWeight: 300, mt: '20px', maxWidth: '560px', mx: 'auto' }}>
                                The most trusted matrimony platform — thousands of verified profiles waiting to meet you.
                            </Typography>

                            <Stack direction={{ xs: 'column', sm: 'row' }} spacing={2} sx={{ mt: '35px', justifyContent: 'center' }}>
                                <Button
                                    component={RouterLink}
                                    to='/register'
                                    variant='contained'
                                    color='secondary'
                                    size='large'
                                    sx={{ px: '40px', py: '12px', fontSize: '15px' }}
                                >
                                    Register Now — It&apos;s Free
                                </Button>
                                <Button
                                    component={RouterLink}
                                    to='/biodatas'
                                    variant='outlined'
                                    size='large'
                                    sx={{ px: '40px', py: '12px', fontSize: '15px', color: '#fff', borderColor: 'rgba(255,255,255,0.6)', ':hover': { borderColor: '#fff', bgcolor: 'rgba(255,255,255,0.1)' } }}
                                >
                                    Browse Profiles
                                </Button>
                            </Stack>
                        </Box>
                    </Box>
                </SwiperSlide>
            ))}
        </Swiper>
    );
};

export default Slider;
