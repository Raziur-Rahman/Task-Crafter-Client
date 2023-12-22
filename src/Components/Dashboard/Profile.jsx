import useAuth from "../../Hooks/useAuth";


const Profile = () => {

    const { user } = useAuth();

    return (
        <div className="flex justify-center items-center min-h-screen">
            <section className="flex flex-col justify-center items-center md:flex-row">
                <div className="w-96 h-96 flex flex-col justify-center items-center bg-gradient-to-r from-amber-600 to-blue-500 rounded-2xl shadow-xl">
                    <img className="w-2/3 rounded-full" src={user?.photoURL} alt="" />
                </div>
                <hr className="p-[2px]" />
                <div className="w-96 rounded-2xl shadow-xl text-white h-96 space-y-10 bg-gradient-to-r from-purple-500 to-pink-500 p-8">
                    <h1 className="text-2xl"><span className="font-bold">Name:</span> {user?.displayName}</h1>
                    <h2 className="text-lg"><span className="font-bold">Email:</span> {user?.email}</h2>
                    {
                        user?.email && <h2><span className="text-xl font-bold">Status: </span> Verified</h2>
                    }
                </div>

            </section>
        </div>
    );
};

export default Profile;