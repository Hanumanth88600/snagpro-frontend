import api from "./axios";

export const getProjects = async () => {

  const token =
    localStorage.getItem(
      "token"
    );

  const res =
    await api.get(
      "/projects/",
      {
        headers: {
          Authorization:
            `Bearer ${token}`
        }
      }
    );

  return res.data;
};

export const createProject =
  async (data) => {

    const token =
      localStorage.getItem(
        "token"
      );

    const res =
      await api.post(
        "/projects/create/",
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

export const updateProject =
  async (id, data) => {

    const token =
      localStorage.getItem(
        "token"
      );

    const res =
      await api.put(
        `/projects/${id}/`,
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

export const deleteProject =
  async (id) => {

    const token =
      localStorage.getItem(
        "token"
      );

    const res =
      await api.delete(
        `/projects/${id}/`,
        {
          headers: {
            Authorization:
              `Bearer ${token}`
          }
        }
      );

    return res.data;
};

export const getClientProjects =
async () => {

  const token =
    localStorage.getItem(
      "token"
    );

  const res =
    await api.get(
      "/projects/client/projects/",
      {
        headers: {
          Authorization:
            `Bearer ${token}`
        }
      }
    );

  return res.data;

};

export const getClientProjectDetails =
async () => {

  const token =
    localStorage.getItem(
      "token"
    );

  const res =
    await api.get(
      "/projects/client/details/",
      {
        headers: {
          Authorization:
            `Bearer ${token}`
        }
      }
    );

  return res.data;

};