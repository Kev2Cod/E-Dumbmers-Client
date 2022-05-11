import { Outlet, Navigate } from "react-router-dom"
import { useContext } from "react"
import { UserContext } from "../context/userContext"


const PrivateRoute = () => {

    const [state, dispacth] = useContext(UserContext)
    console.log("ini di Private",state)


    let isLogin = state.isLogin

    return(
        isLogin ?<Outlet/> : <Navigate to="/auth"/>  
    )

}

export default PrivateRoute