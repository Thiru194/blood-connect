import api from "./api";

export const createRequest =
  async (
    requestData,
    token
  ) => {
    const response =
      await api.post(
        "/requests",
        requestData,
        {
          headers: {
            Authorization:
              `Bearer ${token}`,
          },
        }
      );

    return response.data;
  };

export const getRequests =
  async () => {
    const response =
      await api.get(
        "/requests"
      );

    return response.data;
  };

export const getMyRequests =
  async (token) => {
    const response =
      await api.get(
        "/requests/my",
        {
          headers: {
            Authorization:
              `Bearer ${token}`,
          },
        }
      );

    return response.data;
  };

export const getRequestById =
  async (id, token) => {
    const response =
      await api.get(
        `/requests/${id}`,
        {
          headers: {
            Authorization:
              `Bearer ${token}`,
          },
        }
      );

    return response.data;
  };