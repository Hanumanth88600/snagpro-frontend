import api from "./axios";

export const deleteStaff =
  async (id) => {

    const token =
      localStorage.getItem(
        "token"
      );

    const res =
      await api.delete(

        `/accounts/staff/${id}/`,

        {

          headers: {

            Authorization:
              `Bearer ${token}`

          }

        }

      );

    return res.data;

  };