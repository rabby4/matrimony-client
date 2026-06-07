import { Box, Container, Typography } from '@mui/material';
import { FaHeart } from 'react-icons/fa';
import { brand } from '../theme/theme';

/**
 * Section heading with ornamental divider.
 * `light` renders white/gold text for dark backgrounds.
 */
const SectionTitle = ({ subHeading, heading, description, light = false }) => {
    return (
        <Container>
            <Box sx={{ textAlign: 'center' }}>
                <Typography variant='h4' sx={{ color: light ? brand.gold : brand.secondary }}>
                    {subHeading}
                </Typography>
                <Typography variant='h2' sx={{ mt: '8px', color: light ? '#fff' : brand.primary }}>
                    {heading}
                </Typography>
                {/* ornament: line — heart — line */}
                <Box sx={{ display: 'flex', alignItems: 'center', justifyContent: 'center', gap: '12px', mt: '14px' }}>
                    <Box sx={{ width: '60px', height: '2px', bgcolor: light ? brand.gold : brand.primaryLight }} />
                    <FaHeart style={{ color: brand.secondary, fontSize: '14px' }} />
                    <Box sx={{ width: '60px', height: '2px', bgcolor: light ? brand.gold : brand.primaryLight }} />
                </Box>
                {description && (
                    <Typography sx={{ mt: '16px', maxWidth: '620px', mx: 'auto', color: light ? 'rgba(255,255,255,0.75)' : 'text.secondary', fontSize: '15px' }}>
                        {description}
                    </Typography>
                )}
            </Box>
        </Container>
    );
};

export default SectionTitle;
