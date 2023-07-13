import { createSlice, createAsyncThunk } from "@reduxjs/toolkit"
import { collection, getCountFromServer, query, where } from "firebase/firestore"
import { db } from "@/configs/firebase.config"

interface CountState {
        device: {
            total: number
            totalActive: number
            totalInActive: number
        },
        service: {
            total: number
            totalActive: number
            totalInActive: number
        },
        numberLevel: {
            total: number
            totalActive: number
            totalInActive: number
        },
   
}

const initialState: CountState = {
        device: {
            total: 0,
            totalActive: 0,
            totalInActive: 0
        },
        service: {
            total: 0,
            totalActive: 0,
            totalInActive: 0
        },
        numberLevel: {
            total: 0,
            totalActive: 0,
            totalInActive: 0
        },
}

const totalCounts = async (nameCollection: string) => {
    const data = {
        total: 0,
        totalActive: 0,
        totalInActive: 0
    }    
    const collActive = collection(db, nameCollection)
    const qActive = query(collActive, where('status', '==', 'active'))
    const snActive = await getCountFromServer(qActive)
    data.totalActive = snActive.data().count


    const collInActive = collection(db, nameCollection)
    const qInActive = query(collInActive, where('status', '==', 'in-active'))
    const snInActive = await getCountFromServer(qInActive)
    data.totalInActive = snInActive.data().count

    const coll = collection(db, nameCollection)
    const q = query(coll)
    const sn = await getCountFromServer(q)
    data.total = sn.data().count

    return data
}


export const getTotalCounts = createAsyncThunk('device/totalCounts', async () => {
    const device = await totalCounts('devices')
    const service = await totalCounts('services')
    const numberLevel = await totalCounts('numberLevels')

    return { device, service, numberLevel}
})



const CountSlice = createSlice({
    name: 'count',
    initialState,
    reducers: {},
    extraReducers(builder) {
        builder.addCase(getTotalCounts.fulfilled, (state, action) => {
            state.device = {...action.payload.device}
            state.service = {...action.payload.service}
            state.numberLevel = {...action.payload.numberLevel}
        })
        
    },
})


// export const {   } = DeviceSlice.actions
export default CountSlice.reducer