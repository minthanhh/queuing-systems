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


