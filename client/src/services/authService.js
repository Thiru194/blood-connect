import api from "./api";

export const getCurrentUser =
  async (token) => {
    const response =
      await api.get(
        "/donors/profile",
        {
          headers: {
            Authorization:
              `Bearer ${token}`,
          },
        }
      );

    return response.data;
  };