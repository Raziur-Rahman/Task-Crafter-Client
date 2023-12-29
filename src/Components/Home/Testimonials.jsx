import { useQuery } from "@tanstack/react-query";
import useAxiosPublic from "../../Hooks/useAxiosPublic";
import { Swiper, SwiperSlide } from 'swiper/react';

// Import Swiper styles
import 'swiper/css';
import 'swiper/css/navigation';

// import required modules
import { Navigation } from 'swiper/modules';
import { Rating } from '@smastrom/react-rating'

import '@smastrom/react-rating/style.css'
import moment from "moment";


const Testimonials = () => {

    const axiosPublic = useAxiosPublic();

    const { data: reviews = [] } = useQuery({
        queryKey: ["REviews"],
        queryFn: async () => {
            const res = await axiosPublic.get('/reviews')
            console.log(res.data);
            return res.data;
        }
    })

    return (
        <section className="lg:mx-24 lg:mb-10">
            <h1 className="text-3xl text-amber-500 text-center font-semibold my-5">{`What Our User Say's`} </h1>
            <Swiper navigation={true} modules={[Navigation]} className="mySwiper">
                {
                    reviews?.map(item => <SwiperSlide key={item._id}>
                        <div className="w-2/3 mx-auto flex flex-col justify-center items-center gap-6 text-center my-10">

                            <div className="flex justify-between space-x-4 lg:w-4/5 px-3 py-2">
                                <div className="flex flex-row text-left">
                                    <img alt="" src="https://i.ibb.co/g6Q0Fy9/random-img.png" className="object-cover w-20 h-20 rounded-full mr-2 shadow dark:bg-gray-500" />
                                    <a rel="noopener noreferrer" href="#" className="text-2xl font-semibold">{item?.name} <br /> <span className=" text-sm dark:text-gray-400">{item?.designation}</span>
                                     </a>
                                    {/* <span className=" dark:text-gray-400">{item?.companyName}</span> */}
                                </div>
                                <div className="flex flex-col space-y-1 text-right">
                                    <a rel="noopener noreferrer" href="#" className="text-2xl font-semibold">{item?.companyName}</a>
                                    <span className="text-lg dark:text-gray-400">{moment(item?.timestamp).fromNow()}</span>
                                </div>
                            </div>

                            <Rating style={{ maxWidth: 180 }} value={item?.rating} readOnly />

                            <p>{item?.comment}</p>
                        </div>
                    </SwiperSlide>)
                }
            </Swiper>



        </section>
    );
};

export default Testimonials;