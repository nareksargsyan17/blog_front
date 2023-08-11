import axios from "axios";
// const token = localStorage.getItem("token");
const instance = axios.create({
  baseURL: "http://localhost:3001/api",
});

instance.defaults.headers.common['Content-Type'] = 'application/json';
// instance.defaults.headers.common.Authorization = `Bearer ${token}`
instance.defaults.headers.common["Access-Control-Allow-Origin"] =  "*";

export {instance};