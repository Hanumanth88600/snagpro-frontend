import api from "./axios";

export const getAssignments =
  async () => {

    const token =
      localStorage.getItem(
        "token"
      );

    const res =
      await api.get(
        "/projects/assignments/",
        {
          headers: {
            Authorization:
              `Bearer ${token}`
          }
        }
      );

    return res.data;
};

export const assignStaff =
  async (data) => {

    const token =
      localStorage.getItem(
        "token"
      );

    const res =
      await api.post(
        "/projects/assign/",
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

export const deleteAssignment =
  async (id) => {

    const token =
      localStorage.getItem(
        "token"
      );

    const res =
      await api.delete(
        `/projects/assignments/${id}/`,
        {
          headers: {
            Authorization:
              `Bearer ${token}`
          }
        }
      );

    return res.data;
};