import { Box, Typography } from '@mui/material';
import React from 'react';
import useUser from '../../../hooks/useUser';
import { FaRegSmileWink } from "react-icons/fa";


const UsersDashboard = () => {
    const [userInfo] = useUser()
    return (
        <>
            <Box display={'flex'} height={'100%'} flexDirection={'column'} sx={{ justifyContent: 'center', alignItems: 'center' }}>
                <FaRegSmileWink style={{ fontSize: '50px', color: '#f4900c' }}></FaRegSmileWink>
                <Typography variant='h2'>WelCome {userInfo?.name}</Typography>
            </Box>
        </>
    );
};

export default UsersDashboard;