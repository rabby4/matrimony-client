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
import PrivateRoute from "./PrivateRoute";
import AllBioData from "../pages/bioData/AllBioData";
import DetailsBioData from "../pages/bioData/details/DetailsBioData";
import AdminRoute from "./AdminRoute";
import Contact from "../pages/contact/Contact";
import CheckOut from "../pages/checkout/CheckOut";
import GotMarried from "../pages/Dashboard/UsersDashboard/GotMarried";

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
            },
            {
                path: '/contact',
                element: <Contact></Contact>
            },
            {
                path: '/biodatas',
                element: <AllBioData></AllBioData>
            },
            {
                path: '/details-bio-data/:id',
                element: <PrivateRoute><DetailsBioData></DetailsBioData></PrivateRoute>,
                loader: () => fetch('https://matrimony-server-roan.vercel.app/users')
            },
            {
                path: '/checkout/:id',
                element: <PrivateRoute><CheckOut></CheckOut></PrivateRoute>,
                loader: () => fetch(`https://matrimony-server-roan.vercel.app/users`)

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
        element: <PrivateRoute><Dashboard></Dashboard></PrivateRoute>,
        children: [
            // admin routes
            {
                path: 'admin-dashboard',
                element: <AdminRoute><AdminDashboard></AdminDashboard></AdminRoute>
            },
            {
                path: 'manage-users',
                element: <AdminRoute><ManageUsers></ManageUsers></AdminRoute>
            },
            {
                path: 'premium-request',
                element: <AdminRoute><PremiumRequest></PremiumRequest></AdminRoute>
            },
            {
                path: 'contact-request',
                element: <AdminRoute><ContactRequest></ContactRequest></AdminRoute>
            },
            // user routes
            {
                path: 'user-dashboard',
                element: <PrivateRoute><UsersDashboard></UsersDashboard></PrivateRoute>
            },
            {
                path: 'edit-bio-data',
                element: <PrivateRoute><EditBioData></EditBioData></PrivateRoute>,
            },
            {
                path: 'view-bio-data',
                element: <PrivateRoute><ViewBioData></ViewBioData></PrivateRoute>
            },
            {
                path: 'my-contact-request',
                element: <PrivateRoute><MyContactRequest></MyContactRequest></PrivateRoute>
            },
            {
                path: 'favorites-bio-data',
                element: <PrivateRoute><FavoritesBioData></FavoritesBioData></PrivateRoute>
            },
            {
                path: 'got-married',
                element: <PrivateRoute><GotMarried></GotMarried></PrivateRoute>
            }
        ]
    }
]);

export default router;