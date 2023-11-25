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
            <Box width={'100%'} height={'100vh'} display={'flex'} sx={{ alignItems: 'center', justifyContent: 'center' }}>
                <Lottie animationData={Couple}></Lottie>
            </Box>


            {/* <div className="h-screen w-full flex items-center justify-center">
                <span className="loading loading-infinity loading-lg"></span>
            </div> */}
        </>
    }
    if (user) {
        return children;
    }
    return <Navigate to='/login' state={{ from: location }} replace></Navigate>
};

export default PrivateRoute;