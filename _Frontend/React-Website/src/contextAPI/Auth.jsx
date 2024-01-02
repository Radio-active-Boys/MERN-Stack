import { createContext, useContext, useEffect, useState } from "react";  
import { NavLink } from "react-router-dom"; 

export const AuthContext = createContext();

export const AuthProvider = ({children}) => {

    const [token,setToken] = useState(localStorage.getItem("token"));
    const [userDataLogged,setUser] = useState("");
    console.log("token from local storage ",token);

    const storeTokenInLS = (serverToken) => {
        setToken(serverToken);
        return localStorage.setItem('token',serverToken);
    };

    let isLoggedIn = !!token;
    console.log("isLoggedIn check ",isLoggedIn);


    // tackling the logout functionality
    const LogoutUser = async () => {
        try {
            // Set the token to an empty string
            setToken(""); 
            
            // Remove the token from local storage
            localStorage.removeItem("token");
              
    
            console.log("Token removed from local storage");
        } catch (error) {
            console.error("Error during logout:", error);
        }
    };
    
    // JWT Authentication -to get currenly logged user data

    const userAuthentication = async() => {
        try {
            console.log("try to connect with server user route");
            const response = await fetch("https://mern-backend-avo4.onrender.com/mern/main/user",{
                method:"GET",
                headers: {
                    Authorization:`Bearer ${token}`,
                },

            });
            if(response.ok){
                const data = await response.json();
                setUser(data.userData);
                console.log("data from server in client ",data);
            }

        } catch (error) {
            console.error(" Erroe in fethcing user data")
        }
    }
    useEffect(() => {
        userAuthentication();
    },[])


return <AuthContext.Provider value ={{isLoggedIn, storeTokenInLS , LogoutUser,userDataLogged }}>
        {children}
    </AuthContext.Provider>

}

export const useAuth = () => {
    const authContextValue = useContext(AuthContext);
    if(!authContextValue){
        throw new Error("useAuth user outside of the Provider");
    }
    return authContextValue ;
}