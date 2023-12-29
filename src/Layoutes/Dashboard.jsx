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
        <div className="flex flex-col lg:flex-row mx-auto py-2 mb-10">
            <div className="w-72 hidden lg:block p-2 space-y-5 min-h-screen bg-[#D1A054]">
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
            <div className="navbar lg:hidden bg-base-100">
                <div className="navbar-start">
                    <div className="dropdown">
                        <div tabIndex={0} role="button" className="btn btn-ghost lg:hidden">
                            <svg xmlns="http://www.w3.org/2000/svg" className="h-5 w-5" fill="none" viewBox="0 0 24 24" stroke="currentColor"><path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M4 6h16M4 12h8m-8 6h16" /></svg>

                        </div>
                        <ul tabIndex={0} className="menu menu-sm dropdown-content mt-3 z-[1] p-2 shadow bg-base-100 rounded-box w-52">
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
                            <hr />
                            <hr />
                            <li>
                                <NavLink to='/'> <FaHome />  Home </NavLink>
                            </li>
                            <li>
                                <NavLink to='/contactsUs'> <FaPhoneAlt />  Contacts </NavLink>
                            </li>
                            {/* <li>
                                <button onClick={handleLogOut}><FaSignOutAlt />  Log Out</button>
                            </li> */}
                        </ul>
                    </div>
                </div>
                <div className="navbar-center ">
                    <h1 className="text-3xl text-center text-amber-700"> Task Crafter</h1>
                </div>
                <div className="navbar-end">
                    <button className="flex flex-row justify-center items-center space-x-2 btn btn-outline" onClick={handleLogOut}><FaSignOutAlt />  Log Out</button>
                </div>
            </div>
            <div className="flex-1">
                <Outlet></Outlet>
            </div>
        </div>
    );
};

export default Dashboard;