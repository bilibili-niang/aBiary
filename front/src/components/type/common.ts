// 从后端返回的数据格式
export type resType = {
    success?: boolean,
    message?: string,
    result?: object,
    code?: number
}
export type friendDetailInfo = {
    id?: number;
    friendId?: string;
    userId?: string;
    name?: string;
    avatar?: string;
    weichatId?: any;
    sex?: string;
    classify?: any;
    animalSign?: any;
    level?: any;
    relationship?: any;
    remarks?: any;
    remindType?: any;
    remindFrequency?: any;
    lYear?: string;
    lMonth?: string;
    lDay?: string;
    Animal?: string;
    IMonthCn?: string;
    IDayCn?: string;
    cYear?: string;
    cMonth?: string;
    cDay?: string;
    gzYear?: string;
    gzMonth?: string;
    gzDay?: string;
    astro?: string;
    createdAt?: string;
    updatedAt?: string;
}
// 我的用户数据返回数据类型
export interface userInfo {
	id?: number;
	randomId?: string;
	name?: string;
	phone?: any;
	realName?: any;
	idIdentify?: any;
	avatar?: string;
	sex?: string;
	email?: any;
	vipType?: any;
	vipLevel?: any;
	vipExp?: any;
	vipStatus?: any;
	vipStartTime?: any;
	vipEndTime?: any;
	regSource?: any;
	birthday?: any;
	lunaBirthday?: any;
	createdAt?: string;
	updatedAt?: string;
	iat?: number;
	exp?: number;
}
