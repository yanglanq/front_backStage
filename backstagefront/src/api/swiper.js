import axios from "axios"
// import Qs from "qs";
// 上传信息
export const uploadImg  = (info)=>{
    return axios.post("/pic/addNew", info,{
        headers: {
            "Content-Type": "multipart/form-data"
        }
    })
}

// 获取轮播图
export const getPic  = ()=>{
    return axios.get("/pic/getAll")
}

// 删除轮播图
export const deletePic  = (info)=>{
    return axios.get("/pic/delete", {
        params:info
    })
}