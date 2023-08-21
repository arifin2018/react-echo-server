import { Navigate, Outlet } from "react-router-dom";
import { getCookie } from "../Helpers/Cookie";

const PrivateRoute = () => {
  const user = getCookie('access_token');

  if (user) {
    return <Outlet />
  }else{
    return <Navigate to='/login' replace={true} />
  }

}

export default PrivateRoute