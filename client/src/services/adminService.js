import api from "./api";

export const getAllUsers =
  async (token) => {
    const response =
      await api.get(
        "/donors/all",
        {
          headers: {
            Authorization:
              `Bearer ${token}`,
          },
        }
      );

    return response.data;
  };

export const deleteUser =
  async (id, token) => {
    const response =
      await api.delete(
        `/donors/${id}`,
        {
          headers: {
            Authorization:
              `Bearer ${token}`,
          },
        }
      );

    return response.data;
  };