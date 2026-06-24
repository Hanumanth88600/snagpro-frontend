import api from "./axios";

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

export const getClients =
async () => {

  const token =
    localStorage.getItem(
      "token"
    );

  const res =
    await api.get(
      "/accounts/clients/",
      {
        headers: {
          Authorization:
            `Bearer ${token}`
        }
      }
    );

  return res.data;
};