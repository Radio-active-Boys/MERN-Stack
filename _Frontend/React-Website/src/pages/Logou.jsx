import { useEffect } from "react";
import { Navigate } from "react-router-dom";
import { useAuth } from '../contextAPI/Auth';

const Logout = () => {
    const { LogoutUser } = useAuth();

    useEffect(() => {
        LogoutUser(); // Call LogoutUser immediately
       
    }, [LogoutUser]);

    return <Navigate to="/login" />;
};

export default Logout;
