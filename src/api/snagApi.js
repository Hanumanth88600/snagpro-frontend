import api from "./axios";

export const getSnags = async () => {

  const token =
    localStorage.getItem("token");

  const res =
    await api.get(
      "/snags/list/",
      {
        headers: {
          Authorization:
            `Bearer ${token}`
        }
      }
    );

  return res.data;
};

export const createSnag =
async (formData) => {

  const token =
    localStorage.getItem(
      "token"
    );

  const res =
    await api.post(
      "/snags/create/",
      formData,
      {
        headers: {

          Authorization:
            `Bearer ${token}`,

          "Content-Type":
            "multipart/form-data"

        }
      }
    );

  return res.data;
};

export const updateSnag =
  async (id, data) => {

    const token =
      localStorage.getItem("token");

    const res =
      await api.put(
        `/snags/${id}/`,
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

export const deleteSnag =
  async (id) => {

    const token =
      localStorage.getItem("token");

    const res =
      await api.delete(
        `/snags/${id}/`,
        {
          headers: {
            Authorization:
              `Bearer ${token}`
          }
        }
      );

    return res.data;
};

export const assignContractor =
  async (
    snagId,
    contractorId
  ) => {

    const token =
      localStorage.getItem("token");

    const res =
      await api.post(
        `/snags/assign/${snagId}/`,
        {
          contractor_id:
            contractorId
        },
        {
          headers: {
            Authorization:
              `Bearer ${token}`
          }
        }
      );

    return res.data;
};

export const updateSnagStatus =
  async (
    snagId,
    status
  ) => {

    const token =
      localStorage.getItem(
        "token"
      );

    const res =
      await api.put(
        `/snags/contractor/update/${snagId}/`,
        {
          status
        },
        {
          headers: {
            Authorization:
              `Bearer ${token}`
          }
        }
      );

    return res.data;
};

export const getAssignedSnags =
  async () => {

    const token =
      localStorage.getItem(
        "token"
      );

    const res =
      await api.get(
        "/snags/contractor/snags/",
        {
          headers: {
            Authorization:
              `Bearer ${token}`
          }
        }
      );

    return res.data;
};

export const getClientSnags =
async () => {

  const token =
    localStorage.getItem(
      "token"
    );

  const res =
    await api.get(
      "/snags/client/snags/",
      {
        headers: {
          Authorization:
            `Bearer ${token}`
        }
      }
    );

  return res.data;

};