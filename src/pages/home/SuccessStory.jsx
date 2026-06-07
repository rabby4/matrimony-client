import { Box, Card, CardContent, Rating, Stack, Typography } from '@mui/material';
import { Swiper, SwiperSlide } from 'swiper/react';
import { Autoplay, Pagination } from 'swiper/modules';
import { FaQuoteLeft } from 'react-icons/fa';
import SectionTitle from '../../shared/SectionTitle';
import { brand } from '../../theme/theme';

import 'swiper/css';
import 'swiper/css/pagination';

const stories = [
    {
        id: 1,
        couple: 'Rahim & Anika',
        location: 'Dhaka',
        image: 'https://images.unsplash.com/photo-1583939003579-730e3918a45a?auto=format&fit=crop&w=600&q=80',
        rating: 5,
        text: 'We matched within two weeks of joining. Both families connected instantly, and a year later we celebrated our wedding. Forever grateful to this platform!',
    },
    {
        id: 2,
        couple: 'Sajid & Nusrat',
        location: 'Chittagong',
        image: 'https://images.unsplash.com/photo-1519741497674-611481863552?auto=format&fit=crop&w=600&q=80',
        rating: 5,
        text: 'The verified profiles made all the difference. We felt safe at every step, from the first conversation to meeting our families.',
    },
    {
        id: 3,
        couple: 'Tanvir & Maliha',
        location: 'Sylhet',
        image: 'https://images.unsplash.com/photo-1606800052052-a08af7148866?auto=format&fit=crop&w=600&q=80',
        rating: 4.5,
        text: 'I never believed in online matrimony until my sister found her husband here. Six months later, I found mine too. Highly recommended!',
    },
    {
        id: 4,
        couple: 'Farhan & Richi',
        location: 'Rajshahi',
        image: 'https://images.unsplash.com/photo-1511285560929-80b456fea0bc?auto=format&fit=crop&w=600&q=80',
        rating: 5,
        text: 'From the first contact request to our wedding day, everything felt natural and respectful. Thank you for helping us find each other.',
    },
];

const SuccessStory = () => {
    return (
        <Box sx={{ py: '90px', bgcolor: brand.cream }}>
            <SectionTitle
                subHeading={'Testimonials'}
                heading={'Couples Who Found Love'}
                description={'Trusted by 1500+ couples — real stories from members who found their perfect match here.'}
            />
            <Box sx={{ maxWidth: 'lg', mx: 'auto', px: '24px', mt: '50px' }}>
                <Swiper
                    spaceBetween={30}
                    autoplay={{ delay: 3500, disableOnInteraction: false }}
                    pagination={{ clickable: true }}
                    modules={[Autoplay, Pagination]}
                    breakpoints={{
                        0: { slidesPerView: 1 },
                        700: { slidesPerView: 2 },
                        1050: { slidesPerView: 3 },
                    }}
                    style={{ paddingBottom: '50px' }}
                >
                    {stories.map(story => (
                        <SwiperSlide key={story.id}>
                            <Card sx={{ borderRadius: '14px', boxShadow: '0px 10px 35px 0px rgba(17,17,17,0.07)', height: '100%' }}>
                                <Box
                                    component='img'
                                    src={story.image}
                                    alt={story.couple}
                                    sx={{ width: '100%', height: '220px', objectFit: 'cover', display: 'block' }}
                                />
                                <CardContent sx={{ p: '25px' }}>
                                    <FaQuoteLeft style={{ color: brand.secondary, fontSize: '22px' }} />
                                    <Typography variant='body2' color='text.secondary' sx={{ mt: '12px', lineHeight: 1.8, minHeight: '105px' }}>
                                        {story.text}
                                    </Typography>
                                    <Stack direction='row' justifyContent='space-between' alignItems='center' sx={{ mt: '18px' }}>
                                        <Box>
                                            <Typography sx={{ fontFamily: 'Playfair Display', fontWeight: 700, fontSize: '17px', color: brand.primary }}>
                                                {story.couple}
                                            </Typography>
                                            <Typography sx={{ fontSize: '12px', color: 'text.secondary' }}>
                                                {story.location}
                                            </Typography>
                                        </Box>
                                        <Rating value={story.rating} precision={0.5} size='small' readOnly />
                                    </Stack>
                                </CardContent>
                            </Card>
                        </SwiperSlide>
                    ))}
                </Swiper>
            </Box>
        </Box>
    );
};

export default SuccessStory;
