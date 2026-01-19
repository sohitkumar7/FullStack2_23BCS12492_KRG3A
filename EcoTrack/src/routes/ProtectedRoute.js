import {Navigate, useNavigate } from "react-router-dom"
import {useAuth} from "../context/AuthContext.js"
 
const ProctedRoute = ({Childrenontext}) => {
    const {isAuthenticated} = useAuth;

    if(!isAuthenticated){
        return <Navigate to = "/login" replace> </Navigate>;
    }

    return Children;
}

export default ProctedRoute;
