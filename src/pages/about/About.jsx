import { Box, Container, Typography } from '@mui/material';
import React from 'react';

const About = () => {
    return (
        <>
            <Container>
                <Box sx={{ my: '120px' }}>
                    <Typography variant='h2'>This is About page</Typography>
                </Box>
            </Container>
        </>
    );
};

export default About;