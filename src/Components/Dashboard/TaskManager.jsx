import { useQuery } from "@tanstack/react-query";
import useAxiosSecure from "../../Hooks/useAxiosSecure";
import { Link } from "react-router-dom";
import { DragDropContext, Droppable } from "react-beautiful-dnd";


const TaskManager = () => {

    const axiosSecure = useAxiosSecure();

    const { data = [] } = useQuery({
        queryKey: ["Task-data"],
        queryFn: async () => {
            const res = await axiosSecure.get(`/tasks`);
            console.log(res.data)
            return res.data;
        }
    })

    return (
        <div>
            <div className="flex flex-col justify-center items-center gap-6 my-10">
                <h1 className="text-3xl text-amber-500 font-bold">Manage your tasks here</h1>
                <Link to='/dashboard/createtask'><button className="btn btn-success">Create Task</button></Link>
            </div>
            <DragDropContext>
                <section className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-5 px-5">
                    <Droppable droppableId="todoList">
                        {()=>(
                            <div className="grid grid-cols-1 bg-base-300 rounded-xl shadow-xl p-5">
                                <h1 className="text-3xl font-bold text-center">Todo List</h1>
                                {
                                    data.map(item => <div key={item._id}>
                                        <h1 className="text-xl px-10 py-10 bg-amber-500 my-5">{item.name}</h1>
                                    </div>)
                                }
                            </div>
                        )}
                    </Droppable>
                    <Droppable droppableId="todoList">
                    
                        {()=>(
                            <div className="grid grid-cols-1 bg-base-300 rounded-xl shadow-xl p-5">
                                <h1 className="text-3xl font-bold text-center">On-going Task</h1>
                                {/* {
                                    data.map(item => <div key={item._id}>
                                        <h1 className="text-xl px-10 py-10 bg-amber-500 my-5">{item.name}</h1>
                                    </div>)
                                } */}
                            </div>
                        )}
                    </Droppable>
                    <Droppable droppableId="todoList">
                        {()=>(
                            <div className="grid grid-cols-1 bg-base-300 rounded-xl shadow-x p-5">
                                <h1 className="text-3xl font-bold text-center">Completed Task</h1>
                                {/* {
                                    data.map(item => <div key={item._id}>
                                        <h1 className="text-xl px-10 py-10 bg-amber-500 my-5">{item.name}</h1>
                                    </div>)
                                } */}
                            </div>
                        )}
                    </Droppable>

                </section>
            </DragDropContext>

        </div>
    );
};

export default TaskManager;