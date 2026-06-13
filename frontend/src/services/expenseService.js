import axios from "axios";
const API = import.meta.env.VITE_API_URL;
const API_URL=`${API}/expenses`;

function getAuthConfig(){

  return {
    headers:{
      Authorization:
      localStorage.getItem("token")
    }
  };

}


export const getExpenses=()=>{
  return axios.get(
    API_URL,
    getAuthConfig()
  );};
export const createExpense=(expense)=>{
    return axios.post(API_URL,expense,getAuthConfig());
};
export const deleteExpenseById=(id)=>{
    return axios.delete(
        `${API_URL}/${id}`,getAuthConfig()
    );
};
export const updateExpensesById=(id,expense)=>{
    return axios.put(`${API_URL}/${id}`,expense,getAuthConfig());
};