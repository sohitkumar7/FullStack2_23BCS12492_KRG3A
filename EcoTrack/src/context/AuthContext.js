import { Children, createContext,useContext, useState } from "react";

const AuthContext = createContext(null);

export const AuthProvider = ({Children}) => {
    const [isAuthenticated , setIsAuthenticated] = useState(false);

    return(
        <AuthContext.Provider value ={{isAuthenticated,setIsAuthenticated}}  >{Children} </AuthContext.Provider>
    )

}

export const useAuth = () => useContext(AuthContext);