import toast from "react-hot-toast";
import useAuth from "../Hooks/useAuth";
import Navber from "../Components/Home/Navber";
import Footer from "../Components/Home/Footer";


const HomePage = () => {

    const { user, UserGoogleLogin, UserLogOut } = useAuth();

    const handleGoogleLogin =() =>{
        UserGoogleLogin()
        .then(result =>{
            console.log(result.user);

        })
        .catch(error => {
            console.error(error);
        })
    }
    const handleLogOut = () => {
        UserLogOut()
            .then(() => {
                console.log("Logout SuccessFull...")
                toast.success("LogOut Successfull")
            })
            .catch((error) => {
                console.error(error)
            })
    }

    return (
        <div>
            <Navber></Navber>
            <button onClick={handleGoogleLogin} className="btn my-5 btn-outline">Google LogIn</button>
            <button onClick={handleLogOut} className="btn my-5 mx-10 btn-outline">Google Logout</button>
            <h1 className="text-6xl my-10">Hi This is home page: {user?.displayName} </h1>
            <Footer></Footer>

        </div>
    );
};

export default HomePage;