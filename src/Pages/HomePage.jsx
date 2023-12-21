
import useAuth from "../Hooks/useAuth";
import Navber from "../Components/Home/Navber";
import Footer from "../Components/Home/Footer";
import Banner from "../Components/Home/Banner";


const HomePage = () => {

    const { user }  = useAuth();

    return (
        <div>
            <Navber></Navber>
            <Banner />
            <h1 className="text-6xl my-10">Hi This is home page: {user?.displayName} </h1>
            <Footer></Footer>

        </div>
    );
};

export default HomePage;