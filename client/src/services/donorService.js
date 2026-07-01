import api from "./api";

export const searchDonors = async (
  bloodGroup,
  city
) => {
  const response = await api.get(
    "/donors/search",
    {
      params: {
        bloodGroup,
        city,
      },
    }
  );

  return response.data;
};

export const getDonorById = async (id, token) => {
  const response = await api.get(`/donors/${id}`, {
    headers: {
      Authorization: `Bearer ${token}`,
    },
  });

  return response.data;
};

export const applyDonor = async (
  donorData,
  token
) => {
  const response = await api.post(
    "/donors/apply",
    donorData,
    {
      headers: {
        Authorization: `Bearer ${token}`,
      },
    }
  );

  return response.data;
};