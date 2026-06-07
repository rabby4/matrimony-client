import { Navigate } from "react-router-dom";
import { Box } from "@mui/material";
import Lottie from "lottie-react";
import Couple from '../assets/couple.json'
import useAdmin from "../hooks/useAdmin";

/**
 * Landing point for "/dashboard" — waits for the role check, then sends
 * admins and members to their own dashboard.
 */
const DashboardRedirect = () => {
    const [isAdmin, isAdminLoading] = useAdmin()

    if (isAdminLoading) {
        return (
            <Box width={'100%'} height={'100vh'} display={'flex'} sx={{ alignItems: 'center', justifyContent: 'center' }}>
                <Lottie animationData={Couple}></Lottie>
            </Box>
        )
    }

    return <Navigate to={isAdmin ? '/dashboard/admin-dashboard' : '/dashboard/user-dashboard'} replace />
};

export default DashboardRedirect;
