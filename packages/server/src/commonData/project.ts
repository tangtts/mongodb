export const projects = [
  {
    label:"语文",
    value:"0"
  },
  {
    label:"数学",
    value:"1"
  },
  {
    label:"英语",
    value:"2"
  },
] as const


export type ProjectsTuple  = typeof projects;
export type ProjectName = typeof projects[number]
export default {}