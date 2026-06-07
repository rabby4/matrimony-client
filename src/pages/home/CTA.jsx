import { Box, Button, Stack, Typography } from '@mui/material';
import { Link as RouterLink } from 'react-router-dom';
import { brand } from '../../theme/theme';

const CTA = () => {
    return (
        <Box sx={{
            position: 'relative',
            backgroundImage: 'url(https://images.unsplash.com/photo-1511285560929-80b456fea0bc?auto=format&fit=crop&w=1920&q=80)',
            backgroundSize: 'cover',
            backgroundPosition: 'center',
            backgroundAttachment: { md: 'fixed' },
            py: { xs: '80px', md: '110px' },
        }}>
            {/* brand overlay */}
            <Box sx={{ position: 'absolute', inset: 0, background: 'linear-gradient(90deg, rgba(42,44,60,0.92) 0%, rgba(102,69,28,0.85) 100%)' }} />
            <Box sx={{ position: 'relative', zIndex: 5, textAlign: 'center', px: '20px' }}>
                <Typography variant='h4' sx={{ color: brand.gold }}>Start Today</Typography>
                <Typography variant='h2' sx={{ color: '#fff', mt: '10px' }}>
                    Find Your Perfect Match Now
                </Typography>
                <Typography sx={{ color: 'rgba(255,255,255,0.8)', maxWidth: '560px', mx: 'auto', mt: '18px', fontSize: '15px', lineHeight: 1.8 }}>
                    Your life partner could be one click away. Create your free biodata today and
                    join thousands of members who already found the one.
                </Typography>
                <Stack direction={{ xs: 'column', sm: 'row' }} spacing={2} justifyContent='center' sx={{ mt: '35px' }}>
                    <Button
                        component={RouterLink}
                        to='/register'
                        variant='contained'
                        color='secondary'
                        size='large'
                        sx={{ px: '45px', py: '12px', fontSize: '15px' }}
                    >
                        Register Now
                    </Button>
                    <Button
                        component={RouterLink}
                        to='/contact'
                        variant='outlined'
                        size='large'
                        sx={{ px: '45px', py: '12px', fontSize: '15px', color: '#fff', borderColor: 'rgba(255,255,255,0.6)', ':hover': { borderColor: '#fff', bgcolor: 'rgba(255,255,255,0.1)' } }}
                    >
                        Help & Support
                    </Button>
                </Stack>
            </Box>
        </Box>
    );
};

export default CTA;
