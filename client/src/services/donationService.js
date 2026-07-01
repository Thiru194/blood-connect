import api from "./api";

export const createDonation = async (
  donationData,
  token
) => {
  const response = await api.post(
    "/donations",
    donationData,
    {
      headers: {
        Authorization:
          `Bearer ${token}`,
      },
    }
  );

  return response.data;
};

export const getMyDonations = async (token) => {
  const response = await api.get("/donations/my", {
    headers: {
      Authorization: `Bearer ${token}`,
    },
  });

  return response.data;
};

export const getAllDonations = async (token) => {
  const response = await api.get("/donations", {
    headers: {
      Authorization: `Bearer ${token}`,
    },
  });

  return response.data;
};

export const deleteDonation = async (id, token) => {
  const response = await api.delete(`/donations/${id}`, {
    headers: {
      Authorization: `Bearer ${token}`,
    },
  });

  return response.data;
};