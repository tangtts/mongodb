
export const nations = [
    "汉族",
    "蒙古族",
    "回族",
    "藏族",
    "维吾尔族",
    "苗族",
    "彝族",
    "壮族",
    "布依族",
    "朝鲜族",
    "满族",
    "侗族",
    "瑶族",
    "白族",
    "土家族",
    "傣族",
    "黎族",
] as const;

export type NationsNameTuple = typeof nations;
export type NationName = typeof nations[number]
export default {}