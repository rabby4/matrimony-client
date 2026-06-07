import { Box, Typography } from '@mui/material';
import { Link as RouterLink } from 'react-router-dom';
import { GiDiamondRing } from 'react-icons/gi';
import { brand } from '../theme/theme';

/**
 * Text-based brand logo (replaces the image hotlinked from the theme site).
 * `light` renders white text for dark backgrounds like the footer.
 */
const Logo = ({ light = false }) => {
    return (
        <Box
            component={RouterLink}
            to='/'
            sx={{ display: 'inline-flex', alignItems: 'center', gap: '10px', textDecoration: 'none' }}
        >
            <GiDiamondRing style={{ fontSize: '34px', color: brand.secondary }} />
            <Box>
                <Typography sx={{
                    fontFamily: 'Playfair Display', fontWeight: 700, fontSize: '26px',
                    lineHeight: 1, color: light ? '#fff' : brand.primary,
                }}>
                    Matrimony
                </Typography>
                <Typography sx={{
                    fontFamily: 'Cinzel Decorative', fontSize: '9px', letterSpacing: '2.5px',
                    color: light ? brand.gold : brand.primaryLight, textTransform: 'uppercase',
                }}>
                    Find your right match
                </Typography>
            </Box>
        </Box>
    );
};

export default Logo;
