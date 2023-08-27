import API from ".";

export const LoginAPI = async (data) => {
  const response = await API({
    path: '/login',
    method: 'POST',
    data,
  })

  var now = new Date();
  now.setSeconds(now.getSeconds() + response.expires_in); // timestamp
  now = new Date(now); // Date object
  document.cookie = `access_token=${response.access_token};expires=${now} GMT;path=/;`;
  document.cookie = `user=${JSON.stringify(response.user)};expires=${now} GMT;path=/;`;


  return response;
}