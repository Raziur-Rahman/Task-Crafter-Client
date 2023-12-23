import { useQuery } from "@tanstack/react-query";
import useAxiosSecure from "../../Hooks/useAxiosSecure";
import { Link } from "react-router-dom";
import { DragDropContext, Droppable } from "react-beautiful-dnd";
import { useState } from "react";
import App from "../../App";
import toast from "react-hot-toast";


const TaskManager = () => {
    const axiosSecure = useAxiosSecure();

    const [todoData, setTodoData] = useState([]);
    const [OngoingData, setOngoingData] = useState([]);
    const [CompletedData, setCompletedData] = useState([]);


    const { data = [], refetch } = useQuery({
        queryKey: ["Task-data"],
        queryFn: async () => {
            const res = await axiosSecure.get(`/tasks`);
            const loadedData = res.data;
            console.log(loadedData)

            // Filter todo Data
            const todo = loadedData.filter(item => item.status === "todo");
            setTodoData(todo);

            // filter On Going Data
            const ongoing = loadedData.filter(item => item.status === "ongoing");
            setOngoingData(ongoing)

            // Filter Completed Data
            const completed = loadedData.filter(item => item.status === "completed");
            setCompletedData(completed)
            return res.data;
        }
    })

    const handleDragDrop = async (result) => {

        const { draggableId, source, destination } = result;
        let add, todo = todoData, on_going = OngoingData, complete = CompletedData;

        // Base Condition's
        if (!destination) {
            return;
        }

        if (destination.droppableId === source.droppableId && destination.index === source.index) {
            return;
        }

        // If Base Condition Pass
        // Removing Item From Data List
        if (source.droppableId === "todoList") {
            add = todo[source.index]
            todo.splice(source.index, 1)
        }
        else if (source.droppableId === "ongoingList") {
            add = on_going[source.index]
            on_going.splice(source.index, 1)
        }
        else {
            add = complete[source.index]
            complete.splice(source.index, 1)
        }

        // Insert Item into DataList
        if (destination.droppableId === "todoList") {
            todo.splice(destination.index, 0, add)
            const res = await axiosSecure.patch(`/tasks/${draggableId}`, { status: "todo" })
            if (res?.data?.modifiedCount) {
                toast.success("Successfully Moved to Todo List")
                refetch()
            }
        }
        else if (destination.droppableId === "ongoingList") {
            on_going.splice(destination.index, 0, add)
            const res = await axiosSecure.patch(`/tasks/${draggableId}`, { status: "ongoing" })
            if (res?.data?.modifiedCount) {
                toast.success("Successfully Moved to Onging")
                refetch();
            }

        }
        else {
            complete.splice(destination.index, 0, add)
            const res = await axiosSecure.patch(`/tasks/${draggableId}`, { status: "completed" })
            if (res?.data?.modifiedCount) {
                toast.success("Successfully Moved to Completed List")
                refetch();
            }
            // console.log(complete)
        }

        // Set Item After Edit
        setTodoData(todo);
        setOngoingData(on_going);
        setCompletedData(complete);
    }

    return (
        <div>
            <div className="flex flex-col justify-center items-center gap-6 my-10">
                <h1 className="text-3xl text-amber-500 font-bold">Manage your tasks here{`:${data.length}`}</h1>
                <Link to='/dashboard/createtask'><button className="btn btn-success">Create Task</button></Link>
            </div>
            <section className="grid grid-cols-1 lg:grid-cols-3 gap-5 px-5">
                <DragDropContext onDragEnd={handleDragDrop}>

                    {/* To do List */}
                    <Droppable droppableId="todoList">
                        {(provided) => (
                            <div
                                {...provided.droppableProps}
                                ref={provided.innerRef}
                                className="grid grid-cols-1 bg-base-300 rounded-xl shadow-xl p-5 h-fit">

                                <h1 className="text-3xl font-bold text-center">Todo List</h1>

                                {
                                    todoData.map((item, index) => (
                                        <App key={item._id} item={item} index={index} refetch={refetch}></App>
                                    ))
                                }
                                {
                                    provided.placeholder
                                }
                            </div>
                        )}
                    </Droppable>

                    {/* On-Going List */}
                    <Droppable droppableId="ongoingList">
                        {(provided) => (
                            <div
                                {...provided.droppableProps}
                                ref={provided.innerRef}
                                className="grid grid-cols-1 bg-base-300 rounded-xl shadow-xl p-5 h-fit">

                                <h1 className="text-3xl font-bold text-center">On-Going List</h1>

                                {
                                    OngoingData.length > 0 && OngoingData.map((item, index) => (
                                        <App key={item._id} item={item} index={index} refetch={refetch} ></App>
                                    ))
                                }
                                {
                                    provided.placeholder
                                }
                            </div>
                        )}
                    </Droppable>

                    {/* ComPleted List */}
                    <Droppable droppableId="completedList">
                        {(provided) => (
                            <div
                                {...provided.droppableProps}
                                ref={provided.innerRef}
                                className="grid grid-cols-1 bg-base-300 rounded-xl shadow-xl p-5 h-fit">

                                <h1 className="text-3xl font-bold text-center">Completed List</h1>

                                {
                                    CompletedData.length > 0 && CompletedData.map((item, index) => (
                                        <App key={item._id} item={item} index={index} refetch={refetch} ></App>
                                    ))
                                }
                                {
                                    provided.placeholder
                                }
                            </div>
                        )}
                    </Droppable>
                </DragDropContext>
            </section>
        </div>
    );
};

export default TaskManager;