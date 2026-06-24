import api from "./axios";

export const createStaff = async (data) => {

  const token =
    localStorage.getItem(
      "token"
    );

  const res =
    await api.post(

      "/accounts/create-staff/",

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