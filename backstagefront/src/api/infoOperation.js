import axios from "axios"
// import Qs from "qs";
// 上传信息
export const uploadInfo  = (info)=>{
    return axios.get("/succulent/addNewWithoutFile", {
        params:info
    })
}
// 获取信息
export const getPlantInfo  = (info)=>{
    return axios.get("/succulent/getAll", {
        params:info
    })
}
// 修改信息
export const updateInfo  = (info)=>{
    return axios.get("/succulent/update", {
        params:info
    })
}