import api from "./axios";

export const updateStaff =
  async (id, data) => {

    const token =
      localStorage.getItem(
        "token"
      );

    const res =
      await api.put(

        `/accounts/staff/${id}/`,

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