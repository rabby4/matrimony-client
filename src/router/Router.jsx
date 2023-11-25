import {
    createBrowserRouter,
} from "react-router-dom";
import Main from "../layout/Main";
import Home from "../pages/home/Home";
import About from "../pages/about/About";
import Login from "../pages/login/Login";
import Register from "../pages/register/Register";

const router = createBrowserRouter([
    {
        path: "/",
        element: <Main></Main>,
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
    }
]);

export default router;