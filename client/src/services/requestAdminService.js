import api from "./api";

export const getAllRequests =
  async (token) => {
    const response =
      await api.get(
        "/requests/all",
        {
          headers: {
            Authorization:
              `Bearer ${token}`,
          },
        }
      );

    return response.data;
  };

export const deleteRequest =
  async (
    id,
    token
  ) => {
    const response =
      await api.delete(
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

export const updateStatus =
  async (
    id,
    status,
    token
  ) => {
    const response =
      await api.put(
        `/requests/${id}/status`,
        { status },
        {
          headers: {
            Authorization:
              `Bearer ${token}`,
          },
        }
      );

    return response.data;
  };