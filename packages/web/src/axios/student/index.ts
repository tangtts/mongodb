import axiosInstance, { get, post } from "..";



export const search  = (data:any)=>{
    return post("students/search",data)
}

export const addGrades  = (data:any)=>{
    return post("students/addGrades",data)
}