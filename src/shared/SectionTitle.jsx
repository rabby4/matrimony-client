import { Box, Container, Typography } from '@mui/material';
import React from 'react';

const SectionTitle = ({ subHeading, heading }) => {
    return (
        <>
            <Container>
                <Box sx={{ textAlign: 'center' }}>
                    <Typography variant='h4'>{subHeading}</Typography>
                    <Typography variant='h2' > {heading}</Typography>
                </Box>
            </Container>
        </>
    );
};

export default SectionTitle;