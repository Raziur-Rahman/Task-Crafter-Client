import { NavLink, Outlet, useNavigate } from "react-router-dom";
import { FaHome, FaListAlt, FaPhoneAlt, FaRegEdit, FaSignOutAlt } from "react-icons/fa";
import { ImProfile } from "react-icons/im";
import useAuth from "../Hooks/useAuth";
import toast from "react-hot-toast";


const Dashboard = () => {

    const { UserLogOut } = useAuth();
    const navigate = useNavigate();

    const handleLogOut = () => {
        UserLogOut()
            .then(() => {
                toast.success("User Logged Out Successful...")
                navigate("/");
            })
            .catch((error) => {
                console.error(error)
                toast.error(`${error.message}`);
            })
    }

    return (
        <div className="flex flex-col md:flex-row mx-auto">
            <div className="w-72 p-2 space-y-5 min-h-screen bg-[#D1A054]">
                <div className="flex flex-col justify-center items-center">
                    <img className="w-[120px] rounded-full" src="https://i.ibb.co/ryVnX3X/task-icon-2.png" alt="" />
                    <h1 className="text-3xl font-bold">Task Crafter</h1>
                </div>
                <div>
                    <ul className="menu space-y-3 text-xl font-semibold">
                        <li >
                            <NavLink to='/dashboard/profile'>
                                <ImProfile /> My Profile
                            </NavLink>
                        </li>
                        <li >
                            <NavLink to="/dashboard/createtask"> <FaRegEdit /> Create Task</NavLink>
                        </li>
                        <li >
                            <NavLink to='/dashboard/taskmanager'> <FaListAlt /> Task Manager </NavLink>
                        </li>
                    </ul>
                    <hr />
                    <ul className="menu space-y-3 text-xl font-semibold">
                        <li>
                            <NavLink to='/'> <FaHome />  Home </NavLink>
                        </li>
                        <li>
                            <NavLink to='/contactsUs'> <FaPhoneAlt />  Contacts </NavLink>
                        </li>
                        <li>
                            <button onClick={handleLogOut}><FaSignOutAlt />  Log Out</button>
                        </li>


                    </ul>
                </div>


            </div>
            <div className="flex-1">
                <Outlet></Outlet>
            </div>
        </div>
    );
};

export default Dashboard;