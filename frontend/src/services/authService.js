import axios from "axios";
const API = import.meta.env.VITE_API_URL;
const API_URL=`${API}/auth`;
export const registerUser=(user)=>{
    return axios.post(`${API_URL}/register`,user);
};
export const loginUser=(user)=>{
    return axios.post(`${API_URL}/login`,user);
};