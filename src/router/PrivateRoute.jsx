import { useContext } from "react";
import { AuthContext } from "../provider/AuthProvider";
import { Navigate, useLocation } from "react-router-dom";
import { Box } from "@mui/material";
import Couple from '../assets/couple.json'
import Lottie from "lottie-react";


const PrivateRoute = ({ children }) => {
    const { user, loading } = useContext(AuthContext)
    const location = useLocation()
    if (loading) {
        return <>
            <Box width={'50%'} height={'50vh'} display={'flex'} sx={{ alignItems: 'center', justifyContent: 'center' }}>
                <Lottie animationData={Couple}></Lottie>
            </Box>
        </>
    }
    if (user) {
        return children;
    }
    return <Navigate to='/login' state={{ from: location }} replace></Navigate>
};

export default PrivateRoute;