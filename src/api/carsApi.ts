import axios from "axios";

const API_URL = "https://mock-cars-api-39814baaf6c0.herokuapp.com";

export const getCars = async (
  search?: string,
  carType?: string,
  tags?: string,
  sortBy?: string,
  sortOrder?: "ASC" | "DESC"
) => {
  const params = new URLSearchParams();
  if (search) params.append("search", search);
  if (carType) params.append("carType", carType);
  if (tags) params.append("tags", tags);
  if (sortBy) params.append("sortBy", sortBy);
  if (sortOrder) params.append("sortOrder", sortOrder);

  const response = await axios.get(`${API_URL}/api/cars`, { params });
  return response.data;
};

export const getCarById = async (id: string) => {
  const response = await axios.get(`${API_URL}/api/cars/${id}`);
  return response.data;
};

export const getCarTypes = async () => {
  const response = await axios.get(`${API_URL}/api/cars/types`);
  return response.data;
};

export const getTags = async () => {
  const response = await axios.get(`${API_URL}/api/cars/tags`);
  return response.data;
};

export const createCar = async (carData: {
  imageUrl: string;
  name: string;
  description?: string;
  carType: string;
  tags: string[];
}) => {
  const response = await axios.post(`${API_URL}/api/cars`, carData);
  return response.data;
};

export const deleteCar = async (id: string) => {
  const response = await axios.delete(`${API_URL}/api/cars/${id}`);
  return response.data;
};