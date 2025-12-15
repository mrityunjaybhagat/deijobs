import axios from "axios";
const BASE_URL = "https://deijobs.in/deijobs-api/api";

const api = axios.create({
  baseURL: BASE_URL,
  headers: { "Content-Type": "application/json" },
});

// ✅ GET
export const getData = async (endpoint) => {
  const res = await api.get(endpoint);
  return res.data;
};

// ✅ POST
export const postData = async (endpoint, data) => {
  const res = await api.post(endpoint, data);
  return res.data;
};

// ✅ PUT
export const updateData = async (endpoint, data) => {
  const res = await api.put(endpoint, data);
  return res.data;
};

// ✅ DELETE
export const deleteData = async (endpoint) => {
  const res = await api.delete(endpoint);
  return res.data;
};
