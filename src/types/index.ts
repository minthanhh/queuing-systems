export type User = {
    displayName: string | null
    email: string
    photoUrl: string | null
    id: string
}


export type Route = {
    path?: string
    label: string
    icon: string
    more?: string
    breadcrumb?: string
    children?: ChildRoute[]
}



export type ChildRoute = {
    path: string
    label: string
    breadcrumb?: string
}


// export type BreadcrumbType = BreadcrumNoChild | BreadcrumbHasChild

// export type BreadcrumNoChild = {
//     path?: string
//     breadcrumb: string
// }

export type BreadcrumbType = {
    path?: string
    breadcrumb: string
    labels?: {
        label: string
        path: string
    }[]
}


export type DeviceType = {
    id: string
    name: string
    device: string
    username: string
    addressIP: string
    password: string
    services: string | string[]
    status: string
    connect: string
    uid?: string
} 

export type DeviceSafe = Omit<DeviceType, 'status' | 'connect' | 'uid'>

export type InfoType = {
    id: string;
    name: string;
    addressIP: string;
    status: string;
    connect?: string;
    services?: string[];
    description?: string;
    source?: string;
    username?: string;
    stt?: string;
    expiryDate?: string;
    grantTime?: string;
    role?: string;
}

export type InfoSafe = Partial<InfoType>





export type ServiceType = {
    id: string,
    name: string,
    status: string
    description: string
    to?: string
    from?: string
    prefix?: string,
    surfix?: string
    uid?: string,
}


export interface IRole {
    roleName: string,
    usersUsing: number,
    description: string,
    role?: string
    uid?: string
}
    
export interface IAccount {
    username: string
    fullName: string
    phone: string
    email: string
    role: string
    status: string
    uid?: string
    createdAt?: string
    updatedAt?: string
    password: string
    comfirm: string
}


export interface IUser {
    email: string
    displayName?: string
    username?: string
    accessToken?: string
    photoURL?:string
    uid: string
    phone?: string
    role?: string
    password?: string
}

export interface ICoupons {
    uid?: string
    fullName: string
    email: string 
    phone: string
    serviceName: string
    grantNumber: number
    status: string
    grantTime: string
    expiryDate: string
}


export interface IReport {
    orderNumber: string
    serviceName: string 
    grantTime: string
    status: string
    source: string
}


export interface IUserLogs {
    impactTime: string
    ipDone: string
    operations: string
    username: string
}



export interface IGiveNumber {
    orderNumber: string
    customerName: string
    serviceName: string
    grantTime: string
    expiryTime: string
    status: string
    source: string
}



export type CustomGetKeys<T, U extends string | number | symbol> = Array<keyof Omit<T, U>>

export type GetTheIAccountKeys = CustomGetKeys<IAccount, 'uid' | 'createdAt' | 'updatedAt'>