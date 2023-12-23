import { useForm } from "react-hook-form";
import Swal from "sweetalert2";
import { useNavigate, useParams } from "react-router-dom";
import useAxiosSecure from "../../Hooks/useAxiosSecure";
import useAuth from "../../Hooks/useAuth";
import { useQuery } from "@tanstack/react-query";

const UpdateTask = () => {

    const { register, handleSubmit } = useForm();
    const { user } = useAuth();
    const axiosSecure = useAxiosSecure();
    const navigate = useNavigate();
    const params = useParams();

    const { data = {} } = useQuery({
        queryKey: ["Update-Data", params?.id],
        queryFn: async () => {
            const res = await axiosSecure.get(`/tasks/${params.id}`);
            console.log(res.data)
            return res.data
        }
    })

    const onSubmit = async (taskDetails) => {


        const task = { ...taskDetails, userEmail: user?.email, status: data?.status }

        const updateRes = await axiosSecure.patch(`/tasks/${params.id}`, task);
        if (updateRes?.data?.modifiedCount) {
            Swal.fire({
                title: "Success",
                text: "Your Task has Been Added",
                icon: "success"
            });
            navigate(`/dashboard/taskmanager`);

        }
        console.log(updateRes.data);

    }

    return (
        <div className="px-5 md:w-4/5 mx-auto min-h-screen pt-28">
            <div className="bg-base-300 p-10 rounded-xl">
                <form className="grid grid-cols-1 md:grid-cols-2 gap-5" onSubmit={handleSubmit(onSubmit)}>
                    <div className="form-control w-full md:col-span-2 ">
                        <label className="label">
                            <span className="label-text">Task Title*</span>
                        </label>
                        <input type="text"
                            placeholder="Title"
                            defaultValue={data?.name}
                            {...register("name", { required: true })}
                            className="input input-bordered w-full " />
                    </div>
                    <div className="form-control">
                        <label className="label">
                            <span className="label-text">Select Task Priority*</span>
                        </label>
                        <select
                            defaultValue={data?.priority}
                            {...register("priority", { required: true })}
                            className="select select-bordered w-full">
                            <option disabled value={0} selected>Select A Category</option>
                            <option value="high">High</option>
                            <option value="moderate">Modarate</option>
                            <option value="low">Low</option>
                        </select>
                    </div>
                    <div className="form-control w-full ">
                        <label className="label">
                            <span className="label-text">DeadLines*</span>
                        </label>
                        <input type="date"
                            placeholder="DeadLines"
                            defaultValue={data?.deadlines}
                            {...register("deadlines", { required: true })}
                            className="input input-bordered w-full " />
                    </div>
                    <div className="form-control md:col-span-2">
                        <label className="label">
                            <span className="label-text">Task Description*</span>
                        </label>
                        <textarea defaultValue={data?.description} {...register("description")} className="textarea textarea-bordered h-24 " placeholder="Task Descriptiom"></textarea>
                    </div>
                    <button type="submit" className="btn btn-success text-white w-fit"> Update Task</button>

                </form>

            </div>
        </div>
    );
};

export default UpdateTask;