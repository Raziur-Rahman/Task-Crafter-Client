import { Link } from "react-router-dom";
import useAuth from "../../Hooks/useAuth";
import toast from "react-hot-toast";


const Navber = () => {

    const { user, UserLogOut } = useAuth();

    const handleLogout = () => {
        UserLogOut()
            .then(() => {
                toast.success("LogOut Successfull")

            })
    }

    return (
        <div className="navbar bg-base-100">
            <div className="navbar-start">
                <div className="dropdown">
                    <div tabIndex={0} role="button" className="btn btn-ghost lg:hidden">
                        <svg xmlns="http://www.w3.org/2000/svg" className="h-5 w-5" fill="none" viewBox="0 0 24 24" stroke="currentColor"><path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M4 6h16M4 12h8m-8 6h16" /></svg>
                    </div>
                    <ul tabIndex={0} className="menu menu-sm dropdown-content mt-3 z-[1] p-2 shadow bg-base-100 rounded-box w-52">
                        <li><Link to='/'>Home</Link></li>
                        <li><Link to='/signup'>SignUp</Link></li>
                        <li><Link to='/dashboard/profile'>Get Started</Link></li>
                    </ul>
                </div>
                <a className="btn btn-ghost text-xl text-amber-400 hover:text-gray-700">Task Crafter</a>
            </div>
            <div className="navbar-center hidden lg:flex">
                <ul className="menu menu-horizontal px-1">
                    <li><Link to='/'>Home</Link></li>
                    <li><Link to='/signup'>SignUp</Link></li>
                    <li><Link to='/dashboard/profile'>Get Started</Link></li>
                </ul>
            </div>
            <div className="navbar-end">
                {
                    user ? <button onClick={handleLogout} className="btn btn-accent">LogOut</button> : <Link to='/login'><button className="btn btn-accent">LogIn</button></Link>
                }
            </div>
        </div>
    );
};

export default Navber;