import { Link, useNavigate } from "react-router-dom";
import { FaFacebookF } from "react-icons/fa6";
import { FcGoogle } from "react-icons/fc";
import { BiLogoLinkedin } from "react-icons/bi";
import toast from "react-hot-toast";
import useAuth from "../Hooks/useAuth";
import AOS from 'aos';
import { useEffect } from "react";


const LoginPage = () => {

    const { UserGoogleLogin, UserLogIn } = useAuth();
    const navigate = useNavigate();

    useEffect(() => {
        AOS.init()
    }, [])

    const handleLogin = event => {
        event.preventDefault();
        const form = event.target;
        const email = form.email.value;
        const password = form.password.value;

        UserLogIn(email, password)
            .then(result => {
                toast.success("Login Successful!!")
                console.log(result.user);
                navigate("/")
            })
            .catch(error => {
                toast.error(`${error.message}`)
                console.error(error);
            })
        console.log(email, password)
    }

    const handleGoogleLogin = () => {
        UserGoogleLogin()
            .then(result => {
                const user = result.user;
                toast.success("Login Successful!!")
                console.log(user);
                navigate('/')

            })
            .catch(error => {
                console.error(error);
                toast.error(`${error.message}`);
            })
    }

    return (
        <div className="hero min-h-screen">
            <div className="hero-content flex-col lg:flex-row bg-base-100 shadow-xl bg-center bg-cover w-4/5 mx-auto min-h-[80vh] rounded-xl">
                <div
                    data-aos="fade-up"
                    data-aos-duration="1000"
                >
                    <img className="hidden w-[500px] lg:block" src="https://i.ibb.co/Sv02Wd2/Login-Page-Gif.gif" alt="" />
                </div>
                <div
                    data-aos="fade-right"
                    data-aos-duration="1000"
                    className="card flex-shrink-0 w-full max-w-sm">
                    <h1 className="text-4xl font-semibold text-center">Welcome to Task Crafter</h1>
                    <form onSubmit={handleLogin} className="card-body pt-2 pb-2">
                        <div className="form-control">
                            <label className="label">
                                <span className="label-text">Email</span>
                            </label>
                            <input type="email" name="email" placeholder="email" className="input input-bordered" required />
                        </div>
                        <div className="form-control">
                            <label className="label">
                                <span className="label-text">Password</span>
                            </label>
                            <input type="password" name="password" placeholder="password" className="input input-bordered" required />
                            <label className="label">
                                <a href="#" className="label-text-alt link link-hover">Forgot password?</a>
                            </label>
                        </div>
                        <div className="form-control mt-3">
                            <button className="btn btn-primary">Login</button>
                        </div>
                    </form>
                    <div className="flex flex-col justify-center items-center gap-2 mt-0 pt-0">
                        <p className=" text-[#D1A054] font-semibold">New Here? <Link to="/signup">Create a new Account</Link></p>
                        <p>Or sign up with</p>
                        <div className="space-x-5 my-2">
                            <button className="btn btn-circle text-xl bg-slate-200  text-[#0A66C2]"> <FaFacebookF></FaFacebookF> </button>
                            <button className="btn btn-circle bg-slate-200  text-xl text-[#0A66C2]"><BiLogoLinkedin></BiLogoLinkedin></button>
                            <button onClick={handleGoogleLogin} className="btn btn-circle bg-slate-200 text-xl"><FcGoogle></FcGoogle></button>
                        </div>
                    </div>
                </div>
            </div>
        </div>
    );
};

export default LoginPage;