import { useState } from 'react';
import { Box, Button, Container, Grid, MenuItem, Paper, TextField, Typography } from '@mui/material';
import SearchIcon from '@mui/icons-material/Search';
import { useNavigate } from 'react-router-dom';
import { brand } from '../../theme/theme';

const divisions = ['Dhaka', 'Chittagong', 'Barisal', 'Mymensingh', 'Rajshahi', 'Rangpur', 'Sylhet', 'Khulna'];
const ageRanges = ['18 - 25', '26 - 30', '31 - 35', '36 - 40', '40+'];

/**
 * Hero search card — overlaps the bottom of the slider like the matrimo
 * reference theme. Sends the visitor to the biodata listing with their
 * choices as query params.
 */
const SearchMatch = () => {
    const navigate = useNavigate();
    const [gender, setGender] = useState('Female');
    const [age, setAge] = useState('18 - 25');
    const [division, setDivision] = useState('Dhaka');

    const handleSearch = (event) => {
        event.preventDefault();
        navigate(`/biodatas?gender=${encodeURIComponent(gender)}&age=${encodeURIComponent(age)}&division=${encodeURIComponent(division)}`);
    };

    return (
        <Container maxWidth='lg' sx={{ position: 'relative', zIndex: 20, mt: { xs: '-50px', md: '-60px' } }}>
            <Paper
                component='form'
                onSubmit={handleSearch}
                elevation={0}
                sx={{
                    p: { xs: '25px', md: '30px 40px' },
                    borderRadius: '16px',
                    boxShadow: '0px 20px 60px 0px rgba(17,17,17,0.15)',
                    border: `1px solid ${brand.cream}`,
                }}
            >
                <Typography sx={{ fontFamily: 'Playfair Display', fontWeight: 700, fontSize: '20px', color: brand.primary, mb: '20px', textAlign: { xs: 'center', md: 'left' } }}>
                    Begin your search for a perfect partner
                </Typography>
                <Grid container spacing={2} alignItems='center'>
                    <Grid item xs={12} sm={6} md={3}>
                        <TextField select fullWidth label="I'm looking for" value={gender} onChange={(e) => setGender(e.target.value)}>
                            <MenuItem value='Male'>Male</MenuItem>
                            <MenuItem value='Female'>Female</MenuItem>
                        </TextField>
                    </Grid>
                    <Grid item xs={12} sm={6} md={3}>
                        <TextField select fullWidth label='Age' value={age} onChange={(e) => setAge(e.target.value)}>
                            {ageRanges.map((range) => (
                                <MenuItem key={range} value={range}>{range} years</MenuItem>
                            ))}
                        </TextField>
                    </Grid>
                    <Grid item xs={12} sm={6} md={3}>
                        <TextField select fullWidth label='Division' value={division} onChange={(e) => setDivision(e.target.value)}>
                            {divisions.map((item) => (
                                <MenuItem key={item} value={item}>{item}</MenuItem>
                            ))}
                        </TextField>
                    </Grid>
                    <Grid item xs={12} sm={6} md={3}>
                        <Button
                            type='submit'
                            fullWidth
                            variant='contained'
                            color='secondary'
                            size='large'
                            startIcon={<SearchIcon />}
                            sx={{ py: '14px', fontSize: '15px' }}
                        >
                            Search Partner
                        </Button>
                    </Grid>
                </Grid>
            </Paper>
        </Container>
    );
};

export default SearchMatch;
