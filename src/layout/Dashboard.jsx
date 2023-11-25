import { Box, Container, Typography } from '@mui/material';
import React from 'react';

const Dashboard = () => {
    return (
        <>
            <Container>
                <Box>
                    <Box>
                        <Typography>left sidebar</Typography>
                    </Box>
                    <Box>
                        <Typography>content area</Typography>
                    </Box>
                </Box>
            </Container>
        </>
    );
};

export default Dashboard;