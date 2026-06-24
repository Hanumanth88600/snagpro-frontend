import api from "./axios";

export const getProfile =
async () => {

  const token =
    localStorage.getItem(
      "token"
    );

  const res =
    await api.get(
      "/accounts/profile/",
      {
        headers: {
          Authorization:
            `Bearer ${token}`
        }
      }
    );

  return res.data;

};

export const updateProfile =
async (data) => {

  const token =
    localStorage.getItem(
      "token"
    );

  const res =
    await api.put(
      "/accounts/profile/update/",
      data,
      {
        headers: {
          Authorization:
            `Bearer ${token}`
        }
      }
    );

  return res.data;

};

export const changePassword =
async (data) => {

  const token =
    localStorage.getItem(
      "token"
    );

  const res =
    await api.put(
      "/accounts/change-password/",
      data,
      {
        headers: {
          Authorization:
            `Bearer ${token}`
        }
      }
    );

  return res.data;

};