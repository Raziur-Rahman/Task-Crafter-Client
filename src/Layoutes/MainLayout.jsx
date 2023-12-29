import { Outlet } from "react-router-dom";
import Navber from "../Components/Home/Navber";
import Footer from "../Components/Home/Footer";


const MainLayout = () => {
    return (
        <div className='px-2 lg:max-w-screen-xl mx-auto'>
            <Navber></Navber>
            <Outlet></Outlet>
            <Footer></Footer>
        </div>
    );
};

export default MainLayout;