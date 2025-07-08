import axios from "axios"

const api = axios.create({
    baseURL: "https://thinkboard-5lk8.onrender.com/api"
})

export default api