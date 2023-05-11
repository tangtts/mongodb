export const classes = [
    "初一一班",
    "初一二班",
    "初一三班",
    "初二一班",
    "初二二班",
    "初二三班",
    "初三一班",
    "初三二班",
    "初三三班",
] as const


export type ClassNameTuple  = typeof classes;
export type ClassName = typeof classes[number]
export default {}