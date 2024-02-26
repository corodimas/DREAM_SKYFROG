import React from 'react'
import { Navigate, Outlet } from 'react-router-dom'

const PrivateRoute = ({authen}) => {
    return (
        authen === true ?
            <Outlet />
            :
            <Navigate to= {"/"} />
    )
}
export default PrivateRoute
