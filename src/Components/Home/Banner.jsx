import { Link } from "react-router-dom";
import AOS from 'aos';
import { useEffect } from "react";

const Banner = () => {

    useEffect(()=>{
        AOS.init();
    },[])

    return ( 
        <div data-aos="flip-up" data-aos-duration="1000" className="hero min-h-[90vh] " style={{ backgroundImage: 'url(https://i.ibb.co/gjJcvLR/time-management-banner.gif)' }}>
            <div className="hero-overlay bg-opacity-30"></div>
            <div className="hero-content text-center text-neutral-content">
                <div className="max-w-2xl text-gray-700">
                    <h1 className="mb-5 text-5xl font-bold">Hello there</h1>
                    <p className="mb-5 font-semibold">{`At Task Crafter, we believe in the power of efficient task management to transform the way you work. Whether you're a seasoned professional or just getting started, our platform is designed with you in mind. Dive into a world of seamless collaboration, streamlined workflows, and a calm, focused approach to getting things done.`}</p>
                    <Link to='/dashboard/taskmanager'><button className="btn btn-primary">{`Let's Explore`}</button></Link>
                </div>
            </div>
        </div>
    );
};

export default Banner;