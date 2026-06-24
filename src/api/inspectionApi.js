import api from "./axios";

export const getInspections = async () => {

  const token =
    localStorage.getItem("token");

  const res =
    await api.get(
      "/snags/inspections/",
      {
        headers: {
          Authorization:
            `Bearer ${token}`
        }
      }
    );

  return res.data;
};

export const createInspection =
  async (data) => {

    const token =
      localStorage.getItem("token");

    const res =
      await api.post(
        "/snags/inspection/create/",
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

export const updateInspection =
  async (id, data) => {

    const token =
      localStorage.getItem("token");

    const res =
      await api.put(
        `/snags/inspections/${id}/`,
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

export const deleteInspection =
  async (id) => {

    const token =
      localStorage.getItem("token");

    const res =
      await api.delete(
        `/snags/inspections/${id}/`,
        {
          headers: {
            Authorization:
              `Bearer ${token}`
          }
        }
      );

    return res.data;
};

export const getClientInspections =
async () => {

  const token =
    localStorage.getItem(
      "token"
    );

  const res =
    await api.get(
      "/snags/client/inspections/",
      {
        headers: {
          Authorization:
            `Bearer ${token}`
        }
      }
    );

  return res.data;

};