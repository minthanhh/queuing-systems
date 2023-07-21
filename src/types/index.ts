import { Timestamp } from "firebase/firestore"

export type User = {
    displayName: string | null
    email: string
    photoUrl: string | null
    id: string
}


export type Route = {
    activeIcon?: string
    hoverIcon?: string
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




export interface IReport extends Omit<IGiveNumber, 'customerName' | 'expiryTime'> {}


export interface IUserLogs {
    impactTime?: Timestamp | string
    ipDone?: string
    operations: string
    username: string
    uid?: string
}


export type Options = {
    type: string;
    label: string;
 };


 export interface IOrderNumberAndState {
    orderNumber: string
    status: string
 }




export interface IGiveNumber {
    orderNumber: string
    customerName: string
    phone: string
    status: string
    email: string,
    grantTime: string,
    expiryTime: string,
    serviceId: string,
    serviceName: string
    source: string
    uid?: string
}


export type IService = {
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

export interface IDevice {
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

export interface INotify {
    username: string
    uid?: string
    timeToReceive: string
    createdAt: Timestamp | string
}


export type CustomGetKeys<T, U extends string | number | symbol> = Array<keyof Omit<T, U>>

export type GetTheIAccountKeys = CustomGetKeys<IAccount, 'uid' | 'createdAt' | 'updatedAt'>

export type GetTheIServiceKeys = CustomGetKeys<IService, 'uid'>

export type GetTheIDeviceKeys  = CustomGetKeys<IDevice, 'uid'>


