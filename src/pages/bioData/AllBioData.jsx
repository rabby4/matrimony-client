import React, { useEffect, useState } from 'react';
import useUser from '../../hooks/useUser';
import { Box, Button, Checkbox, Container, FormControlLabel, Grid, ListItemIcon, ListItemText, MenuItem, MenuList, Paper, Slider, Typography } from '@mui/material';

const AllBioData = () => {
    const [, allUser] = useUser()
    const [maleData, setMaleData] = useState(false)
    const [femaleData, setFemaleData] = useState(false)
    const [dhakaData, setDhakaData] = useState(false)
    const [chittagongData, setChittagongData] = useState(false)
    const [barisalData, setBarisalData] = useState(false)
    const [mymensinghData, setMymensinghData] = useState(false)
    const [rajshahiData, setRajshahiData] = useState(false)
    const [rangpurData, setRangpurData] = useState(false)
    const [sylhetData, setSylhetData] = useState(false)
    const [khulnaData, setKhulnaData] = useState(false)

    const filteredData = allUser?.filter(item => {
        // if (item.role !== 'admin') {
        if (maleData && item.gender === 'Male') {
            return true
        }
        if (femaleData && item.gender === 'Female') {
            return true
        }
        if (dhakaData && item.permanentDivision === 'Dhaka') {
            return true
        }
        if (chittagongData && item.permanentDivision === 'Chittagong') {
            return true
        }
        if (barisalData && item.permanentDivision === 'Barisal') {
            return true
        }
        if (mymensinghData && item.permanentDivision === 'Mymensingh') {
            return true
        }
        if (rajshahiData && item.permanentDivision === 'Rajshahi') {
            return true
        }
        if (rangpurData && item.permanentDivision === 'Rangpur') {
            return true
        }
        if (sylhetData && item.permanentDivision === 'Sylhet') {
            return true
        }
        if (khulnaData && item.permanentDivision === 'Khulna') {
            return true
        }
        return !maleData && !femaleData && !dhakaData && !chittagongData && !barisalData && !mymensinghData && !rajshahiData && !rangpurData && !sylhetData && !khulnaData;
        // }
        // return false
    }) || []


    const handleGenderCheckBox = (gender) => {
        if (gender === 'Male') {
            setMaleData(!maleData)
        } else if (gender === 'Female') {
            setFemaleData(!femaleData)
        }
    }

    const handleDivisionCheckbox = (division) => {
        if (division === 'Dhaka') {
            setDhakaData(!dhakaData)
        } else if (division === 'Chittagong') {
            setChittagongData(!chittagongData)
        } else if (division === 'Barisal') {
            setBarisalData(!barisalData)
        } else if (division === 'Mymensingh') {
            setMymensinghData(!mymensinghData)
        } else if (division === 'Rajshahi') {
            setRajshahiData(!rajshahiData)
        } else if (division === 'Rangpur') {
            setRangpurData(!rangpurData)
        } else if (division === 'Sylhet') {
            setSylhetData(!sylhetData)
        } else if (division === 'Khulna') {
            setKhulnaData(!khulnaData)
        }
    }


    return (
        <>
            <Container>
                <Box sx={{ mt: '150px', textAlign: 'center' }}>
                    <Typography variant='h2'>View All Bio Data</Typography>
                </Box>
                <Box display={'flex'} sx={{ my: '120px', gap: '70px' }}>
                    <Box width={'30%'}>
                        <Paper sx={{ maxWidth: '100%', textAlign: 'center', p: '50px', overflow: 'hidden', position: 'sticky', top: '120px', borderRadius: '5px', boxShadow: '0px 5px 40px 0px #1111112b' }}>
                            <Box>
                                <Typography sx={{ fontSize: '18px', fontWeight: 600, mb: '15px', textAlign: 'left' }}>Filter by Age</Typography>
                                <Slider
                                    getAriaLabel={() => 'Temperature range'}
                                    value={0}
                                    // onChange={handleChange}
                                    valueLabelDisplay="auto"
                                // getAriaValueText={valuetext}
                                />
                            </Box>
                            <MenuList sx={{ textAlign: 'left' }}>
                                <Typography sx={{ fontSize: '18px', fontWeight: 600, mb: '15px' }}>Filter by Gender</Typography>
                                <Box display={'flex'} sx={{ flexDirection: 'column' }}>
                                    <FormControlLabel
                                        control={<Checkbox checked={maleData} onChange={() => handleGenderCheckBox('Male')} />}
                                        label="Male"
                                    />
                                    <FormControlLabel
                                        control={<Checkbox checked={femaleData} onChange={() => handleGenderCheckBox('Female')} />}
                                        label="Female"
                                    />
                                </Box>
                            </MenuList>
                            <MenuList sx={{ textAlign: 'left' }}>
                                <Typography sx={{ fontSize: '18px', fontWeight: 600, mb: '15px' }}>Filter by Division</Typography>
                                <Box display={'flex'} sx={{ flexDirection: 'column' }}>
                                    <FormControlLabel
                                        control={<Checkbox checked={dhakaData} onChange={() => handleDivisionCheckbox('Dhaka')} />}
                                        label="Dhaka"
                                    />
                                    <FormControlLabel
                                        control={<Checkbox checked={chittagongData} onChange={() => handleDivisionCheckbox('Chittagong')} />}
                                        label="Chittagong"
                                    />
                                    <FormControlLabel
                                        control={<Checkbox checked={barisalData} onChange={() => handleDivisionCheckbox('Barisal')} />}
                                        label="Barisal"
                                    />
                                    <FormControlLabel
                                        control={<Checkbox checked={mymensinghData} onChange={() => handleDivisionCheckbox('Mymensingh')} />}
                                        label="Mymensingh"
                                    />
                                    <FormControlLabel
                                        control={<Checkbox checked={rajshahiData} onChange={() => handleDivisionCheckbox('Rajshahi')} />}
                                        label="Rajshahi"
                                    />
                                    <FormControlLabel
                                        control={<Checkbox checked={rangpurData} onChange={() => handleDivisionCheckbox('Rangpur')} />}
                                        label="Rangpur"
                                    />
                                    <FormControlLabel
                                        control={<Checkbox checked={sylhetData} onChange={() => handleDivisionCheckbox('Sylhet')} />}
                                        label="Sylhet"
                                    />
                                    <FormControlLabel
                                        control={<Checkbox checked={khulnaData} onChange={() => handleDivisionCheckbox('Khulna')} />}
                                        label="Khulna"
                                    />
                                </Box>
                            </MenuList>
                        </Paper>
                    </Box>
                    <Grid container justifyContent='space-between' spacing={3} width={'70%'}>
                        {
                            filteredData?.map(user => <Grid item key={user._id} xs={12} sm={12} md={6}>
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
            </Container>
        </>
    );
};

export default AllBioData;