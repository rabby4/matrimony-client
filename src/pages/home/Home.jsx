import { Container, Typography } from '@mui/material';
import React from 'react';
import Slider from './Slider';
import ChooseUs from './ChooseUs';

const Home = () => {
    return (
        <>
            <div style={{ marginTop: '90px' }}>
                <Slider></Slider>
                <ChooseUs></ChooseUs>
                <Container sx={{ mt: '100px' }}>

                </Container>
            </div>
        </>
    );
};

export default Home;