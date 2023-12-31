import { Navigate, useLocation } from "react-router-dom";
import { Box } from "@mui/material";
import useAdmin from "../hooks/useAdmin";
import Couple from '../assets/couple.json'
import Lottie from "lottie-react";
import useAuth from "../hooks/useAuth";

const AdminRoute = ({ children }) => {
    const { user, loading } = useAuth()
    const [isAdmin, isAdminLoading] = useAdmin()
    const location = useLocation()
    if (loading || isAdminLoading) {
        return <>
            <Box width={'100%'} height={'100vh'} display={'flex'} sx={{ alignItems: 'center', justifyContent: 'center' }}>
                <Lottie animationData={Couple}></Lottie>
            </Box>
        </>
    }
    if (user && isAdmin) {
        return children;
    }
    return <Navigate to='/login' state={{ from: location }} replace></Navigate>
};

export default AdminRoute;