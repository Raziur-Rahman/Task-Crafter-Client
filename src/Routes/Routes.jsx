import { createBrowserRouter } from "react-router-dom";
import MainLayout from "../Layoutes/MainLayout";
import HomePage from "../Pages/HomePage";
import LoginPage from "../Pages/LoginPage";
import SignUpPage from "../Pages/SignUpPage";
import Dashboard from "../Layoutes/Dashboard";
import Profile from "../Components/Dashboard/Profile";
import PrivateRoute from "./PrivateRoute";
import AddTask from "../Components/Dashboard/AddTask";
import TaskManager from "../Components/Dashboard/TaskManager";
import UpdateTask from "../Components/Dashboard/UpdateTask";
import ContactUs from "../Components/Home/ContactUs";


const router = createBrowserRouter([
    {
        path: '/',
        element: <MainLayout></MainLayout>,
        children: [
            {
                path: '/',
                element: <HomePage></HomePage>,
            },
            {
                path: "/aboutUs",
                element: <ContactUs></ContactUs>
            }
        ]
    },
    {
        path: '/dashboard',
        element: <PrivateRoute><Dashboard></Dashboard></PrivateRoute>,
        children: [
            {
                path: '/dashboard/profile',
                element: <PrivateRoute><Profile></Profile></PrivateRoute>,
            },
            {
                path: '/dashboard/createtask',
                element: <PrivateRoute><AddTask></AddTask></PrivateRoute>
            },
            {
                path: '/dashboard/taskmanager',
                element: <PrivateRoute><TaskManager></TaskManager></PrivateRoute>
            },
            {
                path: "/dashboard/updateTask/:id",
                element: <UpdateTask></UpdateTask>
            }
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