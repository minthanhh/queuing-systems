import { createSlice, createAsyncThunk } from "@reduxjs/toolkit"
import { addDoc, collection, getDocs } from "firebase/firestore"
import { db } from "@/configs/firebase.config"
import { DeviceType } from "@/types"

interface DeviceState {
    devices: DeviceType[]
}

const initialState: DeviceState = {
    devices: [],
}

const handleDescription = async (text: string) => {
    return text.split(',').map(tx => tx.trim())
}

export const createDevice = createAsyncThunk('device/createDevice', async (device: DeviceType, {rejectWithValue}) => {
    try {
        const text = await handleDescription(device.services as string)
        const results = {
            ...device,
            status: 'active',
            connect: 'connect',
            services: text
        }
        const addRef = await addDoc(collection(db, 'devices'), results)
        const newDevice = { id: addRef.id, device: results}
        
        return newDevice
    } catch (err) {
        return rejectWithValue(err)
    }
})

export const getDevices = createAsyncThunk('device/getDevices', async () => {
    const qn = await getDocs(collection(db, 'devices'))
    const devices = qn.docs.map(doc => ({ uid: doc.id,...doc.data() as DeviceType}) )
    return devices
})

// export const getAllDevices = createAsyncThunk('device/getAllDevices', async () => {
//     try {
//         let data: DeviceType[] = []
//         const docRef = collection(db, "devices")
//         const unsubscribe = onSnapshot(docRef, (querySnapshot) => {
//             const devices: DeviceType[] = [];
//             querySnapshot.forEach((doc) => {
//                 devices.push(doc.data() as DeviceType);
//             });

//             data.push(...devices)
//         });

//         return data
//     } catch (err: any) {
//         console.log(err.message)
//     }
// })



const DeviceSlice = createSlice({
    name: 'device',
    initialState,
    reducers: {},
    extraReducers(builder) {
        builder.addCase(createDevice.fulfilled, (state, action) => {
            state.devices.push(action.payload.device)
        })
        builder.addCase(getDevices.fulfilled, (state, action) => {
            state.devices = action.payload
        })
    },
})

export default DeviceSlice.reducer