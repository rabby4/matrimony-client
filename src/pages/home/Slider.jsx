import { Swiper, SwiperSlide } from 'swiper/react';

// Import Swiper styles
import 'swiper/css';
import 'swiper/css/pagination';
import 'swiper/css/navigation';

// import required modules
import { Autoplay, Navigation } from 'swiper/modules';
import { Typography } from '@mui/material';

const Slider = () => {
    return (
        <>
            <Swiper
                spaceBetween={30}
                centeredSlides={true}
                autoplay={{
                    delay: 3500,
                    disableOnInteraction: false,
                }}
                pagination={{
                    clickable: true,
                }}
                // navigation={true}
                modules={[Autoplay, Navigation]}
                className="mySwiper"
            >
                <SwiperSlide style={{ overflow: 'hidden' }}>
                    <div className='ken-burns-effect item-center' style={{ backgroundImage: `url(https://rn53themes.net/themes/matrimo/images/banner.jpg)`, minHeight: '650px', backgroundSize: 'cover', backgroundPosition: 'center', }}>
                        <div style={{ backgroundColor: 'rgb(0,0,0,0.5)', position: 'absolute', top: 0, left: 0, width: '100%', height: '100%' }}>

                        </div>
                        <div className='item-center' style={{ zIndex: 10, textAlign: 'center' }}>
                            <Typography variant='h4' color={'#fff'} sx={{ fontSize: { xs: '15px', sm: '30px' }, fontFamily: 'Playfair Display' }}> <span style={{ fontSize: '40px' }}>#1</span> MATRIMONY</Typography>

                            <Typography variant='h1' color={'#fff'} sx={{ fontSize: { xs: '30px', sm: '65px' }, fontFamily: 'Playfair Display', textTransform: 'capitalize', fontWeight: 700 }}>find your</Typography>

                            <Typography variant='h1' color={'#fff'} sx={{ fontSize: { xs: '40px', sm: '75px' }, fontFamily: 'Playfair Display', textTransform: 'capitalize', fontWeight: 700 }}> <span style={{ color: '#eb0359' }}>right match</span> here</Typography>

                            <Typography variant='h5' color={'#fff'} sx={{ fontSize: { xs: '15px', sm: '20px' }, fontFamily: 'poppins', textTransform: 'capitalize', fontWeight: 400, mt: '15px' }}> Most trusted Matrimony Brand in the World.</Typography>
                        </div>
                    </div>
                </SwiperSlide>
                <SwiperSlide style={{ overflow: 'hidden' }}>
                    <div className='ken-burns-effect item-center' style={{ backgroundImage: `url(https://rn53themes.net/themes/matrimo/images/ban-bg.jpg)`, minHeight: '650px', backgroundSize: 'cover', backgroundPosition: 'center', }}>
                        <div style={{ backgroundColor: 'rgb(0,0,0,0.5)', position: 'absolute', top: 0, left: 0, width: '100%', height: '100%' }}>

                        </div>
                        <div className='item-center' style={{ zIndex: 10, textAlign: 'center' }}>
                            <Typography variant='h4' color={'#fff'} sx={{ fontSize: { xs: '15px', sm: '30px' }, fontFamily: 'Playfair Display' }}> <span style={{ fontSize: '40px' }}>#1</span> MATRIMONY</Typography>

                            <Typography variant='h1' color={'#fff'} sx={{ fontSize: { xs: '30px', sm: '65px' }, fontFamily: 'Playfair Display', textTransform: 'capitalize', fontWeight: 700 }}>find your</Typography>

                            <Typography variant='h1' color={'#fff'} sx={{ fontSize: { xs: '40px', sm: '75px' }, fontFamily: 'Playfair Display', textTransform: 'capitalize', fontWeight: 700 }}> <span style={{ color: '#eb0359' }}>right match</span> here</Typography>

                            <Typography variant='h5' color={'#fff'} sx={{ fontSize: { xs: '15px', sm: '20px' }, fontFamily: 'poppins', textTransform: 'capitalize', fontWeight: 400, mt: '15px' }}> Most trusted Matrimony Brand in the World.</Typography>
                        </div>
                    </div>
                </SwiperSlide>
            </Swiper >
        </>
    );
};

export default Slider;