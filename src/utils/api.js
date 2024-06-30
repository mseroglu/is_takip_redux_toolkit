import axios from "axios";


const apii =  axios.create({
    baseURL: "http://localhost:3030"
})

export default apii