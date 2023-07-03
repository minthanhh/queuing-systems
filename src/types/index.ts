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
}


export interface IRole {
    roleName: string,
    usersUsing: number,
    description: string,
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

