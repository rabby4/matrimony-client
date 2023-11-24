import { Box, Container, Typography } from '@mui/material';
import React from 'react';
import Slider from './Slider';
import ChooseUs from './ChooseUs';
import Steps from './Steps';
import SuccessCounter from './SuccessCounter';

const Home = () => {
    return (
        <>
            <Box style={{ marginTop: '90px' }}>
                <Slider></Slider>
                <ChooseUs></ChooseUs>
                <Container sx={{ mt: '100px' }}>
                    <SuccessCounter></SuccessCounter>
                    <Steps></Steps>
                </Container>
            </Box>
        </>
    );
};

export default Home;