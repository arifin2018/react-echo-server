import API from ".";

export const login = async (data) => {
  const response = await API({
    method: 'POST',
    data,
  })

  return response;
}