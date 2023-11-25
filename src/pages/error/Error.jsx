import Lottie from 'lottie-react';
import React from 'react';
import { Link, useRouteError } from 'react-router-dom';
import ErrorAnime from '../../assets/error.json'
import { Box, Button, Container } from '@mui/material';


const Error = () => {
    const error = useRouteError()
    return (
        <Box display={'flex'} sx={{ justifyContent: 'center', alignItems: 'center', height: '100vh' }}>
            {
                error.status === 404 && <Box sx={{ textAlign: 'center' }} className="text-center">
                    <Container>
                        <Lottie animationData={ErrorAnime}></Lottie>
                    </Container>
                    <Link to='/'>
                        <Button sx={{ background: '#66451c', color: '#fff', px: '30px', ml: '40px', ":hover": { bgcolor: '#c48c46' } }}>Go Back Home</Button>
                    </Link>
                </Box>
            }
        </Box>
    );
};

export default Error;

