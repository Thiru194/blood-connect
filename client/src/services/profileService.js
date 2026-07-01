import api from "./api";

export const getProfile = async (
  token
) => {
  const response = await api.get(
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

export const updateProfile =
  async (
    profileData,
    token
  ) => {
    const response =
      await api.put(
        "/donors/profile",
        profileData,
        {
          headers: {
            Authorization:
              `Bearer ${token}`,
          },
        }
      );

    return response.data;
  };