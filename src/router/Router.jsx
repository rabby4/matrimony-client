import {
    createBrowserRouter,
} from "react-router-dom";
import Main from "../layout/Main";
import Home from "../pages/home/Home";
import About from "../pages/about/About";
import Login from "../pages/login/Login";
import Register from "../pages/register/Register";
import Dashboard from "../layout/Dashboard";
import AdminDashboard from "../pages/Dashboard/AdminDashboard/AdminDashboard";
import ManageUsers from "../pages/Dashboard/AdminDashboard/ManageUsers";
import PremiumRequest from "../pages/Dashboard/AdminDashboard/PremiumRequest";
import ContactRequest from "../pages/Dashboard/AdminDashboard/ContactRequest";
import UsersDashboard from "../pages/Dashboard/UsersDashboard/UsersDashboard";
import EditBioData from "../pages/Dashboard/UsersDashboard/EditBioData";
import ViewBioData from "../pages/Dashboard/UsersDashboard/ViewBioData";
import MyContactRequest from "../pages/Dashboard/UsersDashboard/MyContactRequest";
import FavoritesBioData from "../pages/Dashboard/UsersDashboard/FavoritesBioData";
import Error from "../pages/error/Error";

const router = createBrowserRouter([
    {
        path: "/",
        element: <Main></Main>,
        errorElement: <Error></Error>,
        children: [
            {
                index: true,
                element: <Home></Home>
            },
            {
                path: '/about',
                element: <About></About>
            }
        ]
    },
    {
        path: '/login',
        element: <Login></Login>
    },
    {
        path: '/register',
        element: <Register></Register>
    },
    {
        path: 'dashboard',
        element: <Dashboard></Dashboard>,
        children: [
            // admin routes
            {
                path: 'admin-dashboard',
                element: <AdminDashboard></AdminDashboard>
            },
            {
                path: 'manage-users',
                element: <ManageUsers></ManageUsers>
            },
            {
                path: 'premium-request',
                element: <PremiumRequest></PremiumRequest>
            },
            {
                path: 'contact-request',
                element: <ContactRequest></ContactRequest>
            },
            // user routes
            {
                path: 'user-dashboard',
                element: <UsersDashboard></UsersDashboard>
            },
            {
                path: 'edit-bio-data',
                element: <EditBioData></EditBioData>
            },
            {
                path: 'view-bio-data',
                element: <ViewBioData></ViewBioData>
            },
            {
                path: 'my-contact-request',
                element: <MyContactRequest></MyContactRequest>
            },
            {
                path: 'favorites-bio-data',
                element: <FavoritesBioData></FavoritesBioData>
            }
        ]
    }
]);

export default router;