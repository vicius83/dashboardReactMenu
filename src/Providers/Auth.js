import { set } from "date-fns";
import React, {useEffect, useState} from "react";

export const AuthContext = React.createContext({});

export const AuthProvider = (props) => {
    const [user, setUser] = useState({
        id: null,
        nome:"",
        email:"",
        cadCompleto: false
    });
 
    useEffect(() => {
        const userStorage = sessionStorage.getItem("user");
        if(userStorage){
            setUser(JSON.parse(userStorage));
        }else{
            setUser({
                id: null,
                nome:"",
                email:"",
                cadCompleto: false
            })
        }    
    },[]);

    return (
        <AuthContext.Provider value={{user, setUser}}>
            {props.children}
        </AuthContext.Provider>
    )
};

export const useAuth = () => React.useContext(AuthContext);