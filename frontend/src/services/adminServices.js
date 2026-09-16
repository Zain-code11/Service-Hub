import api from "./api";

export const getAllServices = async () => {
  const response = await api.get("/services");
  return response.data;
};

export const deleteService = async (id) => {
  const response = await api.delete(`/services/${id}`);
  return response.data;
};