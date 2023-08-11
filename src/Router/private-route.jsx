import { Navigate, Outlet } from "react-router-dom";

const PrivateRoute = () => {

  const user = localStorage.getItem('access_token');

  if (user) {
    return <Outlet />
  }

  return <Navigate to='/login' replace={true} />
}

export default PrivateRoute