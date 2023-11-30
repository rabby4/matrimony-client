import React from 'react';
import useUser from '../../hooks/useUser';
import { Box, Button, Grid, Paper, Typography } from '@mui/material';
import SectionTitle from '../../shared/SectionTitle';

const Premium = () => {
    const [, allUser, reload] = useUser()
    const premium = allUser?.filter(singleUser => singleUser.premium === true)
    return (
        <>
            <Box sx={{ my: '100px' }}>
                <SectionTitle subHeading={'Premium'} heading={'Our Premium Member'}></SectionTitle>
                <Grid container justifyContent='space-between' spacing={4} sx={{ mt: '50px' }} >
                    {
                        premium?.slice(0, 6)?.map(user => <Grid item key={user._id} xs={12} sm={12} md={4}>
                            <Paper sx={{ maxWidth: '100%', p: '20px', overflow: 'hidden', position: 'sticky', top: '120px', borderRadius: '10px', boxShadow: '0px 5px 40px 0px #1111112b' }}>
                                <img src={user?.photo} alt="" width={'100%'} height={'250px'} style={{ borderRadius: '5px' }} referrerPolicy="no-referrer" />
                                <Box>
                                    <Typography sx={{ my: '5px' }}><span style={{ fontWeight: '600', }}>Name :</span> {user.name}</Typography>
                                    <Typography><span style={{ fontWeight: '600' }}>Gender :</span> {user.gender}</Typography>
                                    <Typography sx={{ my: '5px' }}><span style={{ fontWeight: '600', }}>Age :</span> {user.age} years</Typography>
                                    <Typography><span style={{ fontWeight: '600' }}>Occupation :</span> {user.occupation}</Typography>
                                    <Typography sx={{ my: '5px' }}><span style={{ fontWeight: '600', }}>Permanent Division :</span> {user.permanentDivision}</Typography>
                                </Box>
                                <Box display={'flex'} justifyContent={'end'} sx={{ mt: '20px' }}>
                                    <Button href={`/details-bio-data/${user?._id}`} sx={{ background: '#66451c', color: '#fff', px: '30px', ":hover": { bgcolor: '#c48c46' } }}>View Profile</Button>
                                </Box>
                            </Paper>
                        </Grid>)
                    }
                </Grid>
            </Box>
        </>
    );
};

export default Premium;