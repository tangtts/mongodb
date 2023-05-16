import axiosInstance, { get, post } from "..";



export const searchStudent  = (data:any)=>{
    return post("students/search",data)
}

export const addGrades  = (data:any)=>{
    return post("students/addGrades",data)
}

export const searchGrades  = (data:any)=>{
    return post("grades/search",data)
}

export const updateGrades  = (data:any)=>{
    return post("grades/update",data)
}