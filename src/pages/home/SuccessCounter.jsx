import { Box, Stack, Typography } from "@mui/material";
import { FaCrown, FaUsers } from "react-icons/fa";
import { GrUserManager } from "react-icons/gr";
import { SlUserFemale } from "react-icons/sl";
import CountUp from "react-countup";
import useUser from "../../hooks/useUser";
import { brand } from "../../theme/theme";

/**
 * Live platform statistics — counts come straight from the database
 * instead of hardcoded numbers.
 */
const SuccessCounter = () => {
    const [, allUser] = useUser()

    const stats = [
        {
            id: 1,
            icon: <FaUsers />,
            count: allUser?.length || 0,
            label: 'Registered Members',
        },
        {
            id: 2,
            icon: <GrUserManager />,
            count: allUser?.filter(user => user.gender === 'Male').length || 0,
            label: 'Grooms',
        },
        {
            id: 3,
            icon: <SlUserFemale />,
            count: allUser?.filter(user => user.gender === 'Female').length || 0,
            label: 'Brides',
        },
        {
            id: 4,
            icon: <FaCrown />,
            count: allUser?.filter(user => user.premium === true).length || 0,
            label: 'Premium Members',
        },
    ]

    return (
        <Box sx={{ py: '40px' }}>
            <Box sx={{
                display: 'grid',
                gridTemplateColumns: { xs: '1fr 1fr', md: 'repeat(4, 1fr)' },
                gap: { xs: '28px 12px', md: '24px' },
                borderTop: '1px solid #e8e0cd',
                borderBottom: '1px solid #e8e0cd',
                py: { xs: '30px', md: '35px' },
            }}>
                {stats.map(stat => (
                    <Stack
                        key={stat.id}
                        direction={{ xs: 'column', lg: 'row' }}
                        alignItems='center'
                        spacing={{ xs: 1.2, lg: 2 }}
                        sx={{ textAlign: { xs: 'center', lg: 'left' } }}
                    >
                        <Box sx={{
                            bgcolor: brand.cream,
                            border: `1px solid ${brand.primaryLight}`,
                            color: brand.primary,
                            borderRadius: '15px',
                            fontSize: { xs: '19px', md: '22px' },
                            display: 'flex', alignItems: 'center', justifyContent: 'center',
                            height: { xs: '48px', md: '56px' },
                            width: { xs: '48px', md: '56px' },
                            flexShrink: 0,
                        }}>
                            {stat.icon}
                        </Box>
                        <Box>
                            <Typography variant="h2" sx={{ fontSize: { xs: '24px', sm: '28px', md: '34px' }, lineHeight: 1.2 }}>
                                <CountUp end={stat.count} duration={2.5} separator="," suffix="+" />
                            </Typography>
                            <Typography sx={{
                                color: 'text.secondary',
                                textTransform: 'uppercase',
                                fontSize: { xs: '10.5px', md: '12px' },
                                letterSpacing: '1px',
                                fontWeight: 500,
                                mt: '2px',
                            }}>
                                {stat.label}
                            </Typography>
                        </Box>
                    </Stack>
                ))}
            </Box>
        </Box>
    );
};

export default SuccessCounter;
