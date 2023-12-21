import { Outlet } from "react-router-dom";


const MainLayout = () => {
    return (
        <div className='lg:max-w-screen-xl mx-auto'>
            <Outlet></Outlet>
        </div>
    );
};

export default MainLayout;