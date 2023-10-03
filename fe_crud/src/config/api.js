import axios from "axios";
import { toast } from "react-toastify";

const BASE_URL = "http://localhost:5005/api"; // Thay thế URL này bằng URL của API thật

// Lấy danh sách người dùng
export const getEmployees = async () => {
  try {
    const response = await axios.get(`${BASE_URL}/Employee`);
    return response.data;
  } catch (error) {
    throw error;
  }
};

// Lấy danh sách người dùng
export const getDetailEmployee = async (id) => {
  try {
    const response = await axios.get(`${BASE_URL}/Employee/${id}`);
    return response.data;
  } catch (error) {
    throw error;
  }
};

// Thêm người dùng mới
export const addEmployee = async (employee) => {
  try {
    const response = await axios.post(`${BASE_URL}/Employee`, employee);
    return response.data;
  } catch (error) {
    throw error;
  }
};

// Chỉnh sửa thông tin người dùng
export const editEmployee = async (employee) => {
  try {
    const response = await axios.put(
      `${BASE_URL}/Employee?id=${employee.id}`,
      employee
    );
    toast.success("update success!");
    return response.data;
  } catch (error) {
    throw error;
  }
};

// Xóa người dùng
export const deleteEmployee = async (employeeId) => {
  try {
    await axios.delete(`${BASE_URL}/Employee/${employeeId}`);
    toast.success("delete success!");
  } catch (error) {
    throw error;
  }
};
