import { Link, useNavigate } from "react-router-dom";
import { FaEye, FaEyeSlash, FaFacebookF } from "react-icons/fa6";
import { FcGoogle } from "react-icons/fc";
import { BiLogoLinkedin } from "react-icons/bi";
import useAuth from "../Hooks/useAuth";
import toast from "react-hot-toast";
import { updateProfile } from "firebase/auth";
import { useEffect, useState } from "react";
import AOS from 'aos';
import useAxiosPublic from "../Hooks/useAxiosPublic";

const SignUpPage = () => {

    useEffect(()=>{
        AOS.init();
    },[])

    const [show, setShow] = useState(false);
    const { UserGoogleLogin, UserRegitration } = useAuth();
    const navigate = useNavigate();
    const axiosPublic = useAxiosPublic();

    const handleCreateUser = event => {
        event.preventDefault();
        const form = event.target;
        const name = form.name.value;
        const email = form.email.value;
        const password = form.password.value;
        const photo = form.Photo.value;

        UserRegitration(email, password)
        .then(userCredential => {
            const user = userCredential.user;
            const userinfo = { email: user?.email, name: name, role: "ordinary"};
            if (user?.email) {
                updateProfile(user, {
                    displayName: name,
                    photoURL: photo
                })
                    .then(() => {
                        axiosPublic.post('/users', userinfo)
                            .then(res => {
                                console.log(res.data);
                                toast.success("User created Successfuly....");
                                navigate("/")
                            })
                    })
                    .catch((error) => {
                        console.log(error);
                        toast.error("Update failed..")
                    })
            }
        })
        .catch(error => {
            console.error(error);
            toast.error("Registration failed...")
        })
    }

    const handleGoogleLogin = () => {
        UserGoogleLogin()
        .then(result => {
            const user = result.user;

            const userinfo = { email: user?.email, name: user?.displayName, role: "ordinary" }

            axiosPublic.post('/users', userinfo)
                .then(res => {
                    console.log(res.data);
                    toast.success("Login Successfull!!!");
                    navigate('/');
                })

        })
        .catch(error => {
            console.error(error);
            toast.error(`${error.message}`)
        })
    }


    return (
        <div className="hero min-h-screen p-2">
            <div className="hero-content flex-col lg:flex-row bg-base-100 shadow-xl w-full md:w-4/5 min-h-[80vh] rounded-xl">
                <div 
                data-aos="fade-up"
                data-aos-duration="1000"
                >
                    <img className="hidden w-[500px] lg:block" src="https://i.ibb.co/Sv02Wd2/Login-Page-Gif.gif" alt="" />
                </div>
                <div 
                data-aos="fade-left" 
                data-aos-duration="1000"
                className="card flex-shrink-0 w-full max-w-sm">
                    <h1 className="text-4xl font-semibold text-center">Create Account</h1>
                    <form onSubmit={handleCreateUser} className="card-body pt-2 pb-2">
                        <div className="form-control">
                            <label className="label">
                                <span className="label-text">Name</span>
                            </label>
                            <input type="text" name="name" placeholder="Your Name" className="input input-bordered" required />
                        </div>
                        <div className="form-control">
                            <label className="label">
                                <span className="label-text">Profile Photo</span>
                            </label>
                            <input type="text" placeholder="Photo URL" name="Photo" className="input input-bordered" />
                        </div>
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
                            <div className="relative">
                                <input type={show ? "text" : "password"} placeholder="password" name="password" className="input input-bordered w-full" required />
                                <span className="absolute top-4 right-3" onClick={() => setShow(!show)}>
                                    {
                                        show ? <FaEyeSlash></FaEyeSlash> : <FaEye></FaEye>
                                    }
                                </span>
                            </div>
                            <label className="label">
                                <a href="#" className="label-text-alt link link-hover">Forgot password?</a>
                            </label>
                        </div>
                        <div className="form-control mt-3">
                            <button className="btn btn-primary">Sign Up</button>
                        </div>
                    </form>
                    <div className="flex flex-col justify-center items-center gap-4 mt-0 pt-0">
                        <p className=" text-[#D1A054] font-semibold">Already registered? <Link to="/login">Go to log in</Link></p>
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

export default SignUpPage;