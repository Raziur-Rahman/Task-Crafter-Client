import useAuth from "../Hooks/useAuth";


const HomePage = () => {

    const { user, UserGoogleLogin, UserLogOut } = useAuth();

    const handleGoogleLogin =() =>{
        UserGoogleLogin()
        .then(result =>{
            console.log(result.user);

        })
        .catch(error => {
            console.error(error);
        })
    }
    const handleLogOut = () => {
        UserLogOut()
            .then(() => {
                console.log("Logout SuccessFull...")
            })
            .catch((error) => {
                console.error(error)
            })
    }

    return (
        <div>
            <button onClick={handleGoogleLogin} className="btn btn-outline">Google LogIn</button>
            <button onClick={handleLogOut} className="btn btn-outline">Google Logout</button>
            <h1 className="text-6xl">Hi This is home page: {user?.displayName} </h1>

        </div>
    );
};

export default HomePage;