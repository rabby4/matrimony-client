import { Box, Grid, Stack, Typography } from "@mui/material";
import { FaRegHeart, FaUsers } from "react-icons/fa";
import { GrUserManager } from "react-icons/gr";
import { SlUserFemale } from "react-icons/sl";
import CountUp from "react-countup";


const SuccessCounter = () => {
    return (
        <>
            <Box sx={{ my: '100px' }}>
                <Grid container justifyItems='center' spacing={2} sx={{ borderTop: '1px solid', borderBottom: '1px solid', pb: '20px', borderColor: '#d7d1be' }}>
                    <Grid item xs={12} sm={6} md={4} lg={3}>
                        <Stack direction={'row'} alignItems={'center'} spacing={2}>
                            <Box sx={{ border: '1px solid', borderColor: 'primary', borderRadius: '15px', fontSize: '20px', textAlign: 'center', height: '50px', width: '50px', lineHeight: '50px' }}>
                                <FaRegHeart></FaRegHeart>
                            </Box>
                            <Box>
                                <Typography variant="h2" sx={{ mb: '10px' }}>
                                    <CountUp
                                        start={0}
                                        end={2000}
                                        duration={2.75}
                                        separator=","
                                        decimals={0}
                                        decimal=","
                                        enableScrollSpy
                                        scrollSpyDelay={500}
                                    >
                                        {({ countUpRef }) => (
                                            <div>
                                                <span ref={countUpRef} />

                                            </div>
                                        )}
                                    </CountUp>
                                </Typography>
                                <Typography variant="p" color={'primary'} sx={{ textTransform: 'uppercase', fontSize: '13px' }}>COUPLES PARED</Typography>
                            </Box>
                        </Stack>
                    </Grid>
                    <Grid item xs={12} sm={6} md={4} lg={3}>
                        <Stack direction={'row'} alignItems={'center'} spacing={2}>
                            <Box sx={{ border: '1px solid', borderColor: 'primary', borderRadius: '15px', fontSize: '20px', textAlign: 'center', height: '50px', width: '50px', lineHeight: '50px' }}>
                                <FaUsers></FaUsers>
                            </Box>
                            <Box>
                                <Typography variant="h2" sx={{ mb: '10px' }}>
                                    <CountUp
                                        start={0}
                                        end={4000}
                                        duration={2.75}
                                        separator=","
                                        decimals={0}
                                        decimal=","
                                        enableScrollSpy
                                        scrollSpyDelay={500}
                                    >
                                        {({ countUpRef }) => (
                                            <div>
                                                <span ref={countUpRef} />

                                            </div>
                                        )}
                                    </CountUp>
                                </Typography>
                                <Typography variant="p" color={'primary'} sx={{ textTransform: 'uppercase', fontSize: '13px' }}>Registrations</Typography>
                            </Box>
                        </Stack>
                    </Grid>
                    <Grid item xs={12} sm={6} md={4} lg={3}>
                        <Stack direction={'row'} alignItems={'center'} spacing={2}>
                            <Box sx={{ border: '1px solid', borderColor: 'primary', borderRadius: '15px', fontSize: '20px', textAlign: 'center', height: '50px', width: '50px', lineHeight: '50px' }}>
                                <GrUserManager></GrUserManager>
                            </Box>
                            <Box>
                                <Typography variant="h2" sx={{ mb: '10px' }}>
                                    <CountUp
                                        start={0}
                                        end={1600}
                                        duration={2.75}
                                        separator=","
                                        decimals={0}
                                        decimal=","
                                        enableScrollSpy
                                        scrollSpyDelay={500}
                                    >
                                        {({ countUpRef }) => (
                                            <div>
                                                <span ref={countUpRef} />

                                            </div>
                                        )}
                                    </CountUp>
                                </Typography>
                                <Typography variant="p" color={'primary'} sx={{ textTransform: 'uppercase', fontSize: '13px' }}>MENS</Typography>
                            </Box>
                        </Stack>
                    </Grid>
                    <Grid item xs={12} sm={6} md={4} lg={3}>
                        <Stack direction={'row'} alignItems={'center'} spacing={2}>
                            <Box sx={{ border: '1px solid', borderColor: 'primary', borderRadius: '15px', fontSize: '20px', textAlign: 'center', height: '50px', width: '50px', lineHeight: '50px' }}>
                                <SlUserFemale></SlUserFemale>
                            </Box>
                            <Box>
                                <Typography variant="h2" sx={{ mb: '10px' }}>
                                    <CountUp
                                        start={0}
                                        end={2000}
                                        duration={2.75}
                                        separator=","
                                        decimals={0}
                                        decimal=","
                                        enableScrollSpy
                                        scrollSpyDelay={500}
                                    >
                                        {({ countUpRef }) => (
                                            <div>
                                                <span ref={countUpRef} />

                                            </div>
                                        )}
                                    </CountUp>
                                </Typography>
                                <Typography variant="p" color={'primary'} sx={{ textTransform: 'uppercase', fontSize: '13px' }}>WOMENs</Typography>
                            </Box>
                        </Stack>
                    </Grid>
                </Grid>
            </Box>
        </>
    );
};

export default SuccessCounter;