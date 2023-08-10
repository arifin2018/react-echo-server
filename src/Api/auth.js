import API from ".";

export const login = async (data) => {
  const response = await API({
    path: '/auth/create-user',
    method: 'POST',
    data,
  })

  return response;
}