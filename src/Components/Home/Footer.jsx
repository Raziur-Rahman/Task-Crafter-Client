import AOS from 'aos';
import { useEffect } from "react";
import { FaLinkedin, FaSquareFacebook, FaSquareGithub } from 'react-icons/fa6';


const Footer = () => {

    useEffect(() => {
        AOS.init()
    }, [])

    return (
        <div data-aos="zoom-in-up" data-aos-duration="500">
            <section className="footer p-10 bg-base-300 text-base-content">
                <nav data-aos="fade-right" data-aos-duration="1000">
                    <header className="footer-title">Services</header>
                    <a className="link link-hover">Task Creation</a>
                    <a className="link link-hover">Task Tracking</a>
                    <a className="link link-hover">Progress Report</a>
                    <a className="link link-hover">Priority Management</a>
                </nav>
                <nav data-aos="fade-up" data-aos-duration="1000">
                    <header className="footer-title">Company</header>
                    <a className="link link-hover">About us</a>
                    <a className="link link-hover">Contact</a>
                    <a className="link link-hover">Jobs</a>
                    <a className="link link-hover">Press kit</a>
                </nav>
                <form data-aos="fade-left" data-aos-duration="1000">
                    <header className="footer-title">Newsletter</header>
                    <fieldset className="form-control w-80">
                        <label className="label">
                            <span className="label-text">Enter your email address</span>
                        </label>
                        <div className="join">
                            <input type="text" placeholder="username@site.com" className="input input-bordered join-item" />
                            <button className="btn btn-primary join-item">Subscribe</button>
                        </div>
                    </fieldset>
                </form>
            </section>
            <section data-aos="zoom-in-up" data-aos-duration="500" className="footer px-10 py-4 border-t font-semibold bg-base-300 text-base-content border-base-300">
                <aside  className="items-center grid-flow-col">
                    <img className='w-[50px]' src="https://i.ibb.co/ryVnX3X/task-icon-2.png" alt="" />
                    <p>Task Crafter <br />Providing task management services since 2023</p>
                </aside>
                <nav  className="md:place-self-center md:justify-self-end">
                    <div className="grid grid-flow-col gap-4">
                        <a href='https://github.com/Raziur-Rahman/Task-Crafter-Client' target='blank'><button className='text-3xl'><FaSquareGithub></FaSquareGithub></button></a>
                        <a href='https://www.facebook.com/rajiurrahman.raju.1' target='blank'><button className='text-3xl'><FaSquareFacebook /></button></a>
                        <a href='www.linkedin.com/in/md-raziur-rahman-61602a1b3' target='blank'><button className='text-3xl'><FaLinkedin /></button></a>
                    </div>
                </nav>
            </section>
            {/* data-aos="zoom-in" data-aos-duration="1000" */}
            <section className="footer footer-center p-4 bg-base-300 text-base-content">
                <aside >
                    <p>Copyright © 2023 - All right reserved by Task Crafter Ltd</p>
                </aside>
            </section>

        </div>
    );
};

export default Footer;