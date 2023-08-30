import API from ".";
import { SetCookie } from "../Helpers/Cookie";

export const LoginAPI = async (data) => {
  const response = await API({
    path: '/login',
    method: 'POST',
    data,
  })

  var now = new Date();
  now.setSeconds(now.getSeconds() + response.expires_in); // timestamp
  now = new Date(now); // Date object

  // let [datas] = SetCookie('access_token',response.access_token,now)
  SetCookie('access_token',response.access_token,now);
  SetCookie('user',JSON.stringify(response.user),now)

  return response;
}