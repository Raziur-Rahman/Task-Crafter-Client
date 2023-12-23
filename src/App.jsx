import PropTypes from 'prop-types';
import { Draggable } from 'react-beautiful-dnd';
import { FaEdit, FaTrash } from 'react-icons/fa';
import { Link } from 'react-router-dom';
import useAxiosSecure from './Hooks/useAxiosSecure';
import toast from 'react-hot-toast';

const App = ({ item, index, refetch }) => {

  const axiosSecure = useAxiosSecure();

  const handleDelete = async id => {
    const res = await axiosSecure.delete(`/tasks/${id}`)
    if (res?.data?.deletedCount) {
      toast.success("Delete Successful");
      refetch();
    }
  }

  const handleStatusChange = async (id, stat) => {
    const res = await axiosSecure.patch(`/tasks/${id}`, { status: stat })
    if (res?.data?.modifiedCount) {
      toast.success("Successfully Moved to Onging")
      refetch();
    }
  }

  return (
    <Draggable draggableId={item._id} index={index}>
      {(provided) => (
        <div className="bg-amber-500 collapse collapse-plus  my-3"
          {...provided.dragHandleProps}
          {...provided.draggableProps}
          ref={provided.innerRef}
        >
          <input type="radio" name="my-accordion-3" />
          <div className="collapse-title text-xl font-medium">
            {item?.name}
          </div>
          <div className="collapse-content">
            <p>{item?.description}</p>
            <h1 className='my-3'><span className='font-bold'>Task Priority:</span> {item?.priority}</h1>
            <div className="my-5 flex justify-center items-center space-x-3">
              {
                item?.status === "completed" ? <>
                  <button onClick={() => handleDelete(item._id)} className="btn btn-circle text-xl"> <FaTrash /> </button>
                </> : <>
                  <Link to={`/dashboard/updateTask/${item._id}`}><button title='Edit' className="btn btn-circle text-xl"> <FaEdit /> </button></Link>

                  <button
                    onClick={() => handleStatusChange(item?._id, `${item?.status === "todo" ? "ongoing" : "completed"}`)}
                    className="btn btn-outline">
                    {item?.status === "todo" ? "OnGoing" : "Complete"}
                  </button>

                  <button title='Delete' onClick={() => handleDelete(item._id)} className="btn btn-circle text-xl"> <FaTrash /> </button>
                </>
              }
            </div>
          </div>
        </div>
      )}
    </Draggable>
  );
};

export default App;

App.propTypes = {
  item: PropTypes.object,
  index: PropTypes.number,
  refetch: PropTypes.function
}
