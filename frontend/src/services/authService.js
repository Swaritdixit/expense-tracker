import axios from "axios";
const API_URL = `${import.meta.env.VITE_API}/auth`;
export const registerUser=(user)=>{
    return axios.post(`${API_URL}/register`,user);
};
export const loginUser=(user)=>{
    return axios.post(`${API_URL}/login`,user);
};