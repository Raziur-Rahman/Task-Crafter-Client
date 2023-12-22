import { createBrowserRouter } from "react-router-dom";
import MainLayout from "../Layoutes/MainLayout";
import HomePage from "../Pages/HomePage";
import LoginPage from "../Pages/LoginPage";
import SignUpPage from "../Pages/SignUpPage";
import Dashboard from "../Layoutes/Dashboard";
import Profile from "../Components/Dashboard/Profile";


const router = createBrowserRouter([
    {
        path: '/',
        element: <MainLayout></MainLayout>,
        children: [
            {
                path: '/',
                element: <HomePage></HomePage>,
            },
        ]
    },
    {
        path: '/dashboard',
        element: <Dashboard></Dashboard>,
        children: [
            {
                path: '/dashboard/profile',
                element: <Profile></Profile>,
            },
        ]
    },
    {
        path: '/login',
        element: <LoginPage></LoginPage>
    },
    {
        path: '/signup',
        element: <SignUpPage></SignUpPage>
    }
])


export default router;