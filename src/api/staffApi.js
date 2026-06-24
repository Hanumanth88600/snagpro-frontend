import api from "./axios";

export const getStaff =
  async () => {

    const token =
      localStorage.getItem(
        "token"
      );

    const res =
      await api.get(
        "/accounts/staff/",
        {
          headers: {
            Authorization:
              `Bearer ${token}`,
          },
        }
      );

    return res.data;
  };