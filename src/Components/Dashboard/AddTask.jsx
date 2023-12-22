import { useForm } from "react-hook-form";
import Swal from "sweetalert2";
import { useNavigate } from "react-router-dom";
import useAxiosSecure from "../../Hooks/useAxiosSecure";
import useAuth from "../../Hooks/useAuth";

const AddTask = () => {

    const { register, handleSubmit } = useForm();
    const { user } = useAuth();

    const axiosSecure = useAxiosSecure();
    const navigate = useNavigate();

    const onSubmit = async (taskDetails) => {


        const task = { ...taskDetails, userEmail: user?.email, status: "todo" }
        console.log(task)

        const postRes = await axiosSecure.post('/tasks', task);
        if (postRes?.data?.insertedId) {
            Swal.fire({
                title: "Success",
                text: "Your Task has Been Added",
                icon: "success"
            });
            navigate(`/dashboard/taskmanager`);

        }
        console.log(postRes.data);

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
                            {...register("name", { required: true })}
                            className="input input-bordered w-full " />
                    </div>
                    <div className="form-control">
                        <label className="label">
                            <span className="label-text">Select Task Priority*</span>
                        </label>
                        <select defaultValue={0} {...register("priority", { required: true })} className="select select-bordered w-full">
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
                            {...register("deadlines", { required: true })}
                            className="input input-bordered w-full " />
                    </div>
                    <div className="form-control md:col-span-2">
                        <label className="label">
                            <span className="label-text">Task Description*</span>
                        </label>
                        <textarea {...register("description", { required: true })} className="textarea textarea-bordered h-24 " placeholder="Task Descriptiom"></textarea>
                    </div>
                    <button type="submit" className="btn btn-success text-white w-fit"> Add Task</button>

                </form>

            </div>
        </div>
    );
};

export default AddTask;