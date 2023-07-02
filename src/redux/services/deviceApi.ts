import { createApi, fakeBaseQuery } from '@reduxjs/toolkit/query/react'

import type { DeviceType } from '../../types'
import { collection, getDocs } from 'firebase/firestore'
import { db } from '../../configs/firebase.config'

export const deviceApi = createApi({
    reducerPath: 'deviceApi',
    tagTypes: ['Device'],
    baseQuery: fakeBaseQuery(),
    endpoints: (builder) => ({
      getAllDevices: builder.query<DeviceType[], void>({
        async queryFn(): Promise<any> {
            try {
                const qn = await getDocs(collection(db, 'devices'))
                const devices = qn.docs.map(doc => ({ uid: doc.id,...doc.data() as DeviceType}) )
                return { data: devices }
            } catch (err) {
                console.log(err)
            }
        }
      }),
    }),
})


export const { useGetAllDevicesQuery  } = deviceApi


    